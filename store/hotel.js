export const state = () => {
  return {
    cityName: '',
    cityPid: '',
    scenics: []
  }
}
export const mutations = {
  setCityName(state, data) {
    state.cityName = data
  },
  setCityPid(state, data) {
    state.cityPid = data
  },
  setScenics(state, data) {
    state.scenics = data
  }
}
