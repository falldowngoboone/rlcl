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

async function getItems() {
  return new Promise<Item[]>((resolve, reject) => {
    try {
      const items = JSON.parse(
        localStorage.getItem('rlcl-items') || JSON.stringify('[]')
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
