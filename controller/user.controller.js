const userModel = require("../models/user");
const { User } = userModel;
const bcrypt = require("bcrypt");

async function registerUser(body) {
  try {
    let user = await User.findOne({ email: body.email });

    if (user)
      return {
        errorMessage: "User already exists",
      };

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hashSync(body.password, salt);
    user = new User({
      name: body.name,
      email: body.email,
      password: password,
    });

    const result = await user.save();
    const token = user.generateAuthToken();
    return { result, token };
  } catch (ex) {
    return {
      errorMessage: ex.message,
    };
  }
}

async function loginUser(body) {
  let user = await User.findOne({ email: body.email });
  if (!user)
    return {
      errorMessage: "Invalid Email or password",
    };
console.log(user);

  const validpassword = await bcrypt.compare(body.password, user.password);
  if (!validpassword)
    return {
      errorMessage: "Invalid Email or password",
    };

  return user.generateAuthToken();
}
module.exports = {
  registerUser,
  loginUser,
};
