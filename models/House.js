const mongoose = require('mongoose') // Importando la libreria
const fetch = require('node-fetch'); // Importando fetch si estás en un entorno de Node.js

// Creando el modelo de house
const HouseSchema = new mongoose.Schema({
    address: {
        type: String, 
        required: true,
    },
    state: {
        required: true,
        type: String,
        validate:{
            validator: async function(state) {
              // validacion del departamento             
                const response = await fetch('https://api-colombia.com/api/v1/Department');
                const departments = await response.json();
                return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
            },
            message: props => `${props.value} no es un Departamento de Colombia!`
        }
    },
    city: {
        required: true,
        type: String,
        validate: {
            validator: async function(city) {
              // Validacion del departamento
                var response = await fetch('https://api-colombia.com/api/v1/City');
                var cities = await response.json()
                return cities.some(object => object.name.toUpperCase().includes(city.toUpperCase()));
            },
            message: props => `${props.value} no es una Ciudad de Colombia!`
        }
    },
    size: {
        type: Number, 
        required: true,
    },
    type: {
        type: String, 
        required: true,
    },
    zip_code: {
        type: Number, 
        required: true,
    },
    rooms: {
        type: Number, 
        required: true,
    },
    bathrooms: {
        type: Number, 
        required: true,
    },
    parking: {
        type: Boolean, 
        default: false,
    },
    price: {
        type: Number, 
        required: true,
    },
    code: {
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(code) {
              // Expresión regular para validar el formato del codigo              
                return /^[a-zA-Z]{4}\d{4}$/.test(code);
            },
            message: props => `${props.value} no es un código válido! El formato debe ser cuatro letras seguidas por cuatro números.`
        }
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('house', HouseSchema)