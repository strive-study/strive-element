import { describe, test, vi, expect } from 'vitest'
import { nextTick } from 'vue'
import { createMessage, closeAll } from './method'
// requestAnimationFrame
const rAF = async () => {
  return new Promise(res => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  return Number.parseFloat(styles.getPropertyValue('top'))
}

describe('createMessage', () => {
  test('调用方法应创建对应的Message组件', async () => {
    const instance = createMessage({ message: 'hello word', duration: 0 })
    await rAF()
    expect(document.querySelector('.st-message')).toBeTruthy()
    instance.destroy()
    await rAF()
    expect(document.querySelector('.st-message')).toBeFalsy()
  })

  test('多次调用创建多个实例', async () => {
    createMessage({ message: 'hello word', duration: 0 })
    createMessage({ message: 'hello word', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.st-message')
    expect(elements).toHaveLength(2)
    closeAll()
    await rAF()
    expect(document.querySelectorAll('.st-message')).toHaveLength(0)
  })

  test('多个实例的offset应正确', async () => {
    createMessage({ message: 'hello word', duration: 0, offset: 100 })
    createMessage({ message: 'hello word', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.st-message')
    expect(elements).toHaveLength(2)
    // jsdom中 getBoundingClientRect是有问题的 全部返回0 所以只测试offset
    const firstEleTop = getTopValue(elements[0])
    const secondEleTop = getTopValue(elements[1])
    expect(firstEleTop).toBe(100)
    expect(secondEleTop).toBe(150)
  })
})
