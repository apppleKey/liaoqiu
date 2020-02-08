<template>
  <div class="news_details_page">
    <div class="banxin news_info_conn" v-if="loaded">
      <div class="info_title">{{title}}</div>
      <div class="info_other">
        <span class="info_date">{{info.publishtime}}</span>
        <span class="info_view_s">观看 {{info.post_hits_initial||0}}</span>
        <span class="info_comment_s">评论 {{info.commentNum||0}}</span>
      </div>
    </div>

    <div class="banxin news_txt_conn banxin" v-html="info.post_content"></div>
    <div class="comment_list_conn banxin" v-if="loaded" >
      <h2 class="ltitle" >评论 ( {{commentList.length}} )</h2>
      <div class="comment_list">
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
    </div>
    <Comment class="banxin news_comment" @submit="submitComent" v-if="loaded"/>
    <div class="data_err" v-if="loadedErr">抱歉，该内容不存在~</div>
  </div>
</template>
<script>
import Comment from "@/views/PC/components/send_comment.vue";
export default {
  components: {
    Comment
  },
  data() {
    return {
      title: "",
      info: {},
      commentList: [],
      loaded:false,
      loadedErr:false
    };
  },
  created() {
    this.$http
      .get("/index.php?g=H5&m=News&a=newsDetail", {
        params: { id: this.$route.params.id }
      })
      .then(res => {
        this.newsInfo = res.data;
        // console.log(res.data);
        this.title = res.data.siteSeoTitle;
        this.info = res.data.detail || {};
        this.commentList = res.data.commentList || [];
        this.loaded=true;
      }).catch(err=>{
          this.loadedErr=true;
          console.log(err)
      });
  },
  methods: {
    submitComent(text) {
      this.$toast("此功能暂未开放，敬请期待");
    }
  }
};
</script>
<style lang="scss" scoped>
.news_details_page {
  .banxin {
    width: 1280px;
    margin: 0 auto;
  }
  .news_info_conn {
    color: #181818;
    text-align: center;
    margin-top: 80px;
    .info_title {
      font-size: 32px;
      font-family: Lantinghei SC;
      font-weight: 600;
      color: rgba(24, 24, 24, 1);
    }
    .info_other {
      line-height: 48px;
      font-size: 26px;
      font-weight: 400;
      .info_date {
      }
      .info_view_s {
        color: rgba(174, 150, 88, 1);
        margin: 0 21px;
      }
      .info_comment_s {
        color: rgba(174, 150, 88, 1);
      }
    }
  }
  .news_txt_conn {
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .news_comment {
    padding: 40px 0;
  }
  .comment_list_conn {
    .ltitle {
      font-size: 46px;
      font-weight: 600;
    }
    .comment_list {
      .comment_item {
        width: 100%;
        overflow: hidden;
    margin-bottom: 40px;
        .item_avatar {
          width: 100px;
          height: 100px;
          float: left;
        }
        .item_info {
          padding-left: 130px;
          .item_name {
            line-height: 48px;
            font-size: 32px;
          }
          .item_time {
            float: right;
            line-height: 48px;
            font-size: 24px;
            color: rgb(155, 154, 154);
          }
          .item_txt {
            font-size: 24px;
            line-height: 48px;
            color: rgb(119, 119, 119);

          }
        }
      }
    }
  }
  .data_err{
      font-size: 32px;
      line-height: 300px;
      text-align: center;
  }
}
</style>