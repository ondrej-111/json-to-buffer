const hasOwnProperty = Object.prototype.hasOwnProperty;

export const getObjectKeys = (object: Object): string[] => {
  const keys: string[] = [];
  for (const key in object) {
    if (hasOwnProperty.call(object, key) === true) {
      keys.push(key);
    }
  }
  return keys;
};
