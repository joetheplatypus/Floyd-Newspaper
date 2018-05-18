const config = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  async register (req,res) {
    try {
      let creds = req.body
      if(req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)
        creds.password = hashedPassword
      }     
      const user = await User.create(creds)
      const token = jwt.sign({id:user._id}, config.secret, {
        expiresIn: 86400
      })
      user.password = undefined
      res.send({auth:true,user:user,token:token})
    } catch (err) {
      res.send(err)
    }
  },
  async login (req,res) {
    try {
      const user = await User.findOne({email:req.body.email})
      if(!user) {
        res.send({auth: false, token:null})
        return;
      }
      const pwdMatch = bcrypt.compareSync(req.body.password, user.password)
      if(!pwdMatch) {
        res.send({auth: false, token:null})
        return;
      } else {
        const token = jwt.sign({id:user._id}, config.secret, {
          expiresIn: 86400
        })
        user.password = undefined
        res.send({auth:true,user:user,token:token})
      }
    } catch (err) {
      res.send(err)
    }
  }
}