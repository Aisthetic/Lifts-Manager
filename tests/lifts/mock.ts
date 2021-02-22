import { Types } from 'mongoose';
import Lift, { DirectionCode, StateCode } from '../../src/database/model/Lift';
import { BadTokenError } from '../../src/core/ApiError';
import JWT, { JwtPayload } from '../../src/core/JWT';
import { tokenInfo } from '../../src/config';

export const LIFT_ID = new Types.ObjectId(); // random id

export const DEV_ACCESS_TOKEN = 'dac';
export const BAD_ACCESS_TOKEN = 'dfd';

export const mockLiftFindById = jest.fn(async (id: Types.ObjectId) => {
  if (LIFT_ID.equals(id))
    return {
      _id: LIFT_ID,
      floor: 3,
      direction: DirectionCode.UP,
      state: StateCode.MOVING,
    } as Lift;
  else return null;
});

export const mockJwtValidate = jest.fn(
  async (token: string): Promise<JwtPayload> => {
    let object = null;
    switch (token) {
      case DEV_ACCESS_TOKEN:
        object = LIFT_ID.toHexString();
        break;
    }
    if (object)
      return {
        iss: tokenInfo.issuer,
        aud: tokenInfo.audience,
        sub: object,
        iat: 1,
        exp: 2,
        prm: 'abcdef',
      } as JwtPayload;
    throw new BadTokenError();
  },
);

jest.mock('../../src/database/repository/UserRepo', () => ({
  get findById() {
    return mockLiftFindById;
  },
}));

JWT.validate = mockJwtValidate;
