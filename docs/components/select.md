---
title: Select | St-Element | Mini-Element
description: Select 组件的文档
---

# Select 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 v-model 到一个 Boolean 类型的变量。 可以使用 **--st-switch-on-color** 属性与 **--st-switch-off-color** 属性来设置开关的背景色。

<preview path="../demo/Select/Basic.vue" title="基础Select" description="Select 基础用例"></preview>

## 远程搜索

输入关键字以从远程服务器中查找数据。

服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为true，同时传入一个`remote-method`。 remote-method 为一个返回 Promise 的Function，类型为 `(value: string) => Promise<SelectOption[]>` 。

<preview path="../demo/Select/Remote.vue" title="筛选选项" description="Select 筛选选项"></preview>


