const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Recipe, DietType } = require("../db");
const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    "https://api.spoonacular.com/recipes/random?number=10&apiKey=" + API_KEY
  );
  const info = await apiUrl.data.recipes.map((element) => {
    return {
      name: element.title,
      summary: element.summary,
      puntuation: element.spoonacularScore,
      id: element.id,
      healthyFoodLevel: element.healthScore,
      stebByStep: element.instructions,
      image: element.image,
    };
  });
  return info;
};

//Obtener información de la base de datos.... corregir

const getInfoFromDb = async () => {
  return await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
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
  let dietDb = DietType.findAll({
    where: { name: dietType },
  });
  newRecipe.addDietType(dietDb);
  res.send("Receta creada exitosamente!");
});

router.get("/recipes/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  const recipesTotal = await getAllRecipes();
  const foundRecipe = await recipesTotal.find((rec) => rec.id === idReceta);
  if (!foundRecipe)
    return res.status(404).send("No existe una receta con ese ID");
  return res.send(foundRecipe);
});

//Get types de la api pendiente...
// router.get('/types', async(req,res)=>{

// })

module.exports = router;
