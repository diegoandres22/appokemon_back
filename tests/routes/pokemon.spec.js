/* eslint-disable import/no-extraneous-dependencies */
const app = require('../../src/app.js');
const session = require('supertest');      //-session
const request = session(app);

// const { expect } = require('chai');
// const { Pokemons, conn } = require('../../src/db.js');

// const pokemons = {
//   name: 'Pikachu',
// };

describe('Pokemon routes', () => {
  describe('GET /pokemon/get/:id', () => {

    it('responde status 200', async () => {
      const respuest = await request.get('/pokemon/get/25').expect(200);
      expect(respuest.statusCode).toBe(200)
    });

    it("responde un objeto con las propiedades : id, nombre, imagen, vida, ataque, defensa", async () => {

      const response = await request.get('/pokemon/get/25');
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nombre");
      expect(response.body).toHaveProperty("imagen");
      expect(response.body).toHaveProperty("vida");
      expect(response.body).toHaveProperty("ataque");
      expect(response.body).toHaveProperty("defensa");

    });

    it("responde status 400 si ingresas un id que no existe", async () => {

      const respons = await request.get('/pokemon/get/1h975');

      expect(respons.statusCode).toBe(400)

    })
  });

  describe('post /pokemon/add', () => {

    const poke = {
      "nombre": "FUFURUFO",
      "imagen": "https://cdn.pixabay.com/photo/2019/12/04/13/12/dog-4672685_1280.png",
      "vida": 100,
      "ataque": 50,
      "defensa": 90,
      "velocidad": 19,
      "altura": 15,
      "peso": 40,
      "tipos": ["bbaf5eec-02bc-4ea8-95a8-f08b2c7aa827"]
    }

    it("Responde un objeto con las propiedades que posteaste", async () => {
      const respuest = await request.post('/pokemon/add').send(poke);

      expect(respuest.body).toHaveProperty("id");
      expect(respuest.body).toHaveProperty("nombre");
      expect(respuest.body).toHaveProperty("imagen");
      expect(respuest.body).toHaveProperty("vida");
      expect(respuest.body).toHaveProperty("ataque");
      expect(respuest.body).toHaveProperty("defensa");
      expect(respuest.body).toHaveProperty("velocidad");
      expect(respuest.body).toHaveProperty("altura");
      expect(respuest.body).toHaveProperty("peso");

    });
    const getpoke = {
      "id": "b257e5ca-0c00-46fb-9e4a-3abed162889c",
      "nombre": "FUFURUFO",
      "imagen": "https://cdn.pixabay.com/photo/2019/12/04/13/12/dog-4672685_1280.png",
      "vida": 100,
      "ataque": 50,
      "defensa": 90,
      "velocidad": 19,
      "altura": 15,
      "peso": 40,
      "types": [{"name": "normal"}]
    }
    it("Responde el objeto que recien creaste con el nombre que le asignaste aún estando en minuscula ", async () => {

      const responsi = await request.get('/pokemon/get/?nombre=fufurufo');

      expect(responsi.body).toContainEqual(getpoke);

    });
    it("Agrega poquemones a la bdd ", async () => {

      const responsi = await request.get('/pokemon/get/?nombre=fufurufo');

      expect(responsi.body).toContainEqual(getpoke);

    });

  })


});













// describe('Pokemon routes', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   beforeEach(() => Pokemons.sync({ force: true })
//     .then(() => Pokemons.create(pokemons)));
//   describe('GET http://localhost/pokemon/get/:id', () => {
//     it('should get 200', () =>
//       request.get('http://localhost/pokemon/get/25').expect(200)
//     );
//   });
// });
