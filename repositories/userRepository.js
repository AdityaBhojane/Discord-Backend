import User from "../model/userSchema.js";
import crudRepository from "./CrudRepo.js";

const userRepository = {
    ...crudRepository(User),
    getByEmail:async (email)=> await User.findOne({email}),
    getByUsername: async (username)=> await User.find({username})
};

export default userRepository;

