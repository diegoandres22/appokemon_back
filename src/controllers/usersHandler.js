require("dotenv").config();
const { Users } = require('../db');


const getUsers = async () => {
    const users = await Users.findAll();

    return users;
};

const postUser = async (email, password) => {

    const newUser = {
        email,
        password
    }

    const user = await Users.create(newUser);
    return user;
}

const deleteUser = async (id) => {

    const user = await Users.findByPk(id);

    if (!user) return {error: "No existe usuario con ese id"};

    await Users.destroy({
        where: {
            id
        }
    })

    return "usuario eliminado correctamente";
}

const getUserByEmail = async (email) => {

    const useer = await Users.findAll({
        where: {
            email: email
        }
    });

    if (!useer.length) return { error: "No hay usuario con ese email" };

    return useer;
}


module.exports = {
    getUsers,
    postUser,
    deleteUser,
    getUserByEmail
}