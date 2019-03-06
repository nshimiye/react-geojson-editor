export const INVALID_URL = 'INVALID_URL';

// @NOTE scriptjs implementation uses setTimeout
// So we chose to mock it, in order to avoid issues that setTimeout causes
jest.mock('scriptjs', () => {
  return jest.fn((url, c) => {
    if (url === 'INVALID_URL')
      throw new Error('could not load script');
    else
    c();
  })
});