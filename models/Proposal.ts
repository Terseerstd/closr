import mongoose, { Schema, Document } from "mongoose";

export interface IPricingTier {
  name: string;
  price: number;
  billingType: "one-time" | "monthly" | "milestone";
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface IProposal extends Document {
  userId: mongoose.Types.ObjectId;
  offerId?: mongoose.Types.ObjectId;
  publicSlug: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  status: "draft" | "sent" | "viewed" | "signed" | "paid";
  
  // Content Blocks
  problemStatement: string;
  proposedSolution: string;
  deliverables: string[];
  pricingTiers: IPricingTier[];
  selectedTierName?: string;
  roiStatement: string;
  nextSteps: string;

  // Sign & Pay
  signature?: {
    signed: boolean;
    signedAt?: Date;
    signedByName?: string;
    signatureDataUrl?: string;
  };
  payment?: {
    paid: boolean;
    paidAt?: Date;
    amount?: number;
    stripePaymentId?: string;
  };

  analytics: {
    opensCount: number;
    lastViewedAt?: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

const PricingTierSchema = new Schema<IPricingTier>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  billingType: {
    type: String,
    enum: ["one-time", "monthly", "milestone"],
    default: "one-time",
  },
  description: { type: String },
  features: [{ type: String }],
  recommended: { type: Boolean, default: false },
});

const ProposalSchema = new Schema<IProposal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    offerId: { type: Schema.Types.ObjectId, ref: "Offer" },
    publicSlug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientCompany: { type: String },
    status: {
      type: String,
      enum: ["draft", "sent", "viewed", "signed", "paid"],
      default: "draft",
    },
    problemStatement: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    deliverables: [{ type: String }],
    pricingTiers: [PricingTierSchema],
    selectedTierName: { type: String },
    roiStatement: { type: String },
    nextSteps: { type: String },
    signature: {
      signed: { type: Boolean, default: false },
      signedAt: { type: Date },
      signedByName: { type: String },
      signatureDataUrl: { type: String },
    },
    payment: {
      paid: { type: Boolean, default: false },
      paidAt: { type: Date },
      amount: { type: Number },
      stripePaymentId: { type: String },
    },
    analytics: {
      opensCount: { type: Number, default: 0 },
      lastViewedAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Proposal || mongoose.model<IProposal>("Proposal", ProposalSchema);
