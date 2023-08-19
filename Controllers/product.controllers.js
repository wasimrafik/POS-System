import productModels from "../Models/product.models";

export const getAllProduct = async (req, res) => {
    try {

        const {que} = req.query;
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`, "i");
        const searchRgx = rgx(que)

        let queryFilter = {};
        if(que !== undefined){
            queryFilter = {
                $or:[
                    {productName:{$regex: searchRgx}},      // , $options: "i" I can use this as well 
                    {productDiscription:{$regex: searchRgx}},
                    {productBrand: {$regex: searchRgx }}
                ]
            }
        }
        


        const getAllProduct = await productModels.find(queryFilter);

        if(getAllProduct){
            return res.status(200).json({
                Data: getAllProduct,
                Message: "Product List Fetch Sucessfully"
            })
        }
    } catch (error) {
        return res.status(200).json({
            Message: error.Message
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const productID = req.params.productID;

        const findProduct = await productModels.findOne({_id: productID});

        if(findProduct){
            return res.status(200).json({
                Data: findProduct,
                Message: "Single Product Fetch Sucessfully"
            })
        }
    } catch (error) {
        return res.status(200).json({
            Message: error.Message
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        
        const {productName, productDiscription, productPrice, productQuantity,productBrand} = req.body;

        const findProduct = await productModels.findOne({$and:[{productName: productName},{productBrand: productBrand}]});

        if(findProduct){
            findProduct.productQuantity +=1;
            await findProduct.save();
            return res.status(200).json({Message: "We have Added 1 Quantity As Product is Already Exists Please update the product if you want to add more"})
        }

        const addProduct = new productModels({
            productName,
            productDiscription,
            productPrice,
            productQuantity,
            productBrand,
        })

        await addProduct.save();

        if(addProduct){
            return res.status(201).json({
                Data: addProduct,
                Message: "Product Added Sucessfully"
            })
        }

    } catch (error) {
        return res.status(200).json({
            Message: error.Message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productID = req.params.productID;

        const {productName, productDiscription, productPrice, productQuantity,productBrand} = req.body;

        const findProduct = await productModels.findOne({_id: productID});

        const updateProduct = await productModels.updateOne({
            $set:{
                productName, 
                productDiscription, 
                productPrice, 
                productQuantity,
                productBrand
            }
        });

        if(updateProduct.acknowledged){
            return res.status(200).json({
                Data: updateProduct,
                Message: "Product Updated Sucessfully"
            })
        }
        
    } catch (error) {
        return res.status(200).json({
            Message: error.Message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        
        const productID = req.params.productID;

        const deleteProduct = await productModels.deleteOne({_id: productID});

        if(deleteProduct.acknowledged){
            return res.status(200).json({
                Data: deleteProduct,
                Message: "Product Deleted"
            })
        }
    } catch (error) {
        return res.status(200).json({
            Message: error.Message
        })
    }
}