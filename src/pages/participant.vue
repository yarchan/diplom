<template>
  <div class="q-pa-lg row">
    <div class="text-h6 q-mr-lg text-accent">Участники</div>
    <div>
    <q-btn
      @click="alert=true"  style="text-transform: capitalize;background: rgba(27, 41, 92, 0.3);box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.25);backdrop-filter: blur(27px);"
    >
      <q-icon
      size="25px"
      style="position:relative;"
      ><img src="../assets/add.svg" alt=""></q-icon>
      <q-label  class="q-ml-md text-accent">Добавить участника</q-label>
    </q-btn>
    </div>
  </div>    
    <div class="q-pa-sm ">
      <q-list separator>
        <q-item class="bg-secondary q-ma-lg" style="padding:0" clickable v-ripple v-for="participant in participants" :key="participant.id">
          <q-item-section >
            <q-list class="shadow-8">
              <q-item class="flex items-start text-accent " style=" padding:0">
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Имя</q-item-label>
                      <q-item-label>{{participant.firstname}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Фамилия</q-item-label>
                      <q-item-label>{{participant.lastname}}</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Возраст</q-item-label>
                      <q-item-label>{{participant.age}}</q-item-label>
                  </q-item-section>
                  <q-item-section v-if="participant.male" class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Пол</q-item-label>
                      <q-item-label>Мужской</q-item-label>
                  </q-item-section>
                  <q-item-section v-if="!participant.male" class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Пол</q-item-label>
                      <q-item-label>Женский</q-item-label>
                  </q-item-section>
                  <q-item-section class="flex items-center q-pt-md text-center">
                      <q-item-label overline>Номер фото</q-item-label>
                      <q-item-label>{{participant.imageId}}</q-item-label>
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
                      @click="showeditParticipant=true,editParticipantId=participant.id"
                      >
                       <q-icon name="img:edit-vector.svg"></q-icon>
                      </q-btn>
                  </div>
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
                      @click="deleteParticipant(participant.id)"
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
  <q-dialog v-model="alert">
    <div class="edit-participant-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Добавить участника
            </div>
            <q-space />
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section class="q-pa-md" style="background:rgb(56 54 80);">          
            <div class="row items-center content-center">
              <span class="text-accent col-3">Имя: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="firstname"
                dark
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
                v-model="lastname"
                dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Возраст: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="age"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Пол: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="мужской"
                class="q-ma-md"
                @click="male=true,isActive=false"
                :class="{active:!isActive }"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="женский"
                @click="male=false,isActive=true"
                :class="{active:isActive }"
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">номер фотографии: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="photo"
                  dark
              />
            </div>
            <div class="row justify-center items-center content-center">
              <q-btn
                color="primary"
                icon="check"
                label="Добавить"
                v-close-popup
                @click="postParticipant"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-dialog>
  <q-dialog v-model="showeditParticipant">
    <div class="edit-participant-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Редактировать участника
            </div>
            <q-space />
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section class="q-pa-md" style="background:rgb(56 54 80);">          
            <div class="row items-center content-center">
              <span class="text-accent col-3">Имя: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="firstname"
                dark
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
                v-model="lastname"
                dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Возраст: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="age"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Пол: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="мужской"
                class="q-ma-md"
                @click="male=true,isActive=false"
                :class="{active:!isActive }"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="женский"
                @click="male=false,isActive=true"
                :class="{active:isActive }"
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">номер фотографии: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="photo"
                  dark
              />
            </div>
            <div class="row justify-center items-center content-center">
              <q-btn
                color="primary"
                icon="check"
                label="Редактировать"
                @click="editParticipant"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'Participant',
  setup () {
    return {
      isActive: ref(false),
      showeditParticipant: ref(false),
      alert: ref(false),
      editParticipantId: ref(''),
      firstname:ref(''),
      lastname:ref(''),
      age:ref(''),
      imageId:ref(''),
      male:ref(true),
      photo:ref('')
    }
  },
  data(){
    return{
      participants:[
      ],
    }
  },
  methods:{
    editParticipant(){
      let editparticipant = {
        firstname:this.firstname,
        lastname:this.lastname,
        age:this.age,
        imageId:this.photo,
        male:this.male
      }
      console.log(editparticipant);
      let token = sessionStorage.getItem('token')
      this.$axios.put (`http://80.78.255.94/events/0.1/user/participants/${this.editParticipantId}`,editparticipant,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then()
    },
    postParticipant(){
      let participant = {
        firstname:this.firstname,
        lastname:this.lastname,
        age:this.age,
        imageId:this.photo,
        male:this.male
      }
      let token = sessionStorage.getItem('token')
      this.$axios.post('http://80.78.255.94/events/0.1/user/participants',participant,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then()
    },
    deleteParticipant(props){
      let token = sessionStorage.getItem('token')
      this.$axios.delete(`http://80.78.255.94/events/0.1/user/participants/${props}/`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then()
    },
    getParticipant(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/user/participants?limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
        this.participants =response.data
      })
    }
  },
  created(){
    this.getParticipant()
  }
})
</script>

<style>
  .active{
    background: #e64c5e85 !important;
  }
</style>