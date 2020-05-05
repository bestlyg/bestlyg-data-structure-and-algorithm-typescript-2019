export enum ColorEnum {
  RED,
  BLACK
}
export interface Color {
  color: ColorEnum;
}
export function color(
  node: Color | undefined,
  color: ColorEnum
): Color | undefined {
  if (node === undefined) return node;
  node.color = color;
  return node;
}
export function red(node: Color | undefined): Color | undefined {
  return color(node, ColorEnum.RED);
}
export function black(node: Color | undefined): Color | undefined {
  return color(node, ColorEnum.BLACK);
}
export function colorOf(node: Color | undefined): ColorEnum {
  return node === undefined ? ColorEnum.BLACK : node.color;
}
export function isBlack(node: Color | undefined): boolean {
  return colorOf(node) === ColorEnum.BLACK;
}
export function isRed(node: Color | undefined): boolean {
  return colorOf(node) === ColorEnum.RED;
}
