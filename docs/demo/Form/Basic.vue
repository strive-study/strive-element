<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="email" prop="email">
        <Input v-model="model.email"></Input>
      </FormItem>
      <FormItem label="password" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password"></Input>
      </FormItem>
      <div>
        <Button type="primary" @click="handleSubmit">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import Form from '../../../src/components/Form/Form.vue'
import FormItem from '../../../src/components/Form/FormItem.vue'
import Button from '../../../src/components/Button/Button.vue'
import Input from '../../../src/components/Input/Input.vue'
const formRef = ref()
const model = reactive({
  email: '',
  password: ''
})
const rules = {
  email: [
    { type: 'string', required: true, trigger: 'blur' },
    { type: 'email', required: true, trigger: 'input' }
  ],
  password: [{ type: 'string', required: true, trigger: 'blur' }]
}
const handleSubmit = async () => {
  let res
  try {
    res = await formRef.value.validate()
  } catch (error) {
    res = error
  }
  console.log('res', res)
}
</script>
