const db = require('../../models')

const tagService = require('../../services/tagService')

const tagController = {
  getTags: (req, res) => {
    tagService.getTags(req, res, (data) => {
      return res.json(data)
    })
  },
  postTag: (req, res) => {
    tagService.postTag(req, res, (data) => {
      return res.json(data)
    })
  },
  putTag: (req, res) => {
    tagService.putTag(req, res, (data) => {
      return res.json(data)
    })
  },
  deleteTag: (req, res) => {
    tagService.deleteTag(req, res, (data) => {
      return res.json(data)
    })
  }
}
module.exports = tagController