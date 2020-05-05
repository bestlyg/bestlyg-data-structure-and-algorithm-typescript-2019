import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class SelectionSort extends AbstractSort {
    protected sort(): void {
      const array = this.array;
      for (let end = array.length - 1; end > 0; end--) {
        let max = 0;
        for (let begin = 0; begin <= end; begin++) {
          if (this.compareIndex(max, begin) < 0) max = begin;
        }
        this.swap(max, end);
      }
    }
  }
);
