const Router= require('express');
const router= Router();
const { allDiet } = require('./controllers/controllers');

router.get('/', async (req, res, next)=>{
  try {
    const typesDiet= await allDiet();
    res.status(201).json(typesDiet)
  } catch (error) {
    next(error);
  }
})
module.exports=router;