export interface Visitor<K, V> {
  (key: K, value: V): boolean;
  stop: boolean;
}
export type VisitorIterator<K, V> = (key: K, value: V) => boolean;
export function visitorMixin<K, V>(visitor: Visitor<K, V>): Visitor<K, V> {
  const iVisitor = visitor as Visitor<K, V>;
  iVisitor.stop = false;
  return iVisitor;
}
