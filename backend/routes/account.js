const express=require('express');
const authMiddleware=require('../middeware')
const {Account}=require("../db");
const { default: mongoose } = require('mongoose');

const router=express.Router();


router.get("/balance", authMiddleware, async (req, res)=>{
      const account=await Account.findOne({
            userId:req.userId
      })

      res.json({
           balance: account.balance
      })
})

router.post("/transfer", authMiddleware, async (req, res)=>{
       const session=await mongoose.startSession()
       mongoose.startTransaction()
       const {ammount, to}=req.body;
       const account=await Account.findOne({userId: req.userId}).session(session);
       if(!account || account.balance<ammount){
            await session.abortTransaction();
            return res.status(400).json({
                  msg: "invalid account"
            })
       }

       await Account.updateOne({
            userId: req.userId
       },
       {
            $inc: {
              Balance: -ammount
            }
       }
       ).session(session)

       await Account.updateOne({
            userId: to
       },
       {
            $inc: {
                  Balance: ammount
            }
       }
       ).session(session)

       await session.commitTransaction();

       res.json({
            msg: "Tarnsfer succesfully"
       });

});


module.exports=router

// 13 remain