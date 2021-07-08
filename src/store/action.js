import http from "../../utils/http"
export default {
  //获取原创节目数据
  async gethttp(context) {
    const datas = await http("get", "/album/recommends!albums.do", {
      params: {
        out: "json",
        miniAppId: 4
      }
    })
    const dataList = datas.data.albums
    context.commit("getcommonhttp", dataList)
  },

  //获取亲子模块数据
  async getchildHttp(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5065,
        miniAppId: 4
      }
    })
    const contentlist = datas.data.albums;
    context.commit("getchildHttps", contentlist)
  },

  //获取广播数据
  async getbrodcast(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5069,
        miniAppId: 4
      }
    })
    const Broacastlist = datas.data.albums;
    context.commit("getBroacastHttps", Broacastlist)
  },


  //获取文化数据
  async getculture(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5072,
        miniAppId: 4
      }
    })
    const culturelist = datas.data.albums;
    context.commit("getcultureHttps", culturelist)
  },

  //获取生活列表数据
  async getLife(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5075,
        miniAppId: 4

      }
    })
    const lifelist = datas.data.albums;
    context.commit("getLifeList", lifelist)
  },

  //获取资讯数据
  async getNews(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5071,
        miniAppId: 4

      }
    })
    const Newslist = datas.data.albums;
    context.commit("getNewsList", Newslist)
  },
  //获取体育的数据
  async getPlay(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5114,
        miniAppId: 4
      }
    })
    const Playlist = datas.data.albums;
    context.commit("getPlayList", Playlist)
  },

  //获取娱乐数据
  async getEnt(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5076,
        miniAppId: 4
      }
    })
    const Entlist = datas.data.albums;
    context.commit("getEntList", Entlist)
  },

  //获取外语数据
  async getEnglish(context) {
    const datas = await http("get", "/album/album!albums.do", {
      params: {
        pageNo: 1,
        categoryId: 5077,
        miniAppId: 4

      }
    })
    const Englishlist = datas.data.albums;
    context.commit("getEnglishList", Englishlist)
  },

  //获取北京台广播数据
  async getbeijin(context) {
    const datas = await http("get", "/radio/channels.do", {
      params: {
        out: "json",
        miniAppId: 4

      }
    })
    const beijinlist = datas.data.channels;
    context.commit("getbeijinList", beijinlist)
  },
  
  //获取搜索列表音频数据
 async getkeyhttp(context,keyword){
    const datas = await http("get", "/album/search.do", {
      params: {
        pageNo:1,
        keyword:keyword,
        miniAppId:4
      }
    })
  const musicList=datas.data
  context.commit("getmusicList",musicList )
  },

  //获取搜索专辑列表
  // https://ma.rbc.cn/album/search!albums.do?pageNo=1&keyword=北京&miniAppId=4
  async getalbumhttp(context,keyword){
    const datas = await http("get", "/album/search!albums.do", {
      params: {
        pageNo:1,
        keyword:keyword,
        miniAppId:4
      }
    })
  const searchalbumList=datas.data
  context.commit("getalbumList",searchalbumList )
  },

  //获取搜索节目列表
  // https://ma.rbc.cnv?pageNo=3&keyword=北京&miniAppId=4
  async  getprogramhttp(context,keyword){
    const datas = await http("get", "/radio/records!search.do", {
      params: {
        pageNo:3,
        keyword:keyword,
        miniAppId:4
      }
    })
  const programList=datas.data
  context.commit("getprogramList",programList )
  },

}