let path;

// Get pokemon stat values
let nameValue = localStorage.getItem('pokemonName');
let id = localStorage.getItem('pokemonId');
let types = localStorage.getItem('pokemonTypes');
let typesParsed = JSON.parse(types);
let weight = localStorage.getItem('pokemonWeight');
let height = localStorage.getItem('pokemonHeight');
let moves = localStorage.getItem('pokemonAbilities'); 
let newMove = [];
let movesParsed = JSON.parse(moves);
let sound = localStorage.getItem('pokemonSound');
let hp = localStorage.getItem('pokemonHp');
let atk = localStorage.getItem('pokemonAtk');
let def = localStorage.getItem('pokemonDef');
let satk = localStorage.getItem('pokemonSatk');
let sdef = localStorage.getItem('pokemonSdef');
let spd = localStorage.getItem('pokemonSpd');

// Adjust moves values
let movesSpelling = function() {
    movesParsed.forEach(move => {
        let chars = move.split('');
        let firstLetter = chars.shift();
        firstLetter = firstLetter.toUpperCase();
        chars.unshift(firstLetter);

        for (let i = 0; i < chars.length; i++) {

            if (chars[i] === '-') {
                let char = chars[i+1];
                let charUpper = char.toUpperCase();
                chars[i+1] = charUpper;
            }
        }
        newMove.push(chars.join(''));
        console.log(newMove);
    });
}

movesSpelling();


// Get html elements
let nameContainer = document.querySelector('.pokemon-name');
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
        const response = await fetch(`/src/pages/poke-stats/${id}`)
        const data = await response.json();
        thumbnail.src = data.path;
    } catch (err) {
        console.log(`Couldn't retrieve img: ${err}`);
    }
}

getImage();

// Assign elements the correct value
mainContainer.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`

nameContainer.innerHTML = `${nameValue.toUpperCase()}`

weightContainer.innerHTML = `${(Number(weight) * 0.1).toFixed(1)}` + 'kg';
heightContainer.innerHTML = `${(Number(height) * 0.1).toFixed(1)}` + 'm';

hpBar.style.width = `clamp(0%, ${hp}%, 100%)`;
hpBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
hpValue.innerHTML = `${hp}`;

atkBar.style.width = `clamp(0%, ${atk}%, 100%)`;
atkBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
atkValue.innerHTML = `${atk}`;

defBar.style.width = `clamp(0%, ${def}%, 100%)`;
defBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
defValue.innerHTML = `${def}`;

satkBar.style.width = `clamp(0%, ${satk}%, 100%)`;
satkBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
satkValue.innerHTML = `${satk}`;

sdefBar.style.width = `clamp(0%, ${sdef}%, 100%)`;
sdefBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
sdefValue.innerHTML = `${sdef}`;

spdBar.style.width = `clamp(0%, ${spd}%, 100%)`;
spdBar.style.backgroundColor = `var(--${typesParsed[0].toLowerCase()})`
spdValue.innerHTML = `${spd}`;


// Determine and assign pokemon types
if (typesParsed.length === 1) {
    type001.innerHTML = `${typesParsed[0].toUpperCase()}`
    type002.remove();
} else {
    type001.innerHTML = `${typesParsed[0].toUpperCase()}`
    type002.innerHTML = `${typesParsed[1].toUpperCase()}`
}

if (movesParsed.length === 1) {
    move001.innerHTML = `${newMove[0]}`;
    moove002.temove();
} else {
    move001.innerHTML = `${newMove[0]}`;
    move002.innerHTML = `${newMove[1]}`
}

let currentPage = localStorage.getItem('currentPage');