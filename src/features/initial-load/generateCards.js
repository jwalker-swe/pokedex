let container = document.querySelector('.gallery-contaienr')
let gallery = document.querySelector('gallery')


class PopulateGallery {
    constructor(totalCards) {
        this.totalCards = totalCards;
    }

    // Create functions to used to generate cards

    async fetchData() {
        let results = [];

        // Fetch data to be used for each card
        try {
            for(let i = 1; i < this.totalCards+1; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();
                results.push(data);
            }
            console.log(results);
            return results;
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }
}


let generateCards = new PopulateGallery(15);

generateCards.fetchData().then(results => {
    console.log("Accessing results:", results[0]);
}).catch(err => {
    console.log('error');
})

//window.addEventListener('load', cardInfo.generateCards());