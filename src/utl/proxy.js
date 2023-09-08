
const Proxies = new WeakMap();

class Proxy {
    static #Native = globalThis.Proxy;
    constructor(target, handler) {
        const p = new Proxy.#Native(target, handler);
        Proxies.set(p, [target, handler]);
        return p;
    }
    static revocable(target, handler) {
        const p = Proxy.#Native.revocable(target, handler);
        Proxies.set(p.proxy, [target, handler]);
        const revoke = p.revoke;
        p.revoke = () => {
            Proxies.set(p.proxy, [null, null]);
            revoke();
        };
        return p;
    }
}

function getProxyDetails(obj, withHandler = true) {
    const details = Proxies.get(obj);
    if (!details) return;
    if (withHandler) return details;
    return details[0]; // target only
}

export default { Proxy, getProxyDetails };
