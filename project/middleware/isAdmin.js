exports.isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Admin not found" });
    }
    next();
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(501).json({ message: "Error whille finding admin" });
  }
};
