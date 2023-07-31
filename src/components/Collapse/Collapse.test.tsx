import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      () => {
        return (
          <Collapse modelValue={['a']} onChange={onChange}>
            <CollapseItem name="a" title="title a">
              Content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              Content b
            </CollapseItem>
            <CollapseItem name="c" title="title c" disabled>
              Content c
            </CollapseItem>
          </Collapse>
        )
      },
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      }
    )
    const headers = wrapper.findAll('.st-collapse-item__header')
    const contents = wrapper.findAll('.st-collapse-item__content')
    // 长度
    expect(headers).toHaveLength(3)
    expect(contents).toHaveLength(3)
    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')
    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('Content a')
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])
    await secondHeader.trigger('click')
    expect(secondHeader.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])
    // disabled
    const disableHeader = headers[2]
    const disableContent = contents[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
  })
})
