import customerModels from "../Models/customer.models";

export const getAllCustomer = async (req, res) => {
    try {
        
        const {que} = req.query;

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
        const searchRgx = rgx(que);

        let searchFilter = {};
        if(que !== undefined){
            searchFilter = {
                $or:[
                    {customerName:{$regex: searchRgx}},
                    {mobile:{$regex: searchRgx}}
                ]
            }
        }

        const getAllCustomer = await customerModels.find(searchFilter);

        if(getAllCustomer){
            return res.status(200).json({Data: getAllCustomer, Message: "All Customer Data Fetch"})
        }

    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const getSingleCustomer = async (req, res) => {
    try {
        const custID = req.params.custID;

        const findCustomer = await customerModels.findOne({_id: custID});

        if(findCustomer){
            return res.status(200).json({Data: findCustomer, Message: "Single Customer Data Fetch"})
        }
        
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const addCustomer = async (req, res) => {
    try {

    const {customerName,mobile} = req.body;

    const findCustomer = await customerModels.findOne({$and:[{customerName: customerName,mobile: mobile}]});
    if(findCustomer){
        return res.status(200).json({Message: "Customer Already Exisits "})
    }

    const addCustomer = new customerModels({
        customerName,
        mobile,
    })
    await addCustomer.save();

    if(addCustomer){
        return res.status(201).json({Data: addCustomer, Message: "Customer Added Sucessfully"})
    }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const custID = req.params.custID;

        const {customerName,mobile} = req.body;

        const findCustomer = await customerModels.findOne({_id: custID});

        const updateCustomer = await customerModels.updateOne({_id: custID},
            {
                $set:{
                    customerName,
                    mobile,
                }
            }
            );

            if(updateCustomer.acknowledged){
                return res.status(200).json({Data: updateCustomer, Message: "Customer Updated Sucessfully"})
            }

    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const custID = req.params.custID;

        const deleteCustomer = await customerModels.deleteOne({_id: custID});

        if(deleteCustomer.acknowledged){
            return res.status(200).json({Data: deleteCustomer, Message: " Customer Deleted Sucessfully"})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}