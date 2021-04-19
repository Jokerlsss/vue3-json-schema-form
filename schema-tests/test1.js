// ajv 使用
const Ajv = require('ajv')
// 错误信息语言转换
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // customeTest: false,
      errorMessage: '这是不对的',
      minLength: 10
    },
    email: {
      type: 'string',
      // format: 校验 (只支持string和number)
      // format: 'test'
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

// {allErrors: true, jsonPointers: true}: use ajv-errors required
const ajv = new Ajv({allErrors: true, jsonPointers: true})

require('ajv-errors')(ajv)

// 自定义校验format
// ajv.addFormat('test',(data) => {
//   return data === 'haha'
// })

// 自定义关键字
ajv.addKeyword('customeTest',{
  /**
   * 1.validate: Most easy to custom.
   */
  // validate(schema, data){
  //   if(schema === true) return true
  //   else return schema.length === 6
  // }

  /** 
   * 2.compile: return a function, and run in compile.
   * parentSchema: show its schema.
   */
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   return ()=> true
  // }

  /**
   * 3.metaSchema: Define the type of keyword.
   */
  // metaSchema: {
  //   type: 'boolean'
  // },

  /**
    * 4.macro: Include the property of schema, and use in everywhere easier.
    * Similar of SCSS's mixin.
    */
  macro() {
    return {
      minLength: 10
    }
  }
})

const validate = ajv.compile(schema)
const valid = validate(data)

if (!valid) {
  localize.zh(validate.errors)
  console.log('--------- 校验失败 ---------')
  console.log(validate.errors)
  return
}
console.log('--------- 校验成功 ---------')
