<template>
  <main>
    <h1>Dropdown</h1>
    <Dropdown
      :trigger="trigger"
      placement="bottom"
      :menu-options="options"
      @visible-change="e => log('visible change', e)"
      @select="e => log('select', e)"
      ref="tooltipRef"
    >
      <img src="./assets/logo.svg" :width="125" :height="125" alt="" />
    </Dropdown>
    <hr />
    <h1>Popper</h1>
    <Tooltip
      placement="right"
      content="你好哦哦哦"
      :open-delay="100"
      :close-delay="100"
      :trigger="trigger"
      :manual="manual"
    >
      <img src="./assets/logo.svg" :width="125" :height="125" alt="" />
      <!-- <template #content>
        <h1>你好嗷嗷</h1>
      </template> -->
    </Tooltip>
    <hr />
    <h1>Button</h1>
    <Button ref="buttonRef" @click="show">Test Button</Button>
    <Button plain @click="hide">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>Circle</Button>
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
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button>
    <hr />
    <h1>Collapse</h1>
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
    <hr />
    <h1>Icon</h1>
    <Icon icon="fa-solid fa-user-secret" size="2xl" type="primary" />
    <hr />
    <h1>Alert</h1>
    <Alert closable content="info" @close="onClose" ref="alertRef" />
    <Alert closable content="success" type="success" />
    <Alert closable content="warning" type="warning" />
    <Alert closable content="danger" type="danger" />
    <Alert closable content="dark primary" type="primary" effect="dark" />
    <Alert closable content="dark danger" type="danger" effect="dark" />
    <hr />
  </main>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import Icon from '@/components/Icon/Icon.vue'
import Alert from '@/components/Alert/Alert.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Dropdown from '@/components/Dropdown/Dropdown'
import { createMessage } from './components/Message/method'
import { h, onMounted, ref } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import type { AlertInstance } from './components/Alert/types'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
const buttonRef = ref<ButtonInstance | null>(null)
const alertRef = ref<AlertInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref([])
const trigger = ref<any>('click')
const manual = ref<boolean>(false)
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', divided: true },
  { key: 3, label: 'item3', disabled: true }
]
const show = () => tooltipRef.value?.show()
const hide = () => tooltipRef.value?.hide()
onMounted(() => {
  createMessage({
    message: 'hello1',
    duration: 3000,
    showClose: false
  })
  createMessage({ message: 'hello2', duration: 0, showClose: true })
  createMessage({ message: 'hello3', duration: 0, showClose: true })
  setTimeout(() => {
    if (alertRef.value) {
      alertRef.value.close()
    }
  }, 3000)
})
const onClose = () => {
  console.log('关闭了')
}
const log = console.log
</script>

<style scoped></style>
