import { Item, List } from "../model";

const db = new Map();

const types: { [key: string]: any } = {
  lists: List,
  items: Item,
};

let _id = 0;

db.set("lists", new Map());
db.set("items", new Map());

addRecord("lists", { name: "Your First List" });

type ClientInit = RequestInit & { data?: any; token?: string };

function client(
  endpoint: RequestInfo,
  { data, token, headers: customHeaders, ...customConfig }: ClientInit = {}
) {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : void 0),
      ...(data ? { "Content-Type": "application/json" } : void 0),
      ...customHeaders,
    },
    ...customConfig,
  };
  const [resource, id] = String(endpoint).split("/");
  const method = methods[config.method as "GET" | "POST" | "PUT" | "DELETE"];

  console.log(`${config.method} to ${endpoint}`);

  return method({ resource, id, data });
}

type Info = {
  resource: string;
  id: string;
  data: any;
};

const methods = {
  async GET({ resource, id }: Pick<Info, "resource" | "id">) {
    if (id) {
      return getRecord(resource, id);
    }

    const table = getTable(resource);
    let result = [];

    for (const [, value] of table) {
      result.push(value);
    }

    return result;
  },

  async POST({ resource, data }: Pick<Info, "resource" | "data">) {
    return addRecord(resource, data);
  },

  async PUT({ resource, id, data: updates }: Info) {
    const table = getTable(resource);
    const oldRecord = getRecord(resource, id);
    const updatedRecord = { ...oldRecord, ...updates };

    table.set(id, updatedRecord);

    return updatedRecord;
  },

  async DELETE({ resource, id }: Pick<Info, "resource" | "id">) {
    const table = getTable(resource);
    const deletedRecord = getRecord(resource, id);

    table.delete(id);

    return deletedRecord;
  },
};

function getTable(resource: string): Map<any, any> {
  if (!resource) throw new Error("Resource not provided!");

  if (!db.has(resource))
    throw new Error(`Resource does not exist: ${resource}.`);

  return db.get(resource);
}

function getRecord(resource: string, id: string) {
  const table = getTable(resource);

  if (!table.has(id))
    throw new Error(`Record does not exist: ${resource}, ${id}.`);

  return table.get(id);
}

function addRecord(resource: string, data: any) {
  const table = getTable(resource);
  const RecordType = getRecordType(resource);
  const newRecord = new RecordType(data);

  newRecord.id = id();

  table.set(newRecord.id, newRecord);

  return newRecord;
}

function getRecordType(resource: string) {
  const RecordType = types[resource];

  if (!RecordType) throw new Error(`Untyped resource: ${resource}`);

  return RecordType;
}

function id() {
  return String(`$_${_id++}`);
}

export { client };
export type { ClientInit };
