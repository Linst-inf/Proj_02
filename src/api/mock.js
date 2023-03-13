import Mock from 'mockjs'
import homeApi from '@/api/mockServe/home'
import user from '@/api/mockServe/user'
import permission from '@/api/mockServe/permission'

// 定义mock拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',user.getUserList)

// // 登录权限
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)