// Create global variables for DOM elements
let container = document.querySelector('.gallery-contaienr')
let gallery = document.querySelector('.gallery')
let activePage = document.querySelector('.current-page');

let wrapper = document.querySelector('.gallery');

// Create array of pokemon to fetch
class Pokedex{

    constructor(currentPageNum) {

        this._totalPokemon = 386;
        this._currentPage = currentPageNum;
        this._perPage = 12;
        this._totalPages = Math.ceil(this._totalPokemon/this._perPage);
        this._loadIteration = 0;
        this._ids = [];
        this._idsPerPage = [];
        this._pageToLoad;
        this._idsToLoad;
        this._results = [];
        this._listOfIds = [];
        this._listOfNames = [];

    }

    getIds() {
        //this._ids = [];

        for(let i = 1; i <= this._totalPokemon; i++) {
            this._ids.push(i);
        }
        
        return this._ids;

    }

    seperateIds() {

        this.getIds();
        

        for(let i = 1; i <= this._totalPages; i++) {
           this._idsPerPage.push([this._ids.splice(0, this._perPage)]);
        }

        return this._idsPerPage;
        
    }

    async fetchData(offset, idArray) {

        // Fetch data to store in results
        this._pageToLoad = idArray[this._currentPage - offset];

        for (const page of this._pageToLoad) {
            for (const i of page) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();
                await this._results.push(data);
            }
        }
        return this._results;

    }

    async isolateInfo(offset, idArray) {

        let newId;
        let listOfNames = [];
        let listOfIds = [];
        await this.fetchData(offset, idArray);

        this._results.forEach(async pokemon => {
            listOfNames.push(pokemon.name);
        })

        this._results.forEach(async pokemon => {
            this._listOfIds.push(pokemon.id);

            let id = pokemon.id.toString();
            let chars = id.split('');
            let charLength = chars.length;

            if (charLength === 1) {
                chars.unshift('0','0');
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

    async createCards(offset, idArray) {

        let listOfPokemon = await this.isolateInfo(offset, idArray);
        let listOfIds = listOfPokemon[0];
        let listOfNames = listOfPokemon[1];


        for (const [index, id] of this._listOfIds.entries()) {
            // let pokemonLink = document.createElement('a');
            // pokemonLink.classList.add('link-to-stats');
            // pokemonLink.href = '/src/pages/poke-stats.html';
            // gallery.appendChild(pokemonLink);

            let pokemonButton = document.createElement('button');
            pokemonButton.classList.add('pokemonButton');
            pokemonButton.id = `button-${listOfIds[index]}`;
            gallery.appendChild(pokemonButton);

            let pokemonCard = document.createElement('article');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.id = `${listOfIds[index]}`;
            pokemonButton.appendChild(pokemonCard);

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
            num.innerHTML = `${listOfIds[index]}`;
            numberContainer.appendChild(num);

            let thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            backgroundGrid.appendChild(thumbnail);

            let img = document.createElement('img');
            img.src = `src/assets/imgs/sprites/generation-3/pokemon/main-sprites/emerald/${id}.png`;
            thumbnail.appendChild(img);
            
            let nameContainer = document.createElement('div');
            nameContainer.classList.add('name-container');
            backgroundGrid.appendChild(nameContainer);

            let name = document.createElement('h6');
            name.classList.add('name');
            name.innerHTML = `${listOfNames[index]}`;
            nameContainer.appendChild(name);

        }
    }

    removeCards() {
        let child = gallery.lastElementChild;
        for (let i = 1; i <= gallery.childElementCount; i++) {
            while(child) {
                gallery.removeChild(child);
                child = gallery.lastElementChild;
            }
        }
    }
}

let pokedex = new Pokedex(currentPage);

pokedex.seperateIds();
let allIds = pokedex.seperateIds();

pokedex.createCards(1, allIds);


let nextPage = async function () {

    pokedex.removeCards(currentPage);
    pokedex = await new Pokedex(currentPage);
    await pokedex.createCards(1, allIds);

}

let prevPage = async function () {

    pokedex.removeCards(currentPage);
    pokedex = await new Pokedex(currentPage);
    await pokedex.createCards(1, allIds);

}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


nextPageButton.addEventListener('click', throttle(nextPage, 800));
prevPageButton.addEventListener('click', throttle(prevPage, 800));