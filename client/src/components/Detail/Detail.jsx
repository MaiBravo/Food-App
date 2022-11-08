import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { detailRecipe } from "../../redux/actions";
import s from './Detail.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const {id}=useParams();

  useEffect(() => {
    dispatch(detailRecipe(id));
  }, [dispatch, id]);

  const recipeDetail = useSelector((state) => state.detail)

  return (
   
    <div className={s.todo}>
     {recipeDetail.name ? 
        <div>
            <div>
            <Link to='/home'><button className={s.boton}>Volver</button></Link>
              <p className={s.name}><b>Nombre: </b>{recipeDetail.name} </p>
            </div>

              <img src={recipeDetail.image} className={s.imagen} />

            <div>
              <p className={s.detail}><b>Resumen del plato:</b> {recipeDetail.summary?.replace(/<[^>]*>/g, '')} </p>
            </div>

            <div>
              <p className={s.detail}><b>Nivel de comida saludable:</b> {recipeDetail.healthScore ? recipeDetail.healthScore : '0'} </p>
            </div>

            <div className={s.detail}>
              <b>Pasos: </b>
              {
                recipeDetail.steps? typeof recipeDetail.steps === 'object' ? recipeDetail.steps.map(p=>(
                  <p>{p}</p>
                )) : recipeDetail.steps
                :'No contiene pasos' 
              } 
            </div>

            <div>
              <p className={s.detail}><b>Tipo de plato:</b> {recipeDetail.dishTypes ? recipeDetail.dishTypes : 'No contiene tipo de plato'} </p>
            </div>

            <div>
              <p className={s.detail}><b>Tipo de dieta:</b> {!recipeDetail.createdInDb ? recipeDetail.diets + ' ' : recipeDetail.diets.map(d => d.name + (', '))} </p>
            </div>

          </div> : <p className={s.loading}>Cargando...</p> }      
    </div>
   
  )

}
