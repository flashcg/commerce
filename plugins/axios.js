import axios from 'axios'
import qs from 'qs'
export default  ({
  $axios,
  redirect
}) =>{


// 添加响应拦截器
/* axios.interceptors.request.use(
	config => {
		if (config.method === 'post') {
      console.log('post')
		}
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
) */
  /*     $axios.onError(error => {
        if(error.response.status === 500) {
          redirect('/sorry')
        }
      }); */

//  $axios.setHeader('Content-Type', 'application/json', ['post'])
//  $axios.setHeader('Cache-Control', 'no-store', ['post','put'])
}
