
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

    //Output div
    let output_div = document.getElementById("result-div");

    if(input[0] === false){
        window.alert(`Your input (${input[1]}) is not valid. \n 
            Please enter a valid input (i.e beaches, temples or countries)`);
        return;
    }else{

        //Clearer l'output
        clearOutput();

        //Fetch l'api
        fetch(api_url)
        .then(response => response.json())
        .then(data => {

            switch(input[1]){

                case "beaches" :

                    data.beaches.forEach(el => {

                        output_div.innerHTML+= `
                        
                                <div class="result-item">
                                    <hr class="border-8 border-[#07131eed] mr-2 mt-3 rounded-[1.5em]">

                                    <figure class=" mt-2 mr-2 text-black">
                                        <img src=${el.imageUrl} alt=${el.name} class=" rounded-t-[1em]">
                                        <figcaption class="bg-white text-center"> ${el.name}</figcaption>
                                        <aside class="bg-white rounded-b-[1em] p-2">
                                            <p>
                                                ${el.description}
                                            </p>
                                            <button class="mt-5 border-1 w-15 h-10 self-center pr-2 pl-2 rounded-xl bg-[#0a1520cd] cursor-pointer text-white"> Visit </button>
                                        </aside>
                                    </figure>
                                </div>
                        
                        `;
                        
                    });
                    
                    break;

                case "countries" :

                    data.countries.forEach(city => {

                        city.cities.forEach(el => {

                            output_div.innerHTML+= `

                                <div class="result-item">
                                    <hr class="border-8 border-[#07131eed] mr-2 mt-3 rounded-[1.5em]">

                                    <figure class=" mt-2 mr-2 text-black">
                                        <img src=${el.imageUrl} alt=${el.name} class=" rounded-t-[1em]">
                                        <figcaption class="bg-white text-center"> ${el.name}</figcaption>
                                        <aside class="bg-white rounded-b-[1em] p-2">
                                            <p>
                                                ${el.description}
                                            </p>
                                            <button class="mt-5 border-1 w-15 h-10 self-center pr-2 pl-2 rounded-xl bg-[#0a1520cd] cursor-pointer text-white"> Visit </button>
                                        </aside>
                                    </figure>
                                </div>
                        
                            `;
                            
                        });

                    });

                    break;

                case "temples" :

                    data.temples.forEach(el => {

                        output_div.innerHTML+= `
                        
                                <div class="result-item">
                                    <hr class="border-8 border-[#07131eed] mr-2 mt-3 rounded-[1.5em]">

                                    <figure class=" mt-2 mr-2 text-black">
                                        <img src=${el.imageUrl} alt=${el.name} class=" rounded-t-[1em]">
                                        <figcaption class="bg-white text-center"> ${el.name}</figcaption>
                                        <aside class="bg-white rounded-b-[1em] p-2">
                                            <p>
                                                ${el.description}
                                            </p>
                                            <button class="mt-5 border-1 w-15 h-10 self-center pr-2 pl-2 rounded-xl bg-[#0a1520cd] cursor-pointer text-white"> Visit </button>
                                        </aside>
                                    </figure>
                                </div>
                        
                        `;
                        
                    });

                    break;

            }

        });
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

function clearOutput(){

    //Clearer l'output div
    document.getElementById("result-div").innerHTML = ` ` ;
    document.getElementById("search-input").value = "";
    document.getElementById("search-input").focus();

}

/**Event listeners */
document.getElementById("search-button").addEventListener('click', getDestination, false);

document.getElementById("clear-button").addEventListener('click', clearOutput, false);