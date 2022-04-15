<template>
  <div>
    <cube-tab-bar v-model="selectedLabel" show-slider="">
      <cube-tab v-for="item in tab" :label="item.label" :key="item.label">
      </cube-tab>
    </cube-tab-bar>

    <component
      :videoInfo="videoInfo"
      :chapterList="chapterList"
      :is="selectedLabel === '简介' ? 'Summary' : 'Catalog'"
    >
    </component>
  </div>
</template>

<script>
import Summary from "./Summary.vue";
import Catalog from "./Catalog.vue";
export default {
  components: {
    Summary,
    Catalog,
  },

  props: {
    videoInfo: {
      type: Object,
      required: true,
    },
    chapterList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectedLabel: "简介",
      tab: [
        {
          label: "简介",
        },
        {
          label: "目录",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>