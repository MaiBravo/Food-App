const Router = require('express');
const router = Router();
const { allRecipes, getRecipesId, getRecipesDbId } = require('./controllers/controllers.js')
const { Recipe, Diet } = require('../db')

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  const allRecipess = await allRecipes();
  try {
    if (name) {
      const recipesName = allRecipess.filter(r => r.name.toLowerCase().includes(name.toLowerCase()))
      recipesName.length ?
        res.status(200).json(recipesName) :
        res.status(404).send('La receta no existe')
    } else {
      return res.status(200).json(allRecipess);
    }
    
  } catch (error) {
    next(error)
  }
})


router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  let detailDb = id.includes("-")
  try {
    if (detailDb) {
      return res.json(await getRecipesDbId(id));
    } else {
      return res.json(await getRecipesId(id))
    }
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) => {
  const { diets } = req.body;
  try {
    const recipe = await Recipe.create(req.body)
    let diet = await Diet.findAll({ where: { name: diets } })
    recipe.addDiet(diet)
    res.status(201).json({ msg: 'Recipe creado' })
  } catch (error) {
    next(error)
  }
})

module.exports = router;