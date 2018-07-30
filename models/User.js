const mongoost = require('mongoose')
const Schema = mongoost.Schema


const userSchema = new Schema({
	email:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	}

})




module.exports = mongoost.model('users', userSchema)