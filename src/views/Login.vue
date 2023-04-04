<template>
  <div class="flex justify-end">
    <q-btn
      style="height:1em"
      color="primary"
      class="q-ma-md"
      label="Регистрация"
      @click="logpage=true "
    />
    <q-btn
      style="height:1em"
      color="primary"
      class="q-ma-md"
      label="Авторизация"
      @click="logpage=false "
    />
  </div>
  <div class="login" v-if="!logpage">
    <div class="login__boundered">
      <div class="login__wrapper">
        <div class="login__title">
          <h4 class="text-accent flex justify-center">Авторизация</h4>
        </div>
        <q-input dark class="login__input" v-model="username" label="Логин"/>
        <q-input dark class="login__input q-mb-lg" v-model="password"  label="Пароль"  @keyup.enter="auth"/>
        <q-btn class="login__btn bg-primary text-accent" label="Войти" @click="auth"></q-btn>
      </div>
    </div>
  </div>
  <div class="login" v-if="logpage">
    <div class="login__boundered">
      <div class="login__wrapper">
        <div class="login__title">
          <h4 class="text-accent flex justify-center">Регистрация</h4>
        </div>
        <q-input dark class="login__input" v-model="username" label="Логин"/>
        <q-input dark class="login__input" v-model="password" label="Пароль"  @keyup.enter="auth"/>
        <q-input dark class="login__input" v-model="firstname " label="Имя"/>
        <q-input dark class="login__input" v-model="middlename" label="Фамилия"/>
        <q-input dark class="login__input  q-mb-lg" v-model="lastname" label="Отчество"/>
        <q-btn class="login__btn bg-primary text-accent" label="Зарегестрироваться" @click="registration"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { defineComponent } from "vue";
import { ref } from "vue";
import qs from 'qs'

export default defineComponent({
  setup(){
    return{
      logpage:ref(false),
      username:ref(""),
      password:ref(""),
      firstname:ref(""),
      middlename:ref(""),
      lastname:ref(""),
    }
  },
  methods:{ 
    registration(){    
      let data = {
        login: this.username,
        password: this.password,
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
      }

      this.$axios.post('http://80.78.255.94/auth/0.1/login/register', data)
      .then(
          this.username=null,
          this.password=null,
          this.firstname=null,
          this.middlename=null,
          this.lastname=null,
          this.logpage = true  
        )
       
    },
    auth(){
      let data = qs.stringify({
        login: this.username,
        password: this.password
      })

      this.$axios.post('http://80.78.255.94/auth/0.1/login', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      )
      .then(
        response =>{
          sessionStorage.setItem('token', response.data.accessToken);
          if(response.data.accessToken =! null){
            this.$router.push("/");
            let token = sessionStorage.getItem('token')
            this.$axios.get('http://80.78.255.94/auth/0.1/users/me',{
                headers: { Authorization: `Bearer ${token}`}
              })
            .then(
              response=>{
                sessionStorage.setItem('user', response.data.id);
              }
            )
          }
        }
      )
    }
  }
});
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  &__boundered{

  }
  &__wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__btn{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__input{
    width: 100%;
  }
}
.error {
  color: red;
}
</style>
