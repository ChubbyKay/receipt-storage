const db = require('../models')
const Tag = db.Tag

const tagService = {
  getTags: (req, res, callback) => {
    return Tag.findAll({ raw: true, nest: true })
      .then(tags => {
        if (req.params.id) {
          Tag.findByPk(req.params.id)
            .then((tag) => {
              callback({ tags: tags, tag: tag.toJSON() })
            })
        } else {
          return callback({ tags: tags })
        }
      })
  },
  postTag: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "請填寫標籤名稱" })
    } else {
      return Tag.create({
        name: req.body.name
      }).then((tag) => {
        callback({ status: 'success', message: '已成功新增標籤' })
      })
    }
  },
  putTag: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "請填寫標籤名稱" })
    } else {
      return Tag.findByPk(req.params.id)
        .then((tag) => {
          tag.update(req.body)
            .then((tag) => {
              callback({ status: 'success', message: '已成功修改標籤' })
            })
        })
    }
  },
  deleteTag: (req, res, callback) => {
    return Tag.findByPk(req.params.id)
      .then((tag) => {
        tag.destroy()
          .then((tag) => {
            callback({ status: 'success', message: '' })
          })
      })
  },
}
module.exports = tagService