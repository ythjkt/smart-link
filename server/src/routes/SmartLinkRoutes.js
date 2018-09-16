const express = require('express');
const validUrl = require("valid-url");
const shortid = require("shortid");
const SmartLink = require('../models/SmartLink');

const app = express();
const router = express.Router();

const BASE_URL = 'localhost:6200'

// Get item by id
router.route('/:hash').get((req, res) => {
  const urlCode = req.params.hash;
  SmartLink.findOne({urlCode})
    .then(item => {
      if (item) {
        return res.redirect(item.targetUrl);
      } else {
        return res.status(401).send('No such url');
      }
    });
});

// Get all urls
router.route('/').get((req, res) => {
  SmartLink.find()
  .then(items => {
    return res.json(items);
  })
});

// Generate Url
router.route('/').post((req, res) => {
  const { targetUrl } = req.body;
  console.log(targetUrl);
  if (validUrl.isUri(targetUrl)) {
    const urlCode = shortid.generate();
    const smartLink = `${BASE_URL}/${urlCode}`;
    const item = new SmartLink({
      targetUrl,
      smartLink,
      urlCode,
    });
    item.save()
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    })
  }
});
  
module.exports = router;
