import { Message } from 'element-ui'
export default function({$axios, redirect, route}) {
  $axios.onError(err => {
    const {statusCode, message} = err.response.data;
    
    if (statusCode === 401 || statusCode === 403) {
      Message.warning({message: '请先登录'})
      redirect(200, '/user/login', {
        returnUrl: route.fullPath
      })
    }
    if (statusCode === 400) {
      Message.warning({message})
    }
  })
}