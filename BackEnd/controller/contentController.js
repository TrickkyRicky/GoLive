//  return stream keys of live users
exports.getStreams = async (req, res, next) => {
  try {
    res.status(200).json({});
  } catch (err) {
    console.log(err);
  }
};
