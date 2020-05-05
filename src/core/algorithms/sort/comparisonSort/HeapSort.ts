import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class HeapSort extends AbstractSort {
    private heapSize = 0;
    protected sort(): void {
      const len = this.array.length;
      this.heapSize = len;
      for (let i = (len >> 1) - 1; i >= 0; i--) this.siftDown(i);
      while (this.heapSize > 1) {
        this.swap(0, --this.heapSize);
        this.siftDown(0);
      }
    }
    siftDown(index: number): void {
      const element = this.array[index];
      const half = this.heapSize >> 1;
      while (index < half) {
        let childIndex = (index << 1) + 1;
        let child = this.array[childIndex];
        const rightIndex = childIndex + 1;
        if (
          rightIndex < this.heapSize &&
          this.compareElement(this.array[rightIndex], child) > 0
        )
          child = this.array[(childIndex = rightIndex)];
        if (this.compareElement(element, child) >= 0) break;
        this.array[index] = child;
        index = childIndex;
      }
      this.array[index] = element;
    }
  }
);
