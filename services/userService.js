import userRepository from "../repositories/userRepository"



export const signUpService = async (data) =>{
    try {
        const response = await userRepository.create(data);
        if(!response){
            console.log("sign up service error");
        }
    } catch (error) {
        console.log(error);
    }
};

export const signInService = async (data) => {
    try {
        const user = await userRepository.getByEmail(data.email);
        if(!user){
            console.log('sign in service error');
        }
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch){
            console.log('signUp password not matched')
        }

        return {
            username:user.username,
            email:user.email,
            avatar:user.avatar,
            token: createJWT({id:user._id, email:user.email})
        }
    } catch (error) {
        console.log(error);
    }
}