import { Item } from './models';

export async function fetch() {
  return getItems();
}

export async function add(value: string) {
  const items = await getItems();
  return saveItems([...items, new Item(value)]);
}

export async function remove(item: Item) {
  const items = await getItems();
  return saveItems(items.filter(i => i.id !== item.id));
}

export async function update(item: Item) {
  const items = await getItems();
  return saveItems(items.map(i => (i.id === item.id ? item : i)));
}

export async function move(from: number, to: number) {
  const items = await getItems();
  to = to < 0 ? 0 : to > items.length - 1 ? items.length - 1 : to;
  const [removed] = items.splice(from, 1);
  items.splice(to, 0, removed);
  return saveItems(items);
}

async function getItems() {
  return new Promise<Item[]>((resolve, reject) => {
    try {
      const items = JSON.parse(
        localStorage.getItem('rlcl-items') || JSON.stringify([])
      ) as Item[];
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}

async function saveItems(items: Item[]) {
  return new Promise<Item[]>((resolve, reject) => {
    try {
      localStorage.setItem('rlcl-items', JSON.stringify(items));
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}
