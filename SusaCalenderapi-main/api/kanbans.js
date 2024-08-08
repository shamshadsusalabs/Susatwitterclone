const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const KanbanSchemas = require('../schema/Kanbans');
const Str = require('@supercharge/strings')

router.get('/getall',async (req,res) => {
    try{
        let policies = await KanbanSchemas.find();
        res.json(policies);
    }
    catch(err){
        res.json({msg:err.message});
    }
});

router.post(
    '/add',
    async (req,res) => {
        try{

            let policies = await KanbanSchemas.find();
            console.log(policies.length);


            const referc = policies.length+1;

            holiday = new KanbanSchemas(
                {
                    "ticketId" : referc,
                    "name" : req.body.name, 
                    "statusId" : req.body.statusId, 
                    "index" : req.body.index, 
                    "title" : req.body.title, 
                    "description" : req.body.description, 
                    "imageURL" : req.body.imageURL, 
                    "priority" : req.body.priority, 
                    "modifiedDate" : req.body.modifiedDate, 
                    "creationDate" : req.body.creationDate, 
                    "closingDate" : req.body.closingDate, 
                    "progressDate" : req.body.progressDate


                }
                );
            await holiday.save();
            res.json(holiday);  
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : "Server Error....."});
        }
    }
);

router.post(
    '/remove',
    async (req,res) => {
        try{
            let employer = await KanbanSchemas.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Schedule not found");
            }
            await KanbanSchemas.deleteOne({"_id"  : req.body.id});
            return res.status(200).json("Schedule Deleted");
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);

router.post('/update',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await KanbanSchemas.findById(id);
        if (!employer) {
            return res.status(401).json("Employer not found");
        }
        let obj = {
            status : req.body.status
        }
        Object.assign(employer, req.body);
        await employer.save();
        res.json(employer);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.get('/details',(req,res,next)=>{
    let {id}=req.query;
    KanbanSchemas.findById(id).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });

module.exports = router;