import { validateRegister } from "../validators/types.js";
import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt';
const registerUser = async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.issues[0].message);

    //check if user alerady exist 
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registred');

    //create user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();

    //Return Token with user information
    const { _id, name, email } = user;
    res.json({
        status: 'success',
        message: 'User registered successfully',
        access_token: token,
        token_type: 'Bearer',
        data: { _id, name, email }
    });
};

export { registerUser };