import { createApp, defineComponent, reactive, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const img = require('./assets/logo.png') // eslint-disable-line

// 1.JSX特性：可以使用函数来复用组件
function renderHelloWorld(num: number) {
  // 2.JSX特性：可以校验组件的 props 类型
  return <HelloWorld age={num}></HelloWorld>
}

export default defineComponent({
  // 闭包
  setup() {
    const state = reactive({
      name: 'joker JSX',
    })

    const numberRef = ref(1)

    setInterval(() => {
      state.name += '1'
      numberRef.value += 1
    }, 1000)

    return () => {
      const number = numberRef.value

      // ---- JSX ----
      return (
        <div id="app">
          <img src={img} alt="Vue logo" />
          <p>{state.name + ':' + number}</p>
          {renderHelloWorld(111)}
        </div>
      )
    }
  },
})
