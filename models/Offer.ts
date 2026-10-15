import mongoose, { Schema, Document } from "mongoose";

export interface IOfferPackage {
  name: string;
  tagline: string;
  positioning: string;
  scope: string[];
  deliverables: string[];
  price: number;
  billingType: "one-time" | "monthly" | "milestone";
  estimatedROI: string;
}

export interface IOffer extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  targetAudience: string;
  coreProblem: string;
  uniqueApproach: string;
  packages: IOfferPackage[];
  createdAt: Date;
  updatedAt: Date;
}

const OfferPackageSchema = new Schema<IOfferPackage>({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  positioning: { type: String, required: true },
  scope: [{ type: String }],
  deliverables: [{ type: String }],
  price: { type: Number, required: true },
  billingType: {
    type: String,
    enum: ["one-time", "monthly", "milestone"],
    default: "one-time",
  },
  estimatedROI: { type: String },
});

const OfferSchema = new Schema<IOffer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    targetAudience: { type: String, required: true },
    coreProblem: { type: String, required: true },
    uniqueApproach: { type: String },
    packages: [OfferPackageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
