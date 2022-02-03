const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { Recipe, DietType } = require("../db");
const { API_KEY } = process.env;
//TODO: Modularizar esta vuelta

const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const info = await apiUrl.data.results.map((element) => {
    return {
      id: element.id,
      name: element.title,
      summary: element.summary,
      puntuation: element.spoonacularScore,
      dietType: element.diets.map((diet) => diet),
      healthyFoodLevel: element.healthScore,
      stebByStep: element.instructions,
      image: element.image,
    };
  });
  return info;
};

/*getInfoFromDb me incluye el modelo DietType con el atributo para incluir name */

const getInfoFromDb = async () => {
  const db = await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      // through: { attributes: [] },
    },
  });
  return db;
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getInfoFromDb();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipeName = await recipesTotal.filter((rec) =>
      rec.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send("No existe ninguna receta con ese nombre");
  } else res.status(200).send(recipesTotal);
});

router.get("/recipe", async (req, res) => {
  const espera = await getInfoFromDb();
  res.send(espera);
});
router.post("/recipe", async (req, res) => {
  const {
    name,
    summary,
    puntuation,
    id,
    healthyFoodLevel,
    stebByStep,
    image,
    dietType,
    createdByDb,
  } = req.body;
  let newRecipe = await Recipe.create({
    name,
    summary,
    puntuation,
    id,
    healthyFoodLevel,
    stebByStep,
    image,
    createdByDb,
  });
  let dietDb = await DietType.findAll({
    where: { name: dietType },
  });
  newRecipe.addDietType(dietDb);
  res.send(newRecipe);
  // res.send("Receta creada exitosamente!");
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let foundRecipe = await recipesTotal.filter((rec) => rec.id == id);
    foundRecipe.length
      ? res.status(200).json(foundRecipe)
      : res.status(404).send("No existe una receta con ese ID");
  }
});

//Get types de la api pendiente...

//Buscar documentación del array.flat()
router.get("/types", async (req, res) => {
  const dietApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const diets = dietApi.data.results.map((d) => d.diets);
  const dietEach = diets.map((el) => {
    for (let i = 0; i < el.length; i++) return el[i];
  });
  dietEach.forEach((element) => {
    DietType.findOrCreate({
      where: { name: element },
    });
  });
  const allDiets = await DietType.findAll();
  res.send(allDiets);
});

module.exports = router;
