const db = require('../models')
const Tag = db.Tag

const tagController = {
  getTags: (req, res) => {
    return Tag.findAll({
      raw: true,
      nest: true
    }).then(tags => {
      return res.render('user/tags', { tags: tags })
    })
  },
  postTag: (req, res) => {
    return Tag.create({
      name: req.body.name
    }).then(tags => {
      return res.redirect('/user/tags')
    })
  }
}
module.exports = tagController
