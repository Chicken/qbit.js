export type Values<T> = T[keyof T];

export type SnakeToCamelCase<TStr extends string> = TStr extends `${infer TStart}_${infer TRest}`
    ? `${TStart}${Capitalize<SnakeToCamelCase<TRest>>}`
    : TStr;

export type SnakeToCamelObject<TObj extends object> = {
    [TKey in keyof TObj as SnakeToCamelCase<TKey & string>]: TObj[TKey] extends object
        ? SnakeToCamelObject<TObj[TKey]>
        : TObj[TKey];
};
