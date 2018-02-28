import {getToken, setToken ,getUserInfo, setUserInfo} from '../cache'
import {login} from '../../api/login'
const user = {
    state: {
        userInfo:getUserInfo(),
        token:getToken()
    },
    getters: {
        userInfo: state => state.userInfo,
        token: state => state.token
    },
    mutations: {
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_TOKEN(state, token) {
            state.token = token
        }
        /*logout (state, vm) {
            Cookies.remove('user');
            localStorage.clear();
        }*/
    },
    actions: {
        Login({commit},userInfo) {
            return new Promise((resolve, reject) =>{
                login(userInfo).then(res =>{
                    setToken(res.token)
                    commit('SET_TOKEN',res.token)
                    resolve()
                }).catch(error => {
                    console.log("登录出错")
                    reject(error)
                })
            });
        }
    }

};

export default user;
