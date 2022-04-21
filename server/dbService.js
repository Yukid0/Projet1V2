const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({  // Connexion BDD
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {               // Erreur de connexion
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {    // Contiens les fonctions qu'on utilisera pour GET/UPDATE/INSERT ou DELETE les données
    static getDbServiceInstance() {
        return instance ? instance : new DbService(); // Créé s'il n'y en a pas, une nouvelle instance de DbService
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(name,age) {
        try {
                let groupe;
                if (age >= 18) {
                    groupe = "Séniors";
                } else if (age >= 16) {
                    groupe = "Juniors";
                } else if (age >= 14) {
                    groupe = "Cadets";
                }else if (age >= 12) {
                    groupe = "Minimes";
                }else if (age >= 10) {
                    groupe = "Benjamins";
                }else if (age >= 8) {
                    groupe = "Poussins";
                }

            
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added, age, groupe) VALUES (?,?,?,?);";

                connection.query(query, [name, dateAdded, age, groupe] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded,
                age : age,
                groupe : groupe,
                
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    
}

module.exports = DbService;


