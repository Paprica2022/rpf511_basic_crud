import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

const isHeroku = process.env.NODE_ENV === "production";

export const postJoin = async (req, res) => {
    console.log(req.body);
    const {name, username,email,password,passwordCheck,location} = req.body;
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let errorExists = 0;
    //const exists = await User.exists({$or: [{username},{email}]} );
    if(await User.exists({username})){
        usernameError= "this username is already taken ";
        errorExists = 1;
    }
    if(await User.exists({email})){
        emailError= "this email is already taken ";
        errorExists = 1;
    }
    if(password !== passwordCheck){
        passwordError = "password does not match ";
        errorExists = 1;
    }
    if(errorExists){
        return res.status(400).send({ messageUser : usernameError, messageEmail : emailError, messagePassword : passwordError});
    }
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.status(200).send({ message: "SUCCESS_JOIN" });
    }catch(error){
        return res.status(500).render({message: error});
    }
    
};


export const postLogin = async(req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if (!user){
        return res.status(400).send({message:"An account with this username doesn't exists."});
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).send({message:"Wrong PassWord."});
    }
    var token = jwt.sign({id : user.id}, process.env.TOKEN_SECRET, {
        expiresIn: 86400
    });

    return res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        location: user.location,
        accessToken: token
    });
};

export const postEdit = async(req, res) => {
    //let errorMessages = { usernameError :"" ,emailError :"" ,passwordError :""};
    let usernameError ="";
    let emailError ="";
    let passwordError ="";
    let errorExists = 0;

    console.log(req.body);

    const {
        body:{ id,username,email,name,location,password },
        file,
    } = req;

    const currentUser =  await User.findById(_id);
    const ok = await bcrypt.compare(password, currentUser.password);
    if(!ok){
        passwordError = "Wrong PassWord";
        errorExists = 1;
    }
    if ((currentUser.email !== email) && (await User.exists({ email }))) {
        emailError = "this email is already taken";
        errorExists = 1;
    }
    if ((currentUser.username !== username) && (await User.exists({ username }))) {
        usernameError = "this username is already taken";
        errorExists = 1;
    }
    if(errorExists){
        return res.status(400).send({ messageUser : usernameError, messageEmail : emailError, messagePassword : passwordError});
    }

    const updatedUser = await User.findByIdAndUpdate( id, {
        avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
        name,
        email,
        username,
        location
    }, 
    //without this option, user.findByIdAndUpdate will return old object
    {new: true}
    );

    return res.status(200).send({
        id: id,
        username: username,
        email: email,
        name: name,
        location: location
    });
};