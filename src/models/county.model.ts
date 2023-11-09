import mongoose from "mongoose";
import { StateDocument } from "./state.model";

export interface CountyDocument extends mongoose.Document{
    state: StateDocument['_id'],
    name: string,
    code: string,
    createdAt: Date,
    updatedAt: Date
}

const countySchema = new mongoose.Schema({
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    name: { type: String, required: true },
    code: { type: String }
},{
    timestamps: true
});

const County = mongoose.model("County", countySchema);
export default County;