async function crudRepository(model) {
    return {
        create: async(data)=> await model.create(data),
        getAll: async()=> await model.find(),
        Update: async(id,data)=> await model.findByIdAndUpdate(id,data),
        Delete: async()=> await model.findByIdAndDelete(id),
        getById: async(id)=> await model.findById(id),
        DeleteMany: async(modelIds)=> await model.deleteMany({_id:{ $in:modelIds}}),
    }
};

export default crudRepository;