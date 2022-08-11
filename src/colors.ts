const colors = {
    bold: '\x1B[1m',
    dim: '\x1B[2m',
    underline: '\x1B[4m',
    /** Not widely supported! */
    blink: '\x1B[5m',
    invert: '\x1B[7m',
    invisible: '\x1B[8m',

    reset: '\x1B[0m',
    //noBold: '\x1B[21m', (broken)
    noDim: '\x1B[22m',
    noUnderline: '\x1B[24m',
    noBlink: '\x1B[25m',
    noInvert: '\x1B[27m',
    visible: '\x1B[28m',

    black: '\x1B[30m',
    red: '\x1B[31m',
    green: '\x1B[32m',
    yellow: '\x1B[33m',
    blue: '\x1B[34m',
    purple: '\x1B[35m',
    cyan: '\x1B[36m',
    white: '\x1B[37m',
    gray: '\x1B[90m',
    redBright: '\x1B[91m',
    greenBright: '\x1B[92m',
    yellowBright: '\x1B[93m',
    blueBright: '\x1B[94m',
    purpleBright: '\x1B[95m',
    cyanBright: '\x1B[96m',
    whiteBright: '\x1B[97m',
} as const;

const bgColors = {
    black: '\x1B[40m',
    red: '\x1B[41m',
    green: '\x1B[42m',
    yellow: '\x1B[43m',
    blue: '\x1B[44m',
    purple: '\x1B[45m',
    cyan: '\x1B[46m',
    white: '\x1B[47m',
    gray: '\x1B[100m',
    redBright: '\x1B[101m',
    greenBright: '\x1B[102m',
    yellowBright: '\x1B[103m',
    blueBright: '\x1B[104m',
    purpleBright: '\x1B[105m',
    cyanBright: '\x1B[106m',
    whiteBright: '\x1B[107m',
} as const;

if (!Bun.enableANSIColors) {
    for (const color in colors) Reflect.set(colors, color, '');
    for (const color in bgColors) Reflect.set(bgColors, color, '');
}

// For testing all colors
//for (const color in colors) console.log(colors[color as keyof typeof colors], color, colors.reset);
//for (const color in bgColors) console.log(bgColors[color as keyof typeof bgColors], color, colors.reset);

function bool(bool: boolean, important: boolean = false) {
    if (bool) return `${colors.greenBright}true${colors.reset}`;
    else return `${important ? colors.redBright : colors.gray}false${colors.reset}`;
}

export default { ...colors, bg: bgColors, bool };
