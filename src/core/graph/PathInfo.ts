import { Hash } from "../../types";
import EdgeInfo from "./EdgeInfo";
export default class PathInfo<V extends Hash, E> {
  edgeInfos: EdgeInfo<V, E>[] = [];
  constructor(public weight: E) {}
  toString(): string {
    return `PathInfo [weight=${this.weight},edgeInfos=${this.edgeInfos}]`;
  }
}
