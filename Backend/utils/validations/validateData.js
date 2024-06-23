
exports.validateData = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errors = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      
      return res.status(401).json({
        success:false,
        message:'Validation Error',
        error:errors
      })
    }
  };
};