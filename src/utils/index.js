
/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {DOMRect}
 */
export function generateClientRect (x = 0, y = 0) {
  return new DOMRect(x, y, 0, 0);
}

function createVisualRectElement () {
  const el = document.createElement('div');
  [{ position: 'absolute', backgroundColor: 'yellow', zIndex: '-1' }].forEach(styleObj => {
    for (let key in styleObj) {
      if (styleObj.hasOwnProperty(key)) {
        el.style[key] = styleObj[key];
      }
    }
  });

  return el;
}

const el = createVisualRectElement();
/**
 * 
 * @param {Range} range 
 */
export function highlightClientRect (range) {
  if ((document.body.compareDocumentPosition(el) & 16) != 16) {
    document.body.appendChild(el);
  }

  const clientRect = createRelativeRect(range);

  el.style.left = `${clientRect.x}px`;
  el.style.top = `${clientRect.y}px`;
  el.style.width = `${clientRect.width}px`;
  el.style.height = `${clientRect.height}px`;
}

/**
 * 
 * @param {Range} range 
 * @returns {DOMRect}
 */
export function createRelativeRect (range) {
  const scrollPos = getScrollPosition(window);
  const rect = range.getBoundingClientRect();
  
  return DOMRect.fromRect({ x: rect.x + scrollPos.x, y: rect.y + scrollPos.y, width: rect.width, height: rect.height });
}

function getScrollPosition(win) {
  let x = 0, y = 0;
  if (typeof win.pageXOffset == 'number' && typeof win.pageYOffset == 'number') {
      x = win.pageXOffset;
      y = win.pageYOffset;
  } else {
      let doc = win.document;
      let docEl = doc.documentElement;
      let compatMode = doc.compatMode;
      let scrollEl = (typeof compatMode == 'string' && compatMode.indexOf("CSS") >= 0 && docEl)
          ? docEl : document.body;

      if (scrollEl && typeof scrollEl.scrollLeft == NUMBER && typeof scrollEl.scrollTop == NUMBER) {
          try {
              x = scrollEl.scrollLeft;
              y = scrollEl.scrollTop;
          } catch (ex) {}
      }
  }
  return { x: x, y: y };
}