export default {
   setChildren(state) {
      return state.childrenList.splice(0, 3)
   },
   setCuture(state) {
      return state.cutureList.splice(1, 3)
   },
   setLife(state) {
      return state.lifeList.splice(0, 3)
   },
   setNews(state) {
      return state.newsList.splice(0, 3)
   },
   setPlay(state) {
      return state.playList.splice(0, 3)
   },
   setEnt(state) {
      return state.entList.splice(0, 3)
   },
   setenglishList(state) {
      return state.englishList.splice(0, 3)
   },
   setBroacastList(state) {
      return state.broacastlist.reverse()
   },
   setmusic(state) {
      return state.musicLists.contents
   },
   setAlbum(state) {
      return state.searchAblum.albums
   },
   setProgram(state) {
      return state.programsList.records
   },
   getTodoById: (state) => (id) => {
      const getIdItem = state.programsList.records.find(item => {
         if (item.channelId == id) {
            return true
         }
      })

      return getIdItem
   },

   getCollect: (state) => (id) => {
      const getIdItem = state.programsList.records.find(item => {
         if (item.channelId == id) {
            return true
         }
      })

      return getIdItem
   },
 //获得最新的数据
 getnewData(state){
   const newItem = state.programsList.records.find(item => {
      if (item.channelId == state.recordId) {
         return true
      }
   })
  return newItem
}
}