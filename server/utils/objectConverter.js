const userResponse = (users) => {
  let userResult = [];
  users.forEach((user) => {
    userResult.push({
      id : user._id,
      name: user.name,
      userId: user.userId,
      email: user.email,
      userTypes: user.userTypes,
      userStatus: user.userStatus,
    });
  });
  return userResult;
};

module.exports = { userResponse };
