import { getObjectKeys } from "./helpers";

type PrimitiveType = string | number | boolean;

function jsonObjectToBuffer(data: Record<string, any>): Buffer {
  const chunks: Buffer[] = [Buffer.from("{")];

  const objectKeys: string[] = getObjectKeys(data);
  const lastKey = objectKeys[objectKeys.length - 1];

  for (const key of objectKeys) {
    if (Array.isArray(data[key] as any) === true) {
      chunks.push(Buffer.from(`${JSON.stringify(key)}:`));
      chunks.push(jsonArrayToBuffer(data[key]));
    } else if (typeof data[key] === "object") {
      chunks.push(Buffer.from(`${JSON.stringify(key)}:`));
      chunks.push(jsonObjectToBuffer(data[key]));
    } else {
      chunks.push(
        Buffer.from(`${JSON.stringify(key)}:${JSON.stringify(data[key])}`)
      );
    }

    if (key !== lastKey) {
      chunks.push(Buffer.from(","));
    }
  }
  chunks.push(Buffer.from("}"));

  return Buffer.concat(chunks);
}

function jsonArrayToBuffer(data: Array<Object>): Buffer {
  const chunks: Buffer[] = [Buffer.from("[")];

  const arrLength = data.length;

  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i]) === true) {
      chunks.push(jsonArrayToBuffer(data[i] as Array<Object | PrimitiveType>));
    } else if (typeof data[i] === "object") {
      chunks.push(jsonObjectToBuffer(data[i]));
    } else {
      chunks.push(Buffer.from(JSON.stringify(data[i])));
    }
    if (i !== arrLength - 1) {
      chunks.push(Buffer.from(","));
    }
  }
  chunks.push(Buffer.from("]"));

  return Buffer.concat(chunks);
}

export function jsonToBuffer(
  data: Object | Array<Object | PrimitiveType>
): Buffer {
  return Array.isArray(data)
    ? jsonArrayToBuffer(data)
    : jsonObjectToBuffer(data);
}

export default jsonToBuffer;
