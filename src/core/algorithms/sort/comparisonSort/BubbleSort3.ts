import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class BubbleSort3 extends AbstractSort {
    protected sort(): void {
      for (let end = this.array.length - 1; end > 0; end--) {
        let sortedIndex = 1;
        for (let begin = 1; begin <= end; begin++) {
          if (this.compareIndex(begin, begin - 1) < 0) {
            this.swap(begin, begin - 1);
            sortedIndex = begin;
          }
        }
        end = sortedIndex;
      }
    }
  }
);
