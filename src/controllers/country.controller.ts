import { Request, Response } from "express";
import { CreateCountryInput, DeleteCountryInput, FindCountryInput, UpdateCountryInput } from "../schema/country.schema";
import { create, findAll, findOne, edit, remove } from "../services/country.service";
import logger from "../utils/logger";

export const createCountryHandler = 
    async (req: Request<{}, {}, CreateCountryInput['body']>, res: Response) => {
        try{
            const body = req.body;

            const country = await create({ ...body });
            return res.status(200).send({ message: `Country successfully added: ${country?._id}`});

        } catch(e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const getAllCountriesHandler = 
    async (req: Request, res: Response) => {
    try{
        const countries = await findAll({});
        return res.status(200).send(countries);

    } catch (e: any){
        logger.error(e);
        return res.status(500).send({ message: e.message });
    }
}

export const getCountryHandler = 
    async (req: Request<FindCountryInput['params']>, res: Response) => {
        try{

            const countryId = req.params.countryId;
            const country = await findOne({ _id: countryId });
            if(!country) return res.status(404).send({ message: `No country record found with Id: ${countryId}.`});
            return res.status(200).send(country);

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const updateCountryHandler = 
    async (req: Request<UpdateCountryInput['params'], {}, UpdateCountryInput['body']>, res: Response) => {
        try{

            const countryId = req.params.countryId;
            const update = req.body;
            const country = await findOne({ _id: countryId });
            if(!country) return res.status(404).send({ message: `No country record found with Id: ${countryId}.`});

            await edit({ _id: countryId }, update, { new: true });
            return res.status(200).send({message: `Country successfully updated`});

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}

export const deleteCountryHandler = 
    async (req: Request<DeleteCountryInput['params']>, res: Response) => {
        try{

            const countryId = req.params.countryId;
            const country = await findOne({ _id: countryId });
            if(!country) return res.status(404).send({ message: `No country record found with Id: ${countryId}.`});

            await remove({ _id: countryId });
            return res.status(200).send({ message: `Country successfully deleted` });

        } catch (e: any){
            logger.error(e);
            return res.status(500).send({ message: e.message });
        }
}