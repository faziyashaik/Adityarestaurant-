import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  id: string;
  imageUrl: string;
  title?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    title: { type: String, default: '' },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export const GalleryImageModel: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
