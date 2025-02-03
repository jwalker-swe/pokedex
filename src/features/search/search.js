let searchBar = document.querySelector('#search-bar');


const removeCards = function() {
    let child = gallery.lastElementChild;
    for (let i = 1; i <= gallery.childElementCount; i++) {
        while(child) {
            gallery.removeChild(child);
            child = gallery.lastElementChild;
        }
    }

}

const generateCard = function(data) {
    
    let pokemonName = data.name;
    let pokemonId = data.id;

    // Capitalize first letter
    let origName = pokemonName.split('');
    let firstLetter = origName[0].toUpperCase();
    origName.shift();
    origName.unshift(firstLetter);
    pokemonName = origName.join('');

    // Add zeros to id display
    let id = pokemonId.toString();
    let chars = id.split('');
    let charLength = chars.length;

    if (charLength === 1) {
        chars.unshift('0','0');
        pokemonId = chars.join('');
    } else if (charLength === 2) {
        chars.unshift('0');
        pokemonId = chars.join('');
    } else {
        pokemonId = chars.join('');
    }


    // Create pokemon card
    let pokemonButton = document.createElement('button');
    pokemonButton.classList.add('pokemonButton');
    pokemonButton.id = `button-${pokemonId}`;
    gallery.appendChild(pokemonButton);

    let pokemonCard = document.createElement('article');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.id = `${pokemonId}`;
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
    num.innerHTML = `${pokemonId}`;
    numberContainer.appendChild(num);

    let thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');
    backgroundGrid.appendChild(thumbnail);

    let img = document.createElement('img');
    img.src = `/assets/imgs/sprites/generation-3/pokemon/main-sprites/emerald/${id}.png`;
    thumbnail.appendChild(img);
    
    let nameContainer = document.createElement('div');
    nameContainer.classList.add('name-container');
    backgroundGrid.appendChild(nameContainer);

    let name = document.createElement('h6');
    name.classList.add('name');
    name.innerHTML = `${pokemonName}`;
    nameContainer.appendChild(name);

    let footerNav = document.querySelector('.footer-nav');
    footerNav.style.display = 'none';
}


// Search on enter button press
searchBar.addEventListener('keyup', async (e) => {

    if (e.key === 'Enter' || e.keyCode === 13) {
        let searchValue = searchBar.value;
        
        try {

            let response = await fetch(` https://pokeapi.co/api/v2/pokemon/${searchValue}`);
            const data = await response.json();

            if (data.id <= 386) {

                removeCards();
                await generateCard(data);

            } else {

                alert(`Couldn't find: (${searchValue})  |  Please enter a pokemon name or id from Generation 3 or below`);

            }

        } catch (err) {

            console.log(`Couldn't find: (${searchValue})  |  Error: ${err}`);
            alert(`Couldn't find: (${searchValue})  |  Error: ${err}`);

        }

    }

})