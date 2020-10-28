const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')
//import picture array from index.js
// const data = require('../index.js')
// const pics = data.picArray


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemon=>{
    res.render('pokemon/index', {pokemon: pokemon});
  })  
});

router.get('/:id', function(req, res) {
  //call pokemon api to get information on pokemon with this id
  const pokemonURL = `http://pokeapi.co/api/v2/pokemon/${req.params.id}`
  axios.get(pokemonURL).then(function(apiResponse){
    const apiResults = apiResponse.data
    res.render('pokemon/show', {info: apiResults})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([pokemon, created])=>{
    res.redirect('/pokemon')
  })
});

module.exports = router;
