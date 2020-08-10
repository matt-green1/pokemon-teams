const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", function(e){
    
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(pokeCards => renderpokemonCards(pokeCards))


    function renderpokemonCard(pokeObj) {
        const newDiv = document.createElement("div")
        newDiv.className = "card"
        newDiv.dataset.id = pokeObj.id
        newDiv.innerText = pokeObj.name
        const newButton = document.createElement("button")
        newButton.dataset.trainerId = pokeObj.id
        newButton.innerText = "Add Pokemon"
        const newUl = document.createElement("ul")

        for(const pokemon of pokeObj.pokemons) {
            
            const newLi = document.createElement("li")
            newLi.innerText = `${pokemon.nickname}(${pokemon.species})`
            const pokeButton = document.createElement("button")
            pokeButton.className = "release"
            pokeButton.dataset.pokemonId = pokemon.id
            pokeButton.innerText = "Release"
            newLi.append(pokeButton)
            newUl.append(newLi)
        }

        newDiv.append(newButton)
        newDiv.append(newUl)        
        document.querySelector("main").append(newDiv)    
                
           
       

    }
    
    function renderSinglePokemon(pokemon) {
        const newLi = document.createElement("li")
        newLi.innerText = `${pokemon.nickname}(${pokemon.species})`
        const pokeButton = document.createElement("button")
        pokeButton.className = "release"
        pokeButton.dataset.pokemonId = pokemon.id
        pokeButton.innerText = "Release"
        newLi.append(pokeButton)
        return newLi
    }

    function renderpokemonCards(pokeObjects) {
        for(const pokeObj of pokeObjects) {
            renderpokemonCard(pokeObj)
    }}

    

    
    
    document.addEventListener("click", function(e){

        if(e.target.matches(".card > button")) {
            
            
        const clickedTrainerId = parseInt(e.target.dataset.trainerId)
        const ulCont = e.target.parentNode.querySelector("ul")

        const configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({trainer_id: clickedTrainerId})
    
        }
            
        
            fetch(POKEMONS_URL, configObj)
                .then(response => response.json())
                .then(pokemon => {
                    if(ulCont.querySelectorAll("li").length < 6) {
                    const pokeLi = renderSinglePokemon(pokemon)
                    ulCont.append(pokeLi)}
                })
                .catch(error => console.log )    

        } else if (e.target.matches(".release")) {
            const clickedPokemonId = e.target.dataset.pokemonId
            const configObj = {
                method: "DELETE"
            }
            fetch(POKEMONS_URL + clickedPokemonId, configObj)
                .then(response => {
                    e.target.parentNode.remove()
                })
                
        }
    })
    





})