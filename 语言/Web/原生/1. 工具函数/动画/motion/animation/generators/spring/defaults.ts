export const springDefaults = {
  // 弹簧的硬度。值越高，运动越突然。
  stiffness: 100,
  // 反作用力的强度。如果设置为 0，弹簧将无限振荡
  damping: 10,
  // 运动物体的质量。值越高，运动越缓慢。
  mass: 1.0,
  // 当前速度值
  velocity: 0.0,

  // Default duration/bounce-based options
  duration: 800, // in ms
  // 确定弹簧动画的“弹性”，0没有弹力，而且1极具弹力。
  bounce: 0.3,
  // 如果visualDuration设置了，这将覆盖duration。
  // 视觉持续时间是动画在视觉上达到其目标所需的时间，以秒为单位设置。
  // 换句话说，大部分转变将在此时间之前发生，而“弹性位”将主要在此时间之后发生。
  // 这使得编辑弹簧以及在视觉上与其他基于时间的动画进行协调变得更加容易。
  visualDuration: 0.3, // in seconds

  // 如果绝对速度（以单位/秒为单位）低于此值且 delta 小于，则结束动画
  restSpeed: {
    granular: 0.01,
    default: 2,
  },
  // 如果距离低于此值且速度低于，则结束动画restSpeed。动画结束时，弹簧将结束。
  restDelta: {
    granular: 0.005,
    default: 0.5,
  },

  // Limits
  minDuration: 0.01, // in seconds
  maxDuration: 10.0, // in seconds
  minDamping: 0.05,
  maxDamping: 1,
}
