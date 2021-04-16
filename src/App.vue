<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div>{{ name }}: {{ name2 }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup(props, { slots, attrs, emit }) {
    // --------- 1.reactive响应式 ---------
    // const state = reactive({
    //   name: 'joker',
    // })
    // setInterval(() => {
    //   state.name += '1'
    // }, 1000)
    // return state

    // --------- 2.ref响应式 ---------
    // { value: xxx }
    const nameRef = ref('joker')
    setInterval(() => {
      nameRef.value += '1'
    }, 1000)

    // 3.computed
    const computedNameRef = computed(() => {
      return nameRef.value + '2'
    })

    // 4.watch
    watchEffect(() => {
      console.log(nameRef.value)
    })

    return {
      name: nameRef,
      name2: computedNameRef,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
