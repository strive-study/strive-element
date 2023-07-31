import { h } from 'vue'
import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: h(Item, { name: 'a', title: 'Title A' }, 'content a')
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
  })
})
