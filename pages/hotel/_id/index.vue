<template>
  <div class="hotel-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:20px 0;">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelData.real_city}}{{hotelData.big_cate}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <div class="name-info">
        <el-row type="flex" align="middle">
          <h4>{{hotelData.name}}</h4>
          <span>
            <i
              class="iconfont iconhuangguan"
              v-for="(item,index) in hotelData.hotellevel && hotelData.hotellevel.id"
              :key="index"
            ></i>
          </span>
        </el-row>
        <div class="hotel-en-name">
          <span>{{hotelData.alias}}</span>
        </div>
        <div>
          <i class="iconfont iconlocation">{{hotelData.address}}</i>
        </div>
      </div>
    </el-row>
    <el-row class="pic-info">
      <el-col :span="16">
        <img
          src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
          alt
          style="width:640px;height:360px;"
        />
        <span></span>
      </el-col>
      <el-col :span="4" class="pic-item pic-item-left">
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt />
        <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt />
      </el-col>
      <el-col :span="4" class="pic-item pic-item-right">
        <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
        <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt />
        <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt />
      </el-col>
    </el-row>
    <div class="hotel-table">
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚">
          <template slot-scope="scope">
            <span class="height-light larger">{{scope.row.price}}</span>
            起
            <i class="el-icon-arrow-right height-light"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="info-row">
      <el-col :span="16">
        <div id="container" v-loading="loading"></div>
      </el-col>
      <el-col :span="8" style="padding-left:5px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="风景名胜">
            <div class="tab-content" v-loading="loading">
              <ul>
                <li
                  v-for="(item,index) in list[activeName]"
                  :key="item.id"
                  class="active"
                  @mouseenter="setCenterContent(index,item)"
                >
                  <span class="name">{{item.name}}</span>
                  <span class="distance">{{item.distance | fixed}}公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="交通设施服务">
            <div class="tab-content" v-loading="loading">
              <ul>
                <li
                  v-for="(item,index) in list[activeName]"
                  :key="item.id"
                  class="active"
                  @mouseenter="setCenterContent(index,item)"
                >
                  <span class="name">{{item.name}}</span>
                  <span class="distance">{{item.distance | fixed}}公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div class="info-row">
      <el-row class="assets-info">
        <el-col :span="5">基本信息</el-col>
        <el-col :span="5">入住时间: 14:00之后</el-col>
        <el-col :span="5">离店时间: 12:00之前</el-col>
        <el-col :span="5">{{hotelData.creation_time}} / {{hotelData.renovat_time}}</el-col>
        <el-col :span="4">酒店规模: {{hotelData.roomCount}}间客房</el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="5">主要设施</el-col>
        <el-col :span="19">
          <el-tag
            type="success"
            class="hotel-tag"
            v-for="(item) in hotelData.hotelassets"
            :key="item.id"
          >{{item.name}}</el-tag>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="5">停车服务</el-col>
        <el-col :span="19">
          <el-tag type="success" class="hotel-tag" v-if="hotelData.parking">免费停车</el-tag>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="5">品牌信息</el-col>
        <el-col :span="5">
          <el-link
            type="primary"
            disabled
            class="hotel-link"
          >{{hotelData.hotelbrand && hotelData.hotelbrand.name}}</el-link>
        </el-col>
        <el-col :span="5"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
    <div class="comment-row">
      <h4>{{commentData.length}}条真实用户评论</h4>
      <div class="scores-row">
        <el-row>
          <el-col :span="4">
            <p>总评数：{{hotelData.all_remarks}}</p>
            <p>好评数：{{hotelData.good_remarks}}</p>
            <p>差评数：{{hotelData.bad_remarks}}</p>
          </el-col>
          <el-col :span="5">
            <div class="recomment-score">
              <div class="comment-star">
                <el-rate
                  v-model="hotelData.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  :score-template="hotelData.stars+'分'"
                ></el-rate>
              </div>
              <div class="stamp x-large">非常推荐</div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="rate-box">
              <div class="circle-rate">
                <svg viewBox="0 0 74 74">
                  <path
                    data-v-52d03705
                    d="M 35 2, A 35,35 0 1 1 6.081879558552508,19.10212875464338"
                    fill="none"
                    stroke="#f90"
                    stroke-width="2"
                  />
                </svg>
                <span class="text">
                  <span>环境</span>
                  <span class="value">{{hotelData.scores.environment}}</span>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="rate-box">
              <div class="circle-rate">
                <svg viewBox="0 0 74 74">
                  <path
                    data-v-52d03705
                    d="M 35 2, A 35,35 0 1 1 6.081879558552508,19.10212875464338"
                    fill="none"
                    stroke="#f90"
                    stroke-width="2"
                  />
                </svg>
                <span class="text">
                  <span>产品</span>
                  <span class="value">{{hotelData.scores.product}}</span>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="rate-box">
              <div class="circle-rate">
                <svg viewBox="0 0 74 74">
                  <path
                    data-v-52d03705
                    d="M 35 2, A 35,35 0 1 1 6.081879558552508,19.10212875464338"
                    fill="none"
                    stroke="#f90"
                    stroke-width="2"
                  />
                </svg>
                <span class="text">
                  <span>服务</span>
                  <span class="value">{{hotelData.scores.service}}</span>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comment-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelData: {
        scores: {},
        hotelbrand: {}
      },
      products: [],
      map: '',
      list: {
        风景名胜: [],
        交通设施服务: []
      },
      activeName: '风景名胜',
      loading: true,
      bindClick: {},
      commentData: []
    }
  },
  mounted() {
    this.getHotelData()
    this.getComment()
    this.getAmapData()
  },
  methods: {
    getHotelData() {
      const { id } = this.$route.params
      this.$axios({
        url: `/hotels?id=${id}`
      }).then(({ data }) => {
        this.hotelData = data.data[0]
        this.products = this.hotelData.products
      })
    },
    getComment() {
      this.$axios({
        url: '/hotels/comments'
      }).then(({ data }) => {
        this.commentData = data.data
      })
    },
    getAmapData() {
      window.onLoad = () => {
        this.map = new AMap.Map('container', {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 13 //初始化地图层级
        })
        this.locationLocal('风景名胜')
      }
      var url =
        'https://webapi.amap.com/maps?v=1.4.15&key=0bc30017317f7c4cb9192fcc0b735c33&callback=onLoad'
      var jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
    },
    locationLocal(keyword) {
      AMap.service(['AMap.PlaceSearch'], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.hotelData.city.code, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        //关键字查询
        var cpoint = [
          this.hotelData.location.longitude,
          this.hotelData.location.latitude
        ] //中心点坐标
        placeSearch.searchNearBy(keyword, cpoint, 2000, (status, result) => {
          if (result.info == 'OK') {
            this.list[keyword] = result.poiList.pois
            this.map.clearMap()
            var pois = result.poiList.pois
            for (var i = 0; i < pois.length; i++) {
              var poi = pois[i]
              var marker = []
              marker[i] = new AMap.Marker({
                icon:
                  'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' +
                  (i + 1) +
                  '.png',
                // icon:  '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-'+(i+1)+'.png',
                position: poi.location // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              })
              this.bindClick[i] = (e, i) => {
                this.setCenterContent(e)
              }
              marker[i].on('click', this.bindClick[i].bind(this, i))
              // 将创建的点标记添加到已有的地图实例：
              this.map.add(marker[i])
            }
            this.map.setFitView()
            this.loading = false
          }
        })
      })
    },
    handleClick() {
      this.loading = true
      this.map.clearMap()
      this.locationLocal(this.activeName)
    },
    setCenterContent(index) {
      const item = this.list[this.activeName]
      this.map.setCenter(item[index].location) //设置地图中心点
      setTimeout(() => {
        var info = [item[index].name]
        var infoWindow = new AMap.InfoWindow({
          content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(0, -30)
        })
        infoWindow.on('open')
        infoWindow.on('close')
        infoWindow.open(this.map, item[index].location)
      }, 200)
    }
  },
  filters: {
    fixed(data) {
      if (data) {
        return (data / 1000).toFixed(2)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hotel-detail {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
}
.name-info {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  h4 {
    margin-right: 15px;
    color: #333;
    font-weight: 400;
    font-size: x-large;
  }
  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
}
.iconhuangguan {
  color: #f90;
}
.hotel-en-name {
  margin-bottom: 0.5em;
}
.pic-item {
  img {
    display: block;
    width: 160px;
    height: 110px;
    margin-bottom: 15px;
  }
  .pic-item-left {
    padding-right: 10px;
  }
  .pic-item-right {
    padding-left: 10px;
  }
}
.hotel-table {
  padding: 40px 0;
  cursor: pointer;
  .height-light {
    color: #f90;
  }
  .larger {
    font-size: larger;
    // vertical-align: middle;
  }
}
.info-row {
  padding: 40px 0;
}
#container {
  width: 650px;
  height: 360px;
}
.info-row {
  min-height: 360px;
}
.tab-content {
  width: 100%;
  height: 300px;
  font-size: 14px;
  color: #666;
  overflow-y: auto;
  li {
    display: flex;
    margin: 0 20px 20px 10px;
    cursor: pointer;
    .name {
      flex: 1;
      padding-right: 10px;
    }
  }
}
/deep/.amap-icon img,
.amap-marker-content img {
  width: 25px;
  height: 34px;
}
.assets-info {
  border-bottom: 1px solid #ddd;
  padding: 20px 10px;
  font-size: 14px;
}
.scores-row {
  color: #666;
  padding: 20px 0;
}
.recomment-score {
  position: relative;
  display: flex;
  align-content: center;
  .comment-star {
    margin-top: 20px;
  }
  .stamp {
    position: absolute;
    left: 20px;
    color: #f90;
    border: 2px solid #f90;
    text-align: center;
    line-height: 70px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    opacity: 0.25;
    transform: rotate(-30deg);
  }
}
.x-large {
  font-size: x-large;
}
.height-light {
  color: #f90 !important;
}
.rate-box {
  width: 70px;
  color: #f90;
  .circle-rate {
    position: relative;
  }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
.hotel-tag {
  margin-right: 15px;
}
.hotel-link {
  font-size: 17px;
  text-shadow: 2px 2px 2px greenyellow;
}
.active {
  &:hover {
    color: #f90;
    position: relative;
    left: 5px;
    font-weight: 700;
  }
}
</style>