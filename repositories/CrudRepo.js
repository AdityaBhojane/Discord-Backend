function crudRepository(model) {
    return {
        create: async(data)=> await model.create(data),
        getAll: async()=> await model.find(),
        update: async(id,data)=> await model.findByIdAndUpdate(id,data),
        delete: async(id)=> await model.findByIdAndDelete(id),
        getById: async(id)=> await model.findById(id),
        deleteMany: async(modelIds)=> await model.deleteMany({_id:{ $in:modelIds}}),
    }
};

export default crudRepository;