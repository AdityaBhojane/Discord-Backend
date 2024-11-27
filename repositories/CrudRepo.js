function crudRepository(model) {
  return {
    // data wrapping for transactions coz mongoose internally optimizes batches when we use transactions
    create: async (data, options = {}) => await model.create([data], options), 
    getAll: async (options = {}) => await model.find({}, null, options),
    update: async (id, data, options = {}) =>
      await model.findByIdAndUpdate(id, data, { new: true, ...options }),
    delete: async (id, options = {}) =>
      await model.findByIdAndDelete(id, options),
    getById: async (id, options = {}) =>
      await model.findById(id, null, options),
    deleteMany: async (modelIds, options = {}) =>
      await model.deleteMany({ _id: { $in: modelIds } }, options),
  };
}

export default crudRepository;
