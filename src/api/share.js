import axios from './index'

//获取用户列表信息
export const getUserList = (team) => {
    return axios.request({
        url: '/api/user/userList/',
        method: 'get',
        params: {
            team,
        }
    })
};

//获取组信息
export const getUserGroups = () => {
    return axios.request({
        url: '/api/user/groups/',
        method: 'get',
    })
};

//获取分享列表
export const getShareList = () => {
    return axios.request({
        url: '/api/share/shares/',
        method: 'get',
    })
};

//新增分享列表
export const addShare = (jsonData) => {
    return axios.request({
        url: '/api/share/shares/',
        method: 'post',
        data:jsonData
    })
};

//修改分享数据
export const putShare = (jsonData) => {
    return axios.request({
        url: '/api/share/shares/',
        method: 'put',
        data:jsonData
    })
};

//删除分享数据
export const deleteShare = (sharetitle) => {
    return axios.request({
        url: '/api/share/shares/',
        method: 'delete',
        params: {
            sharetitle,
        }
    })
};

//检查主题是否重复
export const checkShare = (sharetitle) => {
    return axios.request({
        url: '/api/share/shares/check/',
        method: 'get',
        params: {
            sharetitle,
        }
    })
};
