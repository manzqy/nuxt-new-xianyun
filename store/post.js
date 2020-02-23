export const state = () => {
  return {
    formPublish: [],
    listenData: {}
  }
}
export const mutations = {
  addFromPublish (state, data) {
    state.formPublish = data
    if (state.formPublish.length > 5) {
      state.formPublish.length = 5
    }
  },
}