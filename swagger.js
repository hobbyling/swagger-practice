// 引入
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Meta Api', // 文件名稱
    description: '示範範例' // 描述
  },
  host: 'localhost:3000', // 本地端：localhost:3000 / heroku:根據heroku網址，可以將此參數放到環境變數
  schemes: ['http', 'https'], // 此swagger文件支援的模式
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'headers',
      name: 'authorization',
      description: '請加上 API Token'
    }
  },
  definitions: {
    getPost: {
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
}

// 宣告輸出
const outputFile = './swagger.json'

// 注入進入點，可以放多個，通常只會有一個進入點
const endpointsFiles = ['./app.js']

// 輸出的檔案, 讀取的檔案, 生成的資料格式
swaggerAutogen(outputFile, endpointsFiles, doc)