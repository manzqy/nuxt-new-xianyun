export const state = () => {
  return {
    airHistory: [],
  }
}

export const mutations = {
  addAirHistory(state, data) {
    state.airHistory = data
    if (state.airHistory.length > 5) {
      state.airHistory.length = 5
    }
  }
}
export const actions = {
  getCityName({commit}, data) {
    return this.$axios({
      url: '/airs/city',
      params: data
    })
  }
}