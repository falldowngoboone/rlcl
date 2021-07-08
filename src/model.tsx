class List {
  name: string;
  id: string;
  items: Item[];
  checked: string[];

  constructor(name: string) {
    this.name = name;
    this.id = id();
    this.items = [];
    this.checked = [];
  }
}

class Item {
  name: string;
  id: string;
  checked: boolean;

  constructor(name: string) {
    this.name = name;
    this.id = id();
    this.checked = false;
  }
}

let _id = 0;

function id() {
  return String(`$_${_id++}`);
}

export { List, Item };
