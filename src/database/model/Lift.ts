import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'LIFT';
export const COLLECTION_NAME = 'LIFTS';

export enum DirectionCode {
  UP = 'UP',
  DOWN = 'DOWN'
}

export enum StateCode {
  MOVING = 'MOVING',
  IDLE = 'IDLE'
}

interface ILift {
  goUp(): () => void; 
  goDown(): () => void; 
}

export default interface Lift extends Document, ILift {
  id: number;
  floor: number;
  direction: string;
  state: string; 
}

const schema = new Schema(
  {
    id: {
      type: Schema.Types.Number,
      required: true,
      unique: true
    },
    floor: {
      type: Schema.Types.Number,
      required: true,
      min: 0
    },
    direction: {
      type: Schema.Types.String,
      select: true,
      enum: [DirectionCode.UP, DirectionCode.DOWN],
    },
    state: {
      type: Schema.Types.String,
      select: true,
      enum: [StateCode.MOVING, StateCode.IDLE],
    }
  },
  {
    versionKey: false,
  },
);

// methods
schema.methods.goUp = function(this: Lift) {
  this.direction = DirectionCode.UP;
  this.state = StateCode.MOVING;
  console.log("Current floor " + this.floor +", Going up !");
}

schema.methods.goDown = function(this: Lift) {
  this.direction = DirectionCode.DOWN;
  this.state = StateCode.MOVING;
  console.log("Current floor " + this.floor +", Going down !");
}

export const LiftModel = model<Lift>(DOCUMENT_NAME, schema, COLLECTION_NAME);
