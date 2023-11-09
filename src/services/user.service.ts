import {DocumentDefinition}  from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

export const createUser = 
async (input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "confirmed" | "comparePassword">>) => {
    try{
        return await User.create(input);
    } catch (e: any){
        throw new Error(e);
    }
};

export const validatePassword = async (email: string, password: string ) => {
    const user = await User.findOne({ email });

    if(!user) return false;

    const isValid = await user.comparePassword(password);
    if(!isValid) return false;

    return omit(user.toJSON(), "password");
}