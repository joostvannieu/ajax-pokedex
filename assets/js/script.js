(function () {
    document.getElementById("button").addEventListener("click", function () {
        let searchRequest = document.getElementById("input").value;
        let fetchStringPoke = `https://pokeapi.co/api/v2/pokemon/${searchRequest}`;

        fetchPokemon(fetchStringPoke);
    });

    //Get the pokemon defined by the name or id in the fetchStringPoke
    function fetchPokemon(fetchStringPoke) {
        fetch(fetchStringPoke)
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemon) {
                let name = pokemon.name; //string with the pokemon name
                let id = pokemon.id; //integer value of the id of the pokemon
                let moves = pokemon.moves; // an array with all the moves of a pokemon
                let sprites = pokemon.sprites.front_default; // a url with the link to the default image of the pokemon
                let fetchStringSpecies = pokemon.species.url; //a url linking to the species json file

                console.log(name, id);
                console.log(moves);
                console.log(sprites);

                //Go and get the species Json
                fetchSpecies(fetchStringSpecies);
                //getMoves(pokemon);
                document.getElementById("firstmoves").innerText = getMoves(pokemon);
                document.getElementById("pokemonpic").setAttribute("src", sprites);

            })
    }

    //Fetch the previous pokemon in the evolution
    function fetchPreviousInEvo(fetchStringPreviousInEvo) {
        fetch(fetchStringPreviousInEvo)
            .then(function (response) {
                return response.json();
            })
            .then(function (previousInEvoPokemon) {
                let name = previousInEvoPokemon.name; //string with the pokemon name
                let sprites = previousInEvoPokemon.sprites.front_default; // a url with the link to the default image of the pokemon

                console.log(name);
                console.log(sprites);
            })
    }

    //Get Moves, this should get 4 moves from the pokemon, can be the first 4, or 4 random ones, doesn't matter much
    function getMoves(pokemon) {
        let moves="";
        for (let i = 0; i<4; i++){
            console.log(pokemon.moves[i].move.name);
            moves += pokemon.moves[i].move.name + ", ";
        }
        return moves;
    }

    //Fetches the species Json file
    function fetchSpecies(fetchStringSpecies) {
        fetch(fetchStringSpecies)
            .then(function (response) {
                return response.json();
            })
            .then(function (species) {

                //check if the current species evolved from another species
                if (species.evolves_from_species) {
                    //
                    fetchPreviousInEvo(`https://pokeapi.co/api/v2/pokemon/${species.evolves_from_species.name}`);
                }else {
                    console.log("I am the first of my species")
                }
            });
    }

    //Get the Species of the pokemon defined by ID in the fetchStringEvo

    function fetchPokeEvoChain(fetchStringEvo) {
        fetch(fetchStringEvo)
            .then(function (response) {
                return response.json();
            })
            .then(function (evolution) {
                let firstEvoSpecies = evolution.chain.species;
                let secondEvoSpecies = evolution.chain.evolves_to;
                let thirdEvoSpecies = [];

                //Get the evolution for each
                secondEvoSpecies.forEach(function (species){
                    if (species.evolves_to.length !== 0)
                    thirdEvoSpecies.push(species.evolves_to);
                });
                /*console.log("first: ");
                console.log(firstEvoSpecies);
                console.log("second: ");
                console.log(secondEvoSpecies);
                console.log("third: ");
                console.log(thirdEvoSpecies);*/
                let evoChain = [firstEvoSpecies, secondEvoSpecies, thirdEvoSpecies];
                console.log(evoChain);
                return evoChain;
            })
    }

})();