import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getAllDiets, createRecipe } from "../../redux/actions";
import s from './RecipeCreate.module.css'

const validate = (input) => {
  let errors = {};

  if (!input.name) errors.name = 'Debe ingresar nombre';
  if (!/^[a-zA-Z ]*$/.test(input.name)) errors.name = 'Nombre invalido: solo debe contener letras';


  if (!input.summary) errors.summary = 'Debe ingresar resumen del plato';

  if (!input.healthScore) errors.healthScore = 'Debe ingresar nivel de comida saludable';
  if (input.healthScore < 0 || input.healthScore > 100) errors.healthScore = 'El valor debe estar entre 0 - 100';

  if (!input.steps) errors.steps = 'Debe ingresar los pasos';

  if (!input.diets.length) errors.diets = 'Debe seleccionar algun tipo de dieta';


  return errors;
}


export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diet = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "https://th.bing.com/th/id/R.0d03000e370206d8f5d2eb7eb81f03ed?rik=tDzBQpYGPiWlZA&pid=ImgRaw&r=0",
    dishTypes: "sin tipo de plato",
    diets: []
  })


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }


  const handleSelect = (e) => {
    setInput({
      ...input,
      diets: [...new Set([...input.diets, e.target.value])]
    })
    setErrors(validate({
      ...input,
      diets: [...input.diets, e.target.value]
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    dispatch(createRecipe(input));
    alert('Su receta fue creada');
    setInput({
      name: "",
      summary: "",
      healthScore: "",
      steps: "",
      image: "https://th.bing.com/th/id/R.0d03000e370206d8f5d2eb7eb81f03ed?rik=tDzBQpYGPiWlZA&pid=ImgRaw&r=0",
      dishTypes: "sin tipo de plato",
      diets: []
    })
    history.push('/home');
  }


  const handleDelete=(e)=> {
    setInput({
      ...input,
      diets: input.diets.filter(d => d !== e)
    })
  }


  useEffect(() => {
    dispatch(getAllDiets())
  }, [])


  return (
    <div className={s.todo}>

      <Link to='/home'><button className={s.btnVolver}>Volver</button></Link>

      <h1 className={s.tituloG}>Crear receta</h1>

      <form onSubmit={handleSubmit}>


        <div className={s.cont}>
          <label><b className={s.titulo}>Nombre: </b></label>
          <input type='text' value={input.name} name='name' onChange={handleChange} className={s.dato} placeholder="Ingrese nombre" />
          {
            errors.name ? (<h4 className={s.err}>{errors.name}</h4>) : (false)
          }
        </div>


        <div className={s.cont}>
          <label><b className={s.titulo}>Resumen del plato: </b></label>
          <input type='text' value={input.summary} name='summary' onChange={handleChange} className={s.dato} placeholder="Ingrese resumen..." />
          {
            errors.summary ? (<h4 className={s.err}>{errors.summary}</h4>) : (false)
          }
        </div>


        <div className={s.cont}>
          <label><b className={s.titulo}>Nivel de comida saludable: </b></label>
          <input type='number' value={input.healthScore} name='healthScore' onChange={handleChange} className={s.dato} placeholder="0" />
          {
            errors.healthScore ? (<h4 className={s.err}>{errors.healthScore}</h4>) : (false)
          }
        </div>


        <div className={s.cont}>
          <label><b className={s.titulo}>Pasos: </b></label>
          <input type='text' value={input.steps} name='steps' onChange={handleChange} className={s.dato} placeholder="Ingrese pasos..." />
          {
            errors.steps ? (<h4 className={s.err}>{errors.steps}</h4>) : (false)
          }
        </div>


        <div className={s.cont}>
          <label><b className={s.titulo}>Tipos de dietas: </b></label>
          <select onChange={handleSelect} className={s.dato} >
            <option hidden>Seleccionar</option>
            {
              diet.map((d) => (
                <option value={d.name} key={d.name}>{d.name}</option>
              ))
            }
          </select>
          {
            errors.diets ? (<h4 className={s.err}>{errors.diets}</h4>) : (false)
          }
          <ul className={s.selecDiet}>{input.diets.map(d => d + ", ")}</ul>
        </div>


        <div>
          {
            input.diets.length === 0 || Object.keys(errors).length ?
            (<button disabled type="submit" className={s.btnCrearD}>Crear</button>) :
            <button type="submit" className={s.btnCrear}>Crear</button>
          }
        </div>


      </form>

          {
            input.diets.map(el =>
              <div className={s.del}>
                <p>{el}</p>
                <button className={s.botonX} onClick={() => handleDelete(el)}>X</button>
              </div>
            )
          }

    </div>
  )
}

