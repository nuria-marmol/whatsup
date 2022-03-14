<template>
  <div>
    <button
        :type="type"
        class="button"
        @click.prevent="$emit('doClick')"
        :disabled="buttonDisabled"
    > {{ text}} </button>
  </div>
</template>

<script>
export default {
  name: "CustomButton",
  emits: ["doClick"],
  props: {
    type: {
      // Así tiene uno por defecto, pero se podría cambiar
      type: String,
      default: 'button'
    },
    text: String,
    // Para que se deshabilite el botón
    buttonDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>