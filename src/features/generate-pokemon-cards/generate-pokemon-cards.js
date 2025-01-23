// Create array of pokemon to fetch

class LoadCards{
    constructor(currentPageNum) {
        this._totalPokemon = 386;
        this._currentPage = currentPageNum;
        this._perPage = 12;
        this._totalPages = Math.ceil(this._totalPokemon/this._perPage);
        this._loadIteration = 0;
        this._ids = [];
        this._idsPerPage = [];
        this._idsToLoad;
    }

    getIds() {
        for(let i = 1; i <= this._totalPokemon; i++) {
            this._ids.push(i);
        }
    }

    seperateIds() {
        this.getIds();

        for(let i = 1; i <= this._totalPages; i++) {
            this._idsPerPage.push([this._ids.splice(0, this._perPage)]);
        }
    }

    fetchData(offset) {
        let results = [];
        this.seperateIds();
        
        this._idsToLoad = this._idsPerPage[currentPage - offset];
        console.log('Ids to Load on this page: ', this._idsToLoad);

        this._idsToLoad.forEach(async page => {
            page.forEach(async id => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    results.push(data);
                    return results;
                } catch (err) {
                    console.log(`Error: ${err}`);
                }
            });
        });
        console.log(results);
    }

    isolatePokemonInfo() {
        this.fetchData(1);
    }
}

let populateCards = new LoadCards(currentPage);
populateCards.isolatePokemonInfo();
