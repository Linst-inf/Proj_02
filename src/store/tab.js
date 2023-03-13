import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false, //导航栏是否折叠
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        SelectMenu(state, val) {
            if (val.name !== "home") {
                const index = state.tabList.findIndex((item) => item.name === val.name);
                if (index === -1) {
                    state.tabList.push(val);
                }
            }
        },
        CloseTag(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val,
                Cookie.set('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                console.log("item", item)
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    menuArray.push(item)
                }
                console.log('menuArray', menuArray)
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        },
        

    },
};
