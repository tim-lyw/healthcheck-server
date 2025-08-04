import mongoose, { Schema, Document } from 'mongoose';

export interface IDeclaration extends Document {
  name: string;
  temperature: number;
  hasSymptoms: boolean;
  contactWithCovid: boolean;
  submissionDate: Date;
}

const DeclarationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  temperature: {
    type: Number,
    required: true,
    min: 35,
    max: 42
  },
  hasSymptoms: {
    type: Boolean,
    required: true
  },
  contactWithCovid: {
    type: Boolean,
    required: true
  },
  submissionDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IDeclaration>('Declaration', DeclarationSchema, 'declarations'); 