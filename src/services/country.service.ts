import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import Country, { CountryDocument } from "../models/country.model"

export const create = async (input: DocumentDefinition<Omit<CountryDocument, "createdAt" | "updatedAt">>) => {
    return await Country.create(input);
}

export const findAll = async (query: FilterQuery<CountryDocument>, options: QueryOptions = { lean: true }) => {
   return await Country.find(); 
}

export const findOne = async (query: FilterQuery<CountryDocument>, options: QueryOptions = { lean: true }) => {
    return await Country.findOne(query, {}, options);
}

export const edit = async (query: FilterQuery<CountryDocument>, update: UpdateQuery<CountryDocument>, options: QueryOptions) => {
    return Country.findOneAndUpdate(query, update, options);
}

export const remove = async (query: FilterQuery<CountryDocument>) => {
    return Country.deleteOne(query);
}