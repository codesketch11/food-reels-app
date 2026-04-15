const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const { v4: uuid } = require('uuid')

async function createFood(req, res){

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res){

    const foodItems = await foodModel.find({})
    const enrichedItems = await Promise.all(
        foodItems.map(async (item) => ({
            ...item.toObject(),
        }))
    )

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems: enrichedItems
    })

}

async function getPartnerFoods(req, res){
    if (!req.foodPartner) {
        return res.status(401).json({
            message: "Food partner authentication required"
        })
    }

    const foodItems = await foodModel.find({ foodPartner: req.foodPartner._id })

    res.status(200).json({
        message: "Partner food items fetched successfully",
        foodItems
    })

}

async function getSavedFoods(req, res) {
    const user = req.user
    if (!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }

    const savedItems = await saveModel.find({ user: user._id }).populate({
        path: 'food',
        populate: { path: 'foodPartner', model: 'foodPartner' }
    })

    const savedFoods = savedItems
        .filter((saved) => saved.food)
        .map((saved) => ({
            id: saved.food._id,
            title: saved.food.name,
            description: saved.food.description || "Delicious food from a partner.",
            videoSrc: saved.food.video,
            partnerId: saved.food.foodPartner?._id || null,
            likeCount: saved.food.likeCount || 0,
        }))

    res.status(200).json({
        message: "Saved foods fetched successfully",
        savedFoods
    })
}

async function likeFood(req, res){
    const { foodId } = req.body;
    const user = req.user 

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {likeCount: -1}
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {likeCount: 1}
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res){

    const { foodId } = req.body
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })


    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

module.exports = { createFood, getFoodItems, getPartnerFoods, getSavedFoods, likeFood, saveFood }