const News = require('../models/News')
const User = require('../models/User')

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
        res.send({error:'Cannot post as someone else'})
        return
      }
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
  }
  // async putPreview (req, res) {
  //   try {
  //     const user = await User.findOne({_id:req.userId})
  //     const newsItem = await News.findOne({_id:req.params.itemId})
  //     if (newsItem.status === 'pending' && !user.admin) {
  //       res.send({error:'Cannot update post while it is pending approval'})
  //       return
  //     }
  //     if (user.admin || user.id === newsItem.posterId) {
  //       req.body.date = new Date()
  //       item = await News.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
  //     res.send(item)
  //     } else {
  //       const error = 'not authorised to preview this post'
  //       res.send({error:error})
  //     }
  //   } catch (err) {
  //     res.send(err)
  //   }
  // },
}