import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class InsertionSort2 extends AbstractSort {
    protected sort(): void {
      for (let begin = 1; begin < this.array.length; begin++) {
        let cur = begin;
        const value = this.array[cur];
        while (cur > 0 && this.compareElement(value, this.array[cur - 1]) < 0) {
          this.array[cur] = this.array[cur - 1];
          cur--;
        }
        this.array[cur] = value;
      }
    }
  }
);
