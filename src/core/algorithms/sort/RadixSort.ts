import AbstractSort, { mixinSort } from "./Sort";
export default mixinSort(
  class RadixSort extends AbstractSort {
    protected sort(): void {
      const array = this.array;
      const len = array.length;
      let max = array[0];
      for (let i = 1; i < len; i++) if (array[i] > max) max = array[i];
      for (let divider = 1; divider <= max; divider *= 10) {
        this.countingSort(divider);
      }
    }
    private countingSort(divider: number): void {
      const num = 10;
      const len = this.array.length;
      const counts = new Array(num).fill(0);
      for (let i = 0; i < len; i++) {
        counts[Math.floor(this.array[i] / divider) % 10]++;
      }
      for (let i = 1; i < num; i++) counts[i] += counts[i - 1];
      const newArray: number[] = [];
      for (let i = len - 1; i >= 0; i--)
        newArray[
          --counts[Math.floor(this.array[i] / divider) % 10]
        ] = this.array[i];
      for (let i = 0, len = newArray.length; i < len; i++)
        this.array[i] = newArray[i];
    }
  }
);
