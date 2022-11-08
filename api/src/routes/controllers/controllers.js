const axios= require('axios');
const {Recipe, Diet} = require('../../db')
const {API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7 }=process.env;

async function allRecipes() {
  const recipeApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY7}&addRecipeInformation=true&number=100`)

  const datosApi=await recipeApi.data.results.map(r=>{
    const obj={
      id: r.id,
      name: r.title,
      summary: r.summary,
      healthScore: r.healthScore,
      steps: r.analyzedInstructions[0]?.steps.map(r => { return r.step }),
      image: r.image,
      dishTypes: r.dishTypes + " ",
      diets: r.diets
    }
    return obj;
  })

  const datosDb=await Recipe.findAll({
    attributes: ['id', 'name', 'summary', 'healthScore', 'image', 'steps', 'dishTypes', 'createdInDb'],
    include:[
      {
        model: Diet,
        attributes: ['name'],
        through:{
          attributes:[]
        }
      }
    ]
  })

  let total=[...datosApi, ...datosDb];

  return total;
}


async function getRecipesId(id){
  id=parseInt(id);

  const recipeId= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY7}`)

  const datosApiId=recipeId.data;
    const obj={
      id: datosApiId.id,
      name: datosApiId.title,
      summary: datosApiId.summary,
      healthScore: datosApiId.healthScore,
      steps: datosApiId.analyzedInstructions[0]?.steps.map(r => { return r.step }),
      image: datosApiId.image,
      dishTypes: datosApiId.dishTypes + " ",
      diets: datosApiId.diets
    }
    return obj;
  }

  async function getRecipesDbId(id){
    return await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ['name'],
        through:{
          attributes: []
        }
      }
    })
  }



async function allDiet(){
  const typesDiets=["gluten free", "dairy free", "ketogenic", "vegetarian", "lacto vegetarian", "lacto ovo vegetarian", "ovo vegetarian", "vegan", "pescatarian","paleolithic", "primal", "fodmap friendly", "whole 30"]

  typesDiets.forEach(d=>{
    Diet.findOrCreate({
      where: {name: d}
    })
  })
  return await Diet.findAll()

}


module.exports={
  allRecipes,
  getRecipesId,
  getRecipesDbId,
  allDiet
}