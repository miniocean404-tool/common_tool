import { alpha as alphaType } from "../number"
import type { HSLA } from "../types"
import { isColorString, splitColor } from "./utils"
import { sanitize } from "../utils/sanitize"
import { percent } from "../number/units"

export const hsla = {
  test: /*@__PURE__*/ isColorString("hsl", "hue"),
  parse: /*@__PURE__*/ splitColor<HSLA>("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha = 1 }: HSLA) => {
    return (
      "hsla(" +
      Math.round(hue) +
      ", " +
      percent.transform(sanitize(saturation)) +
      ", " +
      percent.transform(sanitize(lightness)) +
      ", " +
      sanitize(alphaType.transform(alpha)) +
      ")"
    )
  },
}
