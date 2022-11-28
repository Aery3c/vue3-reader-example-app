
/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {DOMRect}
 */
export function generateClientRect (x = 0, y = 0) {
  return new DOMRect(x, y, 0, 0);
}