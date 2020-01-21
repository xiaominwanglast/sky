<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="3" class="logo">
				<span style='text-decoration: none;color: #FFFFFF'>{{sysName}}</span>
<!--				<router-link to="/task/tasklist" style='text-decoration: none;color: #FFFFFF'>{{sysName}}</router-link>-->
			</el-col>
			<el-col :span="15">
				<el-menu :default-active="this.$router.path" router  mode="horizontal" @select="handleselect"  style="background-color: #20a0ff">
					<el-menu-item index="/task/tasklist" class="menu-el" style="background-color:#8E8E8E">中台测试组项目</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="6" class="userinfo">
				<el-dropdown>
					<span class="el-dropdown-link userinfo-inner">
            <i class="el-icon-user-solid"></i>
             {{realname}}
					</span>
					<el-dropdown-menu slot="dropdown">
						<!--						<el-dropdown-item>我的消息</el-dropdown-item>-->
						<!--						<el-dropdown-item>设置</el-dropdown-item>-->
						<el-dropdown-item divided @click.native="handleClick">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<router-view></router-view>
	</el-row>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		data() {
			return {
				pathruoter:"1",
				projectShow:false,
				sysName:'中台业务管理系统',
				sysUserName: '',
				// sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		computed: {
			...mapGetters([
				'realname'
			]),
		},
		methods: {
			handleselect: function (a, b) {
				console.log(a,b)
			},
			//退出登录
			...mapActions([
				'logout'
			]),
			...mapGetters([
				'username', 'userinfo'
			]),
			handleClick(name) {
				this.logout().then(() => {
					this.$router.push({name: 'login'})
				}).catch(error => {
					this.$message.error('登出失败');
				})
			},
		},
	}

</script>

<style scoped lang="scss">

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #20a0ff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					font-size: 20px;
				}
			}
			.el-menu-item.is-active{
				border-bottom:0px solid;
				background-color: #8E8E8E;
			}
			.menu-el {
				background: #20a0ff;
				color: #fff;
				font-size: 18px;
				padding: 0 10px;
			}
			.logo {
				font-size: 22px;
				padding-left:20px;
				.txt {
					color:#fff;
				}
			}
		}
	}
</style>
