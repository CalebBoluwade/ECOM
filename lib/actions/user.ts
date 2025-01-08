"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import User from "../db/models/User";


export const CreateUser = cache(async () => {
    dbConnector();

    const newUser = new User();

    const user = (await newUser.save()).toJSON();

    return {
        name: user.name
    };
})