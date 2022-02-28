import { NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken"
import {Request, Response} from 'express';

export function ensureAuth(req: Request, res: Response, next: NextFunction){
    let token = req.headers.authorization
    token = token?.split(" ")[1]
    
    if (!token) {
        return res.status(403).send({message:'La peticion no tiene la cabecera de autenticación'});
    } else {
        try {
            const decoded = jsonwebtoken.verify(token, process.env.SECRET_TOKEN || "String_Secreto");
            next();
          } catch(err) {
              console.log(err);
            return res.status(401).send({message:'Autenticación inválida'});
          }
    }
}