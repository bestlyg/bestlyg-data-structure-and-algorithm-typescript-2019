import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class InsertionSort3 extends AbstractSort {
    protected sort(): void {
      for (let begin = 1; begin < this.array.length; begin++)
        this.insert(begin, this.search(begin));
    }
    private insert(source: number, dest: number): void {
      const value = this.array[source];
      for (let i = source; i > dest; i--) this.array[i] = this.array[i - 1];
      this.array[dest] = value;
    }
    private search(index: number): number {
      let begin = 0,
        end = index;
      while (begin < end) {
        const mid = (begin + end) >> 1;
        if (this.compareElement(this.array[index], this.array[mid]) < 0)
          end = mid;
        else begin = mid + 1;
      }
      return begin;
    }
  }
);
