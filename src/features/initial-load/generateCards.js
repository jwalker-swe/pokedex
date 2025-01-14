let container = document.querySelector('.gallery-contaienr')
let gallery = document.querySelector('gallery')


class PopulateGallery {
    constructor() {
    }
    // Create function to generate individual cards
    generateCards() {
        // Set total number of cards to generate on load
        let totalCards = 15;
        let pokemonData = [];

        // Fetch data to be used for each card
        for(let i = 1; i < totalCards+1; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    return pokemonData.push(data)
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })
        }
        console.log('Pokemon Data: ', pokemonData);

        // Build out cards for each pokemon
        pokemonData.forEach((data) => {
            const card = document.createElement
        })
    }
}


let cardInfo = new PopulateGallery;

//window.addEventListener('load', cardInfo.generateCards());