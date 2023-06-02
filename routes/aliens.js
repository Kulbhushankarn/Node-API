const express = require('express');
const alienRouter = express.Router();

module.exports = (Alien) => {
  // Route to get data filtered by name and tech
  alienRouter.get('/', (req, res) => {
    const { email, password } = req.query;
    let query = Alien.find();

    if (email) {
      query = query.byEmail(email);
    }

    if (password) {
      query = query.bypassword(password);
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
    const { email, password, sub } = req.body;

    const newAlien = new Alien({
      email,
      password,
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
    const { email, password, sub } = req.body;

    Alien.findByIdAndUpdate(
      id,
      { email, password, sub },
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
        res.json({ message: 'Data Deleted Successfully' });
      }
    });
  });

  return alienRouter;

};