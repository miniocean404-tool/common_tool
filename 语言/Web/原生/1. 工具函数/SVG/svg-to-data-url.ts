const nestedQuotesRE = /"[^"']*'[^"]*"|'[^'"]*"[^']*'/

function svgToDataURL(content: Buffer): string {
  const stringContent = content.toString()
  // If the SVG contains some text or HTML, any transformation is unsafe, and given that double quotes would then
  // need to be escaped, the gain to use a data URI would be ridiculous if not negative
  if (
    stringContent.includes("<text") ||
    stringContent.includes("<foreignObject") ||
    nestedQuotesRE.test(stringContent)
  ) {
    return `data:image/svg+xml;base64,${content.toString("base64")}`
  } else {
    return (
      "data:image/svg+xml," +
      stringContent
        .trim()
        .replaceAll(/>\s+</g, "><")
        .replaceAll('"', "'")
        .replaceAll("%", "%25")
        .replaceAll("#", "%23")
        .replaceAll("<", "%3c")
        .replaceAll(">", "%3e")
        // Spaces are not valid in srcset it has some use cases
        // it can make the uncompressed URI slightly higher than base64, but will compress way better
        // https://github.com/vitejs/vite/pull/14643#issuecomment-1766288673
        .replaceAll(/\s+/g, "%20")
    )
  }
}

/**
 * from: https://github.com/iconify/iconify/blob/main/packages/utils/src/svg/url.ts
 * Encode SVG for use in url()
 *
 * Short alternative to encodeURIComponent() that encodes only stuff used in SVG, generating
 * smaller code.
 */
export function encodeSVGforURL(svg: string): string {
  return (
    svg
      .replace(/"/g, "'")
      .replace(/%/g, "%25")
      .replace(/#/g, "%23")
      // .replace(/{/g, '%7B') // not needed in string inside double quotes
      // .replace(/}/g, '%7D') // not needed in string inside double quotes
      .replace(/</g, "%3C")
      .replace(/>/g, "%3E")
      .replace(/\s+/g, " ") // Replace all whitespace with space to get rid of '\r', '\n' and '\t'
  )
}

/**
 * Generate data: URL from SVG
 */
export function svgToData(svg: string): string {
  return "data:image/svg+xml," + encodeSVGforURL(svg)
}

/**
 * Generate url() from SVG
 */
export function svgToURL(svg: string): string {
  return 'url("' + svgToData(svg) + '")'
}
