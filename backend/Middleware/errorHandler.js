export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500; // Default to 500 if undefined
  const message = error.message || "Internal Server Error"; // Default message

  console.log("From Error Handler:", statusCode, message);

  res.status(statusCode).json({ message });
};
