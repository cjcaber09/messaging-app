import { BodyRequest, QueryRequest } from '../types/express'
import { Response } from 'express'
import { UserRegisterType } from '../types/users.types'
import { GetUserByEmailModel } from '../models/users.model'


export const getUsers = async (req: QueryRequest<{}>, res: Response) => {
    // Get the data, 
}

export const createUser = async (req: BodyRequest<UserRegisterType>, res: Response) => {
    // Data is already clean, Proceed to saving data.
    let { email } = req.body;
    const emailExist = await GetUserByEmailModel({ email });
    if (emailExist.length > 0) res.status(404).send("Email already exist!");
    res.send("Email clear");
}