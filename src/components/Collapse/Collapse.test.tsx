import { beforeAll, describe, expect, test, vi } from 'vitest'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
const onChange = vi.fn()
type DomEle = DOMWrapper<Element>
let wrapper: VueWrapper
let headers: DomEle[], contents: DomEle[]
let firstContent: DomEle,
  secondContent: DomEle,
  disableContent: DomEle,
  firstHeader: DomEle,
  secondHeader: DomEle,
  disableHeader: DomEle

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(
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
    headers = wrapper.findAll('.st-collapse-item__header')
    contents = wrapper.findAll('.st-collapse-item__content')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disableHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disableContent = contents[2]
  })

  test('测试基础结构及对应文本', () => {
    // 长度
    expect(headers).toHaveLength(3)
    expect(contents).toHaveLength(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('Content a')
  })

  test('点击标题展开/关闭内容', async () => {
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondHeader.isVisible()).toBeTruthy()
  })

  test('发送正确的事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  test('disabled的内容应该没有反应', async () => {
    // disabled
    onChange.mockClear()
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
  
  test('accordion手风琴', async () => {
    wrapper = mount(
      () => {
        return (
          <Collapse accordion modelValue={['a']} onChange={onChange}>
            <CollapseItem name="a" title="title a">
              Content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              Content b
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
    onChange.mockClear()
    headers = wrapper.findAll('.st-collapse-item__header')
    contents = wrapper.findAll('.st-collapse-item__content')
    firstHeader = headers[0]
    secondHeader = headers[1]
    firstContent = contents[0]
    secondContent = contents[1]
    expect(headers).toHaveLength(2)
    expect(contents).toHaveLength(2)
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(disableContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenCalledWith(['b'])
    await firstHeader.trigger('click')
    expect(onChange).toHaveBeenLastCalledWith(['a'])
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
  })
})
