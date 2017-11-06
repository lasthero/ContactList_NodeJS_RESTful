 'use strict';

 var repository = require('../../lib/contactRepository');

 module.exports = {
     get: function contacts_get(req, res) {
         repository.get(req.params['id'], res);
     }, 

     put: function contacts_post(req, res) {
         //repository.insert(req, res);
     },
     DELETE: function contacts_delete(req, res) {
         //console.log('req...'+req.body.contactObj.Name);
         repository.remove(req.params['id'], res);
     }
 };