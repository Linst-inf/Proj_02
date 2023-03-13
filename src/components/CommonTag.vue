<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      >{{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(['tab','CloseTag']),//拿过来用
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(item,index) {
      this.$store.commit("CloseTag", item);
      if (item.name === this.$route.name) {
        const length = this.tags.length;
        // 如果删除的是最后一个:跳到前一个
        if (length === index) {
          this.$router.push({ name: this.tags[index - 1].name });
        }
        // 不是最后一个:往后一个
        else {
          this.$router.push({ name: this.tags[index].name });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
