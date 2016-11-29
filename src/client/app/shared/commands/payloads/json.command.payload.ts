import { CommandPayload } from './base.command.payload';

export class JsonPayload extends CommandPayload {
  private _payloads: JsonPayload[] = [];

  constructor(payload?: any) {
    super(payload || {});
  }

  concat(payload: JsonPayload): this {
    this._payloads.push(payload);
    return this;
  }

  serialize(): string | Blob | ArrayBuffer {
    let currentSerialized: string;
    try {
      currentSerialized = JSON.stringify(this._data) || '';
    } catch (e) {
      throw new Error(`Invalid JSON command ${this._data.toString()}`);
    }
    if (!this._payloads.length) {
      return currentSerialized;
    } else {
      const serialized = this._payloads.map(c => c.serialize()).concat(currentSerialized).join(',');
      return `[${serialized}]`;
    }
  }

  setData(data: any) {
    this._data = data;
  }

  appendPair(key: any, value: any) {
    this._data[key.toString()] = value;
  }

  parse(data: any): any {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn(`Cannot parse the data ${data}.`);
      return null;
    }
  }

  get mimeType(): string {
    return 'application/json';
  }
}
