require("dotenv").config();
const { Pokemons, Types } = require('../db');
const axios = require("axios");
const { Op } = require('sequelize');
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const urlApi = "https://pokeapi.co/api/v2/pokemon"


const getPokemons = async () => {
    const pokemons = await Pokemons.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });

    return pokemons;
};


const getPokemonsById = async (id) => {

    if (id.length > 20) {
        const pokemonFound = await Pokemons.findByPk(id, {
            include: {
                model: Types,
                attributes: ['name'],
                through: { attributes: [] }
            }

        });

        if (pokemonFound) return pokemonFound;
    }

    const response = await axios(`${URL_API}/${id}`);
    const pokemon = response.data;

    const pokeApi = {
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
    return pokeApi;

}

const getPokemonsByName = async (name) => {

    const pokedb = await Pokemons.findAll({
        where: {
            nombre: {
                [Op.iLike]: `%${name}%`
            }
        }, include: {
            model: Types,
            attributes: ['name'],
            through: { attributes: [] }
        }

    })

    if (pokedb[0]) {
        return pokedb[0];
    }
    else {
        const nameMin = name.toLowerCase();
        const response = await axios(`${URL_API}/${nameMin}`);
        const pokemon = response.data;

        const pokeapi = {
            id: pokemon.id,
            nombre: pokemon.name,
            imagen: pokemon.sprites.other.dream_world.front_default,
            vida: pokemon.stats[0].base_stat,
            ataque: pokemon.stats[1].base_stat,
            defensa: pokemon.stats[2].base_stat,
            velocidad: pokemon.stats[5].base_stat,
            altura: pokemon.height,
            peso: pokemon.weight,
            tipos: pokemon.types.map((type) => type.type.name),
        };

        return pokeapi;
    }
};
//---------------------------------------------------------------------------
const postPokemon = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos) => {

    const [newPoke, created] = await Pokemons.findOrCreate({
        where: {
            nombre
        },
        defaults: {
            nombre, imagen, vida, ataque, defensa, velocidad, altura, peso
        }
    });

    if (tipos && tipos.length > 0) {
        const tipoFound = await Types.findAll({
            where: {
                id: tipos
            }
        })

        await newPoke.setTypes(tipoFound);

    }
    return newPoke;
}


const deletePokemon = async (id) => {

    const poke = await Pokemons.findByPk(id);

    if (!poke) return { error: "No existe pokemon con ese id" };

    await Pokemons.destroy({
        where: {
            id
        }
    })


    return "Pokemon eliminado correctamente";
}

const updatePokemon = async (id, nombre, imagen, vida, ataque, defensa, velocidad, altura, peso) => {

    const Poke = await Pokemons.update(
        {
            nombre,
            imagen,
            ataque,
            defensa,
            vida,
            velocidad,
            altura,
            peso
        }, {
        where: {
            id
        }
    });

    return Poke;
}
///////////////////////////////////// POKEMONS OF API---------------------

const getApiPokemons = async () => {

    let result = [];

    for (let i = 1; i < 100 + 1; i++) {

        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = response.data;

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
    return result;
}

module.exports = {
    getPokemons,
    getPokemonsById,
    getPokemonsByName,
    postPokemon,
    updatePokemon,
    deletePokemon,
    getApiPokemons
}
