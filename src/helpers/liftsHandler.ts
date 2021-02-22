import Lift, { DirectionCode, StateCode } from '../database/model/Lift'
import LiftRepo from '../database/repository/LiftRepo';
import Logger from '../core/Logger';

const TIME_BETWEEN_FLOORS = 5000; // the lifts take 5secs to reach next floor  

var lifts: { [id: number]: number[]; } = {}; // lifts and floors they should go to

const liftsHandler = (lift: Lift, floor: number) => {
  if (floor == lift.floor && lift.state == StateCode.IDLE) {
    console.log("Lift " + lift.id + " already in floor " + floor);
  }
  // we add floor to the destinations
  if (!lifts[lift.id].some(f => f == floor))
    lifts[lift.id].push(floor);
  else
    Logger.debug(lift.id + ": Direction already added.");

  // floors this lift should go to
  var floors = lifts[lift.id];

  // find the most prioritary floor
  // priority goes as closest upwards then closest downwards
  var destinationFloor: number = floors[0];

  // finding closest upwards
  floors.forEach(floor => {
    if (floor >= lift.floor && floor <= destinationFloor) {
      destinationFloor = floor;
    }
  });

  // finding closest downwards 
  floors.forEach(floor => {
    if (floor <= lift.floor && floor >= destinationFloor) {
      destinationFloor = floor;
    }
  });

  // going to next floor 
  //if the lift is IDLE, we go there 
  if (destinationFloor > lift.floor)
    lift.goUp();
  else
    lift.goDown();
  // function to be recalled every floor to change the floor of the lift
  var update = () => {
    setTimeout(() => {
      if (destinationFloor > lift.floor)
        lift.floor++;
      else
        lift.floor--;
      LiftRepo.update(lift);
      if (lift.floor == destinationFloor) {
        // destination reached
        Logger.debug(lift.id + ": destination reached, current floor " + lift.floor + ".")
        // process next destinations 
        liftsHandler(lift, lift.floor); // second parameter is a dum
      }
      else {
        update();
        Logger.debug(lift.id + ": going" + lift.direction + ", current floor " + lift.floor + ".")
      }
    }, TIME_BETWEEN_FLOORS) // end timeout
  }; // end update
  update();

};


export default liftsHandler;