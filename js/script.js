//jQuery IIFE
$(function() {


/*----- constants -----*/
const baseURL = 'https://pokeapi.co/api/v2/pokemon';



/*----- app's state (variables) -----*/

let pokemonData, pokemonDetails;


/*----- cached element references -----*/

const $ulEl = $(".collection");
const $imgEl =$('.modal-content img');
const $name =$('#name');
const $moves = $('#moves');
const $abilities = $('#abilities');
const $height = $('#height');
const $modal = $('.modal');

/*----- event listeners -----*/
$ulEl.on('click', 'span', handleClick);


/*----- functions -----*/
$modal.modal(); // initialize modal
const instance = M.Modal.getInstance($modal);

function handleClick(event){ 
    getPokemon(event.target.dataset.url, true);
};

//make data available as soon as the app loads 
getPokemon();

function getPokemon(detailURL, isDetail = false) {
    const url = detailURL || baseURL;

    $.ajax(url)
    .then(
        
        (data) => {
            if(!isDetail) {
            pokemonData = data.results;
            render(); //programtically render the html
            }else{
                pokemonDetails = data;
                render(true);
            }
        },
        (error) => {
            console.log('error is', error);
        }
    );
}

function generateHTML() {
    return pokemonData.map(function(pokemon) {
        return ` 
        <li class="collection-item red-text">
            <div style="text-transform: capitalize;">${pokemon.name}
                <span data-url="${pokemon.url}" class="secondary-content blue-text">
        Details</span>
        </div>
        </li>`;
    });
}

function render(isDetail = false) {
    if(!isDetail){
    const html = generateHTML().join("")
    $ulEl.html(html)
}else {
    //produce the modal
    $imgEl.attr('src', pokemonDetails.sprites.front_default);
    $imgEl.attr('alt',pokemonDetails.name);
    $name.text(pokemonDetails.name);
    $height.text("Height: " + pokemonDetails.height);
    $moves.text("Number of moves: " +pokemonDetails.moves.length);
    $abilities.text("Number of abilities: " +pokemonDetails.abilities.length);
    //open the modal 
    instance.open();
    }
}
});