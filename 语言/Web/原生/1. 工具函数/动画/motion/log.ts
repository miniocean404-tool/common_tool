export const noop = <T>(any: T): T => any

export type DevMessage = (check: boolean, message: string) => void

let warning: DevMessage = noop
let invariant: DevMessage = noop

warning = (check, message) => {
  if (!check && typeof console !== "undefined") {
    console.warn(message)
  }
}

invariant = (check, message) => {
  if (!check) {
    throw new Error(message)
  }
}

export { warning, invariant }
