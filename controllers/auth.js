const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')



//Пользователь
module.exports.login = async function(req, res) {

	const condidate = await User.findOne({email:req.body.email})
		if (condidate) {
			//Пользователь существует, Проверить пароль
			const passwordResult = bcrypt.compareSync(req.body.password, condidate.password)
			if (passwordResult) {
				//Генерация токена, пароли совпали
				const token = jsonwebtoken.sign({
					email: condidate.email,
					userId: condidate._id
				}, keys.jsonwebtoken, {expiresIn: 60 * 60})
				
				res.status(200).json({
					token: `Bearer ${token}`
				})
			} 
		else{
			// Пароли не совпали
			res.status(401).json({
				message: 'Passwords do not match, please try again'
				})	
		}	
}
		else{
			// Пользователя нет, ошибка!
				res.status(404).json({
					message: 'User with email address, not found'
				})
		}
}

//Регистрация
module.exports.register = async function(req, res) {
	
	const condidate =  await User.findOne({email:req.body.email})
		if (condidate ) {
			//Пользователь существует, нужно отправить ошибку
			res.status(409).json({
				message: 'This email address is exist! Try another one'
			})
		}
		else
	{
		// Нужно создать пользователя
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt)
		})
		
		try {
			await user.save()
			res.status(201).json(user)
		} 
		catch (error) {
			errorHandler(res, error)
			
		}
		
	}

} 