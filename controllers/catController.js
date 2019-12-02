'use strict';
const catModel = require('../models/catModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');



const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};

const cat_create_post = async(req, res) => {
  //createthumbnail
  try {
    await resize.makeThumbnail(req.file.path, 'thumbnails/' + req.file.filename, {width: 160, height: 160},);
//add coords
    const coords = await imageMeta.getCoordinates(req.file.path);
    console.log('coords', coords);

    const params = [req.body.name, req.body.age, req.body.weight, req.body.owner, req.file.filename, coords];
    console.log(params);
    const response = await catModel.addCat(params);
    console.log(response);
    const cat = await catModel.getCat([response.insertId]);
    await res.json(cat);
  } catch(e) {
    console.log('error', e.message);
    res.status(400).json({message: 'error'});
  }
};

const cat_get = async (req, res) => {
const params = [req.params.id];
const cat = await catModel.getCat(params);
await res.json(cat[0]);

};

const cat_modify = async(req, res) => {

  const params = [req.body.name, req.body.age, req.body.weight, req.body.owner, req.body.id];
  console.log(params);
  const response = await catModel.updateCat(params);
  console.log(response);
  console.log(response.error);
  const cat = await catModel.getCat([response.insertId]);
  await res.json(cat);
};

const cat_delete = async(req, res) => {
  const params = [req.params.id];
  console.log(params);
  const response = await catModel.deleteCat(params);
  await res.json(response);
};



module.exports = {
  cat_get,
  cat_list_get,
  cat_create_post,
  cat_modify,
  cat_delete,
};
