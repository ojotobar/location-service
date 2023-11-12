import { Request, Response } from "express";
import { create, findAll, findOne, edit, remove } from "../services/state.service";
import logger from "../utils/logger";
import { CreateStateInput, DeleteStateInput, FindByCountryInput, FindStateInput, UpdateStateInput } from "../schema/state.schema";

export const createStateHandler = 
    async (req: Request<CreateStateInput['params'], {}, CreateStateInput['body']>, res: Response) => {
        try{
            const countryId = req.params.countryId;
            const body = req.body;

            await create({ country: countryId, ...body });
            return res.status(200).send({ message: `State successfully added.`});

        } catch(e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const getByCountryHandler = 
    async (req: Request<FindByCountryInput['query']>, res: Response) => {
    try{
        const countryId = req.query.countryId;
        const state = await findAll({ country: countryId });
        return res.status(200).send(state);

    } catch (e: any){
        logger.error(e);
        return res.status(500).send({ message: e.message });
    }
}

export const getStateHandler = 
    async (req: Request<FindStateInput['params']>, res: Response) => {
        try{

            const id = req.params.id;
            const state = await findOne({ _id: id });
            if(!state) return res.status(404).send({ message: `No state record found with Id: ${id}.`});
            return res.status(200).send(state);

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const updateStateHandler = 
    async (req: Request<UpdateStateInput['params'], {}, UpdateStateInput['body']>, res: Response) => {
        try{

            const id = req.params.id;
            const update = req.body;
            const state = await findOne({ _id: id });
            if(!state) return res.status(404).send({ message: `No state record found with Id: ${id}.`});

            await edit({ _id: id }, update, { new: true });
            return res.status(200).send({message: `State successfully updated`});

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const deleteStateHandler = 
    async (req: Request<DeleteStateInput['params']>, res: Response) => {
        try{

            const id = req.params.id;
            const state = await findOne({ _id: id });
            if(!state) return res.status(404).send({ message: `No state record found with Id: ${id}.`});

            await remove({ _id: id });
            return res.status(200).send({ message: `State successfully deleted` });

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}