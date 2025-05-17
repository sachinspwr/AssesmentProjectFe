/* eslint-disable @typescript-eslint/no-explicit-any */
export function PickType<TBase extends Constructor, TKeys extends keyof InstanceType<TBase>>(
    Base: TBase,
    keys: readonly TKeys[],
  ) {
    class PickedClass {
      constructor(...args: any[]) {
        const instance = new Base(...args);
  
        // Copy only the selected properties with proper type checking
        keys.forEach((key) => {
          (this as any)[key] = (instance as InstanceType<TBase>)[key];
        });
      }
    }
  
    // Copy property metadata from base class to picked class
    keys.forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(Base.prototype, key);
      if (descriptor) {
        Object.defineProperty(PickedClass.prototype, key, descriptor);
      }
    });
  
    return PickedClass as {
      new (...args: any[]): Pick<InstanceType<TBase>, TKeys>;
    } & Omit<TBase, 'prototype'>;
  }
  