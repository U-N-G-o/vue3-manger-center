<template>
  <div class="echarts">
    <TodoChart />
    <Clock />
    <TodoList />
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, onMounted } from 'vue'
  import variables from '@/assets/styles/variables.scss'
  import Consts from '@/consts'
  import TodoChart from './todo-chart'
  import Clock from './clock'
  import TodoList from './todo-list'

  export default defineComponent({
    name: 'Workbench',
    components: { TodoChart, Clock, TodoList },
  })
</script>

<style lang="scss">
  .echarts {
    width: 100%;
    display: grid;
    grid-template-columns: 720px 400px;
    grid-template-rows: 300px 480px;
    justify-content: center;
    align-items: center;
  }
</style>