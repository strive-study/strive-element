import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'St-Element | Mini Element',
  description: 'Mini Element组件库',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/strive-study/strive-element'
      },
      { text: '个人主页', link: 'https://github.com/18845778092' }
    ],

    sidebar: [
      {
        text: '基础',
        items: [{ text: '快速开始', link: '/quick-start' }]
      },
      {
        text: '组件',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Message', link: '/components/message' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Select', link: '/components/select' },
          { text: 'Form', link: '/components/form' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/strive-study/strive-element' }
    ]
  }
})
