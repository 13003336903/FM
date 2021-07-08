export default  {
    getcommonhttp(state,dataList){
       state.albumList=dataList
    },
    getchildHttps(state,contentlist){
      state.childrenList=contentlist
    },
    getBroacastHttps(state,Broacastlist){
      state.broacastlist=Broacastlist
    },

    getcultureHttps(state,culturelist){
       state.cutureList=culturelist
    },
    getLifeList(state,lifelist){
        state.lifeList=lifelist
    },
    getNewsList(state,Newslist){
        state.newsList=Newslist
    },
    getPlayList (state,Playlist){
        state.playList=Playlist
    },
    getEntList (state,Entlist){
        state.entList=Entlist
    },
    getEnglishList(state,Englishlist){
        state.englishList=Englishlist
    },
    getbeijinList(state,beijinlist){
      state.beiJinList=beijinlist
    },
    getmusicList(state,musicList){
      state.musicLists=musicList
    },
    getalbumList(state,searchalbumList ){
      state.searchAblum=searchalbumList 
    },
    getprogramList(state,programList ){
      state.programsList =programList
    },
    getId(state,id){
       state.id=id
    },
    transmitids(state,transmitId){
      state.transmitId=transmitId
    },
    cateId(state,id){
      state.datasId=id
    },
    changePlay(state,playing){
      state.playing=playing;
    },
    recordId(state,recordId){
   state.recordId=recordId
    },
    changeroute(state){
   state.flag=false
    },
    changleave(state){
      state.flag=true
    }
  }