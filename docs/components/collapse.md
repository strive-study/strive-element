---
title: Collapse | ST-Element | Mini-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demo/Collapse/Accordion.vue" title="手风琴效果" description="Collapse 组件的手风琴效果用法"></preview>

## Collapse Attributes

| Name                  | Description        | Type                                                   | Accepted Values | Default |
| --------------------- | ------------------ | ------------------------------------------------------ | --------------- | ------- |
| model-value / v-model | 当前激活 panel     | `string (accordion mode) / array (non-accordion mode)` | —               | —       |
| accordion             | 是否开启手风琴模式 | `boolean`                                              | —               | false   |

## Collapse Events

| Name   | Description           | Parameters                                                            |
| ------ | --------------------- | --------------------------------------------------------------------- |
| change | 激活panel被改变时触发 | `(activeNames: array (non-accordion mode) / string (accordion mode))` |

## Collapse Slots

| Name | Description   | Subtags       |
| ---- | ------------- | ------------- |
| -    | 自定义content | Collapse Item |

## Collapse Item Attributes

| Name     | Description | Type               | Accepted Values | Default |
| -------- | ----------- | ------------------ | --------------- | ------- |
| name     | panel 名称  | `string \| number` | —               | —       |
| title    | panel title | `string`           | —               | —       |
| disabled | 是否禁用    | `boolean`          | —               | —       |

## Collapse Item Slot

| Name  | Description                    |
| ----- | ------------------------------ |
| —     | content of Collapse Item       |
| title | content of Collapse Item title |
