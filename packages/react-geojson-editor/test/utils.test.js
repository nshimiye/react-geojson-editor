import { isPathClockwise } from "../src/utils";

describe('isPathClockwise', () => {
  it('returns true for path oriented in a clockwise manner', () => {
    expect(isPathClockwise({}, [1, 2, 3, 4])).toEqual(true);
  })
  it('returns false for path oriented in a counter-clockwise manner', () => {
    expect(isPathClockwise({}, [4, 3, 2, 1])).toEqual(false);    
  })
})

describe('fetchJsScript', () => {
  // export function fetchJsScript(url, onloadFunction, onErrorFunction) {
  //   try {
  //     scriptjs(url, onloadFunction);
  //   } catch (error) {
  //     onErrorFunction(error);
  //   }
  // }
});

describe('fetchJsScriptCustom', () => {
  // export function fetchJsScriptCustom(url, onloadFunction, onErrorFunction) {
  //   const tag = document.createElement('script');
  //   if (onloadFunction) { tag.onload = onloadFunction; }
  //   if (onErrorFunction) { tag.onerror = onErrorFunction; }
  //   tag.async = true;
  //   tag.src = url;
  //   document.currentScript.parentNode.insertBefore(tag, document.currentScript);
  // }
});
