import { Schema, Document, model, models } from "mongoose";

export interface IWaitlistEntry extends Document {
  name: string;
  email: string;
  company?: string;
  role?: string;
  useCase?: string;
  source: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlistEntry>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  useCase: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    default: "waitlist-page",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Waitlist =
  models.Waitlist || model<IWaitlistEntry>("Waitlist", WaitlistSchema);

export default Waitlist;
