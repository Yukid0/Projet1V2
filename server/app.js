const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// create Adhérent
app.post('/insertA', (request, response) => {
    const { name } = request.body;
    const { age } = request.body;


    const db = dbService.getDbServiceInstance();

    const result = db.insertNewAdherent(name, age);


    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));


});
// create Prof
app.post('/insertP', (request, response) => {
    const { nom } = request.body;
    const { prenom } = request.body;


    const db = dbService.getDbServiceInstance();

    const result = db.insertNewProf(nom, prenom);


    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));


});
// create Cours 

app.post('/insertC', (request, response) => {
    console.log(request.body);
    const { date } = request.body;
    const { heuredebut } = request.body;
    const { heurefin } = request.body;
    const { id_prof } = request.body;
    const { groupe } = request.body;


    const db = dbService.getDbServiceInstance();
    const result = db.insertNewCours(date, heuredebut, heurefin, id_prof, groupe);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));


});

// read Adhérent
app.get('/getAlla', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllAData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});
//read Prof
app.get('/getAllp', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});
//read Cours
app.get('/getAllc', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllCData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

app.get('/searchn/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/searchg/:groupe', (request, response) => {
    const { groupe } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByGroupe(groupe);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});





app.listen(process.env.PORT, () => console.log('app is running')); // Savoir si le serveur local tourne 



