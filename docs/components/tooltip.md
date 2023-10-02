---
title: Tooltip | ST-Element | Mini-Element
description: Tooltip组件文档
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

使用 `content` 属性来决定 hover 时的提示信息。

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件的基础用法"></preview>

## 不同位置

由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：`top、left、right、bottom`；三种对齐位置：`start, end`，默认为空。

<preview path="../demo/Tooltip/Placement.vue" title="不同位置" description="Tooltip 组件的不同位置"></preview>

## 触发方式

由 trigger 属性决定触发方式： `hover | click`, 默认为 hover

<preview path="../demo/Tooltip/Click.vue" title="触发方式" description="Tooltip 组件的触发方式"></preview>

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 slot content，替代tooltip中的content属性。

<preview path="../demo/Tooltip/Custom.vue" title="更多内容的文字提示" description="Tooltip 组件的更多内容的文字提示"></preview>

## 手动触发

将 `manual` 属性设置为 true 即可，
然后可以使用实例上面的 `show` 和 `hide` 方法打开关闭下拉菜单。

<preview path="../demo/Tooltip/Manual.vue" title="手动触发" description="Tooltip 组件的手动触发"></preview>

## API

### Attributes

| Name           | Description                                            | Type                                                                                                                                                                 | Default |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| content        | 弹出框内容, 可通过 `slot#content` 修改                 | `string`                                                                                                                                                             | ''      |
| placement      | 打开Tooltip的位置                                      | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom  |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) parameters | refer to [popper.js](https://popper.js.org/docs/v2/) doc                                                                                                             | {}      |
| open-delay     | 打开Tooltip延迟                                        | `number`                                                                                                                                                             | 0       |
| close-delay    | 关闭Tooltip延迟                                        | `number`                                                                                                                                                             | 200     |
| trigger        | 打开Tooltip方式                                        | `'hover' \| 'click'`                                                                                                                                                 | hover   |
| manual         | 是否开启手动触发模式                                   | `boolean`                                                                                                                                                            | false   |
| transition     | 过渡动画名称                                           | `string`                                                                                                                                                             | ''      |

### Events

| Name           | Description                       | Type      |
| -------------- | --------------------------------- | --------- |
| visible-change | 当 tooltip 展示/隐藏时被触发      | `boolean` |
| click-outside  | 当点击到 Tooltip 外侧区域时被触发 | `boolean` |

### Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | 触发Tooltip内容插槽     |
| content | 打开Tooltip显示内容插槽 |

### Exposes

| Name | Description     | Type                                              |
| ---- | --------------- | ------------------------------------------------- |
| show | 手动打开Tooltip | ^[Function]`(event?: Event \| undefined) => void` |
| hide | 手动关闭Tooltip | ^[Function]`(event?: Event \| undefined) => void` |
