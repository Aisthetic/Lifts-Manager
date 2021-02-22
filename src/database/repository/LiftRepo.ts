import Lift, { LiftModel, DirectionCode, StateCode }from '../model/Lift';

export default class LiftRepo {
  public static findById(id: Number): Promise<Lift | null> {
    return LiftModel.findOne({ id: id }).lean<Lift>().exec();
  }
  public static async create(
    lift: Lift
  ): Promise<{ lift: Lift }> {
    const createdLift = await LiftModel.create(lift);
    return { lift: createdLift.toObject() };
  }

  public static async update(
    lift: Lift
  ): Promise<{ lift:Lift }> {
    await LiftModel.updateOne({ _id: lift._id }, { $set: { ...lift } })
      .lean()
      .exec();
    return { lift: lift };
  }

}
