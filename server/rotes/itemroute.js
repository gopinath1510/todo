const router=require("express").Router()
const { findByIdAndUpdate } = require("../models/item");
const todoitem=require('../models/item')

router.post('/items',async (req,res)=>{
  try{
    const newitem=new todoitem({
        item:req.body.item,
        createdAt:req.body.createdAt
    })
    const saveItem=await newitem.save();
    res.status(200).json(saveItem)
  }catch(err){
    res.json(err)
  }
})
router.get('/items',async (req,res)=>{
    try{
      const newitem=await todoitem.find({});
      res.status(200).json(newitem)
      
    }catch(err){
      res.json(err)
    }
  })
  router.put('/items/:id',async (req,res)=>{
      try{
        const newitem=await todoitem.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json("itemupdated")
        
      }catch(err){
        res.json(err)
      }
    })
  router.delete('/items/:id',async (req,res)=>{
      try{
        const newitem=await todoitem.findByIdAndDelete(req.params.id,{$set:req.body});
        res.status(200).json("itemdeletd")
        
      }catch(err){
        res.json(err)
      }
    })
  

module.exports =router;
