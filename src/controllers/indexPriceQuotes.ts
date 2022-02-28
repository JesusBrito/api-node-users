import { Request, Response } from "express";
import axios from "axios"

export async function getIndexPriceQuotes(req: Request, res: Response) {
    try {
        const response = await axios.get(process.env.URL_CHALLENGE!)
        res.status(200).send(response.data);
    } catch (error) {
        return res.status(500).send({ message: "No se pudo consultar la información" });
    }
}
