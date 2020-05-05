import AbstractSort, { mixinSort } from "./Sort";
class CountingSort extends AbstractSort {
  protected sort(): void {
    const array = this.array;
    let max = array[0];
    let min = array[0];
    const len = array.length;
    for (let i = 1; i < len; i++) {
      if (array[i] > max) max = array[i];
      if (array[i] < min) min = array[i];
    }
    const counts: number[] = new Array(max - min + 1).fill(0);
    for (let i = 0; i < len; i++) counts[array[i] - min]++;
    for (let i = 1, len = counts.length; i < len; i++)
      counts[i] += counts[i - 1];
    const newArray: number[] = [];
    for (let i = array.length - 1; i >= 0; i--)
      newArray[--counts[array[i] - min]] = array[i];
    for (let i = 0, len = newArray.length; i < len; i++) array[i] = newArray[i];
  }
  // protected sort(): void {
  //   let max = this.array[0];
  //   const len = this.array.length;
  //   for (let i = 1; i < len; i++)
  //     if (this.array[i] > max) max = this.array[i];
  //   let counts: number[] = new Array(max + 1).fill(0);
  //   for (let i = 0; i < len; i++) counts[this.array[i]]++;
  //   let index = 0;
  //   for (let i = 0, len = counts.length; i < len; i++)
  //     while (counts[i]-- > 0) this.array[index++] = i;
  // }
}
export default mixinSort(CountingSort);
