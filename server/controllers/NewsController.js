const News = require('../models/News')

module.exports = {
  async post (req,res) {
    try {
      if(req.body.posterId !== req.userId) {
        throw `cannot post as someone else a${req.body.posterId} b${req.userId}`
      }
      req.body.date = new Date()
      const item = await News.create(req.body)
      res.send(item)
    } catch (err) {
      res.send(err)
    }
  },
  async index (req,res) {
    try {
      items = await News.find({})
      res.send(items)
    } catch (err) {
      res.send(err)
    }
  },
  async get (req,res) {
    try {
      item = await News.findOne({_id: req.params.itemId})
      res.send(item)
    } catch (err) {
      res.send(err)
    }
  },
  async put (req,res) {
    try {
      if(req.body.posterId !== req.userId) {
        throw 'cannot post as someone else'
      }
      item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
      res.send(item)
    } catch (err) {
      res.send(err)
    }
  },
  async delete (req, res) {
    try {
      item = await News.findOne({_id: req.params.itemId})
      if(item.posterId !== req.userId) {
        throw 'cannot post as someone else'
      }
      cb = await News.deleteOne({_id: req.params.itemId})
      res.send(cb)
    } catch (err) {
      res.send(err)
    }
  }
}