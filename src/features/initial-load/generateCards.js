let container = document.querySelector('.gallery-contaienr')
let gallery = document.querySelector('gallery')


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
        console.log(pokemon);

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
        console.log(listOfNames);
        console.log(listOfIds);
    }

    async createCards() {

    }
}


let generateCards = new PopulateGallery(15);
generateCards.returnPokemon();


/* Test indexing through array
generateCards.fetchData().then(results => {
    console.log("Accessing results:", results[0].name);
}).catch(err => {
    console.log('error');
}) */
