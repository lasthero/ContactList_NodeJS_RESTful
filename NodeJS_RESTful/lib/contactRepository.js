'use strict';
//var connectionString = "Driver={SQL Server Native Client 11.0};Server=tcp:achou.database.windows.net,1433;Database=AChou_Demo;Uid=achou@achou;Pwd=chihho1977!;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;";
//var sql = require('node-sqlserver-unofficial');
var contact = require('../models/contact').Contact;
var jp = require('jsonpath')
var Promise = require('promise');
var Connection = require('tedious').Connection;
var config = {
    userName: 'achou@achou',
    password: 'test',
    server: 'achou.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'AChou_Demo', rowCollectionOnDone:true }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
// If no error, then good to proceed.
    if (err) return console.error(err);

    console.log("Connected");
});
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

  function GetAllContacts(id, callback){      
        var result = [];
        var query = "SELECT * FROM Contacts"

        if (id && id > 0)
            query += " WHERE Id=" + id;

        var request = new Request(query, function (err, rowCount) {
            if (err) {
                reject(err);
            }
            if (rowCount > 0) {
                //console.log("result: " + result);
                //return result;
            }
            callback(err, result);
        });

        request.on('row', function (columns) {
            var rowResult = new Object();

            columns.forEach(function (column) {
                if (column.metadata.colName === null) {
                    console.log('Column name is null');
                } else {

                    rowResult[column.metadata.colName] = column.value;
                }
            });
            result.push(rowResult);
            //console.log(result);
        });

       // request.on('done', function (rowCount, more) {
       //     console.log('Request done');
       // });
        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log('GetAll done in proc');          
        });
        connection.execSql(request);        
  }

  function InsertNewContact(obj, callback){

      console.log('Inserting...'+obj);

      contact = obj;
      
      //console.log('Obj...'+obj);
      var query = "INSERT INTO Contacts VALUES('"+contact.Name+"', '"+contact.Email+"', '"+contact.Tel+"')";
      //console.log('query...'+query);
      var request = new Request(query, function (err, rowCount) {
            if (err) {
                reject(err);
            }
            if (rowCount > 0) {
                //console.log("result: " + result);
                //return result;
            }
            callback(err, rowCount);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log('Insert done in proc');          
        });
        connection.execSql(request);
  }

  function DeleteContact(id, callback){
      console.log('Deleting...'+id);

      //console.log('Obj...'+obj);
      var query = "DELETE FROM Contacts WHERE ID="+id;
      //console.log('query...'+query);
      var request = new Request(query, function (err, rowCount) {
            if (err) {
                reject(err);
            }
            if (rowCount > 0) {
                //console.log("result: " + result);
                //return result;
            }
            callback(err, rowCount);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            console.log('Delete done in proc');          
        });
        connection.execSql(request);
  }

  module.exports = {
      get: function (id, res) {
          //return jp.query(contacts, '$..[?(@.id==' + id + ')]');
          GetAllContacts(id, function (err, result) {
              res.json(result);
          });
      },
      all: function (res) {          
          GetAllContacts(0, function (err, result) {
              res.json(result);
          });          
      },
      insert: function (obj, res){
          InsertNewContact(obj, function(err, result){
            res.json(result);      
          });
      },
      remove: function (id, res){
          DeleteContact(id, function(err, result){
            res.json(result);      
          });
      }
  };
