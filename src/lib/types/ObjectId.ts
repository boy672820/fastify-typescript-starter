import mongoose from 'mongoose';

export default class ObjectId {
  private objectId: mongoose.Types.ObjectId;

  static create = () => new ObjectId();

  constructor() {
    this.objectId = new mongoose.Types.ObjectId();
  }

  getObjectId() {
    return this.objectId;
  }
}
