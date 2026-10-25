import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  title: string;
  description: string;
  basePricePerNight: number;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    basePricePerNight: { type: Number, required: true, min: 0 },
    photos: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const RoomModel: Model<IRoom> =
  mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
