export type Service<V = any> = {
  fetch(): Promise<V[]>;
  add(value: string): Promise<V[]>;
  remove(item: V): Promise<V[]>;
  update(item: V): Promise<V[]>;
  move(from: number, to: number): Promise<V[]>;
};
