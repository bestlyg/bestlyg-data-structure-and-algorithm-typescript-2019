export interface Visitor<T> {
  (element: T): boolean;
  stop: boolean;
}
export type VisitorIterator<T> = (element: T) => boolean;
export function visitorMixin<T>(visitor: Visitor<T>): Visitor<T> {
  const iVisitor = visitor as Visitor<T>;
  iVisitor.stop = false;
  return iVisitor;
}
