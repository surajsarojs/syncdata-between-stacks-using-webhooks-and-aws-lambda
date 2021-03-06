/**
 * Module dependencies.
 */

const express = require('express');
const Contentstack = require('contentstack');
const configVars = require('../config');

// Contentstack SDK initialization

const Stack = Contentstack.Stack(configVars.apiKey, configVars.accessToken, configVars.env);

const router = express.Router();

/**
 *
 * Below router function will make a api/sdk call to Contentstack and fetch the "privacy_policy" content-type for our privacy
 * page
 *
 */

router.get('/', (req, res) => {
  
  const Query = Stack.ContentType(configVars.contentTypeUid.privacyUid).Query();
  Query
    .toJSON()
    .find()
    .then((result) => {
      res.render('pages/privacy-page.html', { privacyData: result[0][0] });
    }).catch((err) => {
      console.log(err);
    });
});

module.exports = router;
