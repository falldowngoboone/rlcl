import uniqid from 'uniqid';

export class Item {
  constructor(value: string) {
    this.value = value;
    this.id = uniqid();
    this.done = false;
  }
  value: string;
  id: string;
  done: boolean;
}
