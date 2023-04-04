<template>
  <div class="q-pa-lg row">
    <div class="text-h6 q-mr-lg text-accent">Пользователи</div>
    <div>
    <q-btn
      style="text-transform: capitalize;background: rgba(27, 41, 92, 0.3);box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.25);backdrop-filter: blur(27px);"
    >
      <q-icon
      size="25px" 
      style="position:relative;"
      ><img src="../assets/add.svg" alt=""></q-icon>
      <q-label @click="addUser=true" class="q-ml-md text-accent">Добавить пользователя</q-label>
    </q-btn>
    </div>
  </div>    
    <div class="q-pa-sm ">
      <q-list separator>
        <q-item class="bg-secondary q-ma-lg" style="padding:0" clickable v-ripple v-for="user in users" :key="user.id">
          <q-item-section @click="showUser=true" >
            <q-list class="shadow-8">
              <q-item class="flex items-start text-accent " style=" padding:0">
                  <q-item-section class="flex items-center q-pt-md text-center" >
                      <q-item-label overline>Номер</q-item-label>
                      <q-item-label>{{user.id}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Имя</q-item-label>
                      <q-item-label>{{user.name}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Фамилия</q-item-label>
                      <q-item-label>{{user.username}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Вид</q-item-label>
                      <q-item-label>{{user.username}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Клуб</q-item-label>
                      <q-item-label>{{user.username}}</q-item-label>
                  </q-item-section>
                  <div
                      style="
                      height:6em;            
                      width:6em;
                      box-shadow: -2px 1px 12px rgba(0, 0, 0, 0.25);
                      background: linear-gradient(184.46deg, rgba(143, 214, 254, 0.50) 3.62%, rgba(17, 25, 102, 0.61) 100.76%);"
                      size="50px"
                  >
                      <q-btn
                      class="inset-shadow "
                      round
                      style="position:relative;left:30%;top:25%; box-shadow:none"
                      dense
                      @click="props.expand = !props.expand"
                      >
                      <q-icon name="img:basket.svg"></q-icon>
                      </q-btn>
                  </div>
                </q-item>
            </q-list>
          </q-item-section>
        </q-item>
      </q-list> 
    </div>
  <q-dialog v-model="addUser">
    <div class="edit-user-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Добавить пользователя  
            </div>
            <q-space />
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section class="q-pa-md" style="background:#152335">          
            <div class="row items-center content-center">
              <span class="text-accent col-3">Имя: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
              />
            </div>    
            <div class="row items-center content-center">
              <span class="text-accent col-3">Фамилия: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);color: wheat;"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Телефон: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  mask="+7(###)###-##-##"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
              />
            </div>
            <div class="row justify-center items-center content-center">
              <q-btn
                color="primary"
                icon="check"
                label="Добавить"
                v-close-popup
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-dialog>
  <q-dialog v-model="showUser">
        <div class="edit-user-modal" style="min-width: 40vw">
        <q-card>
          <q-toolbar class="bg-negative text-accent justify-between" color:accent>
            Информация о пользователе
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
          </q-btn>
          </q-toolbar>
          <q-list style="background:#152335">
            <q-item class="column right">
              <q-item-section>
                <q-item-label class="bg-negative">
                  
                </q-item-label>
              </q-item-section>
              <q-item-section v-for="user in users" :key="user.id" class="q-pa-md">
                <q-item-label class="text-accent">Имя:  {{user.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'Users',
  setup () {
    return {
      addUser: ref(false),
      showUser:ref(false)
    }
  },
  data(){
    return{
      users:[
      ],
    }
  },
  methods:{
    getMembers(){
      this.$axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response=>{
          this.users = response.data
     })
    }
  },
  created(){
    this.getMembers()
  }
})
</script>
