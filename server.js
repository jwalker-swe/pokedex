// Require express
const express = require('express');
const app = express();
const PORT = 8000;
let id;

const js = '/src/features/';

app.set("view engin", "ejs");
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(__dirname + '/index.html');
})

app.get('/src/css/index.css', (request, response) => {
    response.set('Content-type', 'text/css');
    response.sendFile(__dirname + '/src/css/index.css');
})

app.get('/src/assets/imgs/logos/pokedex-header-logo-001.png', (request, response) => {
    response.set('Content-type', 'image/png');
    response.sendFile(__dirname + '/src/assets/imgs/logos/pokedex-header-logo-001.png');
})

app.get('/src/features/generate-page-numbers/generate-page-numbers.js', (request, response) => {
    response.set('Content-type', 'text/javascript');
    response.sendFile(__dirname + '/src/features/generate-page-numbers/generate-page-numbers.js');
})

app.get('/src/features/generate-pokemon-cards/generate-pokemon-cards.js', (request, response) => {
    response.set('Content-type', 'text/javascript');
    response.sendFile(__dirname + '/src/features/generate-pokemon-cards/generate-pokemon-cards.js');
})

app.get('/src/features/load-stats/load-stats.js', (request, response) => {
    response.set('Content-type', 'text/javascript');
    response.sendFile(__dirname + '/src/features/load-stats/load-stats.js');
})

// app.get(`/src/pages/poke-stats/:pokemonId`, (request, response) => {
//     let pokemonId = request.params.name;
//     response.set('Content-type', 'img/png');
//     response.sendFile(__dirname + `/public/assets/imgs/sprites/generation-3/emerald/${pokemonId}.png`)
//     response.redirect('/src/pages/poke-stats')
// })

app.get(`/src/pages/poke-stats/:pokemonId`, (request, response) => {
    let pokemonId = request.params.pokemonId;
    console.log('Server Pokemon Id: ', pokemonId);
    let imgPath = {
        path: `/assets/imgs/sprites/generation-3/pokemon/main-sprites/emerald/${pokemonId}.png`
    }
    response.json(imgPath);
})

app.get('/src/pages/poke-stats', (request, response) => {
    response.set('Content-type', 'text/html');
    response.sendFile(__dirname + `/src/pages/poke-stats.html`)
})

app.get(`/public/assets/img/sprites/`)

app.get('/src/css/pokeStats.css', (request, response) => {
    response.set('Content-type', 'text/css');
    response.sendFile(__dirname + '/src/css/pokeStats.css');
})

app.get('/src/features/populate-stats/populate-stats.js', (request, response) => {
    response.set('Content-type', 'text/javascript');
    response.sendFile(__dirname + '/src/features/populate-stats/populate-stats.js')
})

app.listen(PORT, () => {
    console.log(`Server is running: true | Running on Port: ${PORT}`);
});

