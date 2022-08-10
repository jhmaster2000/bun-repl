export const IS_DEBUG = process.argv.includes('--debug');
export const debuglog = IS_DEBUG ? console.debug : () => void 0;
