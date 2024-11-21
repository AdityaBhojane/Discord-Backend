import { StatusCodes } from "http-status-codes";
import { signInService, signUpService } from "../services/userService.js"
import CustomErrorResponse from "../utils/common/errorResponse.js";
import e from "express";



export const signUp = async (req,res)=>{
    try {
        const user = await signUpService(req.body);
        return res.json({
            success:true,
            message:"user create successfully",
            data:user
        })
    } catch (error) {
        console.log("sign up =",error)
        res.status(StatusCodes.BAD_REQUEST).json(CustomErrorResponse(error))
    }
};
export const signIn = async (req,res)=>{
    try {
        const user = await signInService(req.body);
        if(!user){
            throw new Error("something is wrong -", user)
        }
        return res.status(200).json({
            success:true,
            message:"user sign in successfully",
            data:user
        })
    } catch (error) {
        console.log('sign in =',error)
        res.status(StatusCodes.BAD_REQUEST).json(CustomErrorResponse(error))
    }
};

