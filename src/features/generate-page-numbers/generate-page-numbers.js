const totalPokemon = 386;
const maxPerPage = 12;
const totalPages = Math.ceil(totalPokemon/maxPerPage);

const pageNumberList = document.querySelector(".page-number-list");

class CreatePageNumbers{
    constructor() {
        this._totalPokemon = 386;
        this._pokemonPerPage = 12;
        this._totalPages = Math.ceil(this._totalPokemon/this._pokemonPerPage);
        this._pageList = [];
    }

    setNumOfPages() {
        for (let i = 1; i <= this._totalPages; i++) {
            this._pageList.push(`${i}`);
        }
        // console.log(this._pageList);
    }

    addPages() {
        this.setNumOfPages();

        for (let i = 1; i < this._pageList.length - 28; i++) {
            let listItem = document.createElement('li');
            listItem.classList.add('page-number');
            listItem.innerHTML = `${i}`;
            pageNumberList.appendChild(listItem);
        }
    }
}

const generatePages = new CreatePageNumbers();
generatePages.addPages();