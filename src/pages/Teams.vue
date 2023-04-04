<template>
  <q-card style="background:none" class="no-border no-box-shadow" >
    <q-card-section class="row justify-between q-gutter-sm">
        <div class="col-2"></div>
      
        <div class="row justify-end q-gutter-sm">
          <q-btn
            style="height:1em"
            color="primary"
            icon="edit"
            label="добавить"
            @click="addTeam,dialogAddTur=true"
          />
        </div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md">
        <q-table
          grid
          :title-style="{backgroundColor: '#ff0000' }"
          :table-header-style="{ backgroundColor: '#ff0000' }"
          title="Команды"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          @row-click="tournirChose = true"
        >
          <template v-slot:top-right>
            <q-input dark  borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" color="primary"/>
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
              Добавить команду
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
              <span class="text-accent col-3">Сайт: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="website"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Фото: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="imageId"
                  dark
              />
            </div>
            <div class="row justify-center items-center content-center">
              <q-btn
                color="primary"
                icon="check"
                label="Добавить"
                @click="addTeam"
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
        @click="dialogEditTur=true"
      />
      <q-btn
        style="height:1em"
        color="warning"
        label="Редактировать"
        :class="{activeBtn:typeActive}"
        @click="dialogEditTur=true"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogEditTur">
    <div class="edit-participant-modal" style="min-width: 40vw">
        <q-card>
          <q-bar class="bg-primary">
            <div style="color: #ffff">
              Редактировать команду
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
              <span class="text-accent col-3">Сайт: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="website"
                  dark
              />
            </div>
            <div class="row items-center content-center">
              <span class="text-accent col-3">Фото: </span>
              <q-input
                  style="background:rgba(255,255,255,0.2);color:#ffff;"
                  class="col-6 q-ma-md q-mb-lg"
                  filled  
                  stack-label
                  dense
                  v-model="imageId"
                  dark
              />
            </div>
            <div class="row justify-center items-center content-center">
              <q-btn
                color="primary"
                icon="check"
                label="Редактировать"
                @click="editTeam"
              />
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
    name: 'name',
    required: true,
    label: 'Название',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'description', align: 'center', label: 'Описание', field: 'description', },
  { name: 'website', label: 'Сайт', field: 'website', },
  { name: 'members', label: 'Пользователь', field: 'members' },
  { name: 'imageId', align: 'center', label: 'Фото', field: 'imageId', },
  { name: 'active', label: 'Активен', field: 'active', },
  { name: 'participants', label: 'Участники', field: 'participants' },
]


export default {

  setup () {
    return {
      tournirChose: ref(false),
      dialogEditTur: ref(false),
      individualActive: ref(false),
      typeActive: ref(false),
      dialogAddTur: ref(false),
      selected: ref([]),
      filter: ref(''),
      columns,
      rows:ref([]),
      name:ref(''),
      description:ref(''),
      imageId:ref('')
    }
  },
  methods:{
    addTeam(){
      let tournament = {
        name:this.name,
        description:this.description,
        website:this.website,
        imageId:this.imageId,
      }
      let token = sessionStorage.getItem('token')
      this.$axios.post('http://80.78.255.94/events/0.1/user/teams',tournament,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp=>{
        alert(resp.data)
        getTournament()
      })
    },
    editTeam(){
      let tournament = {
        name:this.name,
        description:this.description,
        website:this.website,
        imageId:this.imageId,
      }
      let token = sessionStorage.getItem('token')
      this.$axios.put(`http://80.78.255.94/events/0.1/user/teams/${this.rows[4].id}`,tournament,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp=>{
        getTournament()
      })
    },
    getTeam(){
      let token = sessionStorage.getItem('token')
      this.$axios.get('http://80.78.255.94/events/0.1/user/teams?limit=20&offset=0',{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response=>{
          this.rows = response.data
      })
    },
  },
  created(){
    this.getTeam()
  }
}
</script>

<style lang="scss">
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