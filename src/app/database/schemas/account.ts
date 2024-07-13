import { Document, model, Schema } from 'mongoose';

interface IAccount extends Document {
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema({
    name: { 
      type: String, 
      required: true
    },
    balance: { 
      type: Number, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      required: false 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now, 
      required: false 
    },    
  }, {
    timestamps: true
  });

  AccountSchema.index({ name: 1 });

const AccountModel  = model<IAccount>('Account', AccountSchema);

export { IAccount, AccountModel };