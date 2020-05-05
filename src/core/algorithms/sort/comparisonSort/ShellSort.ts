import AbstractSort, { mixinSort } from "../Sort";
export default mixinSort(
  class ShellSort extends AbstractSort {
    protected sort(): void {
      const stepSequence = this.shellStepSequence();
      for (const step of stepSequence) {
        this._sort(step);
      }
    }
    private _sort(step: number): void {
      for (let col = 0; col < step; col++) {
        for (
          let begin = col + step, len = this.array.length;
          begin < len;
          begin += step
        ) {
          let cur = begin;
          while (cur > col && this.compareIndex(cur, cur - step) < 0) {
            this.swap(cur, cur - step);
            cur -= step;
          }
        }
      }
    }
    private shellStepSequence(): number[] {
      const stepSequence: number[] = [];
      let step = this.array.length;
      while ((step >>= 1) > 0) {
        stepSequence.push(step);
      }
      return stepSequence;
    }
    /**
     * 高效步值
     */
    // private sedgewickStepSequence(): number[] {
    //   const stepSequence: number[] = [];
    //   let k = 0,
    //     step = 0;
    //   while (true) {
    //     if (k % 2 == 0) {
    //       const pow = Math.pow(2, k >> 1);
    //       step = 1 + 9 * (pow * pow - pow);
    //     } else {
    //       const pow1 = Math.pow(2, (k - 1) >> 1);
    //       const pow2 = Math.pow(2, (k + 1) >> 1);
    //       step = 1 + 8 * pow1 * pow2 - 6 * pow2;
    //     }
    //     if (step >= this.array.length) break;
    //     stepSequence.push(step);
    //     k++;
    //   }
    //   return stepSequence;
    // }
  }
);
