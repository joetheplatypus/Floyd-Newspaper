const News = require('../models/News')
const User = require('../models/User')
const Loki = require('lokijs')
const db = require('../server')

const loadCollection = function (colName, db) {
  return new Promise(resolve => {
      db.loadDatabase({}, () => {
          const _collection = db.getCollection(colName) || db.addCollection(colName);
          resolve(_collection);
      })
  })
}

module.exports = {
  async post (req,res) {
    try {
      if(req.body.posterId !== req.userId) {
        res.send({error: `Cannot post as someone else`})
        return
      }
      const user = await User.findOne({_id:req.userId})
      if(user.admin) {
        res.send({error: `Admin accounts cannot create posts`})
        return
      }
      req.body.date = new Date()
      const item = await News.create(req.body)
      res.send(item)
    } catch (err) {
      res.send({error: err})
    }
  },
  async index (req,res) {
    try {
      const limit = parseInt(req.query.limit) || 0
      const start = parseInt(req.query.start) || 0
      if(req.query.cat) {
        items = await News.find({category:req.query.cat, status:'approved'}).skip(start).limit(limit).sort('-date')
        res.send(items)
      } else {
        items = await News.find({status:'approved'}).skip(start).limit(limit).sort('-date')
        res.send(items)
      }
      
    } catch (err) {
      res.send(err)
    }
  },
  async indexFeatured (req,res) {
    try {
      if(req.query.cat) {
        items = await News.find({category:req.query.cat, status:'approved', featured:true}).sort('-date')
        res.send(items)
      } else {
        items = await News.find({status:'approved', featured:true}).sort('-date')
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
      const newsItem = await News.findOne({_id:req.params.itemId})
      const user = await User.findOne({_id:req.userId})
      if(newsItem.status === 'draft') {
        if(newsItem.posterId === req.userId) {
          req.body.date = new Date()
          item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
          res.send(item)
        } else {
          res.send({error:'Cannot post as someone else'})
        }
      } else if(newsItem.status === 'pending') {
        if(user.admin) {
          req.body.date = new Date()
          item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
          res.send(item)
        } else {
          res.send({error:'Cannot edit a post pending approval'})
        }
      } else {
        if(user.admin) {
          item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
          res.send(item)
        } else {
          res.send({error:'Need to be admin to edit active post'})
        }
      }
    } catch (err) {
      res.send({error:err})
    }
  },
  async delete (req, res) {
    try {
      const user = await User.findOne({_id:req.userId})
      item = await News.findOne({_id: req.params.itemId})
      if(item.posterId == req.userId || user.admin) {
        cb = await News.deleteOne({_id: req.params.itemId})
        res.send(cb)
      } else {
        throw 'cannot post as someone else'
      }
      
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
  async uploadImg (req, res) {
    try {
      res.send({filename: req.file.filename})
    } catch (err) {
        res.sendStatus(400);
    }
  }
}