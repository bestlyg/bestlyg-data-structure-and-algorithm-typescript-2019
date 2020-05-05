import IQueue from "./IQueue";
import { thorwEmptyError } from "../../utils";

export default abstract class AbstractQueue<T> implements IQueue<T> {
  abstract size(): number;
  abstract isEmpty(): boolean;
  abstract clear(): void;
  abstract enQueue(element: T): void;
  abstract deQueue(): T;
  abstract front(): T;
  protected thorwEmpty(method: string): void {
    if (this.isEmpty()) {
      thorwEmptyError("Queue")(method);
    }
  }
}
