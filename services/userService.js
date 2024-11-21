import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcryptjs'
import CustomError from "../utils/CustomError.js";
import { StatusCodes } from "http-status-codes";
import createJwtToken from "../utils/auth/authUtilJWT.js";

export const signUpService = async (data) =>{
    try {
        return await userRepository.create(data);
    } catch (error) {
        throw error
    }
};

export const signInService = async (data) => {
    try {
        const user = await userRepository.getByEmail(data.email);
        if(!user){
            throw new CustomError("username and password is required", StatusCodes.BAD_REQUEST)
        }
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch){
            throw new CustomError("password or email is wrong", StatusCodes.BAD_REQUEST)
        }
        return {
            username:user.username,
            email:user.email,
            avatar:user.avatar,
            token: createJwtToken({id:user._id, email:user.email})
        }
    } catch (error) {
       console.log('sign in =',error);
       if(error instanceof CustomError) throw error;
       throw new CustomError("Unexpected error in sign-in process", StatusCodes.BAD_REQUEST);
    }
}