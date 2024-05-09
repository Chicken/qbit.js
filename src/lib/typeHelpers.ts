export type Values<T> = T[keyof T];

export type SnakeToCamelCase<TStr extends string> = TStr extends `${infer TStart}_${infer TRest}`
    ? `${TStart}${Capitalize<SnakeToCamelCase<TRest>>}`
    : TStr;

export type SnakeToCamelObject<TObj extends object> = {
    [TKey in keyof TObj as SnakeToCamelCase<TKey & string>]: TObj[TKey] extends object
        ? SnakeToCamelObject<TObj[TKey]>
        : TObj[TKey];
};

export type Unique<TType, TName> = TType & { __type__: TName };

export type DeepPartial<TObj> = {
    [TKey in keyof TObj]?: TObj[TKey] extends object ? DeepPartial<TObj[TKey]> : TObj[TKey];
};
