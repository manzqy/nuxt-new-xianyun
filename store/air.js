export const state = () => {
  return {
    airHistory: []
  }
}

export const mutations = {
  addAirHistory(state, data) {
    state.airHistory = data
  }
}