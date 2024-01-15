import express from 'express';
import User from './models/user.js';
import ExDate from './models/date.js';

const router = express.Router();

/** 
* Adds a user to db
* @req has a body that contains an object with all the required fields of a user
* @returns user as an object
**/
router.post('/user', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send({ user });
  } catch (e) {
    res.send(e);
  }
});

/** 
* Looks for user in database
* @id in params is the deviceId
* @returns user if found
**/
router.get('/:id/user', async (req, res) => {
  const deviceId = req.params.id;

  try {
    const user = await User.findOne({ deviceId });

    if (!user) {
      return res.send('User not found');
    }
    res.send(user);
  } catch (e) {
    res.send('Internal error');
  }
});

/**
* Gets all of a user's dates
* @id in params is the device id
* @returns array of objects which represent each date
**/
router.get('/:id/allmydates', async (req, res) => {
  const deviceId = req.params.id;

  try {
    User.findOne({ deviceId })
      .populate('dates')
      .exec((err, user) => {
        if(err){
          return res.send("Error")
        }
        return res.send(user.dates)
      })
  } catch (e) {
    res.send();
  }
});

/** 
 * Adds a date to a user specified by deviceId
 * @id in params is the device id
 * @req contains a body that contains the info for the new date
 * @returns the update user with the new date
**/
router.post('/:id/date', async (req, res) => {
  const deviceId = req.params.id;
  try {
    const user = await User.findOne({ deviceId });

    if (!user) {
      return res.send('User not found');
    }

    const exDate = new ExDate(req.body);

    await exDate.save()
    console.log("date saved")

    await user.dates.push(exDate);
    await user.save()

    res.send(user);
  } catch (e) {
    res.send('Could not add date');
  }
});

/** 
 * Deletes a date with the specified _id the the request
 * @id in params is device id
 * @returns the date that was deleted
**/
router.delete('/:id/date', async (req, res) => {
  const deviceId = req.params.id
  const _id = req.body._id

  try {
    const exDate = await ExDate.findOneAndDelete({_id})

    if(!exDate) {
      return res.status(404).send('Date not found')
    }

    const user = await User.findOne({deviceId})
    user.dates.splice(user.dates.indexOf(_id), 1)
    user.save()

    res.send(exDate)
  } catch (e) {
    res.status(500).send()
  }
})

/**
 * Updates the info of a date of a specified user
 * @id in params is the id of the date to be updated
 * @updates in req is an array of objects that each contains an update
 *      Ex. [{name: newUsername}, {age: newAge}]
 * @returns the updated date
**/
router.patch('/date/update', async (req, res) => {
  const _id = req.body._id

  try {
    const exDate = await ExDate.findOne({_id})

    req.body.updates.forEach((update) => {
      exDate[Object.keys(update)[0]] = update[Object.keys(update)[0]]
    })

    exDate.save()

    res.send(exDate)
  } catch (e) {
    res.status(500).send()
  }
})

export default router;
