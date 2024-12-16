function getIOSSafeArea() {
  const iosSafeArea = document.querySelector(".ios-safe-area")

  if (iosSafeArea) {
    return getComputedStyle(iosSafeArea).getPropertyValue("padding-bottom").replace("px", "")
  }
}
