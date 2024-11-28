function crudRepository(model) {
  return {
    // data wrapping coz mongoose internally optimizes batches when we use transactions
    create: async (data, options = {}) => await model.create([data], options),
    getAll: async (options = {}) => await model.find({}, options),
    // new:true return a newly created object as a response
    update: async (id, data, options = {}) => await model.findByIdAndUpdate(id, data, { new: true, ...options }),
    delete: async (id, options = {}) => await model.findByIdAndDelete(id, options),
    getById: async (id, options = {}) => await model.findById(id, options),
    deleteMany: async (modelIds, options = {}) => await model.deleteMany({ _id: { $in: modelIds } }, options),
  };
}

export default crudRepository;


/***
 
function crudRepository(model) {
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
*/