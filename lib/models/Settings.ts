import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  whatsappNumber: string;
  restaurantName: string;
  address: string;
  email: string;
  phone: string;
}

const SettingsSchema: Schema = new Schema(
  {
    whatsappNumber: { type: String, default: '919963012567' },
    restaurantName: { type: String, default: 'Aditya Restaurant & Hospitality' },
    address: { type: String, default: 'Kandukur, Andhra Pradesh' },
    email: { type: String, default: 'contact@adityahospitality.com' },
    phone: { type: String, default: '+91 99630 12567' },
  },
  { timestamps: true }
);

export const SettingsModel: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
