(function () {
    let searchRequest = prompt("enter pokemon");
    let fetchStringPoke = `https://pokeapi.co/api/v2/pokemon/${searchRequest}`;

    fetchPokemon(fetchStringPoke);


    //Get the pokemon defined by the name or id in the fetchStringPoke
    function fetchPokemon(fetchStringPoke) {
        fetch(fetchStringPoke)
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemon) {
                let name = pokemon.name;
                let id = pokemon.id;
                let moves = pokemon.moves;
                let sprites = pokemon.sprites.front_default;
                //let species = pokemon.species;
                let fetchStringSpecies = pokemon.species.url;
                //let previousSpecies = pokemon.species.evolves_from_species.name;

                console.log(name, id);
                console.log(moves);
                console.log(sprites);
                //console.log(species);
                //let previousSpecies = fetchPokemonSpecies(fetchStringSpecies);
                //console.log("test");
                //console.log(previousSpecies);
                //fetchPokemonSpecies(fetchStringSpecies);

                let previousName = "";


                fetch(fetchStringSpecies)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (species) {
                        //console.log(species);
                        //console.log(species.evolves_from_species.name);
                        previousName = species.evolves_from_species.name;
                        //console.log(previousEvo)
                        //let fetchStringEvo = species.evolution_chain.url;

                        //fetchPokeEvoChain(fetchStringEvo);
                        //return previousEvo;
                    });
                console.log("test");
                console.log(previousName);

            })
    }

    //Get the Species of the pokemon defined by ID in the fetchStringSpecies
    /*function fetchPokemonSpecies(fetchStringSpecies) {
        fetch(fetchStringSpecies)
            .then(function (response) {
                return response.json();
            })
            .then(function (species) {
                console.log(species);
                console.log(species.evolves_from_species.name);

                previousEvo = species.evolves_from_species.url;
                console.log(previousEvo)
                //let fetchStringEvo = species.evolution_chain.url;

                //fetchPokeEvoChain(fetchStringEvo);
                //return previousEvo;
            })
    }*/

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