import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import County, { CountyDocument } from "../models/county.model";

export const create = async (input: DocumentDefinition<Omit<CountyDocument, "createdAt" | "updatedAt">>) => {
    return await County.create(input);
}

export const findAll = async (query: FilterQuery<CountyDocument>, options: QueryOptions = { lean: true }) => {
   return await County.find(query, {}, options).sort({ name: 1 }); 
}

export const findOne = async (query: FilterQuery<CountyDocument>, options: QueryOptions = { lean: true }) => {
    return await County.findOne(query, {}, options);
}

export const edit = async (query: FilterQuery<CountyDocument>, update: UpdateQuery<CountyDocument>, options: QueryOptions) => {
    return County.findOneAndUpdate(query, update, options);
}

export const remove = async (query: FilterQuery<CountyDocument>) => {
    return County.deleteOne(query);
}