export default interface WeightManager<E> {
  compare(w1: E, w2: E): number;
  add(w1: E, w2: E): E;
  zero(): E;
}
