<template>
  <div class="news_detail_page">
    <Header />
    <div class="banxin news_info_conn" v-if="loaded">
      <div class="info_title">{{title}}</div>
      <div class="info_other">
        <div class="info_date">{{info.publishtime}}</div>
        <span class="info_view_s">观看 {{info.post_hits_initial||0}}</span>
      </div>
    </div>
    <div class="banxin news_txt_conn banxin" v-html="info.post_content"></div>

    <div class="data_err" v-if="loadedErr">抱歉，该内容不存在~</div>

    <div class="comment_conn">
      <div class="c_header"></div>
      <div class="comment_list" v-if="commentList.length>0">
        <div class="comment_item" v-for="item in commentList" :key="item.id">
          <img class="item_avatar" v-lazy="item.avatar" />
          <div class="item_info">
            <div>
              <span class="item_name">{{item.user_nicename}}</span>
              <span class="item_time">{{item.createtime}}</span>
            </div>
            <div class="item_txt">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="comment_nodata" v-else-if="loaded">
        <img class="sofaIcon" :src="'./static/images/h5/sofa.png'" alt />
        <p>还没有人发表评论,赶快来抢占沙发吧！</p>
      </div>
      <div class="comment_short" v-if="loaded">
        <div class="c_write" @click="$toast('暂未开放，敬请期待')">
          <img :src="'./static/images/h5/write.png'" alt /> 写评论
        </div>
        <div class="c_count">
          <img :src="'./static/images/h5/pinglun.png'" alt />
          0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/H5/components/planHeader.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      title: "",
      info: {},
      commentList: [],
      loaded: false,
      loadedErr: false
    };
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
      this.getPlanDetail();
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getPlanDetail();
  },
  methods: {
    getPlanDetail() {
      this.$indicator.open();
      this.$http
        .get("/index.php?g=H5&m=News&a=newsDetail", {
          params: { id: this.$route.params.id }
        })
        .then(res => {
          this.$indicator.close();
          this.loaded = true;
          console.log(this.commentList);
          this.newsInfo = res.data;
          // console.log(res.data);
          this.title = res.data.siteSeoTitle;
          this.info = res.data.detail || {};
          this.commentList = res.data.commentList || [];
        })
        .catch(err => {
          this.$indicator.close();
          this.loadedErr = true;
          console.log(err);
        });
    }
  },
  filters: {
    formatTime(t) {
      t = new Date(t);
      return (
        (t.getMonth() + 1).toString() +
        "月" +
        t.getDate().toString() +
        "日 " +
        t.toTimeString().slice(0, 5)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.news_detail_page {
  padding-top: ptr(120);
  .news_info_conn {
    color: #181818;
    text-align: center;
    margin: ptr(50) ptr(20);

    .info_title {
      font-size: ptr(42);
      font-weight: 600;
      color: rgba(24, 24, 24, 1);
      line-height: ptr(60);
      text-align: left;
    }
    .info_other {
      font-size: ptr(32);
      font-weight: bold;
      color: rgba(24, 24, 24, 1);
      line-height: ptr(50);
      overflow: hidden;
      .info_date {
        float: left;
      }
      .info_view_s {
        color: rgba(174, 150, 88, 1);
        float: right;
      }
    }
  }
  .news_txt_conn {
    font-size: ptr(32);
    margin: ptr(20);
    img {
      max-width: 100% !important;
    }
    video {
      max-width: 100% !important;
    }
    iframe {
      max-width: 100% !important;
    }
  }

  .comment_conn {
    .comment_list {
        padding: ptr(20);
      .comment_item {
        width: 100%;
        overflow: hidden;
        margin-bottom: ptr(40);
        .item_avatar {
          width: ptr(100);
          height: ptr(100);
          border-radius: 50%;
          float: left;
        }
        .item_info {
          padding-left: ptr(130);
          .item_name {
               line-height: ptr(48);
            font-size: ptr(32);
          }
          .item_txt {
              line-height: ptr(48);
            font-size: ptr(24);
            color: rgb(119, 119, 119);
          }
          .item_time {
            float: right;
            line-height: ptr(48);
            font-size: ptr(24);
            color: rgb(155, 154, 154);
          }
        }
      }
    }
    .comment_nodata {
      text-align: center;
      margin: 30px auto;
      .sofaIcon {
        @include wh(ptr(137), ptr(85));
      }
      p {
        font-size: ptr(24);
        font-family: Lantinghei SC;
        font-weight: 200;
        line-height: ptr(48);
        color: rgba(148, 148, 148, 1);
      }
    }
    .comment_short {
      font-size: ptr(38);
      font-family: Lantinghei SC;
      font-weight: 600;
      color: rgba(65, 65, 65, 1);
      height: ptr(101);
      background: rgba(252, 252, 252, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      box-shadow: 0px ptr(-8) ptr(29) 0px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      padding: 0 ptr(20);
      .c_write {
        display: flex;
        align-items: center;
        img {
          width: ptr(50);
          height: ptr(50);
          margin-right: ptr(20);
        }
      }
      .c_count {
        display: flex;
        align-items: center;
        img {
          width: ptr(50);
          height: ptr(50);
          margin-right: ptr(20);
        }
      }
    }
  }
}
</style>