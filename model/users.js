const User = require('./schemas/user');

const findById = async id => {
  return await User.findOne({ _id: id });
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const getUserByVerifyToken = async token => {
  return await User.findOne({ verifyToken: token });
};

const findByToken = async token => {
  return await User.findOne({ token });
};

const create = async options => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateUserSubscription = async subscription => {
  await User.updateOne({ subscription: String(subscription) });

  return String(subscription);
};

/* Local (Not to delete!!!)
const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};
*/

// /* Cloud
const updateAvatar = async (id, avatar, userIdImg = null) => {
  return await User.updateOne({ _id: id }, { avatar, userIdImg });
};
// */

const updateVerifyToken = async (id, verify, token) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken: token });
};

module.exports = {
  findById,
  findByEmail,
  getUserByVerifyToken,
  findByToken,
  create,
  updateToken,
  updateUserSubscription,
  updateAvatar,
  updateVerifyToken,
};
