import React from "react";
import {Link} from "react-router-dom";
import s from './LandingPage.module.css';

export default function LandingPage(){
  return(
    <div className={s.landingPage}>
      <h1 className={s.texto}>API-FOOD</h1>
      <Link to='/home'><button className={s.botonIniciar} >Iniciar</button></Link>
    </div>
  )
}