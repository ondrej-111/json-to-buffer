import { getObjectKeys } from "./helpers";
import { Buffer } from "buffer";

type PrimitiveType = string | number | boolean;

function jsonObjectToBuffer(data: Record<string, any> | null): Buffer {
  if (data === null) {
    return Buffer.from(JSON.stringify(data));
  }

  const chunks: Buffer[] = [Buffer.from("{")];

  const objectKeys: string[] = getObjectKeys(data);
  if (objectKeys.length === 0) {
    const stringifiedObject = JSON.stringify(data);
    if (stringifiedObject !== "[object Object]") {
      return Buffer.from(stringifiedObject);
    }
  }

  for (const key of objectKeys) {
    if (data[key] === undefined || typeof data[key] === "function") {
      continue;
    }

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

    chunks.push(Buffer.from(","));
  }
  if (chunks[chunks.length - 1].toString() === ",") {
    chunks.pop();
  }

  chunks.push(Buffer.from("}"));

  return Buffer.concat(chunks);
}

function jsonArrayToBuffer(data: Array<any>): Buffer {
  const chunks: Buffer[] = [Buffer.from("[")];

  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i]) === true) {
      chunks.push(jsonArrayToBuffer(data[i] as Array<Object | PrimitiveType>));
    } else if (typeof data[i] === "object") {
      chunks.push(jsonObjectToBuffer(data[i]));
    } else {
      chunks.push(Buffer.from(JSON.stringify(data[i] ?? null)));
    }

    chunks.push(Buffer.from(","));
  }
  chunks.pop();

  chunks.push(Buffer.from("]"));

  return Buffer.concat(chunks);
}

export function jsonToBuffer(
  data?: Object | Array<Object | PrimitiveType> | null
): Buffer | undefined {
  if (data === undefined) {
    return undefined;
  }

  if (Array.isArray(data)) {
    return jsonArrayToBuffer(data);
  }
  if (typeof data === "object") {
    return jsonObjectToBuffer(data);
  }
  return Buffer.from(JSON.stringify(data));
}

export default jsonToBuffer;
