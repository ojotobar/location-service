import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateCountyInput, DeleteCountyInput, FindByStateInput, FindCountyInput, UpdateCountyInput } from "../schema/county.schema";
import { create, edit, findAll, findOne, remove } from "../services/county.service";

export const createCountyHandler = 
    async (req: Request<CreateCountyInput['params'], {}, CreateCountyInput['body']>, res: Response) => {
        try{
            const stateId = req.params.stateId;
            const body = req.body;

            await create({ state: stateId, ...body });
            return res.status(200).send({ message: `County/Local Government successfully added.`});

        } catch(e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const getByStateHandler = 
    async (req: Request<FindByStateInput['query']>, res: Response) => {
    try{
        const stateId = req.query.stateId;
        const county = await findAll({ state: stateId });
        return res.status(200).send(county);

    } catch (e: any){
        logger.error(e);
        return res.status(500).send({ message: e.message });
    }
}

export const getCountyHandler = 
    async (req: Request<FindCountyInput['params']>, res: Response) => {
        try{

            const id = req.params.id;
            const county = await findOne({ _id: id });
            if(!county) return res.status(404).send({ message: `No County/Local Government record found with Id: ${id}.`});
            return res.status(200).send(county);

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const updateCountyHandler = 
    async (req: Request<UpdateCountyInput['params'], {}, UpdateCountyInput['body']>, res: Response) => {
        try{

            const id = req.params.id;
            const update = req.body;
            const county = await findOne({ _id: id });
            if(!county) return res.status(404).send({ message: `No County/Local Government record found with Id: ${id}.`});

            await edit({ _id: id }, update, { new: true });
            return res.status(200).send({message: `County/Local Government successfully updated`});

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const deleteCountyHandler = 
    async (req: Request<DeleteCountyInput['params']>, res: Response) => {
        try{

            const id = req.params.id;
            const county = await findOne({ _id: id });
            if(!county) return res.status(404).send({ message: `No County/Local Government record found with Id: ${id}.`});

            await remove({ _id: id });
            return res.status(200).send({ message: `County/Local Government successfully deleted` });

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}