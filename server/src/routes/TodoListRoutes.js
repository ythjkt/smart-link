const express = require('express');
const app = express();
const router = express.Router();

const TodoList = require('../models/TodoList');

// Get item by id
router.route('/:id').get((req, res) => {
    var id = req.params.id;
    TodoList.findById(id, (err, item) => {
        res.json(item);
    });
});

// Get all items
router.route('/').get((req, res) => {
    TodoList.find((err, items) => {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

// Add item
router.route('/').post((req, res) => {
    var item = new TodoList(req.body);
    item.save()
    .then(item => {
        res.json('Added');
    })
    .catch(err => {
        res.status(400).send('unable to save to database');
    })
});

// Update item
router.route('/:id').put((req, res) => {
    TodoList.findById(req.params.id, (err, item) => {
        if (!item) {
            return next(new Error('Could not load document'));
        } else {
            item.desc = req.body.desc;

            item.save()
            .then(item => {
                res.json('Updated');
            })
            .catch(err => {
                res.status(400).send('unable to update the database')
            })
        }
    });
});

// Delete Specific
router.route('/:id').delete(function (req, res) {
    TodoList.findByIdAndRemove({_id: req.params.id},
        function(err, item){
            if(err) res.json(err);
            else res.json('Deleted');
      });
});
  
module.exports = router;
