<template>
  <q-card  style="background:none" class="column items-center justify-center no-border no-box-shadow " >
    <q-card-section class="column justify-end q-gutter-sm">
    </q-card-section>
    <q-card-section class="flex justify-between q-gutter-sm" style="width: 100%;">
      <div style="width: 130px;"></div>
      <div class="flex justify-center text-accent" style="font-size:30px">
        Настройки
      </div>
      <q-btn
        style="height:1em"
        color="primary"
        icon="edit"
        label="Выйти"
        @click="exit"
      />
    </q-card-section>
    <q-card-section class="flex column justify-center items-center" style="width:50%">
      <div class="flex justify-center text-accent" style="font-size:25px; margin-bottom: 40px;white-space:nowrap">
        Изменить данные пользователя
      </div>
      <q-input dark  v-model="username" label="Логин"/>
      <q-input dark  v-model="password" label="Пароль"/>
      <q-input dark  v-model="firstname" label="Имя"/>
      <q-input dark  v-model="middlename" label="Фамилия"/>
      <q-input dark class="q-mb-md"  v-model="lastname" label="Отчество"/>
      <q-btn class="login__btn bg-primary text-accent"  label="Сохранить" @click="editUser"></q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
  export default {
    setup(){
      return{
        username:ref(""),
        password:ref(""),
        firstname:ref(""),
        middlename:ref(""),
        lastname:ref(""),
      }
    },
    methods:{
      editUser(){
        console.log("1")
        let editparticipant = {
          login:this.username,
          password:this.password,
          firstname:this.firstname,
          middlename:this.middlename,
          lastname:this.lastname
        }
        console.log(editparticipant);
        let token = sessionStorage.getItem('token')
        let user = sessionStorage.getItem('user')
        this.$axios.put (`http://80.78.255.94/auth/0.1/users/${user}`,editparticipant,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then()
      },
      exit(){
        this.$router.push("/login")
        sessionStorage.removeItem('token'); 
      }, 
    }
  }
</script>