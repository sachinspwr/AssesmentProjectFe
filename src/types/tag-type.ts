export type Tag<T extends string = string> = {
    type: T;
    id?: string | number;
  };

  export const createTag = <T extends string>(type: T) => 
    (id?: string | number): Tag<T> => ({ type, id });