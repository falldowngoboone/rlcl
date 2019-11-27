import uniqid from 'uniqid';
import { Service } from '../types';

export type ActionableItemService = Service<ActionableItem>;

export const itemsService: ActionableItemService = {
  async fetch() {
    return getItems();
  },

  async add(value) {
    const items = await getItems();
    return saveItems([...items, new ActionableItem(value)]);
  },

  async remove(item) {
    const items = await getItems();
    return saveItems(items.filter(i => i.id !== item.id));
  },

  async update(item) {
    const items = await getItems();
    return saveItems(items.map(i => (i.id === item.id ? item : i)));
  },

  async move(from, to) {
    const items = await getItems();
    to = to < 0 ? 0 : to > items.length - 1 ? items.length - 1 : to;
    const [removed] = items.splice(from, 1);
    items.splice(to, 0, removed);
    return saveItems(items);
  },
};

async function getItems() {
  return new Promise<ActionableItem[]>((resolve, reject) => {
    try {
      const items = JSON.parse(
        localStorage.getItem('rlcl-items') || JSON.stringify([])
      ) as ActionableItem[];
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}

async function saveItems(items: ActionableItem[]) {
  return new Promise<ActionableItem[]>((resolve, reject) => {
    try {
      localStorage.setItem('rlcl-items', JSON.stringify(items));
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
}

export class ActionableItem {
  constructor(value: string) {
    this.value = value;
    this.id = uniqid();
    this.done = false;
  }
  value: string;
  id: string;
  done: boolean;
}
