const News = require('../models/News')
const User = require('../models/User')

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
      if(req.query.cat) {
        let category = ''
        if(req.query.cat === 'school-news') {
          category = 'School News'
        } else if(req.query.cat === 'world') {
          category = 'World'
        } else if(req.query.cat === 'politics') {
          category = 'Politics'
        }
        items = await News.find({category:category, status:'approved'}).sort('-date')
        res.send(items)
      } else {
        items = await News.find({status:'approved'}).sort('-date')
        res.send(items)
      }
      
    } catch (err) {
      res.send(err)
    }
  },
  async get (req,res) {
    try {
      item = await News.findOne({_id: req.params.itemId, status:'approved'})
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
  },
  async getPreview (req, res) {
    try {
      const user = await User.findOne({_id:req.userId})
      const newsItem = await News.findOne({_id:req.params.itemId})
      if(user.admin || user.id === newsItem.posterId) {
        res.send(newsItem)
      } else {
        const error = 'not authorised to preview this post'
        res.send({error:error})
      }
    } catch (err) {
      res.send(err)
    }
  },
  async putPreview (req, res) {
    try {
      const user = await User.findOne({_id:req.userId})
      const newsItem = await News.findOne({_id:req.params.itemId})
      if(user.admin || user.id === newsItem.posterId) {
        item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
      res.send(item)
      } else {
        const error = 'not authorised to preview this post'
        res.send({error:error})
      }
    } catch (err) {
      res.send(err)
    }
  },
}