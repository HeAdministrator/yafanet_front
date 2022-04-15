<template>
  <div class="main">
    <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <!--用户名-->
        <cube-form-item :field="fields[0]"></cube-form-item>
        <!--手机号-->
        <cube-form-item :field="fields[1]"></cube-form-item>
        <!--密码-->
        <cube-form-item :field="fields[2]"></cube-form-item>
      </cube-form-group>

      <cube-form-group>
        <cube-button type="submit">注册</cube-button>
      </cube-form-group>
    </cube-form>

    <router-link to="/login" class="reg">登录</router-link>
  </div>
</template>

<script>
//注册接口
import { registerApi, loginApi } from "@/api/getData.js";
export default {
  data() {
    return {
      model: {
        phoneValue: "",
        pwdValue: "",
        nameValue: "",
      },
      fields: [
        {
          type: "input",
          modelKey: "nameValue",
          label: "用户名",
          props: {
            placeholder: "请输入用户名",
          },
          rules: {
            required: true,
          },
          messages: {
            required: "用户名不能为空",
          },
        },
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
  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      //调用注册接口
      registerApi(model.phoneValue, model.pwdValue, model.nameValue).then(
        (res) => {
          if (res.data.code == 0) {
            const toast = this.$createToast({
              txt: "注册成功,正在自动登录...",
              type: "correct",
              mask:true,
              time:500,
              onTimeout: () => {
                //自动登录跳转页面,根据业务需要
                loginApi(model.phoneValue, model.pwdValue).then((ress) => {

                  if (ress.data.code == 0) {
                    //登录成功,跳转到个人中心,还可以用sessionStorage，但关闭浏览器会消失
                    localStorage.setItem("token", ress.data.data);

                    //通过Vuex存储token
                    this.$store.dispatch('setToken',ress.data.data)

                    const logintoast = this.$createToast({
                      txt: "登录成功,正在跳转...",
                      type: "correct",
                      mask:true,
                      time: 2000,
                    });
                    logintoast.show();
                    //跳转页面,根据业务需要
                    setTimeout(()=>{
                        this.$router.push({path:'/'})
                    },800)
                    
                  } else {

                    const logintoast = this.$createToast({
                      txt: ress.data.msg,
                      type: "error",
                      time: 2000,
                    });
                    logintoast.show();
                  }
                });
              },
            });
            toast.show();
          } else {
            const toast = this.$createToast({
              txt: res.data.msg,
              type: "error",
              time: 2000,
            });
            toast.show();
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 50px 5% 0;
  text-align: center;
}
//注册
.cube-btn {
  margin-top: 20px;
}
// 登录
.reg {
  display: inline-block;
  margin-top: 30px;
  font-size: 18px;
}
</style>