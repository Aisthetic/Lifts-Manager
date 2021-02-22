import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  add: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
