export const state = () => {
  return {
    userInfo: {
      token: '',
      user: {}
    }
  }
}

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  clearUserInfo(state) {
    state.userInfo = {}
  }
}

export const actions = {
  login({commit}, data) {
    return this.$axios({
      method: 'post',
      url: '/accounts/login',
      data
    }).then(({data}) => {
      commit('setUserInfo', data)
      return data
    })
  }
}