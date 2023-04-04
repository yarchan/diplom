<template>
  <q-card style="background:none" class="no-border no-box-shadow" >
    <!-- <q-card-section class="column justify-center q-gutter-sm">
      <div class="flex justify-center">
        //дата
      </div>
      <div class="row justify-center">
        <q-btn
          style=" box-shadow: 0 0 3px 1px white;"
          color="accent"
          outline
          round
          class="q-mr-md btn-mounth"
          @click="offset -= 1"
        >
          <q-icon size="100%" class="rotate-180">
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.40049 1.20001L6.5791 6.37862L1.40049 11.5572" stroke="#FF004C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </q-icon>
        </q-btn>
        <q-btn
          style="height:1em"
          class="q-px-xl q-py-xs shadow-5"
          color="primary"
          @click="offset = 0"
        >
          Текущий месяц
        </q-btn>
        <q-btn
          style="box-shadow: 0 0 3px 1px white;
          max-width: 20px !important;"
          color="accent"
          outline
          round
          class="q-ml-md btn-mounth"
          @click="offset += 1"
        >
          <q-icon size="100%">
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.40049 1.20001L6.5791 6.37862L1.40049 11.5572" stroke="#FF004C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </q-icon>
        </q-btn>
      </div>
    </q-card-section> -->
    <q-card-section class="row justify-between q-gutter-sm">
        <div class="col-2"></div>
      
        <div class="row justify-end q-gutter-sm">
          <q-btn
            style="height:1em"
            color="primary"
            icon="edit"
            label="добавить"
            @click="addTurnament,dialogAddTur=true"
          />
        </div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md">
        <q-table
          grid
          :title-style="{backgroundColor: '#ff0000' }"
          :table-header-style="{ backgroundColor: '#ff0000' }"
          title="Турниры"
          :rows="rows"
          :columns="columns"
          :row-key="row => row.id"
          :filter="filter"  
          hide-header 
          @row-click="tournirChose = true,log(row.id)"
        >
          <template v-slot:top-right>
            <q-input dark  borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" style="color:rgb(249 153 153);"/>
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="dialogAddTur">
    <div class="edit-participant-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Добавить турнир
            </div>
            <q-space />
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section class="q-pa-md" style="background:rgb(56 54 80);">          
            <div class="row items-center content-center">
              <span class="text-accent col-3">Название: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="name"
                dark
              />
            </div>    
            <div class="row items-center content-center">
              <span class="text-accent col-3">Описание: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);color: wheat;"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="description"
                dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Тип: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="открытый"
                class="q-ma-md"
                :class="{activeBtn:!typeActive}"
                @click="open=true,typeActive=false"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="закрытый"
                :class="{activeBtn:typeActive}"
                @click="open=false,typeActive=true"
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Мето проведения: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="location"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Спорт: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="sportType"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Индивидуальность: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="индивидуальный"
                class="q-ma-md"
                :class="{activeBtn:!individualActive}"
                @click="individual=true,individualActive=false"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="публичный"
                :class="{activeBtn:individualActive}"
                @click="individual=false,individualActive=true"
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
                @click="addTurnament"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-dialog>
  <q-dialog v-model="tournirChose" >
    <q-card class="q-pa-lg" style="background:rgb(56, 54, 80);">
      <q-btn
        style="height:1em"
        class="q-mr-md"
        color="primary"
        label="Удалить"
        :class="{activeBtn:typeActive}"
        @click="deleteTournir"
      />
      <q-btn
        class="q-mr-md"
        style="height:1em"
        color="warning"
        label="Редактировать"
        :class="{activeBtn:typeActive}"
        @click="dialogEditTur=true"
      />
      <q-btn
        style="height:1em"
        color="warning"
        label="Добавить участника/команду"
        :class="{activeBtn:typeActive}"
        @click="dialogaddParticipant=true"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogEditTur">
    <div class="edit-participant-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Добавить турнир
            </div>
            <q-space />
            <q-btn dense flat icon="close" color="white" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section class="q-pa-md" style="background:rgb(56 54 80);">          
            <div class="row items-center content-center">
              <span class="text-accent col-3">Название: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="name"
                dark
              />
            </div>    
            <div class="row items-center content-center">
              <span class="text-accent col-3">Описание: </span>
              <q-input
                style="background:rgba(255,255,255,0.2);color: wheat;"
                class="accent col-6 q-ma-md"
                filled
                stack-label
                dense
                v-model="description"
                dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Тип: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="открытый"
                class="q-ma-md"
                :class="{activeBtn:!typeActive}"
                @click="open=true,typeActive=false"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="закрытый"
                :class="{activeBtn:typeActive}"
                @click="open=false,typeActive=true"
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Мето проведения: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="location"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Спорт: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="sportType"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Индивидуальность: </span>
              <q-btn
                style="height:1em"
                color="primary"
                label="индивидуальный"
                class="q-ma-md"
                :class="{activeBtn:!individualActive}"
                @click="individual=true,individualActive=false"
              />
              <q-btn
                style="height:1em"
                color="primary"
                label="публичный"
                :class="{activeBtn:individualActive}"
                @click="individual=false,individualActive=true"
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
                @click="editTournament"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-dialog>
  <q-dialog v-model="dialogaddParticipant">
    <div class="edit-participant-modal">
      <q-card style="min-width: 40vw;">
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
            <q-btn-dropdown color="primary" label="Выбрать">
              <q-list>
                <q-item v-for="(participant,index) in participants" :key="index" style="background:rgb(56, 54, 80);" clickable v-close-popup @click="onItemClick">
                  <q-item-section @click="addParticipant(participant.id)">
                    <q-item-label class="text-accent">{{participant.firstname}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'Title',
    required: true,
    label: 'Название',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Conduct-type', align: 'center', label: 'Описание', field: 'description', sortable: true },
  { name: 'Visibility', label: 'Фотография', field: 'imageId', sortable: true },
  { name: 'location', label: 'Место проведения', field: 'location' },
  { name: 'start-date', align: 'center', label: 'Спорт', field: 'sportType', sortable: true },
  { name: 'Kind-of-sport', label: 'Статус турнира', field: 'status', sortable: true },
  // { name: 'Kind-of-sport', label: 'Дата турнира', field: 'dateStart', sortable: true },
  { name: 'Kind-of-sport', label: 'Участники', field: 'participants', sortable: true },
]

