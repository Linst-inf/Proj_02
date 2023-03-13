<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请输入性别">
            <el-option label="女" :value="1"></el-option>
            <el-option label="男" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.birth"
              value-format="yyyy-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd" modelType="0"
        >+新增</el-button
      >
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入查找内容"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="userList" height="90%" stripe>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.sex == 0 ? "女" : "男"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="180">
        </el-table-column>
        <el-table-column prop="addr" label="地址" width="auto">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
              modelType="1"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="count"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, delUser } from "@/api";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogFormVisible: false,
      modelType: 0,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      userList: [],
      count: 0,
      pageList: {
        page: 1,
        limit: 10,
      },
      userForm:{},
      input: "",
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        addr: [{ required: true, message: "请填写地址", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getUserList({ params: {...this.userForm , ...this.pageList} }).then(({ data }) => {
        console.log(data);
        this.userList = data.list;
        this.count = data.count || 0;
      });
    },
    handlePage(page) {
      this.pageList.page = page;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(({ data }) => {
              this.getList();
            });
          } else {
            editUser(this.form).then(({ data }) => {
              this.getList();
            });
          }
          this.dialogFormVisible = false;
          this.$refs.form.resetFields();
        }
      });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          addUser({ id: row.id }).then(({ data }) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // handleClose() {
    //   this.dialogFormVisible = false;
    //   this.$refs.form.resetFields();
    // },
    deleteForm() {
      //   handleClose();
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 100%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .common-table {
    height: 90%;
    position: relative;

    .pager {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>
