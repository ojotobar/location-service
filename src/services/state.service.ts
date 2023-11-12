import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import State, { StateDocument } from "../models/state.model";

export const create = async (input: DocumentDefinition<Omit<StateDocument, "createdAt" | "updatedAt">>) => {
    return await State.create(input);
}

export const findAll = async (query: FilterQuery<StateDocument>, options: QueryOptions = { lean: true }) => {
   return await State.find(query, {}, options).sort({ name: 1 }); 
}

export const findOne = async (query: FilterQuery<StateDocument>, options: QueryOptions = { lean: true }) => {
    return await State.findOne(query, {}, options);
}

export const edit = async (query: FilterQuery<StateDocument>, update: UpdateQuery<StateDocument>, options: QueryOptions) => {
    return State.findOneAndUpdate(query, update, options);
}

export const remove = async (query: FilterQuery<StateDocument>) => {
    return State.deleteOne(query);
}