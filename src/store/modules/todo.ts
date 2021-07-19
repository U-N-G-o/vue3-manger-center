import { Module } from 'vuex'
import { TodoStateProps, RootStateProps } from '../typings'

const todoModule: Module<TodoStateProps, RootStateProps> = {
  namespaced: true,
  state: {
    todoList: [
      {
        day: '周一',
        todo: [{
          name: 'CSS',
          status: true
        }, {
          name: 'HTML',
          status: true
        }, {
          name: 'JavaScript',
          status: true
        }]
      },
      {
        day: '周二',
        todo: [{
          name: 'vue',
          status: true
        }, {
          name: 'vuex',
          status: true
        }, {
          name: 'vue-router',
          status: false
        }]
      },
      {
        day: '周三',
        todo: [{
          name: 'react',
          status: true
        }, {
          name: 'redux',
          status: false
        }, {
          name: 'react-router',
          status: false
        }]
      },
      {
        day: '周四',
        todo: [{
          name: 'webpack',
          status: false
        }, {
          name: 'vue-cli',
          status: true
        }, {
          name: 'vite',
          status: false
        }, {
          name: 'create-react-app',
          status: true
        }]
      },
      {
        day: '周五',
        todo: [{
          name: 'element-UI',
          status: true
        }, {
          name: 'antd',
          status: false
        }, {
          name: 'Echarts',
          status: true
        }]
      },
      {
        day: '周六',
        todo: [{
          name: 'code',
          status: true
        }, {
          name: 'debug',
          status: false
        }, {
          name: 'fixbug',
          status: false
        }]
      },
      {
        day: '周日',
        todo: [{
          name: 'test',
          status: true
        }, {
          name: 'deploy',
          status: false
        }]
      }
    ]
  },
  mutations: {
    SET_TODOLIST(state, list) {
      state.todoList.map((item, i) => {
        item.todo = list[i].todos
      })
    },
    SET_TODO_STATUS(state, { day, todo, status }) {
      state.todoList[day].todo[todo].status = status
    },
    DEL_TODO(state, { day, todo }) {
      state.todoList[day].todo.splice(todo, 1)
    },
    ADD_TODO(state, { day, todo }) {
      state.todoList[day].todo.push(todo)
    }
  }
}

export default todoModule
