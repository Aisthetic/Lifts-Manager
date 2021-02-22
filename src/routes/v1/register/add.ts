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
import Lift, {DirectionCode, StateCode} from '../../../database/model/Lift'
const router = express.Router();

router.post(
  '/add',
  validator(schema.add),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const lift = await LiftRepo.findById(req.body.id);
    if (lift) throw new BadRequestError('Lift already registered');

    const { lift: createdLift } = await LiftRepo.create(
      {
        id: req.body.id,
        floor: 0,
        direction: DirectionCode.UP,
        state: StateCode.IDLE,
      } as Lift
    );

    new SuccessResponse('Add Successful', {
      lift: _.pick(createdLift, ['_id', 'floor', 'direction', 'state']),
    }).send(res);
  }),
);


export default router;
