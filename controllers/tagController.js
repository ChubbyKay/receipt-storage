const db = require('../models')
const Tag = db.Tag

const tagController = {
  getTags: (req, res) => {
    return Tag.findAll({
      raw: true,
      nest: true
    }).then(tags => {
      if (req.params.id) {
        Tag.findByPk(req.params.id)
          .then((tag) => {
            return res.render('user/tags', {
              tags: tags,
              tag: tag.toJSON()
            })
          })
      } else {
        return res.render('user/tags', { tags: tags })
      }
    })
  },
  postTag: (req, res) => {
    return Tag.create({
      name: req.body.name
    }).then(tags => {
      return res.redirect('/user/tags')
    })
  },
  putTag: (req, res) => {
    return Tag.findByPk(req.params.id)
      .then((tag) => {
        tag.update(req.body)
          .then((tag) => {
            res.redirect('/user/tags')
          })
      })
  },
  deleteTag: (req, res) => {
    return Tag.findByPk(req.params.id)
      .then((tag) => {
        tag.destroy()
          .then((tag) => {
            res.redirect('/user/tags')
          })
      })
  }
}
module.exports = tagController
