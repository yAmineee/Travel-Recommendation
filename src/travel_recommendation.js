
/** Cette fonction vérifie l'entrée de l'utilisateur :
 * + Fetch le fichier json si l'entrée est correcte.
 * + Affiche une alerte si l'entrée est incorrecte.
 */
function getDestination(){

    //Get l'input de l'utilisateur et change la casse en miniscule
    let destination = document.getElementById("search-input").value.toLowerCase();

    //URL de l'api à fetch
    let api_url = "./travel_recommendation_api.json"

    //Entrée de l'utilisateur encapsuler sous forme [bool,str]
    let input = isValidInput(destination);

    if(input[0] === false){
        window.alert(`Your input (${input[1]}) is not valid. \n 
            Please enter a valid input (i.e beaches, temples or countries)`);
        return;
    }else{

        //Fetch l'api
        fetch(api_url)
        .then(response => response.json())
        .then(data => {

            switch(input[1]){

                case "beaches" :
                    console.log(`Data : \n ${JSON.stringify(data.beaches)}`);
                    break;

                case "countries" :
                    console.log(`Data : \n ${JSON.stringify(data.countries)}`);
                    break;

                case "temples" :
                    console.log(`Data : \n ${JSON.stringify(data.temples)}`);
                    break;

            }

        })

    }

}

/**Fonction pour valider l'input de l'utilisateur */
function isValidInput(user_input){

    // Changer la casse
    let input = user_input.toLowerCase();

    if(input.substring(0,5) === "beach"){
        return [true,"beaches"];
    }

    if(input.substring(0,6) === "countr"){
        return [true,"countries"];
    }

    if(input.substring(0,6) === "temple"){
        return [true,"temples"];
    }

    return [false,user_input];

}

/**Event listeners */
document.getElementById("search-button").addEventListener('click', getDestination, false);