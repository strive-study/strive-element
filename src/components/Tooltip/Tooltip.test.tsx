import { mount } from '@vue/test-utils'
import { describe, expect, test, beforeEach, vi } from 'vitest'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => {
        return (
          <>
            <div id="outside"></div>
            <Tooltip
              content="hello tooltip"
              trigger="click"
              onVisible-change={onVisibleChange}
            >
              <button id="trigger">Trigger</button>
            </Tooltip>
          </>
        )
      },
      {
        attachTo: document.body
      }
    )
    const triggerEl = wrapper.find('#trigger')
    expect(triggerEl.exists()).toBeTruthy()
    expect(wrapper.find('st-tooltip__popper').exists()).toBeFalsy()
    triggerEl.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.st-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.st-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.st-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
