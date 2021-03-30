<template>
  <form novalidate @submit.prevent="formCheck">
    <p>向我们注册以获得更多的支持与服务</p>
    <!--用户名-->
    <div class="inputitem" :class="check.name">
      <label for="username">用户名</label>
      <input
        required
        type="text"
        id="username"
        placeholder="请输入用户名"
        v-model="inputcontent.name"
      />
      <small v-show="check.name === 'invalid'">用户名至少3个字符</small>
    </div>
    <!--email地址-->
    <div class="inputitem" :class="check.email">
      <label for="email">Email地址</label>
      <input
        required
        type="email"
        id="email"
        placeholder="请输入email地址"
        v-model="inputcontent.email"
      />
      <small v-show="check.email === 'invalid'">Email地址错误</small>
    </div>
    <!--密码-->
    <div class="inputitem" :class="check.pwd">
      <label for="password">密码</label>
      <input
        required
        type="password"
        id="password"
        placeholder="请输入密码"
        v-model="inputcontent.pwd"
      />
      <small v-show="check.pwd === 'invalid'">密码至少6个字符</small>
    </div>
    <!--确认密码-->
    <div class="inputitem" :class="check.pwd2">
      <label for="pwdcomfirm">确认密码</label>
      <input
        required
        type="password"
        id="pwdcomfirm"
        placeholder="请确认密码"
        v-model="inputcontent.pwd2"
      />
      <small v-show="check.pwd2 === 'invalid'">{{ pwd2warn }}</small>
    </div>

    <button type="submit">立即注册</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      //数据校验结果
      check: { name: "", email: "", pwd: "", pwd2: "" },
      //输入内容
      inputcontent: { name: "", email: "", pwd: "", pwd2: "" },
      //密码2的提示信息
      pwd2warn: "",
    };
  },
  methods: {
    //用户名检查
    nameCheck() {
      if (this.inputcontent.name.length < 3) {
        this.check.name = "invalid";
      } else {
        this.check.name = "valid";
      }
    },
    //email地址检查
    emailCheck() {
      let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegExp.test(this.inputcontent.email)) {
        this.check.email = "valid";
      } else {
        this.check.email = "invalid";
      }
    },
    //密码检查
    pwdCheck() {
      if (this.inputcontent.pwd.length < 6) {
        this.check.pwd = "invalid";
      } else {
        this.check.pwd = "valid";
      }
    },
    //第二次密码检查
    pwd2Check() {
      if (this.inputcontent.pwd2 === "") {
        this.pwd2warn = "请输入确认密码";
        this.check.pwd2 = "invalid";
      } else if (this.inputcontent.pwd2 !== this.inputcontent.pwd) {
        this.pwd2warn = "密码不匹配，请检查并重新输入";
        this.check.pwd2 = "invalid";
      } else {
        this.check.pwd2 = "valid";
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
p {
  margin-top: 0;
  text-align: center;
}

.inputitem {
  margin: 15px 0;
  position: relative;
}
label {
  display: block;
  margin-bottom: 5px;
}
.inputitem input:focus {
  outline: 0;
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
  bottom: -15px;
  left: 0;
}
button {
  background-color: var(--secondary-color);
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;
  position: absolute;
  bottom: 15px;
  right: 0;
  left: 0;
  margin: 0 auto;
}
button:focus {
  outline: none;
}
</style>