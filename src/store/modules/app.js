import {otherRouter, appRouter} from '@/router/router';
import Util from '../../libs/util';

const app = {
    state: {
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ]
    },
    mutations: {
        updateMenulist (state) {
            const role = 1;
            console.log(typeof role);
            let menuList = [];
            appRouter.forEach((item, index) => {
                if (item.access !== undefined) {
                    //该路由有权限要求
                    if (Util.showThisRoute(item.access, role)) {
                        console.log('该菜单的访问权限是1');
                        if (item.children.length === 1) {
                            console.log('该菜单没有子菜单');
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            console.log(item.children.length);
                            //二级菜单
                            childrenArr = item.children.filter(child => {
                                if (Array.isArray(child.access)) {
                                    if (Util.oneOf(role, child.access)) {
                                        return child;
                                    }
                                }
                                if (typeof child.access === 'number') {
                                    if (child.access === role) {
                                        return child;
                                    }
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    //该路由无权限要求
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (Array.isArray(child.access)) {
                                if (Util.oneOf(role, child.access)) {
                                    return child;
                                }
                            }
                            if (typeof child.access === 'number') {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });
            /*console.log(menuList)
            console.log(appRouter)*/
            state.menuList = menuList;
        }
    }
};

export default app;
