const express = require("express");
const router = express.Router();
let Person = require("./personSchema");

let person = new Person({
    name : 'rania',
    age : 27,
    favoriteFoods : ['Pizza', 'Pasta', 'Borritos']
});

//Create an instance of person
router.post('/addPerson', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const favoriteFoods = req.body.favoriteFoods;

    newPerson
        .save()
        .then((newPerson) => res.json(newPerson))
        .catch((err) => res.status(400).json("Error" + err));
});

//Use model.find() to Search Your Database
router.get('/all', (req,res) => {
    Person.find()
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => console.log(err));
});

// Create many models
var arrayOfPeople = [
    {name: 'karim', age: 25, favoriteFoods: ['Tacos', 'Paella']},
    {name: 'John', age:18, favoriteFoods: ['Hamberger']},
    {name: 'Sarah', age: 55, favoriteFoods:['Salad', 'Pizza']}
];

router.post('/addPersons', (req,res) => {
    Person.create(arrayOfPeople)
        .then((Person) => res.json(Person))
        .catch((err) => res.status(400).json('Error: '+err));
});

// Use model.findOne() to Return a Single Matching Document from Your Database
router.get('/person/food/:food', (req,res,next) => {
    Person.findOne({favouriteFoods: req.params.food})
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {console.log(err)});
});

// Use model.findById() to Search Your Database By _id
router.get('/:id', (req,res) => {
    const { _id } = req.params;
    Person.findById({_id: req.params.id})
        .then((persons) => {
            res.send(persons);
        }).catch((err) => {console.log(err)});
});

//Use model.find() to Search Your Database(By name)
router.get("/persons/:name", function (req, res) {
    Person.find({
        name: req.params.name,
    }).exec(function (err, persons) {
        if (err) {
            res.send("error occured");
        } else {
            console.log(persons);
            res.json(persons);
        }
    });
});

//Perform Classic Updates by Running Find, Edit, then Save
router.get("/person/:id/:foodToadd", function (req, res) {
    Person.findById(req.params.id).exec(function (err, persons) {
        if (err) {
            res.send("error occured");
        } else {
            persons.favoriteFoods.push(req.params.foodToadd);
            res.json(persons);
        }
        persons
            .save()
            .then((Person) => res.json(Person))
            .catch((err) => res.status(400).json("Error: " + err));
        });
    });

    //Perform New Updates on a Document Using model.findOneAndUpdate()
    var ageToSet = 20;
    router.put('/editPerson/:name', (req,res) => {
        Person.findOneAndUpdate(
            { name: req.params.name },
            { $set: {age: ageToSet} },
            { new : true }
        ). then((persons) => {
            res.send(persons);
        }). catch((err) => console.log(err));
    })

    //Delete many Documents Using model.remove
    var nameToRemove = 'Mary';
    router.delete('/remove', (req, res) => {
        Person.remove(
            {
                name: "marry",
            },
            (err, personsRemoved) => {
                if (err) {
                    res.send("error deleting");
                } else {
                console.log("successfully deleted");
                res.send(personsRemoved);
                }
                }
            );
        });

    //Chain Search Query Helpers to Narrow Search Results
    router.get('/searchPerson/:food', (req, res) => {
        Person.find({favouriteFoods: req.params.food})
            .sort({name: 'desc'})
            .limit(2)
            .select('-age')
            .exec((err, data) => {
                err? res.status(400).send(err) : res.send(data);
                console.log(data);
            })
    })

    module.exports = router;
    