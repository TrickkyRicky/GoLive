//  return stream keys of live users
exports.getStreams = async (req, res, next) => {
  try {
    res.status(200).json({
      data: "Hi",
    });
  } catch (err) {
    console.log(err);
  }
};
