import mongoose from 'mongoose';

export default class ObjectId {
  static create = () => new ObjectId(new mongoose.Types.ObjectId());
  static from = (objectId: mongoose.Types.ObjectId) => new ObjectId(objectId);

  constructor(private objectId: mongoose.Types.ObjectId) {}

  getObjectId() {
    return this.objectId;
  }
}
