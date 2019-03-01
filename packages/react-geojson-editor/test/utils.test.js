import { isPathClockwise, fetchJsScript } from "../src/utils";

// @TODO find out how to reset mock
jest.mock('scriptjs', () => {
  return jest.fn()
    .mockImplementationOnce((url, c) => c())
    .mockImplementationOnce((url, c) => {
      throw new Error('could not load script');
    });
});

describe('isPathClockwise', () => {
  it('returns a boolean indicating wether path is clockwise or not', () => {
    const path = { getArray: () => [4, 3, 2, 1] }
    expect(
      typeof isPathClockwise(google, path)
    ).toEqual('boolean');
  })
})

describe('fetchJsScript', () => {

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

