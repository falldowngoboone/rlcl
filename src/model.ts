class List {
  name: string;
  id: string;
  items: string[];
  checked: string[];

  constructor(arg: string | { name: string; items: string[] }) {
    let resolvedName;
    let resolvedItems;

    switch (typeof arg) {
      case "string":
        resolvedName = arg;
        break;
      case "object":
        resolvedName = arg.name;
        resolvedItems = arg.items || [];
        break;
      default:
        throw new Error("List must be constructed with a name!");
    }

    this.name = resolvedName;
    this.id = id();
    this.items = resolvedItems || [];
    this.checked = [];
  }
}

class Item {
  name: string;
  id: string;

  constructor(arg: string | { name: string }) {
    let resolvedName;

    switch (typeof arg) {
      case "string":
        resolvedName = arg;
        break;
      case "object":
        resolvedName = arg.name;
        break;
      default:
        throw new Error("List must be constructed with a name!");
    }

    this.name = resolvedName;
    this.id = id();
  }
}

let _id = 0;

function id() {
  return String(`${_id++}`);
}

export { List, Item };
