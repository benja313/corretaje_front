<template>
  <div>
    <div class="wrapper">
      <parallax
        class="page-header header-filter clear-filter"
        parallax-active="true"
        :style="headerStyle"
        style="height: 50vh !important;background-color: currentcolor;"
      >
        <h1 class="tim-note text-info">Administración de Características</h1>
      </parallax>
      <div class="main main-raised">
        <div class="section">
          <div class="container">
            <div>
              <md-button class="md-raised md-info" @click="showDialogCreate = true">
                Nueva Característica
                <md-icon>add</md-icon>
              </md-button>
            </div>
            <md-table v-model="caracteristicas" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No existen elementos"
                md-description="Puedes crear acá nuevas categorías para usarla en el sistema"
              ></md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.nombre }}</md-table-cell>
                <md-table-cell md-label="Descripcion" md-sort-by="descripcion">{{ item.descripcion }}</md-table-cell>
                <md-table-cell md-label="Editar">
                  <md-button class="md-raised md-warning" @click="loadUpdate(item)">
                    Editar
                    <md-icon>edit</md-icon>
                  </md-button>
                </md-table-cell>
                <md-table-cell md-label="Eliminar">
                  <md-button class="md-raised md-danger" @click="deleteElement(item.id)">
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
    <md-snackbar
      md-position="center"
      :style="colorSnackbar"
      :md-duration="timeout"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{textSnackbar}}</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>
    <div class="">
      <md-dialog :md-active.sync="showDialogCreate" style="width: 70% !important;" >
        <md-dialog-title>Nuevo</md-dialog-title>
        <div class="">
        <form>
          <md-field class="md-form-group">
            <md-icon>title</md-icon>
            <label>Título...</label>
            <md-input v-model="element.nombre" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>Descripción...</label>
            <md-input v-model="element.descripcion" type="text" aria-required="required" />
          </md-field>
        </form>
        </div>
        <md-dialog-actions>
          <md-button class="button-danger" @click="showDialogCreate = false">cancelar</md-button>
          <md-button class="md-success" @click="newElement(element)">Crear</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <div class="">
      <md-dialog :md-active.sync="showDialogUpdate" style="width: 70% !important;" >
        <md-dialog-title>Actualizar</md-dialog-title>
        <div class="">
        <form>
          <md-field class="md-form-group">
            <md-icon>title</md-icon>
            <label>Título...</label>
            <md-input v-model="elementAux.nombre" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>Descripción...</label>
            <md-input v-model="elementAux.descripcion" type="text" aria-required="required" />
          </md-field>
        </form>
        </div>
        <md-dialog-actions>
          <md-button class="button-danger" @click="showDialogUpdate = false">cancelar</md-button>
          <md-button class="md-success" @click="updateElement(elementAux)">Guardar</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { tipoPersonaService } from "../../services/users/TipoPersona.service"
import { changeTipoPersonaService } from "../../services/users/ChangeTipoPersona.service";
import Mixins from "../../plugins/basicMixins";
import { caracteristicaService } from "../..//services/other/Caracteristica.service";

const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    console.log(items);
    return items.filter(item => toLower(item.nombres).includes(toLower(term)));
  }

  return items;
};
export default {
  mixins: [Mixins.VerticalNav, Mixins.HeaderImage],
  bodyClass: "landing-page",
  name: "AdminCategorias",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
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
      element:{
        nombre: '',
        descripcion: '',
      },
      elementAux: {},
      showSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      timeout: 4000,
      caracteristicas: [],
      showDialogCreate: false,
      showDialogUpdate: false
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    changeTipoUsuario(model) {
      let vm = this;
      changeTipoPersonaService.update(model.id, model).then(
        data => {
          vm.textSnackbar = "Fue cambiado con éxito el tipo de usuario ";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: green";
          vm.element.nombre = ''
          vm.element.descripcion = ''
          showDialog = false
        },
        response => {
          vm.textSnackbar = "Hubo un error al actualizar los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        }
      );
    },
    newElement(model) {
      let vm = this
      caracteristicaService.save(model).then(data => {
        vm.caracteristicas = data.body
        vm.textSnackbar = "El campo fue creado con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
        response => {
          vm.textSnackbar = "Hubo un error al crear los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
        vm.element.nombre = '',
        vm.element.descripcion = '',
        vm.showDialogCreate = false
      );
    },
    loadUpdate(model){
      let vm = this
      vm.elementAux = model
      vm.showDialogUpdate = true
      console.log(model)
    },
    updateElement(model) {
      let vm = this
      caracteristicaService.update(model.id, model).then(data => {
        vm.caracteristicas = data.body
        vm.textSnackbar = "El campo fue actualizada con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
        response => {
          vm.textSnackbar = "Hubo un error al actualizar los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
        vm.showDialogUpdate = false
      );
    },
    deleteElement(id) {
      let vm = this;
      caracteristicaService.destroy(id).then(
        data => {
          vm.caracteristicas = data.body
          vm.textSnackbar = "El elemento fue eliminado con éxito";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: green";
        },
        response => {
          vm.textSnackbar = "Hubo un error al elimniar los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        }
      );
    },
    loadCaracteristica() {
      let vm = this;
      caracteristicaService.query().then(data => {
        vm.caracteristicas = data.body;
        console.log(vm.caracteristicas)
      });
    }
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
    vm.loadCaracteristica();
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.button-danger{
  background-color: #f44336 !important;
}
.button-danger:hover{
  background-color: #f44336 !important;
}
.contact-form {
  margin-top: 30px;
}
.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
