const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: false },
    vida: { type: DataTypes.STRING, allowNull: false },
    ataque: { type: DataTypes.STRING, allowNull: false },
    defensa: { type: DataTypes.STRING, allowNull: false },
    velocidad: { type: DataTypes.STRING },
    altura: { type: DataTypes.STRING },
    peso: { type: DataTypes.STRING },

  }, { timestamps: false });
};
