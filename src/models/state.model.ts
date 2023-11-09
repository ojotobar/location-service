import mongoose from "mongoose";
import { CountryDocument } from "./country.model";

export interface StateDocument extends mongoose.Document{
    country: CountryDocument['_id'],
    name: string,
    code: string,
    createdAt: Date,
    updatedAt: Date
}

const stateSchema = new mongoose.Schema({
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    name: { type: String, required: true },
    code: { type: String }
},{
    timestamps: true
});

const State = mongoose.model("State", stateSchema);
export default State;