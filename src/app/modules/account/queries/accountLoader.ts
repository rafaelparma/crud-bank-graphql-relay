import { AccountModel, IAccount } from '../../../database/schemas/account';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';

const accountLoader = new DataLoader<string, IAccount | null>(async (keys: readonly string[]) => {
    const accounts = await AccountModel.find({ _id: { $in: keys.map(key => new mongoose.Types.ObjectId(key)) } }).exec();
    return keys.map(key => accounts.find(account => account.id.toString() === key.toString()) || null);
});

export { accountLoader };
