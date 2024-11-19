import { signInService, signUpService } from "../services/userService"



export const signUp = async (req,res)=>{
    try {
        const user = await signUpService(req.body);
        return res.status(200).json({
            success:true,
            message:"user create successfully",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
};
export const signIn = async (req,res)=>{
    try {
        const user = await signInService(req.body);
        return res.status(200).json({
            success:true,
            message:"user sign in successfully",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
};

