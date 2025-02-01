let pokemonStats;
let pokemonName;
let pokemon = [];

// Functions to call when button pressed
let Stats = class {
    constructor(button) {
        this._id;
        this._results;

        this._name;
        this._displayId;
        this._abilities;
        this._types;
        this._stats;
        this._height;
        this._weight;
    }

    getElementId(button) {
        this._id = button.id;
        this._displayId = this._id;
        return this._id;
    }

    getFetchId(button) {
        this.getElementId(button);
        
        let idChars = this._id.slice(-3).split('');

        while(idChars[0] === '0') {
            idChars = idChars.slice(1);
        }

        let idNum = idChars.join('');

        this._id = idNum;
        return this._id;
    }

    async getData(button) {
        this.getFetchId(button);

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this._id}`);
            const data = await response.json();
            this._results = await data;
            // console.log(this._results);
        } catch (err) {
            console.log('Error: ', err);
        }

        return this._results;
    }
}

let getStats = new Stats;


// Event listener to get which button is clicked


gallery.addEventListener('click', async function(event) {
    let target = event.target;
    let parent = target.parentElement;

    while(parent.tagName != 'BUTTON') {
        parent = await parent.parentElement;
    }

    let buttonPressed = parent;

    await getStats.getData(buttonPressed);
    let results = await getStats._results;

    let name = results.name;
    let id = results.id;
    let types = results.types;
    let weight = results.weight;
    let height = results.height;
    let abilities = results.abilities;
    let sound = results.cries.legacy;
    let hp = results.stats[0].base_stat;
    let atk = results.stats[1].base_stat;
    let def = results.stats[2].base_stat;
    let satk = results.stats[3].base_stat; 
    let sdef = results.stats[4].base_stat;
    let spd = results.stats[5].base_stat;

    if (results.types.length > 1) {
        types = [results.types[0].type.name.toString(), results.types[1].type.name.toString()];
    } else {
        types = [results.types[0].type.name.toString()];
    }

    if (results.abilities.length > 1) {
        abilities = [results.abilities[0].ability.name.toString(), results.abilities[1].ability.name.toString()];
    } else {
        abilities = [results.abilities[0].ability.name.toString()];
    }

    let typesObj = JSON.stringify(types);
    let abilitiesObj = JSON.stringify(abilities);

    await localStorage.setItem('pokemonName', name);
    await localStorage.setItem('pokemonId', id);
    await localStorage.setItem('pokemonTypes', typesObj);
    await localStorage.setItem('pokemonWeight', weight);
    await localStorage.setItem('pokemonHeight', height);
    await localStorage.setItem('pokemonAbilities', abilitiesObj);
    await localStorage.setItem('pokemonSound', sound);
    await localStorage.setItem('pokemonHp', hp);
    await localStorage.setItem('pokemonAtk', atk);
    await localStorage.setItem('pokemonDef', def);
    await localStorage.setItem('pokemonSatk', satk);
    await localStorage.setItem('pokemonSdef', sdef);
    await localStorage.setItem('pokemonSpd', spd);

    setTimeout(() => {
        window.location.href = `/src/pages/poke-stats`;
    }, 10);

    return pokemon;
})