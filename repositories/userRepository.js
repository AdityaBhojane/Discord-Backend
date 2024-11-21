import UserSchema from "../model/userSchema.js";
import crudRepository from "./CrudRepo.js";



const userRepository = {
    ...crudRepository(UserSchema),
    getByEmail:async (email)=> await UserSchema.findOne({email}),
    getByUsername: async (username)=> await UserSchema.find({username})
};

export default userRepository;

