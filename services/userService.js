import userRepository from "../repositories/userRepository.js"

export const signUpService = async (data) =>{
    try {
        return await userRepository.create(data);
    } catch (error) {
         throw {error:error}
    }
};

export const signInService = async (data) => {
    try {
        const user = await userRepository.getByEmail(data.email);
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch){
            throw new Error("Password invalid")
        }
        return {
            username:user.username,
            email:user.email,
            avatar:user.avatar,
            token: createJWT({id:user._id, email:user.email})
        }
    } catch (error) {
       return error;
    }
}