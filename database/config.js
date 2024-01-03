const mongoose = require('mongoose');

const dbConection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB on line');
    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicilalizar db')
    }
}

module.exports = {
    dbConection,
}