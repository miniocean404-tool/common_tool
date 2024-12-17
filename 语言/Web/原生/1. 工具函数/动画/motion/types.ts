/**
 * @public
 */
export interface CustomValueType {
  mix: (from: any, to: any) => (p: number) => number | string
  toValue: () => number | string
}
