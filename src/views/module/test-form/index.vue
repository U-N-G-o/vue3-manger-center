<template>
  <div class="testForm">
    <el-alert title="页面说明" type="info" close-text="关闭" show-icon>
      设置你的每天计划
    </el-alert>
    <el-divider />
    <el-form :model="planData" ref="planForm" label-position="top">
      <el-row :gutter="currentGutter">
        <el-col :span="8">
          <el-form-item label="计划名称：">
            <el-input v-model="planData.planName" placeholder="请输入您的计划名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划类型：">
            <el-input v-model="planData.type" placeholder="请输入您的计划类型" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="currentGutter">
        <el-col :span="8">
          <el-form-item label="计划事项：" label-position="left">
            <el-tag v-for="(todo, todo_i) in planData.events" :key="todo_i" :disable-transitions="false" closable
              size="small" @close="handleClose(item_i, todo_i)">
              {{todo}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="inputTag" size="large"
              @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新事项</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="week">
        <el-form-item v-for="(item, i) in planData.dayTodo" :label="item.label">
          <el-select v-model="item.todos" multiple filterable allow-create default-first-option placeholder="请选择事项"
            @change="confirmSelect(item.todos)">
            <el-option v-for="item in planData.events" :value="item" size="medium">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-divider />
      <el-form-item class="btn-container">
        <el-button type="primary" @click="onSubmit">
          提 交
        </el-button>
        <el-button @click="resetForm('planData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  // @ts-nocheck
  import { defineComponent, computed, watch, reactive, ref, nextTick } from 'vue'
  import { useStore } from '@/store'
  import Consts from '@/consts'

  export default defineComponent({
    name: 'TestForm',
    setup() {
      const store = useStore()
      const todoList = computed(() => store.state.todoModule.todoList)
      const planData = ref({
        planName: '',
        type: '',
        events: [],
        dayTodo: []
      })
      const inputTag = ref(null)
      const inputVisible = ref(false)
      const inputValue = ref('')
      const planForm = ref(null)

      todoList.value.map(item => {
        planData.value.dayTodo.push({
          label: item.day,
          todos: []
        })
      })

      const onSubmit = (formName) => {
        const list = []
        planData.value.dayTodo.map((item, i) => {
          list.push({
            todos: []
          })
          item.todos.map(element => {
            list[i].todos = [{
              name: element,
              status: false
            }]
          });
        })
        store.commit(Consts.MutationKey.SET_TODOLIST, list)
      }

      const resetForm = () => {
        planData.value = {
          planName: '',
          type: '',
          events: [],
          dayTodo: []
        }
        todoList.value.map(item => {
          planData.value.dayTodo.push({
            label: item.day,
            todos: []
          })
        })
      }

      const handleClose = (index) => {
        planData.value.events.splice(index, 1)
      }

      const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
          const activeDom = inputTag.value.$refs.input
          activeDom.focus()
        })
      }

      const handleInputConfirm = () => {
        if (inputValue.value) {
          planData.value.events.push(inputValue.value)
        }
        inputVisible.value = false
        inputValue.value = ''
      }

      const confirmSelect = (select) => {
        select.map(item => {
          const isInclude = planData.value.events.some(event => event === item)
          if (isInclude) {
            return
          }
          planData.value.events.push(item)
        })
      }

      return {
        currentGutter: 40,
        todoList,
        planData,
        inputTag,
        inputVisible,
        inputValue,
        planForm,
        onSubmit,
        resetForm,
        handleClose,
        showInput,
        handleInputConfirm,
        confirmSelect,
      }
    }
  })
</script>

<style lang="scss">
  .testForm {
    @include app-main-wrapper;

    .btn-container {
      @include flex(center, center);
    }

    .el-form-item__label {
      font-weight: bold;
    }

    .el-tag {
      margin: 0 10px 5px 0;
    }

    .week {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>