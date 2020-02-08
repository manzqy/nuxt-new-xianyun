import { Message } from 'element-ui'
export default function({$axios, redirect}) {
  $axios.onError(err => {
    const {statusCode, message} = err.response.data;
    // console.log(statusCode, message)
    // if (statusCode === 401 || statusCode === 402) {
    //   Message.warning({message: '请先登录'})
    //   redirect('/user/login')
    // }
    if (statusCode === 400) {
      Message.warning({message})
    }
  })
}