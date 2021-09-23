const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('events');
}

function getById(id) {
  return db('events')
      .where({id})
      .first();
}


function insert(event) {
  return db('events')
      .insert(event)
      .then((ids) => {
        return getById(ids[0]);
      });
}

function update(id, changes) {
  return db('events')
      .where({id})
      .update(changes);
}

function remove(id) {
  return db('events')
      .where('id', id)
      .del();
}
