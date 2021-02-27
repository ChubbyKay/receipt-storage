const db = require('../models')
const Tag = db.Tag
const tagService = require('../services/tagService')

const tagController = {
  getTags: (req, res) => {
    tagService.getTags(req, res, (data) => {
      return res.render('user/tags', data)
    })
  },
  // getTags: (req, res) => {
  //   return Tag.findAll({
  //     raw: true,
  //     nest: true
  //   }).then(tags => {
  //     if (req.params.id) {
  //       Tag.findByPk(req.params.id)
  //         .then((tag) => {
  //           return res.render('user/tags', {
  //             tags: tags,
  //             tag: tag.toJSON()
  //           })
  //         })
  //     } else {
  //       return res.render('user/tags', { tags: tags })
  //     }
  //   })
  // },
  postTag: (req, res) => {
    tagService.postTag(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        res.redirect('/tags')
      }
    })
  },
  putTag: (req, res) => {
    tagService.putTag(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        req.flash('success_messages', data['message'])
        res.redirect('/tags')
      }
    })
  },
  // putTag: (req, res) => {
  //   return Tag.findByPk(req.params.id)
  //     .then((tag) => {
  //       tag.update(req.body)
  //         .then((tag) => {
  //           res.redirect('/tags')
  //         })
  //     })
  // },
  deleteTag: (req, res) => {
    tagService.deleteTag(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/tags')
      }
    })
  }

  // deleteTag: (req, res) => {
  //   return Tag.findByPk(req.params.id)
  //     .then((tag) => {
  //       tag.destroy()
  //         .then((tag) => {
  //           res.redirect('/tags')
  //         })
  //     })
  // }
}
module.exports = tagController
