<template>
  <div class="form-validator">
    <div class="wrapper">
      <form novalidate @submit.prevent="formCheck">
        <h2>注册页面</h2>
        <!--用户名-->
        <div class="inputitem" :class="checkResult.name">
          <label for="username">用户名</label>
          <input
            required
            type="text"
            id="username"
            placeholder="请输入用户名"
            v-model.trim="inputContent.name"
          />
          <small v-show="checkResult.name === 'invalid'">用户名至少需要3个字符</small>
        </div>
        <!--email地址-->
        <div class="inputitem" :class="checkResult.email">
          <label for="email">Email地址</label>
          <input
            required
            type="email"
            id="email"
            placeholder="请输入email地址"
            v-model="inputContent.email"
          />
          <small v-show="checkResult.email === 'invalid'"
            >Email地址错误，请重新输入</small
          >
        </div>
        <!--密码-->
        <div class="inputitem" :class="checkResult.pwd">
          <label for="password">密码</label>
          <input
            required
            type="password"
            id="password"
            placeholder="请输入密码"
            v-model="inputContent.pwd"
          />
          <small v-show="checkResult.pwd === 'invalid'"
            >密码至少需要6个字符，请重新输入</small
          >
        </div>
        <!--确认密码-->
        <div class="inputitem" :class="checkResult.pwd2">
          <label for="pwdcomfirm">确认密码</label>
          <input
            required
            type="password"
            id="pwdcomfirm"
            placeholder="请再输入一次密码以确认"
            v-model="inputContent.pwd2"
          />
          <small v-show="checkResult.pwd2 === 'invalid'">{{ pwd2warn }}</small>
        </div>

        <button type="submit">完成注册</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormValidatir",
  data() {
    return {
      //数据校验结果
      checkResult: { name: "", email: "", pwd: "", pwd2: "" },
      //输入内容
      inputContent: { name: "", email: "", pwd: "", pwd2: "" },
      //密码2的提示信息
      pwd2warn: "",
    };
  },
  methods: {
    //用户名检查
    nameCheck() {
      if (this.inputContent.name.length < 3) {
        this.checkResult.name = "invalid";
      } else {
        this.checkResult.name = "valid";
      }
    },
    //email地址检查
    emailCheck() {
      let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegExp.test(this.inputContent.email)) {
        this.checkResult.email = "valid";
      } else {
        this.checkResult.email = "invalid";
      }
    },
    //密码检查
    pwdCheck() {
      if (this.inputContent.pwd.length < 6) {
        this.checkResult.pwd = "invalid";
      } else {
        this.checkResult.pwd = "valid";
      }
    },
    //第二次密码检查
    pwd2Check() {
      if (this.inputContent.pwd2 === "") {
        this.pwd2warn = "请输入确认密码";
        this.checkResult.pwd2 = "invalid";
      } else if (this.inputContent.pwd2 !== this.inputContent.pwd) {
        this.pwd2warn = "密码不匹配，请检查后重试";
        this.checkResult.pwd2 = "invalid";
      } else {
        this.checkResult.pwd2 = "valid";
      }
    },
    //登录界面表单校验
    formCheck() {
      this.nameCheck();
      this.emailCheck();
      this.pwdCheck();
      this.pwd2Check();
    },
  },
};
</script>

<style scoped>
.form-validator {
  background-color: #f9fafb;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}
.wrapper {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}
form {
  padding: 30px 40px;
}
h2 {
  text-align: center;
  margin: 0 0 20px;
}
.inputitem {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}
label {
  color: #777;
  display: block;
  margin-bottom: 5px;
}
.inputitem input:focus {
  outline: 0;
  border-color: #777;
}
.inputitem.valid input {
  border-color: rgb(46, 204, 113);
}
.inputitem.invalid input {
  border-color: rgb(231, 76, 60);
}
input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
}
.inputitem small {
  color: rgb(231, 76, 60);
  position: absolute;
  bottom: 0;
  left: 0;
}
button {
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}
</style>
