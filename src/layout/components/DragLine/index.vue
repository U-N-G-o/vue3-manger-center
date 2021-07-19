<template>
  <div class="dragline" @mousedown="handleDrag" :style="style"></div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue'
  import { useStore } from '@/store'
  import Consts from '@/consts'

  export default defineComponent({
    name: 'DragLine',
    setup() {
      const store = useStore()
      const asideWidth = computed({
        get: () => store.state.settingModule.asideWidth,
        set: (value) => store.commit(Consts.MutationKey.SET_ASIDE_WIDTH, value)
      })

      const style = reactive({
        left: asideWidth.value + 'px',
        background: ''
      })

      const rage = { min: 180, max: 350 }

      const handleDrag = (e: MouseEvent) => {
        e.preventDefault()
        style.background = 'black'
        const start = e.clientX

        const move = (E: MouseEvent) => {
          const distance = E.clientX - start
          if (distance !== 0) {
            const nextValue = Math.max(Math.min(E.clientX, rage.max), rage.min)
            style.left = nextValue + 'px'
            asideWidth.value = nextValue
          }
        }

        const up = () => {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          style.background = ''
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
      }

      return {
        asideWidth,
        handleDrag,
        style
      }
    }
  })

</script>

<style lang="scss">
  .dragline {
    position: absolute;
    top: 0;
    width: 3px;
    height: 100vh;
    cursor: ew-resize;
    z-index: 999;

    &.active {
      background-color: black;
    }
  }
</style>