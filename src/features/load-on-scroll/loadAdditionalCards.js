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
        console.log(`Cards Loaded: ${this.cardTotal}`);
        console.log(`Starting Card: ${this.startingCard}`);
    }

    async fetchData() {
        await this.getCardTotal();

        let results = [];
        let names = []
        let cardMax = 386;

        // Fetch data to be used for each card
        if (cardMax - this.cardTotal >= 9) {
            try {
                for(let i = this.startingCard; i < this.startingCard+9; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const data = await response.json();
                    results.push(data);
                }
                console.log(`Fetched Results: ${results}`);
                return results;
            } catch (err) {
                console.log(`Error: ${err}`);
            }
        } else {
            try {
                for(let i = this.startingCard; i <= cardMax; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const data = await response.json();
                    results.push(data);
                }
                console.log(`Fetched Results: ${results}`);
                return results;
            } catch (err) {
                console.log(`Error: ${err}`);
            }
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
        console.log(`Ids: ${listOfIds}`, `Ids: ${listOfNames}`);
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

    async removeCard() {
        if (gallery.childElementCount > 386) {
            for (let i = 0; i < gallery.childElementCount-386; i++) {
                let lastCard = gallery.lastElementChild;
                //await gallery.removeChild(lastCard);
            }
        }
    }
}

let getCardsToLoad = new LoadOnScroll();







//Functions to call on scroll
let loadCards = async function () {
    await getCardsToLoad.createCards();
};


//Create throttle function to delay load on scroll
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
    const { scrollTop, scrollHeight, clientHeight } = gallery;
    
    if ((scrollTop + clientHeight) >= scrollHeight - 20) {
        await loadCards();
    }
}, 80))

gallery.addEventListener('scroll', () => {
    if (getCardsToLoad.cardTotal > 386) {
        gallery.removeEventListener('scroll', throttle, true);
        getCardsToLoad.removeCard();
    }
});
