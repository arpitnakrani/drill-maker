const pathToSvgObj: Record<string, string> = {
    'svgs/drill-image-svgs/utility/cone.svg': `<svg width="2em" height="2em" viewBox="0 0 16 16" fill="rgb(255, 94, 36)" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.857 12.666H4.449c-.397 0-.47-.094-.36-.467L7.58.329c.015-.049.016-.109.047-.143.067-.074.154-.191.224-.186.086.007.206.108.235.194.143.417.262.842.386 1.266l3.154 10.723c.116.394.05.483-.36.483H7.857z"></path>
    <path d="M7.848 15.701H3.42c-.36 0-.42-.058-.42-.412l.001-1.523c0-.254.086-.345.334-.345h9.051c.242 0 .34.1.34.346.003.516.002 1.03.001 1.546 0 .303-.084.388-.386.388H7.848z"></path>
  </svg>`
}
export function getSVGFromPath(path: string) {
    return pathToSvgObj[path]
}