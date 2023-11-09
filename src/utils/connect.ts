import mongoose from "mongoose";
import logger from '../utils/logger';
const assert = require('assert').strict;

const connect = async () => {
    const DATABASE_URI = process.env.DATABASE_URI as string;
    try{
        await mongoose.connect(DATABASE_URI);
        logger.info("Connection to the Database successful.");
    } catch (error){
        logger.error("Could not connect to the Database");
        assert.ok(DATABASE_URI, 'The "DATABASE_URI" environment variable is required')
        process.exit(1);
    }
};

export default connect;