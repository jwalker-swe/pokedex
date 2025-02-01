let path;

// Get pokemon stat values
let name = localStorage.getItem('pokemonName');
let id = localStorage.getItem('pokemonId');
let types = localStorage.getItem('pokemonTypes');
let typesParsed = JSON.parse(types);
let weight = localStorage.getItem('pokemonWeight');
let height = localStorage.getItem('pokemonHeight');
let moves = localStorage.getItem('pokemonAbilities');
let movesParsed = JSON.parse(moves);
let sound = localStorage.getItem('pokemonSound');
let hp = localStorage.getItem('pokemonHp');
let atk = localStorage.getItem('pokemonAtk');
let def = localStorage.getItem('pokemonDef');
let satk = localStorage.getItem('pokemonSatk');
let sdef = localStorage.getItem('pokemonSdef');
let spd = localStorage.getItem('pokemonSpd');


// Get html elements
let thumbnail = document.querySelector('.poke-img');
let type001 = document.querySelector('#type-001');
let type002 = document.querySelector('#type-002');
let weightContainer = document.querySelector('.weight-value');
let heightContainer = document.querySelector('.height-value');
let move001 = document.querySelector('#move-001');
let move002 = document.querySelector('#move-002');
let hpBar = document.querySelector('#hp-bar');
let hpValue = document.querySelector('#hp-value')
let atkBar = document.querySelector('#atk-bar');
let atkValue = document.querySelector('#atk-value');
let defBar = document.querySelector('#def-bar');
let defValue = document.querySelector('#def-value');
let satkBar = document.querySelector('#satk-bar');
let satkValue = document.querySelector('#satk-value');
let sdefBar = document.querySelector('#sdef-bar');
let sdefValue = document.querySelector('#sdef-value');
let spdBar = document.querySelector('#spd-bar');
let spdValue = document.querySelector('#spd-value');
let mainContainer = document.querySelector('.main-container');

// Fetch image
let getImage = async function() {
    try {
        let imgId = await id.toString() + '.png';
        console.log(imgId)
        console.log(id);
        const response = await fetch(`/src/pages/poke-stats/${id}`)
        const data = await response.json();
        thumbnail.src = data.path;
        console.log(data.path);
    } catch (err) {
        console.log(`Couldn't retrieve img: ${err}`);
    }
}

getImage();

// Assign elements the correct value
mainContainer.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`

weightContainer.innerHTML = `${Number(weight) * 0.1}` + 'kg';
heightContainer.innerHTML = `${(Number(height) * 0.1).toFixed(1)}` + 'm';

hpBar.style.width = `${hp}%`;
hpValue.innerHTML = `${hp}`;

atkBar.style.width = `${atk}%`;
atkValue.innerHTML = `${atk}`;

defBar.style.width = `${def}%`;
defValue.innerHTML = `${def}`;

satkBar.style.width = `${satk}%`;
satkValue.innerHTML = `${satk}`;

sdefBar.style.width = `${sdef}%`;
sdefValue.innerHTML = `${sdef}`;

spdBar.style.width = `${spd}%`;
spdValue.innerHTML = `${spd}`;


// Determine and assign pokemon types
if (typesParsed.length === 1) {
    type001.innerHTML = `${typesParsed[0].toUpperCase()}`
    type002.remove();
} else {
    type001.innerHTML = `${typesParsed[0].toUpperCase()}`
    type002.innerHTML = `${typesParsed[1].toUpperCase()}`
}

