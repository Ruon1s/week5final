'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT wop_cat.cat_id, wop_cat.name, wop_cat.age, wop_cat.weight, wop_user.name as ownername, wop_cat.filename FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getCat = async(params) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_cat WHERE cat_id = ?;',
        params,
    );
    return rows;
  } catch(e) {
    console.log(e);
  }
};

const addCat = async(params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);',
        params,
    );
    return rows;
  }catch(e) {
    console.log('error', e.message);
    return {error: 'error in database query'};
  }
};

const updateCat = async(params) => {
  console.log('updatecat called');
  try {
    const [rows] = await promisePool.execute(
        'UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE wop_cat.cat_id = ?;',
        params,
    );
    console.log(rows);
    console.log('database query succesful');
    return rows;
  }catch(e){
    console.log('error', e.message);
    return {error: 'error in database query'};

  }
};
const deleteCat = async(params) => {
  console.log(params);
  console.log('deletecat called');
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM wop_cat WHERE wop_cat.cat_id = ?;',
        params,
    );
    console.log('database query successful');
    return rows;
  }catch(e){
    console.log('error', e.message);
    return {error: 'error in database query'};

  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat
};