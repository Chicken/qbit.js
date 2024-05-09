import { SnakeToCamelObject, Unique } from "./typeHelpers.js";

/**
 * Format bytes or bytes per second to human readable format
 * @param bytes Bytes to format
 * @param speed Format as bytes per second, default false
 * @returns formatted string
 */
export function prettySize(bytes: Size | Speed, speed = false) {
    const units: [string, number][] = [
        ["B", 0],
        ["KiB", 0],
        ["MiB", 1],
        ["GiB", 2],
        ["TiB", 3],
        ["PiB", 3],
        ["EiB", 3],
    ];

    let value = bytes as number;
    let depth = 0;
    while (value > 1024 && depth < units.length - 1) {
        value /= 1024;
        depth += 1;
    }

    return `${value.toFixed(units[depth][1])} ${units[depth][0]}${speed ? "/s" : ""}`;
}

/** always a number in bytes */
export type Size = Unique<number, "Size">;

export const Size = {
    bytes: (n) => n as Size,
    kilobytes: (n) => (n * 1024 ** 1) as Size,
    megabytes: (n) => (n * 1024 ** 2) as Size,
    gigabytes: (n) => (n * 1024 ** 3) as Size,
    terabytes: (n) => (n * 1024 ** 4) as Size,
} satisfies Record<string, (n: number) => Size>;

/** always a speed in bytes per second */
export type Speed = Unique<number, "Speed">;

export const Speed = {
    bytesPerSecond: (n) => n as Speed,
    kilobytesPerSecond: (n) => (n * 1024 ** 1) as Speed,
    megabytesPerSecond: (n) => (n * 1024 ** 2) as Speed,
    gigabytesPerSecond: (n) => (n * 1024 ** 3) as Speed,
    terabytesPerSecond: (n) => (n * 1024 ** 4) as Speed,
} satisfies Record<string, (n: number) => Speed>;

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

// TODO: parse magnet link
// TODO: parse torrent file without libraries (implement bencode)
