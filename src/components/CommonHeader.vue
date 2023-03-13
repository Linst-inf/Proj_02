<template>
  <div class="header_container">
    <div class="l-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path}">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="@/assets/images/user.jpg" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户</el-dropdown-item>
          <el-dropdown-item @click.native="lagout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
  data() {
    return {
    };
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabList
    })
    // ...mapState(['tab','tabList']),
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    lagout(){
      Cookie.remove('token')
      this.$router.push('/login')
    }
  }
};
</script>
<style lang="less" scoped>
.header_container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  //   .el-dropdown-link {
  //     cursor: pointer;
  //     color: #409EFF;
  //   }
  //   .el-icon-arrow-down {
  //     font-size: 12px;
  //   }
  .r-content {
    .user {
      // margin-right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.l-content {
  display: flex;
  // 上下居中
  align-items: center;

  .el-breadcrumb {
    margin-left: 15px;

    // deep 强制生效
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          //&并且
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>
