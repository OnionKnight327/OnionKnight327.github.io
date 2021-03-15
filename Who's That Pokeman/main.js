var current_pokemon;


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max)+1);
}

function get_a_pokemon(){

    var max_id = 151; //max Kanto Pokemon dex entries

    var random_pokemon = getRandomInt(max_id);

    var request_url = "https://pokeapi.co/api/v2/pokemon/" + random_pokemon;

    fetch(request_url)
    .then( function(response){
        if(response.status == 404){
            get_a_pokemon();
        }

        return response.json();
    })
    .then(data => console.log(set_Pokemon(data)) );

}

function set_Pokemon(pokemon){
    pokemon.name= pokemon.name.replace("-m", "").replace("-f", "");

    current_pokemon = pokemon;

    var pokemon_name = document.getElementById("pokemon-name");
    var pokemon_image = document.getElementById("pokemon-image");
    var guess_text = document.getElementById("guess");

    guess_text.focus();
    guess_text.value = "";

    pokemon_name.innerHTML = pokemon.name;
    pokemon_image.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

}

function startGame(){

    get_a_pokemon();

    var start_button = document.getElementById("before_start");
    start_button.remove();

    var game_controls = document.getElementById("after_start");
    game_controls.className = "active";

    //a timer start will go here


}

function check_guess(guess){

    if(guess.toLowerCase() == current_pokemon.name){
        return true;
    }
    else
        return false;


}


document.addEventListener("DOMContentLoaded", function(){
    var start_button = document.getElementById("start_game");

    var guess_button = document.getElementById("submit_guess");
    var guess_text = document.getElementById("guess");
    var guessform = document.getElementById("guess_form");

    guess_form.addEventListener("submit", function(event){
        event.preventDefault();

        if(check_guess(guess_text.value)){

            get_a_pokemon();
        }


    })

    start_button.addEventListener("click", function(){
    startGame();
    });


});

