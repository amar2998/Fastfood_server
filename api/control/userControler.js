const user=require('../model/users');


//get all users
const getAllUser=async(req,res)=>{
    try {
        const users=await user.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const createUsers=async(req,res)=>{
    const people=req.body;
    const query={email:people.email}

    try {
        const findquery=await user.findOne(query);
        if(findquery){
            return res.status(301).json("user already exist");

        }
        else{
            const result=await user.create(people);
            res.status(200).json(result);

        }

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteUsers=async(req,res)=>{
    const userId=req.params.id;
    try{
        const result=await user.findByIdAndDelete(userId);
        if(result){
            res.status(200).json("user deleted successfully");
        }
        else{
           res.status(404).json("user not found"); 
        }
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
}

//getAdmin
const getAdmin = async (req, res) => {
    const email = req.params.email;
    const query = { email: email };

    try {
        // Find the user by email
        const userfind = await user.findOne(query);
        console.log(userfind);

        // Check if the email in the token matches the requested email
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: "forbidden access" });
        }

        // If the user is not found, handle the error
        if (!userfind) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the user has an admin role
        const admin = userfind.role === "admin";

        // Send the response with an object containing the admin status
        res.status(200).json({ admin });
        
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ message: error.message });
    }
};

//make admin of a user
const makeAdmin=async(req,res)=>{
    const userId=req.params.id;
    const {name,email,photoURL,role}=req.body;
    try {
        const updatedUser=await user.findByIdAndUpdate(userId,{role:"admin"},
            {new:true,runValidators:true}
        );
        if(!updatedUser){
            return res.status(404).json({message:"user nt found"});

        }
        else{
            return res.status(200).json(updatedUser);

        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }


}

module.exports={
    getAllUser,
    createUsers,
    deleteUsers,
    getAdmin,
    makeAdmin
}