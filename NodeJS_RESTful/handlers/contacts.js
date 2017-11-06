'use strict';

 var repository = require('../lib/contactRepository');

 module.exports = {
     get: function contacts_get(req, res) {
         repository.all(res);
     },

     post: function contacts_post(req, res) {
         //console.log('req...'+req.body.contactObj.Name);
         repository.insert(req.body.contactObj, res);
     }
 };