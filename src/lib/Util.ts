import { SnakeToCamelObject } from "./typeHelpers.js";

/**
 * Format bytes or bytes per second to human readable format
 * @param bytes Bytes to format
 * @param speed Format as bytes per second, default false
 * @returns formatted string
 */
export function prettySize(bytes: number, speed = false) {
    const units: [string, number][] = [
        ["B", 0],
        ["KiB", 0],
        ["MiB", 1],
        ["GiB", 2],
        ["TiB", 3],
        ["PiB", 3],
        ["EiB", 3],
    ];

    let value = bytes;
    let depth = 0;
    while (value > 1024 && depth < units.length - 1) {
        value /= 1024;
        depth += 1;
    }

    return `${value.toFixed(units[depth][1])} ${units[depth][0]}${speed ? "/s" : ""}`;
}

export function snakeToCamelObject<TObj extends object>(obj: TObj): SnakeToCamelObject<TObj> {
    const newObj = {} as SnakeToCamelObject<TObj>;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = key.replace(/_(\w)/g, (_m, g) => g.toUpperCase());
            // @ts-expect-error this type stuff is too complex for me
            newObj[newKey as keyof SnakeToCamelObject<TObj>] =
                typeof obj[key] == "object" && obj[key] !== null && obj[key] !== undefined
                    ? // @ts-expect-error this type stuff is too complex for me
                      snakeToCamelObject(obj[key])
                    : obj[key];
        }
    }
    return newObj;
}
