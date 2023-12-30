<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

defineOptions({ name: 'SvgIcon' })

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  perfix: {
    type: String,
    default: 'icon',
  },
})
const symbolId = computed(() => `#${props.perfix}-${props.name}`)
</script>

<template>
  <Icon v-if="name.includes(':')" class="svg-icon" :icon="name" />
  <svg v-else class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped lang="scss">
.svg-icon{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill:currentcolor;
    overflow: hidden;
}
</style>
