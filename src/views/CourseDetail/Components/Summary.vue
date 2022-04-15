<template>
  <div>
    
    <div class="summary" v-html="videoInfo.summary">
    </div>
  </div>
</template>

<script>
export default {
  //从父组件获取视频信息信息
  props: {
    videoInfo: {
      type: Object,
      required: true,
    },
  }
};
</script>

<style lang="scss" scoped>
.summary {
  width: 90%;
    margin: 5%;
    line-height: 33px;
    font-size: 17px;
    background: #fff;
    color: #333;
    font-family: "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif; 
    font-weight: lighter;
}
</style>