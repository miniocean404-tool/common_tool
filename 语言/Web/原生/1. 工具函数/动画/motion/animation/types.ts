import type { Easing } from "../easing/types"
import type { Driver } from "./animators/drivers/types"
import type { KeyframeGenerator } from "./generators/types"

export interface VelocityOptions {
  velocity?: number
  restSpeed?: number
  restDelta?: number
}

export interface DurationSpringOptions {
  duration?: number
  visualDuration?: number
  bounce?: number
}

export interface SpringOptions extends DurationSpringOptions, VelocityOptions {
  stiffness?: number
  damping?: number
  mass?: number
}

export interface DecayOptions extends VelocityOptions {
  keyframes?: number[]
  power?: number
  timeConstant?: number
  modifyTarget?: (v: number) => number
}

export interface InertiaOptions extends DecayOptions {
  bounceStiffness?: number
  bounceDamping?: number
  min?: number
  max?: number
}

export type GeneratorFactory = (options: ValueAnimationOptions<any>) => KeyframeGenerator<any>

export type AnimationGeneratorType = GeneratorFactory | "decay" | "spring" | "keyframes" | "tween" | "inertia"

export interface KeyframeOptions {
  ease?: Easing | Easing[]
  times?: number[]
}

export type RepeatType = "loop" | "reverse" | "mirror"

export interface AnimationPlaybackOptions {
  repeat?: number
  repeatType?: RepeatType
  repeatDelay?: number
}

export interface Transition
  extends AnimationPlaybackOptions,
    Omit<SpringOptions, "keyframes">,
    Omit<InertiaOptions, "keyframes">,
    KeyframeOptions {
  delay?: number
  elapsed?: number
  driver?: Driver
  type?: AnimationGeneratorType
  duration?: number
  autoplay?: boolean
  startTime?: number
}

export interface AnimationPlaybackLifecycles<V> {
  onUpdate?: (latest: V) => void
  onPlay?: () => void
  onComplete?: () => void
  onRepeat?: () => void
  onStop?: () => void
}

export interface ValueAnimationTransition<V = any> extends Transition, AnimationPlaybackLifecycles<V> {}

export interface ValueAnimationOptions<V extends string | number = number> extends ValueAnimationTransition {
  keyframes: V[]
  name?: string
  from?: V
  isGenerator?: boolean
}
