<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{data.dep_date}}</div>
        <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>{{data.dep_time}}</strong>
          <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{rankTime}} ---</span>
          <span>{{data.airline_name}}{{data.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{data.arr_time}}</strong>
          <span>浦东机场T2</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥{{data.seat_infos && data.seat_infos.org_settle_price}}</span>
      <span>x{{allPrice.len}}</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{data.airport_tax_audlet}}/人/单程</span>
      <span>x{{allPrice.len}}</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥{{allPrice.price}}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    allPrice: {
      type: Object,
      default: {}
    }
  },

  computed: {
    rankTime() {
     if (!this.data.dep_time) {
       return ''
     }
     let dep = this.data.dep_time.split(':')
     let arr = this.data.arr_time.split(':')
     let sub = arr[0] * 60 + +arr[1] - dep[0] * 60 - +dep[1]
     if (sub < 0) {
       sub += 24 * 60
     }
     let hours = Math.floor(sub / 60)
     let minutes = sub % 60
     return `${hours}时${minutes}分`
    }
  }
}
</script>

<style scoped lang="less">
/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>