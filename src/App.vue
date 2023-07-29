<template>
  <main>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>Strive</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
    <hr />
    <Collapse v-model="openedValue" accordion>
      <CollapseItem name="a">
        <template #title>
          <h1>h1 title</h1>
        </template>
        <h1>h1 body</h1>
        <div>this is a content</div>
      </CollapseItem>
      <CollapseItem name="b" title="b">
        <div>b test</div>
      </CollapseItem>
      <CollapseItem name="c" title="c" disabled>
        <div>this is ccc</div>
      </CollapseItem>
    </Collapse>
    {{ openedValue }}
  </main>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from './components/Button/types'
const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref([])
// setTimeout(() => {
//   openedValue.value = ['a', 'b']
// }, 3000)
onMounted(() => {
  console.log(buttonRef.value!.ref)
})
</script>

<style scoped></style>
