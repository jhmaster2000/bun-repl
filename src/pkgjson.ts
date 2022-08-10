import path from 'path';

const pkgjson = await Bun.file(path.join(import.meta.dir, '..', 'package.json')).json() as PackageJson;

export default pkgjson;
