import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import  modules from "./modules"
import getters from "./getters";
import mutations from "./mutations";
import actions from "./action"

Vue.use(Vuex)

const state={
  albumList:[],
  childrenList:[],
  broacastlist:[],
  cutureList:[],
  lifeList:[],
  newsList:[],
  playList:[],
  entList:[],
  englishList:[],
  beiJinList:[],
  musicLists:{},
  searchAblum:{},
  programsList:{},
  id:"",
  transmitId:0,
  datasId:0,
  playing: true,
  recordId:0,
  flag:true
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
  plugins: [createPersistedState()]
})
