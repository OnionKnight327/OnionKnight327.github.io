var current_pokemon;
var gamepoints = 0;
var timer = 60;


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max)+1);
}

function get_a_pokemon(){

    var max_id = 898; //151 is max Kanto Pokemon dex entries, 898 is max National Dex entries

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
    //command below replaces misnamed file names
    pokemon.name= pokemon.name.replace("-male", "").replace("-female", "").replace("mr-mime", "mr. mime").replace("idday", "").replace("-shield", "").replace("nidoran-m", "nidoran").replace("nidoran-f", "nidoran").replace("-average", "").replace("-ordinary", "");

    current_pokemon = pokemon;

    var pokemon_name = document.getElementById("pokemon-name");
    var pokemon_image = document.getElementById("pokemon-image");
    var guess_text = document.getElementById("guess");

    guess_text.focus();
    guess_text.value = "";

    pokemon_name.innerHTML = pokemon.name;
    pokemon_image.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    pokemon_image.classList.remove("revealed");

}

function startGame(){

    get_a_pokemon();

    var start_button = document.getElementById("before_start");
    start_button.remove();

    var game_controls = document.getElementById("after_start");
    game_controls.className = "active";

    //a timer start will start here
    var countdown = setInterval(
        function(){
            timer--;
            var htmltimer = document.getElementById("timer");
            htmltimer.innerHTML = timer;

            if(timer == 0){

                clearInterval(countdown);
                gameover();
            }

        },
        1000
    );


}

function check_guess(guess){

    if(guess.toLowerCase() == current_pokemon.name){
        return true;
    }
    else
        return false;


}

function show_pokemon(){
    var pokemon_img = document.getElementById("pokemon-image");
    pokemon_img.classList.add("revealed");
}

function gameover(){
    show_message("Thanks for playing! <br> Your final score was " + gamepoints);
    var guessform           = document.getElementById("guess_form");
    guess_form.remove();

    var restart_button = document.getElementById("restart");   
    restart_button.style.display = "inline-block";

    var game_over_message = document.getElementById("game-over");
    game_over_message.style.display = "block";

    var pokemon_name = document.getElementById("pokemon-name");
    pokemon_name.style.display = "block";

};

function show_message(msg){
    var message = document.getElementById("message");
    message.innerHTML = msg;
};

document.addEventListener("DOMContentLoaded", function(){
    var start_button        = document.getElementById("start_game");
    var htmlpoints          = document.getElementById("score");
    var guess_button        = document.getElementById("submit_guess");
    var guess_text          = document.getElementById("guess");
    var guessform           = document.getElementById("guess_form");
    var game                = document.getElementById("game");
    var reset_button        = document.getElementById("restart");


    guess_form.addEventListener("submit", function(event){
        event.preventDefault();

        if(check_guess(guess_text.value)){ //correct answers:

            gamepoints = gamepoints + 10
            htmlpoints.innerHTML = gamepoints;
            show_pokemon();
            setTimeout(
                function(){
                get_a_pokemon();
                },
                1000
            );

            show_message("Correct!")
        }
        else{
            //incorrect answers:
            game.classList.add("shake");
            setTimeout(function(){
                game.classList.remove("shake");
            }, 500);

            guessform.reset();
            guess_text.focus();
            show_message("Incorrect! Make sure the spelling is correct!")
            
        }


    })

    start_button.addEventListener("click", function(){
    startGame();
    });

    reset_button.addEventListener("click", function(){
    location.reload();
    });




});

