import { Document, model, Schema } from 'mongoose';
import { IAccount } from './account' 

interface ITransaction extends Document {
  fromAccountId: IAccount['_id'];
  toAccountId: IAccount['_id'];
  amount: number;  
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
  fromAccountId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Account', 
    required: true 
  },
  toAccountId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Account', 
    required: true 
  },
  txId: {
    type: String,
    required: true,
    unique: true
  },  
  amount: { 
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

TransactionSchema.index({ fromAccountId: 1 });
TransactionSchema.index({ toAccountId: 1 });

const TransactionModel = model<ITransaction>('Transaction', TransactionSchema);

export { TransactionModel };