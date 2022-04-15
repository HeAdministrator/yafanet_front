<template>
  <div>
    <div class="container">
      <div class="p_top">
        <div>
          <img :src="info.head_img || defaultHeadImg" alt="头像" />

          <router-link to="/login" v-if="getToken === ''">
            <p>立即登录</p>
          </router-link>

          <p v-else>{{ info.name }}</p>
        </div>
      </div>

      <button v-if="getToken !== ''" class="green" @click="signOut()">
        退出登录
      </button>

      <div class="icps">
        <p>湘ICP备2022005083号</p>
      </div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter.vue";
import { getUserInfo } from "@/api/getData.js";
import defaultHeadImg from "@/assets/logo.png";

export default {
  components: {
    CommonFooter,
  },
  data() {
    return {
      info: {},
      defaultHeadImg: defaultHeadImg,
    };
  },

  computed: {
    getToken() {
      return this.$store.state.token;
    },
  },

  methods: {
    //获取用户信息
    async getInfo() {
      try {
        const result = await getUserInfo(this.getToken);
        if (result.data.code == 0) {
          this.info = result.data.data;
        } else {
          const toast = this.$createToast({
            txt: "数据异常，正在跳转到登录页面....",
            type: "error",
            time: 2000,
            mask: true,
          });
          toast.show();
          //跳转页面,根据业务需要
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //退出登录
    async signOut() {
      //清除token
      await this.$store.dispatch('clearToken');
      localStorage.removeItem("token");
      const toast = this.$createToast({
            txt: "退出成功😀!",
            type: "correct",
            time: 800
       });
      toast.show();
      //刷新页面
      setTimeout(() => {
          location.reload();
      },800);
    },
  },

  mounted() {
    if (this.getToken) {
      this.getInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  // 顶部头像区域
  .p_top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: #2c3f54;
    div {
      text-align: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}
// 退出登录
.green {
  display: block;
  background-color: #3bb149;
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;
}
.icps {
    position: absolute;
    bottom: 59px;
    left: 33%;
    font-size: 12px;
    color: #999;

}
</style>