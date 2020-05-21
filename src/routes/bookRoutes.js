const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {

  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'liberaryApp';

      (async function mongo() {
          let client;
          try{
             client = await MongoClient.connect(url);
             debug('connected to mongoClient');
             const db = client.db(dbName);

             const response = await db.collection('books').find().toArray(); 
             res.render('booksListView', {
              title: 'Book Store',
              nav,
              bookArray: response
            });
          }
          catch(e) {
              debug(e.stack);
          }
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'liberaryApp';
      const { id } = req.params;
      debug(id); 
      (async function mongo() {
        let client;
        try{
           client = await MongoClient.connect(url);
           debug('connected to mongoClient1');
           const db = client.db(dbName);

           const col = await db.collection('books');
           const response = await col.findOne({ _id: new ObjectID(id)}); 
           debug(response);
           res.render('bookView', {
            title: 'Book Store',
            nav,
            book: response
          });
        }
        catch(e) {
            debug(e.stack);
        }
    }());
      
    });

    return bookRouter;
}

module.exports = router;