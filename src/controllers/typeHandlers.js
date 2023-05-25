require("dotenv").config();
const { Types } = require('../db');
const axios = require("axios");

const url_api_tipes = "https://pokeapi.co/api/v2/type";

const getTypeOfPokemons = async () => {

    const types = await Types.findAll();

    return types;
};

const postType = async (name) => {

    const newType = {
        name
    };

    const type = await Types.create(newType);

    return type;
}
const deleteType = async (id) => {

    const type = await Types.findByPk(id);

    if (!type) return { error: "No existe tipo con ese id" };

    await Types.destroy({
        where: {
            id
        }
    })

    return "Tipo eliminado correctamente"
}
const postTypeBdd = async () => {

    // const newType = { name };
    // const type = await Types.create(newType);
    let types = await Types.findAll();

    const response = await axios.get(`${url_api_tipes}`);
    const apiTypes = response.data.results.map((type) => ({
        name: type.name,
    }));
    types = await Types.bulkCreate(apiTypes);

    return "tipos cargados con éxito";
}
const getApiByType = async (type) => {

    let result = [];

    for (let i = 1; i < 100; i++) {

        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = response.data;

        let verification = pokemon.types.map(type => type.type.name)

        if (verification.includes(type)) {

            let pokeApi = {
                id: pokemon.id,
                nombre: pokemon.name,
                imagen: pokemon.sprites.other.dream_world.front_default,
                vida: pokemon.stats[0].base_stat,
                ataque: pokemon.stats[1].base_stat,
                defensa: pokemon.stats[2].base_stat,
                velocidad: pokemon.stats[5].base_stat,
                altura: pokemon.height,
                peso: pokemon.weight,
                types: pokemon.types.map((type) => type.type.name),
            };
            result.push(pokeApi);
        }
    }
    if (!result.length) return { error: "No hay pokemones con ese tipo" };

    return result;
};

module.exports = {
    getTypeOfPokemons,
    postType,
    deleteType,
    getApiByType,
    postTypeBdd
}