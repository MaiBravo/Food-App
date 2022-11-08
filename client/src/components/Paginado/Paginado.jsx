import React from "react";
import s from "./Paginado.module.css";

export default function Paginado({recipesPerPage, allRecipes, paginado}){
  const pageNumber= [];

  for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
    pageNumber.push(i)
  }

  return(
    <nav>
      <ul className={s.paginado}>
        {
          pageNumber?.map(num=>(
            <li key={num} className={s.number}>
              <a onClick={()=>paginado(num)} >{num}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}