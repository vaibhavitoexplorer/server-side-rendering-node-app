const express = require('express');
const adminRouter = express.Router();
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const books = [
    {
      'title': 'Book 1',
      'genere': 'Amet elitr diam',
      'author': 'Invidunt dolor',
      "read": false
    }, {
      'title': 'Book 2',
      'genere': 'Amet elitr diam',
      'author': 'Invidunt dolor',
      "read": false
    },
    {
      'title': 'Book 3',
      'genere': 'Amet elitr diam',
      'author': 'Invidunt dolor',
      "read": false
    },
    {
      'title': 'Book 4',
      'genere': 'Amet elitr diam',
      'author': 'Invidunt dolor',
      "read": false
    },
    {
      'title': 'Book 5',
      'genere': 'Amet elitr diam',
      'author': 'Invidunt dolor',
      "read": false
    }
  ];

function router() {
    adminRouter.route('/').get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'liberaryApp';

        (async function mongo() {
            let client;
            try{
               client = await MongoClient.connect(url);
               debug('connected to mongoClient');
               const db = client.db(dbName);

               const response = await db.collection('books').insertMany(books); 
               return res.json(response);
            }
            catch(e) {
                debug(e.stack);
            }
        }());
    })

    return adminRouter;
}

module.exports = router;