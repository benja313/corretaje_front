<template>
  <div>
    <div class="wrapper">
      <parallax
        class="page-header header-filter clear-filter"
        parallax-active="true"
        :style="headerStyle"
        style="height: 50vh !important;background-color: currentcolor;"
      >
        <h1 class="tim-note text-info">Administración de zonas</h1>
      </parallax>
      <div class="main main-raised">
        <div class="section">
          <div class="container">
            <div>
              <md-button class="md-raised md-info" @click="showDialogCreate = true">
                Nueva Zona
                <md-icon>add</md-icon>
              </md-button>
            </div>
            <md-table v-model="restricciones" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No existen elementos"
                md-description="Puedes crear acá nuevas Zonas para usarla en el sistema"
              ></md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.nombre }}</md-table-cell>
                <md-table-cell md-label="Descripcion" md-sort-by="descripcion_zona">{{ item.descripcion_zona }}</md-table-cell>
                <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.nombre_comuna }}</md-table-cell>
                <md-table-cell md-label="Región" md-sort-by="nombre_region">{{ item.nombre_region }}</md-table-cell>
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
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>Región...</label>
          <md-select name="" @input="changeRegion(element.id_region)" v-model="element.id_region" md-dense>
            <md-option
              v-for="region in regiones"
                v-bind:key="region.nombre"
                :value="region.id"
                :label="region.nombre"
                >{{ region.nombre }}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>comuna...</label>
           <md-select name="" v-model="element.id_comuna" md-dense>
            <md-option
              v-for="comuna in comunas"
                v-bind:key="comuna.nombre"
                :value="comuna.id"
                :label="comuna.nombre"
                >{{ comuna.nombre }}</md-option>
            </md-select>
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
            <md-input v-model="elementAux.descripcion_zona" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>Región...</label>
          <md-select name="" @input="changeRegionAux(elementAux.id_region)" v-model="elementAux.id_region" md-dense>
            <md-option
              v-for="region in regiones"
                v-bind:key="region.nombre"
                :value="region.id"
                :label="region.nombre"
                >{{ region.nombre }}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-form-group">
            <md-icon>text_format</md-icon>
            <label>comuna...</label>
           <md-select name="" v-model="elementAux.id_comuna" md-dense>
            <md-option
              v-for="comuna in comunas"
                v-bind:key="comuna.nombre"
                :value="comuna.id"
                :label="comuna.nombre"
                >{{ comuna.nombre }}</md-option>
            </md-select>
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
        descripcion_zona: '',
        id_comuna: 0,
        id_region: 0
      },
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
    changeRegionAux(id){
      let vm = this
      vm.comunas = []
      vm.elementAux.id_comuna = 0
      comunaInRegionService.getById(id).then(data => {
        vm.comunas = data.body
      })
    },
    changeRegion(id){
      let vm = this
      vm.comunas = []
      vm.element.id_comuna = 0
      comunaInRegionService.getById(id).then(data => {
        vm.comunas = data.body
      })
    },
    newElement(model) {
      let vm = this
      zonaService.save(model).then(data => {
        vm.restricciones = data.body
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
        vm.element.id_region = 0,
        vm.element.id_comuna = 0,
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
      zonaService.update(model.id, model).then(data => {
        vm.restricciones = data.body
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
        vm.elementAux.descripcion_zona = '',
        vm.elementAux.id_region = 0,
        vm.elementAux.id_comuna = 0,
        vm.showDialogUpdate = false
      )
    },
    deleteElement(id) {
      let vm = this;
      zonaService.destroy(id).then(
        data => {
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
    loadRestricciones() {
      let vm = this;
      zonaCompleteService.query().then(data => {
        vm.restricciones = data.body;
      });
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
    vm.loadRestricciones()
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
