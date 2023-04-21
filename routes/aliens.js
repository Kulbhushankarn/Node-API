const express = require('express');
const alienRouter = express.Router();

module.exports = (Alien) => {
  // Route to get data filtered by name and tech
  alienRouter.get('/', (req, res) => {
    const { name, tech } = req.query;
    let query = Alien.find();

    if (name) {
      query = query.byName(name);
    }

    if (tech) {
      query = query.byTech(tech);
    }

    query.exec((err, aliens) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.json(aliens);
      }
    });
  });

  // Route to add a new data
  alienRouter.post('/', (req, res) => {
    const { name, tech, sub } = req.body;

    const newAlien = new Alien({
      name,
      tech,
      sub
    });

    newAlien.save((err, alien) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.json(alien);
      }
    });
  });

  // Route to update an existing data
  alienRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, tech, sub } = req.body;

    Alien.findByIdAndUpdate(
      id,
      { name, tech, sub },
      { new: true },
      (err, alien) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.json(alien);
        }
      }
    );
  });

  // Route to delete an data
  alienRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Alien.findByIdAndDelete(id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.json({ message: 'Data deleted successfully' });
      }
    });
  });

  return alienRouter;
};
