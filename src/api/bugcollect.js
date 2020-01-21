import axios from './index'

//获取bug列表
export const getBugList = (value1,value2) => {
    return axios.request({
        url: '/api/project/bug/',
        method: 'get',
        params: {
            value1,value2
        }
    })
};

//新增bug
export const addBug = (jsonData) => {
    return axios.request({
        url: '/api/project/bug/',
        method: 'post',
        data:jsonData
    })
};


//修改bug数据
export const putBug = (jsonData) => {
    return axios.request({
        url: '/api/project/bug/',
        method: 'put',
        data:jsonData
    })
};

//删除bug
export const deleteBug = (id) => {
    return axios.request({
        url: '/api/project/bug/',
        method: 'delete',
        params: {
            id,
        }
    })
};
