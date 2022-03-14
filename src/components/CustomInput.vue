<template>
  <div class="input">
    <label class="input__label">
      {{ label }}
      <!-- Añade clase input__error si showErrors es true -->
      <input
          class="input__field"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          :class=" { 'input__error': showErrors } "
          @input="$emit('update:modelValue', $event.target.value)"
      >
    </label>
    <ul v-if="showErrors" class="input__errors">
      <li v-for="(error, key) in errorsList" v-bind:key="key"> {{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    type: String,
    placeholder: String,
    label: String,
    showErrors: Boolean,
    errorsList: Array,
    modelValue: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
