import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../../core/ApiError';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import _ from 'lodash';
import LiftRepo from '../../../database/repository/LiftRepo';
import Lift, {DirectionCode, StateCode} from '../../../database/model/Lift';

const router = express.Router();

router.post(
  '/action',
  validator(schema.action),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const lift = await LiftRepo.findById(req.body.id);
    if (!lift) throw new BadRequestError('Lift not registered');

    if (!Object.values(DirectionCode).includes(req.body.direction)) throw new BadRequestError('Bad direction');

    lift.floor = req.body.floor;
    lift.state = StateCode.MOVING;

    const { lift: updatedLife } = await LiftRepo.update(
      lift
    );

    new SuccessResponse('Action Successful', {
      lift: _.pick(updatedLife, ['_id', 'floor', 'direction', 'state']),
    }).send(res);
  }),
);


export default router;
