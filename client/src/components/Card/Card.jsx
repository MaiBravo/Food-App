import React from "react";
import s from './Card.module.css';

export default function Card({image, name, diets, dishTypes, healthScore}){
  return(
    <div className={s.card}>
      <h2>{name}</h2>
      <label ><b className={s.titulo}>Tipo de dieta: </b></label>
      <p>{diets}</p>
      <label><b className={s.titulo}>Tipo de plato: </b></label>
      <p>{dishTypes}</p>
      <label><b>Nivel de comida saludable:</b> </label>
      <p>{healthScore}</p>
      <img src={image} alt='img' width='160px' height='160px' />
    </div>
  )
}