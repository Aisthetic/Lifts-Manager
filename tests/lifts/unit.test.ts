import { addHeaders } from '../apiKey/mock';

// import the mock for the current test after all other mock imports
// this will prevent the different implementations by the other mock
import { mockLiftFindById, DEV_ACCESS_TOKEN, BAD_ACCESS_TOKEN, mockJwtValidate } from './mock';

import app from '../../src/app';
import supertest from 'supertest';

describe('authentication validation for admin', () => {
  const endpoint = '/v1/lift/add';
  const request = supertest(app);

  beforeEach(() => {
    mockLiftFindById.mockClear();
    mockJwtValidate.mockClear();
  });

  // CODE 404 : Not found
  it('Should response with 404 if the dev doesn\'t have the correct api key', async () => {
    const response = await addHeaders(request.get(endpoint), DEV_ACCESS_TOKEN); // deb api key
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/denied/);
    expect(mockLiftFindById).toBeCalledTimes(1);
    expect(mockJwtValidate).toBeCalledWith(DEV_ACCESS_TOKEN);
  });
});

describe('authentication validation for dev', () => {
  const endpoint = '/v1/lift/action';
  const request = supertest(app);

  beforeEach(() => {
    mockJwtValidate.mockClear();
    mockLiftFindById.mockClear();
  });

  // CODE 403 : Unsufficient permission
  it('Should response with 401 if user have a bad dev key', async () => {
    const response = await addHeaders(request.get(endpoint), BAD_ACCESS_TOKEN); // bad api key
    expect(response.status).toBe(404);
    expect(mockLiftFindById).toBeCalledTimes(1);
  });
});
