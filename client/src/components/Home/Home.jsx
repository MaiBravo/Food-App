import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDiets, getAllRecipes, filterByDiets, orderAscDesc, orderHealthScore, clean } from '../../redux/actions';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import s from './Home.module.css'

export default function Home() {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes) 
  const allDiets = useSelector((state) => state.diets)

  const [orden, setOrden] = useState('');
  const [pagActual, setPagActual] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const indexOfLastRecipe = pagActual * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const recipeActual = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const paginado = (pageNumber) => {
    setPagActual(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
    dispatch(clean())
  }, [dispatch])


  const handleClickReload = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
    setPagActual(1);
  }

  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value))
    setPagActual(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  const handleOrderAlfab = (e) => {
    e.preventDefault();
    dispatch(orderAscDesc(e.target.value))
    setPagActual(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  const handleOrderHealthScore = (e) => {
    e.preventDefault();
    dispatch(orderHealthScore(e.target.value));
    setPagActual(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <>
    {recipeActual.length > 0 ? 

    <div className={s.todo}>
      <div>
        <h1 className={s.titulo}>API-FOOD</h1>
      </div>

      <div>
        <button onClick={handleClickReload} className={s.cargarRec}>Volver a cargar</button>
        <Link to='/recipes'><button className={s.crearRec}>Crear receta</button></Link>
      </div>

      <div className={s.searchBar}>
        <SearchBar
          setPagActual={setPagActual}
        />
      </div>

      <div className={s.filtros}>
        <select onChange={handleFilterDiets} className={s.filtro}>
          <option hidden>Tipo de dieta:</option>
          <option value='todos'>Todos</option>
          {
            allDiets.map(diets => (
              <option value={diets.name} key={diets.name} >{diets.name}</option>
            ))
          }
        </select>


        <select onChange={handleOrderAlfab} className={s.filtro}>
          <option hidden>Orden alfabetico:</option>
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>


        <select onChange={handleOrderHealthScore} className={s.filtro}>
          <option hidden>Nivel de comida saludable:</option>
          <option value='mas'>Mas saludable</option>
          <option value='menos'>Menos saludable</option>
        </select>
      </div>


      <div className={s.paginado}>
        {
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        }
      </div>

      <div className={s.card}>
        {
          recipeActual?.map((r) => {
            return (
              <div key={r.caard}>
                <Link key={r.iid} to={'/recipes/' + r.id}>
                  <Card name={r.name} image={r.image} dishTypes={r.dishTypes} healthScore={r.healthScore} diets={r.createdInDb ? r.diets.map(d => d.name + ', ') : r.diets + ' '} />
                </Link>
              </div>
            )
          })
        }
      </div>
    </div> : <p className={s.loading}>Cargando... </p> } </>
  )
}