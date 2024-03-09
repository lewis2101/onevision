import {readonly, ref} from "vue";

const modal = ref(false)

const show = () => modal.value = true
const hide = () => modal.value = false

export default {
  show,
  hide,
  modal: readonly(modal)
}
