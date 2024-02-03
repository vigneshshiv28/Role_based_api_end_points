const mongoose = require('mongoose');
const dotenv = require('dotenv');
const setup = require('./setup.js');

console.log(process.env.MONGO_URL);


dotenv.config({path:__dirname+'/.env'});

describe('MongoDB Connection', () => {
    it('should connect to the MongoDB server', async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        expect(mongoose.connection.readyState).toBe(1);
    });
});
