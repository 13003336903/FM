import Vue from 'vue'
import VueRouter from 'vue-router'

//路由模块
const Home = () => import("@/views/Home.vue")
const Broadcast = () => import("@/views/Broadcast.vue")
const Mine = () => import("@/views/Mine.vue")
const Album = () => import("@/views/Album.vue")
const BroacastPlayer = () => import("@/views/player/BroacastPlayer.vue")
const Search = () => import("@/views/search/Search.vue")
const SearchMusic = () => import("@/views/search/search-children/SearchMusic.vue")
const SearchAlbum = () => import("@/views/search/search-children/SearchAlbum.vue")
const SearchProgram = () => import("@/views/search/search-children/SearchProgram.vue")
const Programs = () => import("@/views/search/MusicPlayer.vue")
const Categroies = () => import("@/views/categroies/Categroies.vue")
const Detail = () => import("@/views/detail/Detail.vue")
const Collection = () => import("../views/collection/Collections.vue")
// 整合部分
const Playdetail = () => import("@/views/playdetail/Playdetail.vue")
const Player = () => import("@/views/player/Player.vue")
//刘
const Download = () =>
  import("../views/jump/Download.vue")
const History = () =>
  import("../views/jump/History.vue")
const Log = () =>
  import("../views/jump/Log.vue")
const Order = () =>
  import("../views/jump/Order.vue")
const Forget = () =>
  import("../views/back/Forget.vue")
const Registered = () =>
  import("../views/back/Registered.vue")
const BackupWizard = () =>
  import("../components/componentsLog/BackupWizard.vue")
//原创节目
const Selfplaydetail = () => import("@/views/detail/selfplaydetail.vue")
const Selfplayer = () => import("@/views/detail/selfplayer.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "听听FM",
      showTab: true
    },

  },
  {
    path: "/player/:id",
    component: BroacastPlayer,
    name: "player",
    meta: {
      title: "北京广播"
    },

  },
  {
    path: "/broadcast",
    component: Broadcast,
    meta: {
      title: "听听广播",
      showTab: true
    }
  },
  {
    path: "/mine",
    component: Mine,
    meta: {
      title: "个人中心",
      showTab: true
    }
  },
  {
    path: "/album",
    component: Album,
    meta: {
      title: "听听专辑",
      showTab: true
    }
  },
  {
    path: "/search",
    component: Search,
    meta: {
      title: "搜索"
    },
    children: [
      {
        path: "",
        redirect: "music"
      },
      {
        path: "music",
        component: SearchMusic,
        meta: {
          title: "搜索"
        },
      },
      {
        path: "albumitem",
        component: SearchAlbum,
        meta: {
          title: "搜索"
        },
      },
      {
        path: "program",
        component: SearchProgram,
        meta: {
          title: "搜索"
        },
      }
    ]
  },
  {
    path: "/programs/:id",
    component: Programs,
    meta: {
      title: "听听节目"
    },
  },
  {
    path: "/categroies/:id",
    component: Categroies,
    meta: {
      title: ""
    },
  },
  // 整合部分
  {
    path: "/playdetail/:id/:categoryId/:index",
    component: Playdetail,
    meta: {
      title: "音频详情"
    },
  },
  {
    path: "/player/:id/:index/:categoryId/:indexS/",
    component: Player,
    meta: {
      title: "音频专辑"
    }
  },
  {
    path: "/detail",
    component: Detail,
    meta: {
      title: "详情页"
    }
  },
  {
    path: "/collect",
    component: Collection,
    meta: {
      title: "我的收藏"
    },
  },
  {
    path: "/download",
    component: Download,
    meta: {
      title: "我下载"
    },
  },
  {
    path: "/history",
    component: History,

  },
  {
    path: "/log",
    component: Log,
    meta: {
      title: "登录",
    }
  },
  {
    path: "/order",
    component: Order,
  },
  {
    path: "/registered",
    component: Registered,
    meta: {
      title: "忘记密码"
    }
  },
  {
    path: "/forget",
    component: Forget,
    meta: {
      title: "注册"
    }
  },
  {
    path: '/BackupWizard',
    name: 'BackupWizard',
    component: BackupWizard,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  //原创节目
  {
    path: "/detail/:id/:categoryId/:index",
    component: Selfplaydetail,
    meta: {
      title: ""
    },
  },
  {
    path: "/detail/:id/:index/:categoryId/:indexS/",
    component: Selfplayer,
    meta: {
      title: ""
    }
  },
]



const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/search') || to.path.startsWith('/program')) {
    setTimeout(function () {
      let tab = document.getElementsByClassName('van-icon-arrow-left')[0]
      tab.style.display = 'block'
      let tab1 = document.getElementsByClassName('van-tabbar')[0]
      tab1.style.display = 'none'
    }, 100)
    next()
  }
  // else if(to.path.startsWith('/categroies')){
  //     let  tab1=document.getElementsByClassName('van-tabbar')[0]
  //     tab1.style.display='none'
  //     next()
  // }
  else {
    setTimeout(function () {
      let tab = document.getElementsByClassName('van-icon-arrow-left')[0]
      tab.style.display = ''
      let tab1 = document.getElementsByClassName('van-tabbar')[0]
      tab1.style.display = ''
    }, 100)

    next()
  }
})

export default router