export default {
  
  data(){
    return{
      row:[],
      participants:[
      ],
    }
  },  
  setup () {
    return {
      tournirChose: ref(false),
      dialogEditTur: ref(false),
      dialogaddParticipant: ref(false),
      individualActive: ref(false),
      typeActive: ref(false),
      dialogAddTur: ref(false),
      selected: ref([]),
      filter: ref(''),
      columns,
      rows:ref([]),
      open: ref(true),
      individual: ref(true),
      name:ref(''),
      description:ref(''),
      location:ref(''),
      sportType:ref(''),
      imageId:ref(''),
    }
  },
  methods:{
    getParticipant(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/user/participants?limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
        this.participants =response.data
        console.log(this.participants)
      })
    },
    deleteTournir(){
      let token = sessionStorage.getItem('token')
      this.$axios.put(`http://80.78.255.94/events/0.1/user/tournaments/${this.rows[0].id}`,tournament,{
        headers: { Authorization: `Bearer ${token}`}
      })
    },
    addParticipant(paricipant){
      console.log(paricipant)
      let token = sessionStorage.getItem('token')
      let body
      this.$axios.post(`http://80.78.255.94/events/0.1/user/tournaments/${this.rows[0].id}/${paricipant}`,body,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp=>{
        alert("Участник успешно добавлен")
        getTournament()
      })
    },
    addTurnament(){
      let tournament = {
        name:this.name,
        description:this.description,
        open:this.open,
        location:this.location,
        sportType:this.sportType,
        individual:this.individual,
        imageId:this.photo,
        teams: [],
        participants: []
      }
      let token = sessionStorage.getItem('token')
      this.$axios.post('http://80.78.255.94/events/0.1/user/tournaments',tournament,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp=>{
        alert("Комманда добавлена")
        getTournament()
        this.$forceUpdate();
      })
    },
    log(rows){
    },
    editTournament(){
      let tournament = {
        name:this.name,
        description:this.description,
        open:this.open,
        location:this.location,
        sportType:this.sportType,
        individual:this.individual,
        imageId:this.photo,
        teams: [],
        participants: []
      }
      let token = sessionStorage.getItem('token')
      this.$axios.put(`http://80.78.255.94/events/0.1/user/tournaments/${this.rows[0].id}`,tournament,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp=>{
        alert(resp.data)
        getTournament()
      })
    },
    getTournament(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/user/tournaments?status=NEW&limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
          this.rows = response.data
      })
    },
  },
  created(){
    this.getTournament()
    this.getParticipant()
  }
}
</script>

<style lang="scss">
.activeBtn{
  background: #e64c5e85 !important;
}
.q-dialog__inner--minimized > div{
max-width: 760px !important;  
}
.q-field__native{
  color: $accent;
}
.q-table__bottom-item{
  color: $accent;
}
.q-table__title{
  color: $accent;
}
.q-table__grid-item-card {
  background: $dark;
}
.q-table__grid-item-title {
  color: $accent;
}
.q-table__grid-item-value {
  color: $accent;
}
</style>