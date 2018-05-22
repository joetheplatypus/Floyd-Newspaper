const config = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const News = require('../models/News')

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
  },
  async info (req,res) {
    try {
      const user = await User.findOne({_id:req.userId})
      user.password = undefined
      res.send(user)
    } catch (err) {
      res.send(err)
    }
  },
  async get (req,res) {
    try {
      const user = await User.findOne({_id: req.params.id})
      user.password = undefined
      res.send(user)
    } catch (err) {
      res.send(err)
    }
  },
  async dash (req,res) {
    try {
      const user = await User.findOne({_id: req.userId})
      user.password = undefined
      let response = {}
      if(user.admin) {
        response.admin = true
        response.posts = await News.find({status:'pending'}).sort('-date')
        res.send(response)
      } else {
        response.admin = false
        response.posts = await News.find({status:'pending', posterId:user.id}).sort('-date')
        response.draftPosts = await News.find({status:'draft', posterId:user.id}).sort('-date')
        res.send(response)
      }
    } catch (err) {
      res.send(err)
    }
  },
}