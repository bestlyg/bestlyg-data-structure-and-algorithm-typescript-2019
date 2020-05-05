import AbstractSort, { mixinSort } from "../Sort";
const leftArray: number[] = [];
export default mixinSort(
  class MergeSort extends AbstractSort {
    protected sort(): void {
      this._sort(0, this.array.length);
    }
    private _sort(begin: number, end: number): void {
      if (end - begin < 2) return;
      const mid = (end + begin) >> 1;
      this._sort(begin, mid);
      this._sort(mid, end);
      this.merge(begin, mid, end);
    }
    private merge(begin: number, mid: number, end: number): void {
      let li = 0,
        ri = mid;
      const le = mid - begin,
        re = end;
      let ai = begin;
      for (let i = li; i < le; i++) leftArray[i] = this.array[begin + i];
      while (li < le) {
        if (ri < re && this.compareElement(this.array[ri], this.array[li]) < 0)
          this.array[ai++] = this.array[ri++];
        else this.array[ai++] = this.array[li++];
      }
    }
  }
);
