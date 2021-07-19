<template>
  <div ref="todoChart" id="todo-chart"></div>
</template>

<script lang="ts">
  // @ts-nocheck
  import {
    defineComponent,
    inject,
    computed,
    reactive,
    ref,
    onMounted,
    watch
  } from 'vue'
  import { useStore } from '@/store'
  import variables from '@/assets/styles/variables.scss'
  import Consts from '@/consts'

  export default defineComponent({

    setup() {
      const store = useStore()
      const todoList = computed(() => store.state.todoModule.todoList)
      const todoChart = ref(null)
      const echarts = inject('echarts')

      const xAxisData = []
      todoList.value.map(item => {
        xAxisData.push(item.day)
      })

      const doneContent = computed(() => {
        const data = []
        todoList.value.map(item => {
          data.push(item.todo.filter(todo => todo.status === true))
        })
        return data
      })

      const todoContent = computed(() => {
        const data = []
        todoList.value.map(item => {
          data.push(item.todo.filter(todo => todo.status === false))
        })
        return data
      })

      const done = computed(() => {
        const data = []
        doneContent.value.map(item => data.push(item.length))
        return data
      })

      const todo = computed(() => {
        const data = []
        todoContent.value.map(item => data.push(item.length))
        return data
      })

      const emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      const option = {
        legend: {
          data: ['done', 'todo'],
          left: '10%'
        },
        brush: {
          toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
          xAxisIndex: 0
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {}
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false }
        },
        yAxis: {},
        grid: {
          bottom: 100
        },
        series: [
          {
            name: 'done',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: done.value
          },
          {
            name: 'todo',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: todo.value
          }
        ]
      };

      onMounted(() => {
        const myChart = echarts.init(todoChart.value)

        const renderBrushed = (params) => {
          var brushed = [];
          var brushComponent = params.batch[0];

          for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
            var rawIndices = brushComponent.selected[sIdx].dataIndex;
            brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
          }

          myChart.setOption({
            title: {
              backgroundColor: '#333',
              text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
              bottom: 0,
              right: '10%',
              width: 100,
              textStyle: {
                fontSize: 12,
                color: '#fff'
              }
            }
          });
        }

        myChart.on('brushSelected', renderBrushed);
        myChart.setOption(option)

        watch(() => [done.value, todo.value],
          res => {
            option.series[0].data = res[0]
            option.series[1].data = res[1]
            myChart.setOption(option)
          }
        )
      })

      return {
        todoChart
      }
    }
  })
</script>

<style lang="scss">
  #todo-chart {
    height: 800px;
    width: 640px;
    grid-row-start: 1;
    grid-row-end: 3;
  }
</style>