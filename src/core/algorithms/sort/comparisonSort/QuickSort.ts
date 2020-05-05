import AbstractSort, { mixinSort } from "../Sort";
import { random } from "../../../../utils";
export default mixinSort(
  class QuickSort extends AbstractSort {
    protected sort(): void {
      this._sort(0, this.array.length);
    }
    private _sort(begin: number, end: number): void {
      if (end - begin < 2) return;
      const mid = this.pivotIndex(begin, end);
      this._sort(begin, mid);
      this._sort(mid + 1, end);
    }
    private pivotIndex(begin: number, end: number): number {
      this.swap(begin, random(begin, --end));
      const pivot = this.array[begin];
      while (begin < end) {
        while (begin < end) {
          if (this.compareElement(pivot, this.array[end]) < 0) end--;
          else {
            this.array[begin++] = this.array[end];
            break;
          }
        }
        while (begin < end) {
          if (this.compareElement(pivot, this.array[begin]) > 0) begin++;
          else {
            this.array[end--] = this.array[begin];
            break;
          }
        }
      }
      this.array[begin] = pivot;
      return begin;
    }
  }
);
