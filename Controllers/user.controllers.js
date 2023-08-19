import userModels from '../Models/user.models';
import  bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';

export const getUser = async (req, res) =>{
    try {
        const getUser = await userModels.find();

        if(getUser){
            return res.status(200).json({
                Data: getUser,
                Message: "User Info Fetch Sucessfully"
            })
        }

    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const createUser = async (req, res) =>{
    try{

        const {userName, password,number, role} = req.body;

        console.log(req.body)
        const findUser = await userModels.findOne({userName: userName});

        if(findUser){
            return res.status(200).json({Message: "User Already Exist"})
        }

        const passToString = password.toString();

        const passwordEncrypted = bcrypt.hashSync(passToString,10)

        const addUser = new userModels({
            userName,
            number,
            password: passwordEncrypted,
            role
        });

        addUser.save();

        if(addUser){
            return res.status(201).json({
                Data:addUser,
                Message: "User Created Sucessfully"
            })
        }
    }catch(error){
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const updateUser = async (req, res) =>{
    try {
        
        const userID = req.params.userID;

        const {userName,password,number,role} = req.body;

        const findUserByName = await userModels.findOne({userName: userName})
        if(findUserByName){
            return res.status(201).json({
                Messaeg: "User already Exists"
            })
        }

        const passToString = password.toString();

        const passwordEncrypted = bcrypt.hashSync(passToString,10);

        const findUser = await userModels.findOne({_id: userID})
        // console.log(findUser.userName);
       

        const updateUser = await userModels.updateOne({_id: userID},
            {
                $set:{
                    userName,
                    password: passwordEncrypted,
                    number,
                    role
                }
            });

            if(updateUser.acknowledged){
                return res.status(200).json({
                    Data:updateUser,
                    Message: "User Updated Sucessfully"
                })
            }
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const deleteUser = async (req, res) =>{
    try{

        const userID = req.params.userID;

        const findUser = await userModels.findOne({_id: userID})

        const deleteUser = await userModels.deleteOne({_id: userID});

        if(deleteUser.acknowledged){
            return  res.status(200).json({
                Data: deleteUser,
                Message: "User Deleted Sucessfully",
            })
        }


    }catch(error){
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const {userName,password,role} = req.body;

        const findUser = await userModels.findOne({userName: userName})

        // console.log(findUser.name);
        if(!findUser){
            return res.status(200).json({Message:"Please Enter a Valid Creditials "})
        }

        const passwordCompare = await bcrypt.compare(password, findUser.password);

        if(!passwordCompare){
            return res.status(200).json({Message: "Please Enter A Valid Password "})
        }

        if(findUser){
            return res.status(200).json({Data:findUser,
            Message: "Login Sucessfully"})
        }
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}