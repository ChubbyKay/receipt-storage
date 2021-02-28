const tagService = require('../services/tagService')

const tagController = {
  getTags: (req, res) => {
    tagService.getTags(req, res, (data) => {
      return res.render('user/tags', data)
    })
  },
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
  deleteTag: (req, res) => {
    tagService.deleteTag(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/tags')
      }
    })
  }
}
module.exports = tagController
