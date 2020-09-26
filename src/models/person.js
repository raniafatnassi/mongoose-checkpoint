// Create person instance
let personModel = require('./personSchema');

let person = new personModel({
    name : 'rania',
    age : 27,
    favoriteFoods : ['Pizza', 'Pasta', 'Borritos']
});

//Create an instance of person
person.save((err, data) => {    
    if (err)
        return done(err);
    return done(null, data);
    });

// Create many models
var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, data) {
        if (err) {
            done(err);
        }
        done(null, data);
    });
    
};

//Use model.find() to Search Your Database
personModel
    .find({
    name: 'rania'   // search query
    })
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

// Use model.findOne() to Return a Single Matching Document from Your Database
var findOneByFood = function(food, done) {
    Person.findOne({favoriteFoods: food}, function(err, data) {
    console.log(food)
    console.log(data)
    if(err) return done(err);
    return done(null, data);
    });
    };

// Use model.findById() to Search Your Database By _id
var findPersonById = function(personId, done) {   
        Person.findById(personId, function(err, data){
            if(err) { done(err); }
            else { done(null,data); }
    })  
    };

//Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = function(personId, done) {
    var foodToAdd = "hamburger";
    Person.findById(personId, function(err, data) {
        if (err) {
        done(err);
        }

    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => (err ? done(err) : done(null, data)));
    });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = function(personName, done) {
    var ageToSet = 20;

    Person.findOneAndUpdate(
        {name: personName},
        {$set: {age: ageToSet}},
        {new: true},
        (err, data) => {
            if (err) return done(err, data);
            return done(null, data);
        }
    );
};

//Delete One Document Using model.findByIdAndRemove
var removeManyPeople = function(done) {
    var nameToRemove = 'Mary';
    Person.deleteMany(
        {name: nameToRemove},
        (err, data) => {
            if (err) {
                done(err);
            }
        done(null, data);
        }
    )
};

//Chain Search Query Helpers to Narrow Search Results
var queryChain = function(done) {
    var foodToSearch = "burrito";
    Person.find({favoriteFoods:foodToSearch}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
        if(err)
            done(err);
        done(null, data);
    })
};