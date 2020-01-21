<template>
    <div class="homeBox">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">中台任务管理系统</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model.trim="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model.trim="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data () {
            return {
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: true
            }
        },
        methods: {
            ...mapActions([
                'login'
            ]),
            handleSubmit2(name) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.doLogin()
                    } else {
                        this.$message.error('登录失败,请填写完整');
                    }
                })
            },
            doLogin() {
                this.login({
                    username: this.ruleForm2.account,
                    password: this.ruleForm2.checkPass
                }).then(() => {
                    this.$router.push({path: '/task/tasklist'})
                }).catch(error => {
                    this.$message.error(error.message);

                })

            }
        },
        mounted() {

        },
        created() {
          var lett = this;
          document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
              lett.handleSubmit2();
            }
          }
        }
    }

</script>

<style lang="scss" scoped>
    .homeBox {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        background-color: 	#272727;
    }
  .login-container {
    position: absolute;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #23305a;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
      z-index: 1000;
    float: right;
    right: 40%;
    top: 25%;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #2ec0f6;
    }
    .remember {
      margin: 0px 0px 35px 0px;
        color: #eaeaea;
    }
  }
</style>
