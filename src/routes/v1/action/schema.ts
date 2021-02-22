import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  action: Joi.object().keys({
    liftId: JoiObjectId().required(),
    action: Joi.string().required()
  })
};
