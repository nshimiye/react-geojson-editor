import scriptjs from "scriptjs";
import { isPathClockwise, fetchJsScript } from "../src/utils";

export const google = {
  maps: {
    geometry: {
      spherical: {}
    }
  }
};

// @TODO find out how to reset mock
jest.mock('scriptjs', () => {
  return jest.fn()
    .mockImplementationOnce((url, c) => c())
    .mockImplementationOnce((url, c) => {
      throw new Error('could not load script');
    });
});

describe('isPathClockwise', () => {
  it('calls computeSignedArea to find path area', () => {
    const computeSignedArea = jest.fn(() => 0);
    google.maps.geometry.spherical['computeSignedArea'] = computeSignedArea;
    const path = { getArray: () => [1, 2, 3, 4] }

    isPathClockwise(google, path)
    expect(computeSignedArea).toHaveBeenCalled();
  })
  it('returns a boolean indicating wether path is clockwise or not', () => {
    const path = { getArray: () => [4, 3, 2, 1] }
    expect(
      typeof isPathClockwise(google, path)
    ).toEqual('boolean');
  })
})

describe('fetchJsScript', () => {

  beforeAll(() => {
    // scriptjsMock.mockClear();
    // console.log('4545454545454545455454545');
  })

  it('calls the callback function', () => {
    const callback = jest.fn();
    fetchJsScript('', callback, jest.fn());
    expect(callback).toHaveBeenCalled();
  });

  it('calls the error function', () => {
    const error = jest.fn();
    fetchJsScript('', jest.fn(), error)
    expect(error).toHaveBeenCalled()
  })
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
