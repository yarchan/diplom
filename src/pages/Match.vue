<template>
  <q-card style="background:none" class="no-border no-box-shadow" >
    <q-card-section>
      <div class="q-pa-md">
        <q-table
          grid
          :title-style="{backgroundColor: '#ff0000' }"
          :table-header-style="{ backgroundColor: '#ff0000' }"
          title="Матчи"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
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
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'Number',
    required: true,
    label: 'Название матча',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Date', align: 'center', label: 'Номер матча', field: 'number', sortable: true },
  { name: 'Member-1', label: 'Участник 1', field: 'firstpart' },
  { name: 'Member-2', align: 'center', label: 'Участник 2', field: 'secondtpart', sortable: true },
  { name: 'Member-1', label: 'Участник 3', field: 'third' },
  { name: 'Member-2', align: 'center', label: 'Участник 4', field: 'fourth', sortable: true },
  { name: 'Format', label: 'Победитель', field: 'winner', sortable: true },
  { name: 'Kind-of-sport', label: 'Статус турнира', field: 'status', sortable: true },
]
const rows = [
  {
    name: 'Борьба',
    number: 1,
    firstpart: "Дмитрий",
    secondtpart: "Денис",
    third: "Георгий",
    fourth: "Артур",
    winner:"Георгий",
    status:"OLD"
  },
]

export default {
  setup () {
    return {
      filter: ref(''),
      columns,
      rows,
    }
  },
  // methods:{
  //   addTurnament(){
  //     let tournament = {
  //       name:this.name,
  //       description:this.description,
  //       open:this.open,
  //       location:this.location,
  //       sportType:this.sportType,
  //       individual:this.individual,
  //       imageId:this.photo,
  //       teams: [],
  //       participants: []
  //     }
  //     console.log(tournament)
  //     let token = sessionStorage.getItem('token')
  //     this.$axios.post('http://80.78.255.94/events/0.1/user/tournaments',tournament,{
  //       headers: { Authorization: `Bearer ${token}`}
  //     })
  //     .then(resp=>{
  //       alert(resp.data)
  //       getTournament()
  //     })
  //   },
  //   editMatches(){
  //     let tournament = {
  //       name:this.name,
  //       description:this.description,
  //       open:this.open,
  //       location:this.location,
  //       sportType:this.sportType,
  //       individual:this.individual,
  //       imageId:this.photo,
  //       teams: [],
  //       participants: []
  //     }
  //     console.log(this.rows[4].id)
  //     let token = sessionStorage.getItem('token')
  //     this.$axios.put(`http://80.78.255.94/events/0.1/user/tournaments/${this.rows[4].id}`,tournament,{
  //       headers: { Authorization: `Bearer ${token}`}
  //     })
  //     .then(resp=>{
  //       alert(resp.data)
  //       getTournament()
  //     })
  //   },
  //   getTournament(){
  //     let token = sessionStorage.getItem('token')
  //     this.$axios.get('http://80.78.255.94/events/0.1/user/tournaments?status=NEW&limit=20&offset=0',{
  //       headers: { Authorization: `Bearer ${token}`}
  //     })
  //     .then(response=>{
  //         this.rows = response.data
  //         console.log(this.rows)
  //     })
  //   },
  // },
  created(){
    // this.getTournament()
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