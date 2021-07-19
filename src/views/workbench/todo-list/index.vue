<template>
  <div class="todo-list">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, item_i) in todoList" :title="item.day" :name="item_i+1+''">
        <el-button type="text" class="editor" @click="handleEdit">{{edit ? '取消' : '编辑'}}</el-button>
        <div v-if="edit === false">
          <el-checkbox v-for="(todo, todo_i) in item.todo" v-model="todo.status" :key="todo_i"
            @change="handleStatus(item_i, todo_i,todo.status)">
            {{todo.name}}
          </el-checkbox>
        </div>
        <div v-else>
          <el-tag v-for="(todo, todo_i) in item.todo" :key="todo_i" :disable-transitions="false" closable size="small"
            @close="handleClose(item_i, todo_i)">
            {{todo.name}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="inputTag" size="small"
            @keyup.enter="handleInputConfirm(item_i)" @blur="handleInputConfirm(item_i)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(item_i)">+ 新事项</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    watch,
    nextTick
  } from 'vue'
  import { useStore } from '@/store'
  import variables from '@/assets/styles/variables.scss'
  import Consts from '@/consts'

  export default defineComponent({
    setup() {
      const store = useStore()
      const todoList = computed(() => store.state.todoModule.todoList)
      const activeName = ref('1')
      const edit = ref(false)
      const inputTag = ref(null)
      const inputVisible = ref(false)
      const inputValue = ref('')

      const handleStatus = (day: number, todo: number, status: boolean) => {
        store.commit(Consts.MutationKey.SET_TODO_STATUS, { day, todo, status })
      }

      const handleClose = (day: number, todo: number) => {
        store.commit(Consts.MutationKey.DEL_TODO, { day, todo })
      }

      const handleEdit = () => {
        edit.value = !edit.value
        if (edit.value === false) {
          inputVisible.value = false
          inputValue.value = ''
        }
      }

      const showInput = (index: number) => {
        inputVisible.value = true
        nextTick(() => {
          const inputDom = document.querySelectorAll('.el-input__inner')[index] as HTMLElement
          inputDom.focus()
        })
      }

      const handleInputConfirm = (day: number) => {
        if (inputValue.value) {
          const todo = {
            name: inputValue.value,
            status: false
          }
          store.commit(Consts.MutationKey.ADD_TODO, { day, todo })
        }
        inputVisible.value = false
        inputValue.value = ''
      }

      return {
        todoList,
        activeName,
        edit,
        inputTag,
        inputVisible,
        inputValue,
        handleStatus,
        handleClose,
        handleEdit,
        showInput,
        handleInputConfirm
      }
    }
  })

</script>

<style lang="scss">
  .todo-list {
    width: 400px;
    margin-top: -50px;

    .el-collapse-item__header {
      padding-left: 20px;
    }

    .el-collapse-item__content {
      padding: 5px 20px;
      display: flex;
      align-items: center;

      .editor {
        margin-right: 10px;
      }

      .el-tag {
        margin: 0 10px 5px 0;
      }

      .is-checked {
        span {
          text-decoration-line: line-through;
        }
      }

    }
  }
</style>