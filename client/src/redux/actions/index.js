import axios from "axios";

export const GET_ALL_RECIPES='GET_ALL_RECIPES';
export const GET_ALL_DIETS='GET_ALL_DIETS';
export const NAME_RECIPES='NAME_RECIPES';
export const FILTER_DIETS='FILTER_DIETS';
export const ORDER_ALFABETICO='ORDER_ALFABETICO';
export const ORDER_HEALTHSCORE='ORDER_HEALTHSCORE';
export const DETAIL_RECIPE='DETAIL_RECIPE';
export const CREATE_RECIPE='CREATE_RECIPE';
export const CLEAN='CLEAN';

export function getAllRecipes(){
  return async function(dispatch){
    let pedidoBackRecipe= await axios.get(`http://localhost:3001/recipes`)
    dispatch({
      type: GET_ALL_RECIPES,
      payload: pedidoBackRecipe.data
    })
  }
}

export function getAllDiets(){
  return async function(dispatch){
    let pedidoBackDiets= await axios.get(`http://localhost:3001/diets`)
    dispatch({
      type: GET_ALL_DIETS,
      payload: pedidoBackDiets.data
    })
  }
}

export function getNameRecipes(name){
  return async function(dispatch){
    try {
      let nameRecipes= await axios.get(`http://localhost:3001/recipes?name=${name}`) 
      dispatch({
        type: NAME_RECIPES,
        payload: nameRecipes.data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: NAME_RECIPES,
        payload: error.response.data
      })
    }
  }
}

export function detailRecipe(id){
  return async function(dispatch){
    try {
      let detailID= await axios.get(`http://localhost:3001/recipes/${id}`)
      dispatch({
        type: DETAIL_RECIPE,
        payload: detailID.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function createRecipe(payload){
  return async function(){
    try {
      return await axios.post(`http://localhost:3001/recipes`, payload)
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByDiets(payload){
  return{
    type: FILTER_DIETS,
    payload
  }
}

export function orderAscDesc(payload){
  return{
    type: ORDER_ALFABETICO,
    payload
  }
}

export function orderHealthScore(payload){
  return{
    type: ORDER_HEALTHSCORE,
    payload
  }
}

export function clean(){
  return{
    type: CLEAN
  }
}
