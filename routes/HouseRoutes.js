const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const HouseSchema = require('../models/House'); //Importando el controllador
const multer = require('multer');// creando una instancia de ese controlador

router.get('/house', async (req, res) => {
    //Traer todos las casas
    let houses = await HouseSchema.find(); 
    res.json(houses)
})

router.get('/house/:id', async (req, res) => {
    //Traer un usuario especifico pasando el codigo
    var id = req.params.id
    let house = await HouseSchema.findById(id); 
    res.json(house)
})

router.post('/house', async (req, res) => {
    let house = HouseSchema({
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code
    })

    house.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        if(err.id == 11000){
            res.send({"status" : "error", "message" :"La dirección ya fue registrada"})      
        }else{
            res.send({"status" : "error", "message" :err.message})      
        }
    })
})

router.patch('/house/:id', (req, res) => {
    //Actualizar un usuario
    // Cuando viene por la url del servicio web params
    var id = req.params.id
    
    // Cuando viene por el body se usa body
    var updateHouse = {
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        price: req.body.price,
        code: req.body.code
    }

    HouseSchema.findByIdAndUpdate(id, updateHouse, {new: true}).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error)
        res.send("Error actualizando el registro")
    })
})

router.delete('/house/:id', (req, res) => {
    
    var id = req.params.id

    //Puedo establecer cualquier parametro para eliminar
    HouseSchema.deleteOne({_id: id}).then(() => {
        res.json({"status": "success", "message": "House deleted successfully"})
    }).catch((error) => {
        console.log(error)
        res.json({"status": "failed", "message": "Error deleting house"})
    })
});

//Configuracion de la libreria multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){        
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {    
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('El archivo no es una imagen'))
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter})

// Servicio web para el almacenamiento de archivos
router.post('/upload/:id/house', upload.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send({ 'status': 'error', 'message': 'No se proporciono ningun archivo'})
    }

    var id = req.params.id

    var updateHouse = {
        avatar: req.file.path
    }

    console.log(id)

    HouseSchema.findByIdAndUpdate(id, updateHouse, {new: true}).then((result) => {
        res.send({"status": "success", "message": "Archivo subido correctamente"})
    }).catch((error) => {
        console.log(error)
        res.send({"status": "success", "message" : "Error actualizando el registro"})
    })

})

module.exports = router