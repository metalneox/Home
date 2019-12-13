const express = require("express")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const validator = require("email-validator");

const router = express.Router()
const HMAC_JWT_SECRET = process.env.HMAC_JWT_SECRET;

function generateToken(userId){
    return jwt.sign({
        id:userId,

    },HMAC_JWT_SECRET,{
        expiresIn: "30 days"
    })  
}


router.post("/signup", async (req,res) =>{

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstname
    const lastName = req.body.lastname


    if(firstName == '' || firstName == undefined){
        return res.status(400).json({
            message:"Nome vuoto o non corretto"
        })
    }

    if(lastName == '' || lastName == undefined){
        return res.status(400).json({
            message:"Cognome vuoto o non corretto"
        })
    }

    if(!validator.validate(email)){
        return res.status(400).json({
            message:"Email non corretta"
        })
    }

    if(password == '' || password == undefined){
        return res.status(400).json({
            message:"Password vuoto o non corretto"
        })
    }


    const oldUser = await User.findOne({
        where:{
            email: email
        }
    })

    if(oldUser) return res.status(400).json({
        message: "User already exists"
    })

    const pwHash = await bcrypt.hash(
        password,
        10
    )

    const newUser = await User.create({
        email:email,
        password:pwHash,
        firstname:firstName,
        lastname:lastName
    })

    const jwt = generateToken(newUser.id)

    
    res.json({
        pwHash:pwHash,
        jwt:jwt
    })
})


router.post("/login",async (req,res) =>{
    const email = req.body.email
    const password = req.body.password

    const oldUser = await User.findOne({
        where:{
            email: email
        }
    })

    if(!oldUser){
        return res.status(403).json({
            message: "Utente non trovato"
        })
    }

    const match = await bcrypt.compare(password,oldUser.password)

    if(!match) return res.status(403).json({
        message: "Utente o password errata"
    })

    const jwt = generateToken(oldUser.id)

    res.json({
        user:oldUser,
        jwt:jwt
    })
})


module.exports = router