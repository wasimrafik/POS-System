import salesModels from "../Models/sales.models";
import customerModels from "../Models/customer.models";
import userModels from "../Models/user.models";
import productModels from "../Models/product.models";

export const getAllSales = async (req, res) => {
    try {
        const getAllSales = await salesModels.aggregate([
            {
                $lookup: {
                    from: "customers", 
                    localField: "custID",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            { $unwind: "$customer" },

            {
                $lookup: {
                    from: "users", 
                    localField: "userID",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },

            {
                $lookup: {
                    from: "products", // Correct collection name "products"
                    localField: "productID",
                    foreignField: "_id",
                    as: "products",
                },
            },
            { $unwind: "$products" }
        ]);

        if (getAllSales.length > 0) {
            return res.status(200).json({ Data: getAllSales, Message: "Sales Fetched Successfully" });
        } else {
            return res.status(404).json({ Message: "No sales data found" });
        }
    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
};

export const getSingleSales = async (req, res) => {
    try {
        
        const salesID = req.params.salesID;

        const getSingleSales = await salesModels.findOne({_id:salesID});
        if(getSingleSales){
            return res.status(200).json({Data: getSingleSales, Message: "Single Sales Fetched"})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const addSales = async (req, res) => {
    try {

        const { custID, userID, productID, totalAmount, paymentMethod, paymentStatus, orderStatus, discount } = req.body;
        console.log("Request Body:", req.body);

        // const findSalesCust = await customerModels.findOne({ _id: custID });
        // const findProductID = await productModels.findOne({_id: productID});
        // const findUserID = await userModels.findOne({_id: userID});  

        // // console.log(findSalesCust,findProductID,findUserID);

        // if (findSalesCust == "") {
        //     const { customerName, mobile } = req.body;

        //     const addCustomer = new customerModels({
        //         customerName,
        //         mobile,
        //     });
        //     console.log("findSalesCust:", findSalesCust);
        //     console.log("New Customer ID:", newCustID);
        //     console.log("New Sales Entry:", newSales);
        //     const addCustID = await addCustomer.save();
        //     const newCustID = addCustID._id;
        //     console.log("findSalesCust:", findSalesCust);

        //     const newSales = new salesModels({
        //         custID: newCustID,
        //         userID,
        //         totalAmount,
        //         paymentMethod,
        //         paymentStatus,
        //         orderStatus,
        //         discount,
        //     });

        //     await newSales.save();
        //     console.log("New Sales Entry:", newSales);

        //     return res.status(201).json({ Data: newSales, Message: "New Sales and New User Created Successfully" });
        // } else{

        //     const addSale = new salesModels({
        //         custID,
        //         userID,
        //         productID,
        //         totalAmount,
        //         paymentMethod,
        //         paymentStatus,
        //         orderStatus,
        //         discount,
        //     });

        //      addSale.save();

        //     if (addSale) {
        //         return res.status(201).json({ Data: addSale, Message: "New Sales Created" });
        //     }
        // }

        const addSale = new salesModels({
            custID,
            userID,
            productID,
            totalAmount,
            paymentMethod,
            paymentStatus,
            orderStatus,
            discount,
        });

         addSale.save();

        if (addSale) {
            return res.status(201).json({ Data: addSale, Message: "New Sales Created" });
        }
        
    } catch (error) {
        return res.status(500).json({ Message: error.Message });
    }
};



export const updateSales = async (req, res) => {
    try {
        
        const salesID = req.params.salesID;

        const {custID, userID, productID, totalAmount, paymentMethod, paymentStatus, orderStatus, discount} = req.body;

        const updateSales = await salesModels.updateOne({_id: salesID},
            {
                $set:{
                    custID, 
                    userID, 
                    productID, 
                    totalAmount, 
                    paymentMethod, 
                    paymentStatus, 
                    orderStatus, 
                    discount,
                }
            }
            )
            
            if( updateSales.acknowledged){
                return res.status(200).json({
                    Data: updateSales,
                    Message: "Sales Trans updated Sucessfully"
                })
            }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const deleteSales = async (req, res) => {
    
    try {

        const salesID = req.params.salesID;

        const deleteSales = await salesModels.deleteOne({_id: salesID});

        if(deleteSales.acknowledged){
            return res.status(200).json({Message: "Sales Deleted Sucessfully"})
        }
        
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}