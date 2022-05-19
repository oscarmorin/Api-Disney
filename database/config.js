const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        mongoose.connect( process.env.MONGODB_CNN );

        console.log('Database Online');
        
    } catch (error) {

        console.log(error)
        throw new Error('Error database initialiting');
    }

}

module.exports = {
    dbConnection
};