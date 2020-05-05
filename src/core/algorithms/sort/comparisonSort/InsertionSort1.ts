import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class InsertionSort1 extends AbstractSort {
    protected sort(): void {
      for (let begin = 1; begin < this.array.length; begin++) {
        let cur = begin;
        while (cur > 0 && this.compareIndex(cur, cur - 1) < 0) {
          this.swap(cur, cur - 1);
          cur--;
        }
      }
    }
  }
);
