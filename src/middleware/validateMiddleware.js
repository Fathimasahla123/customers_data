const validateMiddleware = (req, res, next) => {
  const { name, email, location } = req.body;

  if (!name || !email || !location) {
    return res
      .status(400)
      .json({ message: "Name, email, and location are required" });
  }

  next();
};

module.exports = {
  validateMiddleware,
};
