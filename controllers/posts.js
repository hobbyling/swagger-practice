const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../model/post');

const posts = {
  async getPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '取得全部貼文 API'
     * #swagger.responses[200] = {
        description: '貼文資訊',
        schema : { $ref: "#/definitions/getPost"}
      }
      * #swagger.responses[500] = {
        description: '貼文資訊',
        schema: {
          "status": "false",
          "error": "name 未填寫"
        }
      }
     */
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '新增貼文 API'
     * #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: '資料格式',
        schema: {
          $name: 'Hobby',
          tags: ['團購'],
          $type: 'group',
          $content: '飲料喝起來'
        }
      }
     * #swagger.responses[200] = {
        description: '貼文資訊',
        schema: {
          "status": "success",
          "data": [
            {
              "_id": "62663ca2342842342",
              "name": "Hobby",
              "tags": ["LINE"],
              "image": "",
              "content": "hello, hobby is here",
            },
          ]
        }
      }
     */
    try {
      const { body } = req;

      if (body.content) {
        const newPost = await Posts.create({
          name: body.name,
          content: body.content,
          tags: body.tags,
          type: body.type
        })
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async getPost(req, res) {
    const { id } = req.params
    res.status(200).json(id)
  },
  async deletePost(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.security = [{ "apiKeyAuth": [] }]
     * #swagger.parameters[id]= {
        in: 'path',
        type: 'String',
        required: true
      }
     * }
     */
    const { id } = req.params
    if (!id) {
      res.status(400).json({
        status: false,
        message: '刪除失敗'
      })
    }
    res.status(200).json({
      status: true,
      message: '刪除成功'
    })
  }
}

module.exports = posts;
