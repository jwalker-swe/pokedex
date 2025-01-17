let galleryToScroll = document.querySelector('.gallery');
let galleryContainer = document.querySelector('.gallery-container');

class LoadOnScroll {
    constructor() {
        this.cardTotal = 0;
        this.startingCard = 0;
    }

    async getCardTotal() {
        this.cardTotal = await Number(galleryToScroll.childElementCount);
        this.startingCard = this.cardTotal + 1;
        console.log(this.cardTotal);
    }

    async fetchData() {
        await this.getCardTotal();

        let results = [];
        let names = []

        // Fetch data to be used for each card
        try {
            for(let i = this.startingCard; i < this.startingCard+15; i++) {
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
        if (this.cardTotal < 387) {
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
                img.src = `src/assets/imgs/sprites/generation-3/pokemon/main-sprites/emerald/${i+this.cardTotal+1}.png`;
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

    async getLastCardBottom() {
        let lastCard = await gallery.lastElementChild;
        lastCard.classList.add('lastCard');
        let lastCardPos = await lastCard.getBoundingClientRect();
        let lastCardBottom = await lastCardPos.bottom;
        return lastCardBottom;
    }

    async getGalleryContainerBottom() {
        let galleryContainerPos = await galleryContainer.getBoundingClientRect();
        let galleryContainerBottom = galleryContainerPos.bottom;
        return galleryContainerBottom;
    }

    async calculateDiff() {
        let cardBottom = await this.getLastCardBottom();
        let galleryBottom = await this.getGalleryContainerBottom();

        return cardBottom - galleryBottom;
    }

    async removeLastCardClass() {
        let lastCard = gallery.lastElementChild;
        await lastCard.classList.remove('.lastCard');
    }
}

let getCardsToLoad = new LoadOnScroll();



//Functions to call on scroll
let loadCards = async function () {
    await getCardsToLoad.createCards();
};

let removeClass = async function () {
    await getCardsToLoad.removeLastCardClass();
}

const throttle = (fn, delay) => {
    let time = Date.now();

    return () => {
        if ((time + delay - Date.now()) <= 0) {
            fn();
            time = Date.now();
        }
    }
}







gallery.addEventListener('scroll', throttle(async () => {
    let count = gallery.childElementCount;
    console.log(count);
    
    if (count < 387) {
        let diff = await getCardsToLoad.calculateDiff();
        //console.log(diff);

        if (diff <= 50) {
            await loadCards();
            await removeClass();
        }
    }
}, 100))