require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models')

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// -- GET OFFICIAL ARTWORK URLs AND POKEMON ID
// const picArray = []
// exports.picArray = picArray
// const pics = async () => {
//   // loop through by id?
//   for (let i = 1; i < 152; i++){
//       // wait for axios get request to complete
//       await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//       .then(apiResponse => {
//         const info = {
//           id: apiResponse.data.id,
//           picURL: apiResponse.data.sprites.other['official-artwork'].front_default
//         }
//         picArray.push(info)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//       // push url into array
//       //remember to access by subtracting 1 from pokemon id on favorites page
//   }
//   console.log(picArray)
// }

// pics()

// GET / - main index of site
app.get('/', function(req, res) {
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    const pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
