const express=require('express')
const router=express()
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes=require('./recipes');
const diets=require('./diets');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/diets', diets);


module.exports = router;
