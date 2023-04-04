<template>
  <h4 class="text-accent flex justify-center">Раунды</h4>
  <div class="q-pa-md q-gutter-sm">
    <div class="flex justify-between"> 
      <q-btn-dropdown color="primary" label="Выберите турнир" :content-style="{ backgroundColor: 'rgb(56, 54, 80)',color:'white' }" dropdown-icon="change_history">
        <q-list>
          <q-item v-for="tournament in tournaments" :key="tournament.id" clickable v-close-popup @click="searchParticipant( tournament, tournament.participants),idTournament=tournament, fake=true">
            <q-item-section >
              <q-item-label>{{tournament.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown color="primary" label="Начать раунд" :content-style="{ backgroundColor: 'rgb(56, 54, 80)',color:'white' }" dropdown-icon="change_history">
        <q-list>
          <q-item v-for="tournament in alltournaments" :key="tournament.id" clickable v-close-popup @click="startMatch(tournament.id)">
            <q-item-section >
              <q-item-label>{{tournament.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <q-card class="transparent no-border no-box-shadow">
      <q-card-section >
        <q-item>
          <div v-if="fake">
            <!-- <q-item-secton class="row q-ma-md flex column" @click="editRound" style="background:none" v-for="(user,index) in users" :key="index" >
              <div v-for="(round,index) in user" :key="index" class="row text-accent " style="display:flex">
                <div class="bg-primary user-hover" style="margin-right:20px;cursor:pointer;" >
                  <q-item-label style="width:200px;">{{round.id }} {{round.lastname}}</q-item-label>
                </div>  
              </div>
            </q-item-secton> -->
            <q-item-secton class="row q-ma-md flex row"  style="background:none" >
              <div  class="row text-accent" style="display:flex;flex-direction: column;;">
                <div class="bg-primary shadow-5" style="margin-right:20px;margin-bottom:20px;cursor:pointer;" >
                  <q-item-label class="user-hover" style="width:200px;">Дмитрий</q-item-label>
                  <q-item-label class="user-hover" style="width:200px;">Денис</q-item-label>
                </div>  
                <div class="bg-primary shadow-5" style="margin-right:20px;margin-bottom:20px;cursor:pointer;" >
                  <q-item-label class="user-hover" @click="fakeMed=true" style="width:200px;">Георгий</q-item-label>
                  <q-item-label class="user-hover"  style="width:200px;">Артур</q-item-label>
                </div>  
              </div>
              <div  class="row text-accent " v-if="fakeMed" style="display:flex;flex-direction: column;justify-content: center;">
                <div class="bg-primary bg-primary shadow-5" style="margin-right:20px;margin-bottom:20px;cursor:pointer;" >
                  <q-item-label class="user-hover" style="width:200px;">Дмитрий</q-item-label>
                  <q-item-label class="user-hover" @click="fakeFinal=true" style="width:200px;">Георгий</q-item-label>
                </div>   
              </div>
              <div  class="row text-accent " v-if="fakeFinal" style="display:flex;flex-direction: column;justify-content: center;">
                <div class="bg-primary bg-primary shadow-5" style="margin-right:20px;margin-bottom:20px;cursor:pointer;" >
                  <q-item-label class="user-hover" style="width:200px;">Георгий</q-item-label>
                </div>   
              </div>
            </q-item-secton>
          </div>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      fakeFinal: ref(false),
      fakeMed: ref(false),
      fake: ref(false),
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref(''),
      tournaments:ref(''),
      alltournaments:ref(''),
      users:ref([]),
      idTournament: ref(''),
    }
  },
  methods:{
    editRound(){
      console.log(this.idTournament)
      console.log(this.idTournament.matches[0].rounds)
      let token = sessionStorage.getItem('token')
      let body={
        score1: 1,
        score2: 5
      }
      let bod
      this.$axios.put(`http://80.78.255.94/events/0.1/user/tournaments/rounds/${this.idTournament.matches[0].rounds[0].id}`,body,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(
        setTimeout(()=>{
          this.$axios.put(`http://80.78.255.94/events/0.1/user/tournaments/rounds/${this.idTournament.matches[1].rounds[0].id}`,body,{
            headers: { Authorization: `Bearer ${token}`}
          })
        },2000)
      )
      setTimeout(()=>{
        this.$axios.post(`http://80.78.255.94/events/0.1/user/tournaments/${this.idTournament.id}/matches/next?matchFormat=BEST_OF_1`,bod,{
          headers: { Authorization: `Bearer ${token}`}
        })
      },3000)
    },  
    startMatch(tournament){
      
      let body
      let token = sessionStorage.getItem('token')
      this.$axios.post(`http://80.78.255.94/events/0.1/user/tournaments/${tournament}/matches?tournamentType=SINGLE_ELIMINATION&matchFormat=BEST_OF_1`,body,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(
        this.$axios.post(`http://80.78.255.94/events/0.1/user/tournaments/${tournament}/matches/rounds`,body,{
          headers: { Authorization: `Bearer ${token}`}
        })
      )
    },  
    filterUser(){
      let usermap= []
      let newuser = this.users.slice(0)
      let userFilter
      for (let i=0;i<=newuser.length/2;i++){
        userFilter = newuser.slice(0,2)
        newuser = newuser.slice(2)
        usermap.push(userFilter)
        this.users = usermap
      }
    }, 
    searchParticipant(tournament,participant){
      console.log(tournament.id)
      let token = sessionStorage.getItem('token')
      for(let i=0;i<=participant.length-1;i++){
        this.$axios.get(`http://80.78.255.94/events/0.1/public/participants/${participant[i]}`,{
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response=>{
          this.users.push(response.data)
          this.users.sort((a, b) => a.id > b.id ? 1 : -1);
        })
      }
      setTimeout(() => {
        this.filterUser()
      }, 400);
    },

    getTournament(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/public/tournaments?status=PROCESSED&type=SINGLE_ELIMINATION&limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
          this.tournaments = response.data
      })
    },
    getAllTournament(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/public/tournaments?status=NEW&limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
          this.alltournaments = response.data
      })
    },
  },
  created(){
    this.getTournament()
    this.getAllTournament()
  }
}
</script>

<style>
  .user-hover:hover{
    height: 24px;
  }
  .user-hover:hover{
    background: #ff0322 !important;
  }
</style>