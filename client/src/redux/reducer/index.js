import { GET_ALL_RECIPES, GET_ALL_DIETS, FILTER_DIETS, ORDER_ALFABETICO, ORDER_HEALTHSCORE, NAME_RECIPES, CREATE_RECIPE, DETAIL_RECIPE, CLEAN} from "../actions";

const initialState={
  recipes: [],
  allRecipes: [],
  diets: [], 
  detail: {}
}

const rootReducer=(state=initialState, action)=>{
  switch(action.type){
    case GET_ALL_RECIPES:
      return{
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }


    case GET_ALL_DIETS:
      return{
        ...state,
        diets: action.payload
      }


    case NAME_RECIPES:
      if(typeof action.payload !== 'object') alert(action.payload)
      let recEncontrada =typeof action.payload === 'object'? action.payload : state.allRecipes
      return{
        ...state,
        recipes: recEncontrada
      }


    case DETAIL_RECIPE:
      return{
        ...state,
        detail: action.payload
      }


    case CREATE_RECIPE:
      return{
        ...state,
      }


    case CLEAN:
      return{
        ...state,
        detail: {}
      }


    case FILTER_DIETS:
      const allRecipe= state.allRecipes;
      const filterDiets= action.payload==='todos' ? allRecipe : allRecipe.filter(r=>r.diets.find(d=>d.name===action.payload || d===action.payload))
      if(!filterDiets.length){
        alert('No hay recetas con ese tipo de dieta')
      }
      return{
        ...state,
        recipes: filterDiets.length ? filterDiets : allRecipe 
      }


    case ORDER_ALFABETICO:
      const alfRecipes= state.recipes;
      const orderAlfab= action.payload==='asc' ? alfRecipes.sort((a,b)=>{
        if(a.name.toLowerCase() > b.name.toLowerCase()){
          return 1;
        }
        if(a.name.toLowerCase() < b.name.toLowerCase()){
          return -1;
        }
        return 0;
      }) : alfRecipes.sort((a,b)=>{
        if(a.name.toLowerCase() > b.name.toLowerCase()){
          return -1;
        }
        if(a.name.toLowerCase() < b.name.toLowerCase()){
          return 1;
        }
        return 0
      })

      return{
        ...state,
        recipes: orderAlfab
      }


    case ORDER_HEALTHSCORE:
      const healthRecipes= state.recipes;
      const orderHealth= action.payload==='menos' ? healthRecipes.sort((a,b)=>{
        if(a.healthScore > b.healthScore){
          return 1;
        }
        if(a.healthScore < b.healthScore){
          return -1;
        }
        return 0
      }) : healthRecipes.sort((a,b)=>{
        if(a.healthScore > b.healthScore){
          return -1;
        }
        if(a.healthScore < b.healthScore){
          return 1;
        }
        return 0;
      })
      return{
        ...state,
        recipes: orderHealth
      }


    default:
      return{
        ...state
      }

  }
}
export default rootReducer;