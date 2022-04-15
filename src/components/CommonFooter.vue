<template>
  <div class="tab">
    <cube-tab-bar v-model="selectedLabelSlots" @click="changeHandler">
      <cube-tab
        v-for="item in tabs"
        :icon="item.icon"
        :label="item.label"
        :key="item.path"
        :value="item.path"
      >
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelSlots: "/",
      tabs: [
        {
          label: "首页",
          icon: "cubeic-home",
          path: "/",
        },
        {
          label: "我的追剧",
          icon: "cubeic-like",
          path: "/order",
        },
        {
          label: "个人中心",
          icon: "cubeic-person",
          path: "/personal",
        },
      ],
    };
  },

  methods: {
    changeHandler(path) {
      //this.$router.path是当前路径
      if (path !== this.$router.path) {
        this.$router.push(path);
      }
    },
  },

  //vue实例⽣命周期 created：在模板渲染成html前调⽤，即通常初始化某些属性值，然后再渲染成视图
  //vue实例⽣命周期 mounted：在模板渲染成html后调⽤，通常是初始化⻚⾯完成后，再对html的dom节点进⾏额外的操作 
  //https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

  created() {
    //默认路由选择器，比如刷新页面，需要重新进到当前路由器
    this.selectedLabelSlots = this.$router.path;
  },
};
</script>

<!--SCSS是⼀种CSS预处理语⾔, scoped 是指这个scss样式 只作⽤于当前组件-->
<style lang="scss" scoped>
.tab {
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
  width: 100%;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.cube-tab_active {
  color: #3bb149;
}
</style>

