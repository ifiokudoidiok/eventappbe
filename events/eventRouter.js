const express = require('express');

const dbEvent = require('./eventDb');

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', validateEventId, getEventById);
eventRouter.post('/', postEvent);
eventRouter.delete('/:id', validateEventId, deleteEvent);
eventRouter.put('/:id', validateEventId, editEvent);


function editEvent(req, res) {
  dbEvent.update(req.event.id, req.body)
      .then(() => {
        res.status(200).json({...req.event, ...req.body});
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Could not Update Event: ' + error,
        });
      });
}

function deleteEvent(req, res) {
  dbEvent.remove(req.event.id)
      .then(() => {
        res.status(200).json({message: 'Deleted succesfully'});
      })
      .catch((error) => {
        res.status(500).json({
          errorMessage: 'Could not Delete, Server error: '+error});
      });
}

function postEvent(req, res) {
  dbEvent.insert(req.body)
      .then((event) => {
        res.status(201).json(event);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error adding the new event: ' + error.message,
        });
      });
}

function getEventById(req, res) {
  res.json(req.event);
}

function getAllEvents(req, res) {
  dbEvent.get().then((events) => {
    res.status(200).json(events);
  })
      .catch((error) => {
        res.status(500).json({
          errorMessage: 'info not available: ' + error,
        });
      });
}

// custom middleware

function validateEventId(req, res, next) {
  const id = req.params.id;
  dbEvent.getById(id)
      .then((event) => {
        if (event) {
          req.event = event;
          next();
        } else {
          res.status(404).json({message: 'Event id does not correspond with an actual Event'});
        }
      })
      .catch((error) => {
        res.status(404).json({message: 'invalid event id: ' + error.message});
      });
}


module.exports = eventRouter;
