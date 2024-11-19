import UserSchema from "../model/userSchema";
import crudRepository from "./CrudRepo";



const userRepository = {
    ...crudRepository(),
    getByEmail:async (email)=> await UserSchema.find({email}),
    getByUsername: async (username)=> await UserSchema.find({username})
};

export default userRepository;