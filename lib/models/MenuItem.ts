import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMenuItem extends Document {
  id: string;
  name: string;
  category: string;
  type: 'veg' | 'non-veg';
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['veg', 'non-veg'], required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const MenuItemModel: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
