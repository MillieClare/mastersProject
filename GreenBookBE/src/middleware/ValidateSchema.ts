import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { ICompany } from '../models/Company';
import { CountQueuingStrategy } from 'stream/web';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  company: {
    create: Joi.object<ICompany>({
      companyName: Joi.string().required(),
      country: Joi.string().required(),
      sector: Joi.string().required(),
      reviewer: Joi.string().required(),
      reviewLink: Joi.string(),
      marketInformationDate: Joi.string(),
      marketInformationLink: Joi.string()
    }),
    update: Joi.object<ICompany>({
      companyName: Joi.string().required(),
      country: Joi.string().required(),
      sector: Joi.string().required(),
      reviewer: Joi.string().required(),
      reviewLink: Joi.string(),
      marketInformationDate: Joi.string(),
      marketInformationLink: Joi.string()
    })
  }
};
