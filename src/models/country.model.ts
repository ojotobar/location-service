import mongoose from "mongoose";

export interface CountryDocument extends mongoose.Document{
    name: string,
    code: string,
    currencyCode: string,
    currencySymbol: string,
    dialingCode: string,
    flagIcon: string,
    createdAt: Date,
    updatedAt: Date
}

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    currencyCode: { type: String },
    currencySymbol: { type: String },
    flagIcon: { type: String },
    dialingCode: { type: String }
},{
    timestamps: true
});

const Country = mongoose.model("Country", countrySchema);
export default Country;