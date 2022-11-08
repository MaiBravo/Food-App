import React from "react";
import { useDispatch } from "react-redux"; 
import { useState } from "react";
import { getNameRecipes } from "../../redux/actions";
import s from './SearchBar.module.css'

export default function SearchBar({setPagActual}){
  const dispatch=useDispatch();
  const [name, setName]=useState('');

  const handleInputChange=(e)=>{
    e.preventDefault();
    setName(e.target.value);
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(getNameRecipes(name))
    setName('');
    setPagActual(1);
  }

  return(
    <div className={s.container}>
      <input type='text' placeholder='Buscar nombre...' onChange={handleInputChange} className={s.searchBar} />
      <button type="submit" onClick={handleSubmit} className={s.boton}>Buscar</button>
    </div>
  )
}