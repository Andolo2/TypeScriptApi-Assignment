const mongoose = require('mongoose')

const initMongoDB = async () => {

	const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MonfoDV is running: ${conn.connection.host}`)
}

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/ 
mongoose.set('strictQuery', true);

//(node:15232) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
//(Use `node --trace-deprecation ...` to show where the warning was created)

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/ 

module.exports = initMongoDB