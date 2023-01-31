// Generates the string arrays for repl.builtinModules in src/module/repl.ts
// Pulls module lists directly from Bun source code and sanitizes the data.

import utl from '../src/utl'; utl;

const nodefbzig = await (await fetch('https://raw.githubusercontent.com/oven-sh/bun/main/src/node_fallbacks.zig')).text();
const nodefbzigchunk = nodefbzig.split('pub const Map = ComptimeStringMap(FallbackModule, .{').at(-1)!.trim();
const nodefbrawlist = nodefbzigchunk.split('pub fn contentsFromPath(path: string) ?string {')[0].trim().split('\n').map(ln => ln.trim());
nodefbrawlist.pop(); // closing brackets
const nodefblist: string[] = [];
let prefix = 'node:';
for (const line of nodefbrawlist) {
    if (line === '') { prefix = ''; continue; }
    nodefblist.push(prefix + line.match(/"(.+?)"/)![1]);
}

const mlzig = await (await fetch('https://raw.githubusercontent.com/oven-sh/bun/main/src/bun.js/module_loader.zig')).text();
const mlzigchunk = mlzig.split('pub const HardcodedModule = enum {').at(-1)!.trim();

const tmp = mlzigchunk.split('pub const Map = bun.ComptimeStringMap(');
const enumraw = tmp[0].trim();
const mapraw = tmp[1].trim();
const linkermapraw = mapraw.split('pub const DisabledModule = bun.ComptimeStringMap(')[0].trim();

const enumlist = enumraw.split('\n').map(ln => (ln = ln.trim(), ln.slice(2, ln.at(-1) === ',' ? -2 : -1))).filter(s => s[0] !== '/');
const maplist = [...mapraw.matchAll(/\.\{ ?"(.+?)", ?HardcodedModule\.@"(.+?)" ?\}/g)].map(m => m[1] === m[2] ? m[1] : [m[1], m[2]]).filter(m => 'node:'+m[0] !== m[1] && 'bun:'+m[0] !== m[1]).flat()
const linkermaplist = [...linkermapraw.matchAll(/\.\{ ?"(.+?)", ?"(.+?)" ?\}/g)].map(m => m[1] === m[2] ? m[1] : [m[1], m[2]]).filter(m => 'node:'+m[0] !== m[1] && 'bun:'+m[0] !== m[1] && m[0] !== 'ws/lib/websocket' && m[0] !== 'detect-libc/lib/detect-libc.js').flat()
const mlziglist = [...enumlist, ...maplist, ...linkermaplist];

const builtins = new Set([...new Set([...mlziglist, ...nodefblist])].sort());
builtins.delete('bun:main'); // symlink to project root, not a real module
builtins.delete('bun'); // cannot be dynamically exported (workaround implemented for REPL)

for (const mod of builtins) {
    try {
        // @ts-ignore
        const contents = import.meta.require(mod);
        if (!contents) throw new Error(`Module does not exist but failed silently!`);
        const props = Object.getOwnPropertyNames(contents);
        if (props.length === 0 || (props.length === 1 && props[0] === 'default')) throw new Error(`Module is empty!`);
        console.log(mod, utl.inspect(contents, { colors: true, depth: 0, compact: true }));
    } catch (err) {
        if (!['', 'p', 'dic'].includes(mod))
            console.error(`Removing module "${mod}" from builtins list due to import error:`, err.message);
        builtins.delete(mod);
    }
}

const nodePrefixBuiltins = [...builtins].filter(builtin => builtin.startsWith('node:'));
const bunPrefixBuiltins = [...builtins].filter(builtin => builtin.startsWith('bun:'));
const noPrefixBuiltins = [...builtins].filter(builtin => !builtin.startsWith('node:') && !builtin.startsWith('bun:'));

// Paste into nodePrefixedModules in src/module/repl.ts
console.log('\nnode: modules ->', `'${nodePrefixBuiltins.map(s => s.slice(5)).join("', '")}'\n`);
// Paste into bunPrefixedModules in src/module/repl.ts
console.log('bun: modules ->', `'${bunPrefixBuiltins.map(s => s.slice(4)).join("', '")}'\n`);
// Paste into unprefixedModules in src/module/repl.ts
console.log('other modules ->', `'${noPrefixBuiltins.join("', '")}'`);

export {};
