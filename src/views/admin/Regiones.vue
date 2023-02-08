<template>
  <div>
    <div class="wrapper">
      <parallax
        class="page-header header-filter clear-filter"
        parallax-active="true"
        :style="headerStyle"
        style="height: 50vh !important;background-color: currentcolor;"
      >
        <h1 class="tim-note text-info">Administración de regiones</h1>
      </parallax>
      <div class="main main-raised">
        <div class="section">
          <div class="container">
            <div>
              <md-button class="md-raised md-info" @click="showDialogCreate = true">
                Nueva Región
                <md-icon>add</md-icon>
              </md-button>
            </div>

            <md-table v-model="regiones" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No existen elementos"
                md-description="Puedes crear acá nuevas regiones para usarla en el sistema"
              ></md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.nombre }}</md-table-cell>
                <md-table-cell md-label="Orden" md-sort-by="orden">{{ item.orden }}</md-table-cell>
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
            <label>Nombre...</label>
            <md-input v-model="element.nombre" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group">
            <md-icon>looks_one</md-icon>
            <label>identificador...</label>
            <md-input v-model="element.id" type="number" aria-required="required" />
          </md-field>
           <md-field class="md-form-group">
            <md-icon>format_list_numbered</md-icon>
            <label>Orden de norte a sur...</label>
            <md-input v-model="element.orden" type="number" aria-required="required" />
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
            <md-icon>looks_one</md-icon>
            <label>identificador...</label>
            <md-input v-model="elementAux.id" type="number" aria-required="required" />
          </md-field>
          <md-field class="md-form-group">
            <md-icon>format_list_numbered</md-icon>
            <label>Orden de norte a sur...</label>
            <md-input v-model="elementAux.orden" type="number" aria-required="required" />
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

import { tipoPersonaService } from "../../services/users/TipoPersona.service";
import { changeTipoPersonaService } from "../../services/users/ChangeTipoPersona.service";
import Mixins from "@/plugins/basicMixins";
import { zonaService } from "../../services/location/Zona.service";
import { zonaCompleteService } from "../../services/location/ZonaComplete.service";
import { regionService } from "../../services/location/Region.service";
import { comunaInRegionService } from "../../services/location/ComunaInRegion.service";

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
  name: "AdminRestricciones",
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
      element:{
        nombre: '',
        id: 0,
        orden: 0,
      },
      idOriginal:0,
      elementAux: {},
      showSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      timeout: 4000,
      restricciones: [],
      regiones: [],
      comunas: [],
      zonasEnComunas: [],
      showDialogCreate: false,
      showDialogUpdate: false
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    newElement(model) {
      let vm = this
      regionService.save(model).then(data => {
        vm.regiones = data.body
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
        vm.element.orden = '',
        vm.element.id = 0,
        vm.showDialogCreate = false
      );
    },
    loadUpdate(model){
      let vm = this
      vm.elementAux = model
      vm.idOriginal = model.id
      vm.showDialogUpdate = true
      console.log(model)
    },
    updateElement(model) {
      let vm = this
      regionService.update(vm.idOriginal, model).then(data => {
        vm.regiones = data.body
        vm.textSnackbar = "El campo fue actualizada con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
        response => {
          vm.textSnackbar = "Hubo un error al actualizar los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
        vm.elementAux.nombre = '',
        vm.elementAux.id = '',
        vm.elementAux.orden = 0,
        vm.idOriginal = 0,
        vm.showDialogUpdate = false
      )
    },
    deleteElement(id) {
      let vm = this;
      regionService.destroy(id).then(
        data => {
          vm.regiones = data.body
          vm.restricciones = data.body
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
 
    loadRegiones() {
      let vm = this;
      regionService.query().then(data => {
        vm.regiones = data.body;
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
    let vm = this
    vm.loadRegiones()
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
