const express = require("express")

const User = require("../models/User")
const House = require("../models/House")

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const authMiddleware = require("./authMiddleware");

const router = express.Router()

router.use(authMiddleware);
                            //req e res glob
router.get("/house",async (req,res) =>{
    console.log("Bug")
})

/*
CREATE TABLE `houses` (
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `maxPlaces` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `fk_users` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `deletedAt` datetime DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/


router.post("/add", async (req,res) =>{

    const name = req.body.name
    const maxPlaces = req.body.maxPlaces
    const address = req.body.address
    const description = req.body.description

    const newHouse = await House.create({
        name:name,
        maxPlaces:maxPlaces,
        address:address,
        description:description,
        fk_users:req.user.id
    })

    res.json({
        messaggio:"House inserita con successo"
    })

})

router.get("/houses", async (req,res) =>{

    const houses = await House.findAll({
        where: {
            fk_users: req.user.id
        }
    });

    return res.json(houses);
  
})


router.put('/houses/:housesId', async (req,res) => {

    const oldHouse = await House.findOne({
      where: {
        id: req.params.housesId
      }
    })

    console.log("---")
    console.log(oldHouse)
    console.log("---")

    let newHouse
    if (oldHouse) {
      //Aggiornamento
      newHouse = await oldHouse.update({
          ...req.body
      })
    } 

    res.json({
        messaggio:"House Modificato"
    })
})


router.delete('/houses/:housesId', async (req, res) => {
    const houseDelete = await House.findOne({
      where: {
        id: req.params.housesId
      }
    })
  
    if (houseDelete) await houseDelete.destroy()
  
    res.json({
        messaggio:"House Cancellata"
    })
})



module.exports = router