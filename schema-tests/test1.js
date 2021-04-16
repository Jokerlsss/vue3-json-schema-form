// ajv 使用
const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      // format: 校验 (只支持string和number)
      format: 'test'
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      // 1.数组每项的数据类型都一样
      // items: {
      //   type: 'string'
      // }

      // 2.可单独配置数组的每一项数据类型
      items: [
        {
          type: 'string'
        },
        {
          type: 'number'
        }
      ]
    },
    isWorker: {
      type: 'boolean'
    },
  },
  required: ['name', 'age']
}

const data = {
  name: 'joker',
  email:'111',
  age: 12,
  pets: [
    'dog',
    1,
  ],
  isWorker: true
}

const ajv = new Ajv()
// 自定义校验format
ajv.addFormat('test',(data) => {
  return data === 'haha'
})

const validate = ajv.compile(schema)
const valid = validate(data)

if (!valid) {
  console.log('--------- 校验失败 ---------')
  console.log(validate.errors)
  return
}
console.log('--------- 校验成功 ---------')
