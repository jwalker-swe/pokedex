let container = document.querySelector('.gallery-contaienr')
let gallery = document.querySelector('.gallery')
gallery.style.overflow = 'scroll';


class PopulateGallery {
    constructor(totalCards) {
        this.totalCards = totalCards;
    }

    // Create functions to used to generate cards

    async fetchData() {
        let results = [];
        let names = []

        // Fetch data to be used for each card
        try {
            for(let i = 1; i < this.totalCards+1; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();
                results.push(data);
            }
            //console.log(results);
            return results;
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    async returnPokemon() {
        let listOfNames = []
        let listOfIds = []
        let newId;

        let pokemon = await this.fetchData();
        //console.log(pokemon);

        pokemon.forEach(element => {
            listOfNames.push(element.name);

            let id = element.id.toString();
            let chars = id.split('');
            let charLength = chars.length;

            if (charLength === 1) {
                chars.unshift('0', '0');
                newId = chars.join('');
            } else if (charLength === 2) {
                chars.unshift('0');
                newId = chars.join('');
            } else {
                newId = chars.join('');
            }

            listOfIds.push(newId);
        });
        return [listOfIds, listOfNames];
    }

    async createCards() {
        let listOfPokemon = await this.returnPokemon();
        let listOfIds = listOfPokemon[0];
        let listOfNames = listOfPokemon[1];

        //console.log('List of Pokemon and their data:', listOfPokemon);
        //console.log('List of Pokemon Ids:', listOfIds);
        //console.log('List of Pokemon Names:', listOfNames);

        for (let i = 0; i < listOfPokemon[0].length; i++) {
            //console.log(`Pokemon name: ${listOfNames[i]}`, '/', `Pokemon ids: ${listOfIds[i]}`)

            let pokemonCard = document.createElement('article');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.id = `${listOfIds[i]}`;
            gallery.appendChild(pokemonCard);

            let backgroundGrid = document.createElement('div');
            backgroundGrid.classList.add('background-grid');
            pokemonCard.appendChild(backgroundGrid);

            let cardBackground001 = document.createElement('div');
            cardBackground001.classList.add('card-background-001');
            backgroundGrid.appendChild(cardBackground001);

            let cardBackground002 = document.createElement('div');
            cardBackground002.classList.add('card-background-002');
            backgroundGrid.appendChild(cardBackground002);

            let numberContainer = document.createElement('div');
            numberContainer.classList.add('number-container');
            backgroundGrid.appendChild(numberContainer);

            let num = document.createElement('p');
            num.classList.add('num');
            num.innerHTML = `${listOfIds[i]}`;
            numberContainer.appendChild(num);

            let thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            backgroundGrid.appendChild(thumbnail);

            let img = document.createElement('img');
            img.src = `src/assets/imgs/sprites/generation-3/pokemon/main-sprites/emerald/${i+1}.png`;
            thumbnail.appendChild(img);
            
            let nameContainer = document.createElement('div');
            nameContainer.classList.add('name-container');
            backgroundGrid.appendChild(nameContainer);

            let name = document.createElement('h6');
            name.classList.add('name');
            name.innerHTML = `${listOfNames[i]}`;
            nameContainer.appendChild(name);
        }
    }
}


let generateCards = new PopulateGallery(12);
let currentPage = 1;

document.querySelector('.bi-arrow-left').style.opacity = '0';
generateCards.createCards();


/* Test indexing through array
generateCards.fetchData().then(results => {
    console.log("Accessing results:", results[0].name);
}).catch(err => {
    console.log('error');
}) */