//https://pokeapi.co/api/v2/pokemon/

const frm = document.querySelector("form")

const outName = document.getElementById("out-name-value")
const outID = document.getElementById("out-id-value")
const outType1 = document.getElementById("out-type1-value")
const outType2 = document.getElementById("out-type2-value")
const outWeight = document.getElementById("out-weight-value")
const outIMGpokemon = document.querySelector("img")
const outError = document.getElementById("error")
//Funções
const getPokemonData = async(pokemon) =>{

    url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    resp = await fetch(url)
    data = await resp.json()

    
    return data
    

}


const isDoubleType = async(pokemon) =>{
    const data = await getPokemonData(pokemon)
    if(data.types.length==2){
       
        return true
    }else{
        
        return false
    }
}
const getListBackGroundColor = async(pokemon) =>{
    const data = await getPokemonData(pokemon)
    const colors = []
    colors.push(getColor(data.types[0].type.name))
    if( await isDoubleType(pokemon)){
        
        colors.push(getColor(data.types[1].type.name))
    }
    return colors
        

}

const setBackgroundColor = async(colors) =>{
    const body = document.querySelector("*")
    if(colors.length == 2){
        body.style.background = ` linear-gradient(180deg, #${colors[0]} 0%, #${colors[1]} 100%)`
    }else{
        body.style.background = ""
        body.style.backgroundColor = `#${colors[0]}`
    }
}
const getColor = (type) =>{
    switch(type){
        case "fire": 
            return "D45858"

        case "water":
            return "4F88D5"

        case "grass":
            return "65BD57"

        case "poison":
            return "6F4E98"
        
        case "flying":
            return "8BB1E2"
        
        case "dark":
            return "585769"
        
        case "electric":
            return "FFFE6E"
        
        case "ground":
            return "B18350"
        
        case "fighting":
            return "D76638"
        
        case "bug":
            return "90B742"
        
        case "dragon":
            return "115791"
        
        case "fairy":
            return "EA92EA"
        
        case "ghost":
            return "98658B"
        
        case "ice":
            return "55C8E7"

        case "normal":
            return "D4E2EA"

        case "psychic":
            return "C292FF"
        
        case "rock":
            return "963F27"
        
        case "steel":
            return "5E8C9E"

    }
}
const getPokemonIMG = async(pokemon) =>{
    const data = await getPokemonData(pokemon)
    return data.front_default

}
const showHideItems = () =>{

    const hideItems = document.querySelectorAll(".hide")
    
    
    for(item of hideItems){
        item.style.display = "flex"
    }



}
const hideItems = () =>{

    const hideItems = document.querySelectorAll(".hide")
    
    
    for(item of hideItems){
        item.style.display = "none"
    }



}
const showPokemonData = async(pokemon) =>{
    try{
        outError.innerText = ""
        const data = await getPokemonData(pokemon)

    
        outName.innerText=(data.name)
        outID.innerText=(data.id)

        outType1.innerText = (data.types[0].type.name)
    
        if(await isDoubleType(pokemon)){
       
            outType2.innerText = data.types[1].type.name
        }else{
        outType2.innerText = " Nenhum"
        }

        outWeight.innerText = data.weight
    

        outIMGpokemon.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png` )
    


        const colors =  await getListBackGroundColor(pokemon)
        console.log(colors)
        setBackgroundColor(colors)
    }catch (error){
        hideItems()
        outError.innerText = "Não foi possível encontrar esse pokémon"
    }

   

}
//Eventos
frm.addEventListener("submit", (e)=>{

    e.preventDefault()

    
    const pokeName = frm.inPokemonName.value.toLowerCase()

    const pokeData = getPokemonData(pokeName)
    
    showPokemonData(pokeName)
    showHideItems()
    
    
    
    


    
    
})