import ApiKey from '../../src/database/model/ApiKey';

export const API_KEY = 'abc';

export const mockFindApiKey = jest.fn(async (key: string) => {
  if (key == API_KEY) return { key: API_KEY } as ApiKey;
  else return null;
});

jest.mock('../../src/database/repository/ApiKeyRepo', () => ({
  get findByKey() {
    return mockFindApiKey;
  },
}));

export const addHeaders = (request: any, apiKey = API_KEY) =>
  request.set('Content-Type', 'application/json').set('x-api-key', apiKey).timeout(2000);
