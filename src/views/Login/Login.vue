<template>
  <div class="main">
    <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <!--手机号-->
        <cube-form-item :field="fields[0]"></cube-form-item>
        <!--密码-->
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>

      <cube-form-group>
        <cube-button type="submit">登录</cube-button>
      </cube-form-group>
    </cube-form>

    <router-link to="/register" class="reg">注册</router-link>
  </div>
</template>

<script>
//登录接口
import { loginApi } from "@/api/getData.js";
export default {
  data() {
    return {
      model: {
        phoneValue: "",
        pwdValue: "",
        nameValue: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "phoneValue",
          label: "手机号",
          props: {
            placeholder: "请输入手机号",
          },
          rules: {
            required: true,
          },
          messages: {
            required: "手机号不能为空",
          },
        },
        {
          type: "input",
          modelKey: "pwdValue",
          label: "密码",
          props: {
            placeholder: "请输入密码",
            type: "password",
            eye: {
              open: false,
            },
          },
          rules: {
            required: true,
          },
          messages: {
            required: "密码不能为空",
          },
        },
      ],
    };
  },

  computed: {
    getVideoId(){
        return this.$route.query.video_id;
    }
  },
  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      const toastmains = this.$createToast({
        txt: "登录中...",
        type: "loading...",
        mask: true,
        time: 800,
        onTimeout: () => {
          //调用登录接口
          loginApi(model.phoneValue, model.pwdValue).then((res) => {
            if (res.data.code == 0) {
              //登录成功,跳转到个人中心,还可以用sessionStorage，但关闭浏览器会消失
              localStorage.setItem("token", res.data.data);

              //通过Vuex存储token
              this.$store.dispatch("setToken", res.data.data);

              const toast = this.$createToast({
                txt: "登录成功,正在跳转...",
                type: "correct",
                time: 800,
              });
              toastmains.hide();
              toast.show();
              //跳转页面,根据业务需要
              setTimeout(() => {
                const videoId=this.getVideoId
                if(videoId){
                  this.$router.push({ path: "/coursedetail",query:{"video_id":videoId} });
                }else{
                  this.$router.push({ path: "/" });
                }
              }, 1500);
            } else {
              const toast = this.$createToast({
                txt: res.data.msg,
                type: "error",
                time: 2000,
              });
              toastmains.hide();
              toast.show();
            }
          });
        },
      });
      toastmains.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 50px 5% 0;
  text-align: center;
}
// 登录
.cube-btn {
  margin-top: 20px;
}
//注册
.reg {
  display: inline-block;
  margin-top: 30px;
  font-size: 18px;
}
</style>