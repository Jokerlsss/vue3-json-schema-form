<template>
  <div class="hello">
    {{ age }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 需要加 as const 才能让 age 不变成 undefind 类型
// const: 只读, 可以让 vue 理解该对象为 required: true
const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true,
  },
} as const

export default defineComponent({
  name: 'HelloWorld',
  props: PropsType,
  mounted() {
    this.age
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
