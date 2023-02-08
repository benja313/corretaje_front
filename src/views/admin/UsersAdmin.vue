<template>
  <div>
    <div class="wrapper">
      <parallax
        class="page-header header-filter clear-filter"
        parallax-active="true"
        :style="headerStyle"
        style="height: 50vh !important;background-color: currentcolor;"
      >
        <h1 class="tim-note text-info">Administración de Usuarios</h1>
      </parallax>
      <div class="main main-raised">
        <div class="section">
          <div class="container">
            
            <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input
                    class="text-primary"
                    placeholder="Buscar por nombre..."
                    v-model="search"
                    @input="searchOnTable"
                  />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No encontrado"
                :md-description="`No existe el usuario '${search}'. Intenta cambiar la búsqueda .`"
              ></md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nombre" md-sort-by="nombres">{{ item.nombres }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Tipo usuario">
                  <md-select name="" @input="changeTipoUsuario(item)" v-model="item.id_tipo_persona" md-dense>
                    <md-option
                      v-for="tipo in tipoPersonas"
                      v-bind:key="tipo.nombre"
                      :value="tipo.id"
                      :label="tipo.nombre"
                    >{{ tipo.nombre }}</md-option>
                  </md-select>
                </md-table-cell>
                <md-table-cell md-label="Eliminar">
                  <md-button class="md-raised md-danger" @click="deleteUser(item.id)">
                    Eliminar
                    <md-icon>delete_forever</md-icon>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
      </div>
    </div>
    <md-snackbar md-position="center" :style="colorSnackbar" :md-duration="timeout" :md-active.sync="showSnackbar" md-persistent>
      <span>{{textSnackbar}}</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>
  </div>
    
</template>

<script>
import { tipoPersonaService } from "../../services/users/TipoPersona.service"
import { changeTipoPersonaService }  from "../../services/users/ChangeTipoPersona.service"
import Mixins from "@/plugins/basicMixins"
import { userService } from "../../services/users/Personas.service"

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  
  if (term) {
    console.log(items)
    return items.filter(item => toLower(item.nombres).includes(toLower(term)));
  }

  return items;
};
export default {
  mixins: [Mixins.VerticalNav, Mixins.HeaderImage],
  bodyClass: "landing-page",
  name: "AdminUsers",
  props: {
    image: {
      type: String,
      default: require("../../assets/img/vue-mk-header.jpg")
    }
  },
  data() {
    return {
      search: null,
      searched: [],
      users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner"
        }
      ],
      showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      timeout: 4000,
      usuarios: [],
      tipoPersonas: []
    };
  },
  methods: {
    newUser() {
      window.alert("Noop")
    },
    searchOnTable() {
      this.searched = searchByName(this.usuarios, this.search)
    },
    loadUsuarios() {
      let vm = this
      userService.query().then(data => {
        vm.usuarios = data.body
        console.log(vm.usuarios)
      });
    },
    changeTipoUsuario(model){
      let vm = this
      changeTipoPersonaService.update(model.id, model).then(data => {
        vm.textSnackbar = 'Fue cambiado con éxito el tipo de usuario '
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: green'
      }, response => {
        vm.textSnackbar = 'Hubo un error al actualizar los datos'
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: darkred'
      })
    },
    deleteUser(id){
      let vm = this
      userService.destroy(id).then(data => {
        vm.textSnackbar = 'El usuario fue eliminado con éxito'
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: green'
      }, response => {
        vm.textSnackbar = 'Hubo un error al elimniar los datos'
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: darkred'
      })
    },
    loadTipoPersona() {
      let vm = this;
      tipoPersonaService.query().then(data => {
        vm.tipoPersonas = data.body
      });
    }
  },
  created() {
    this.searched = this.usuarios
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  mounted() {
    let vm = this;
    vm.loadUsuarios();
    vm.loadTipoPersona();
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}
.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
