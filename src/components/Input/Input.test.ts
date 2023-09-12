import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('st-input--small')
    expect(wrapper.classes()).toContain('is-prepend')

    // 正确的attribute
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    // slot
    expect(wrapper.find('.st-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.st-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.st-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.st-input__prefix').text()).toBe('prefix')

    const wrapper2 = mount(Input, {
      props: {
        size: 'small',
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it.only('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        onUpdateModelValue: async (e: any) =>
          await wrapper.setProps({ modelValue: e })
      }
    })
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新input值
    await input.setValue('update')

    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('input')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])
    // v-model 异步更新
    await wrapper.setProps({
      modelValue: 'prop update'
    })
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.st-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.find('.st-input__clear').exists()).toBeTruthy()
    await wrapper.get('.st-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    // clear input change 都会触发
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])
    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('密码显示隐藏切换', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.st-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    await input.setValue('123')
    const eyeIcon = wrapper.find('.st-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.st-input__password').attributes('icon')).toBe('eye')
  })
})
