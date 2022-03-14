<template>
  <div class="textarea">
    <label class="textarea__label">
      {{ label }}
      <textarea
          class="textarea__field"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "CustomTextarea",
  props: {
    label: String,
    placeholder: String,
    modelValue: String
  }
}
</script>

<style scoped>

</style>