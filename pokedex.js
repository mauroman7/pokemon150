const pokedex = document.getElementById('pokedex');  //lista ordenada

//primero un fetch para buscar a los bichos
const fetchPokemon = () => {
    const promises = [];                                                  //hago el aray de la promesa
    for (let i = 1; i <= 386; i++) {                                     //con este lupe hago que regresen del 1 al 386
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;           //dejo la url de la api para extraer los bichos
        promises.push(fetch(url).then((res) => res.json()));           //aplico las acciones de push y fetch a la url liego el then al json.
    }
    Promise.all(promises).then((results) => {             // promesa punto all para que en paralelo las llamadas asincronicas de promesas corran, al terminar se dispara el .then que accede al array de los resultados 
        const pokemon = results.map((result) => ({       //map hace que regrese un array donde los items se han transformado, nombre, imagen, tipo, id. esto va a result y tenemos un array de objetos encasquetados en los valore siguientes
            name: result.name,
            image: result.sprites['front_default'],   //los valores .result ya encasillados 
            type: result.types.map((type) => type.type.name).join(', '), //join. ayuda a que sea todo un string. para que tipos entren en el parentisis con coma en el medio
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};


const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon    //imprimimos
        .map(                           //le llamamos pokeman por ser graciosos, el .map transforma el string
                                        //le creamos clase a las cartas de image y title para el css
            (pokeman) => `     
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};


fetchPokemon();

