<template>
  <div>
    <div class="wrapper">
      <parallax
        class="page-header header-filter clear-filter"
        parallax-active="true"
        :style="headerStyle"
        style="height: 50vh !important;background-color: currentcolor;"
      >
        <h1 class="tim-note text-info">Administración Ventas</h1>
      </parallax>
      <div class="main main-raised">
        <div class="section">
          <div class="container">
           
            <md-table v-model="publicaciones" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
              </md-table-toolbar>
              <md-table-empty-state
                md-label="No existen ventas"
                md-description="Efuerzate para poder vender las propiedades"
              ></md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
                      <md-table-cell md-label="Autor" md-sort-by="nombres">{{ item.nombres }}</md-table-cell>
                      <md-table-cell md-label="Propiedad" md-sort-by="tipopropiedadnombre">{{ item.tipopropiedadnombre }}</md-table-cell>
                      <md-table-cell md-label="Publicación" md-sort-by="publicaciontiponombre">{{ item.publicaciontiponombre }}</md-table-cell>
                      <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
                      <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
                      <md-table-cell md-label="Ver" >
                        <md-button :to="'product-page/' + item.id" class="md-primary">Ver</md-button>
                      </md-table-cell>
                     <md-table-cell v-if="item.id_estado === 4" md-label="Desactivar" >
                        <md-button @click="desactivarPublicacion(item.id)" class="md-warning disabled">Desactivar</md-button>
                      </md-table-cell>
                      <md-table-cell v-else md-label="Desactivar" >
                        <md-button @click="desactivarPublicacion(item.id)" class="md-warning">Desactivar</md-button>
                      </md-table-cell>
                      <md-table-cell md-label="Eliminar" >
                        <md-button @click="deletePublicacion(item.id)" class="md-danger">Eliminar</md-button>
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
  </div>
</template>

<script>
import { getPublicationAdminService } from '../../services/publication/GetAllPublicationAdmin.service'
import { desactivatePublicationservice } from '../../services/publication/DesactivatePublication.service'
import { deletePublicationService } from '../../services/publication/DeletePublication.service'
import Mixins from "@/plugins/basicMixins";


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
      showDialogUpdate: false,
      publicaciones: []
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    deletePublicacion(id){
      console.log('entra en delete')
      let vm = this
      deletePublicationService.destroy(id).then(
        data => {
          vm.restricciones = data.body
          vm.textSnackbar = "El elemento fue eliminado con éxito";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: green";
        },
        response => {
          vm.textSnackbar = "Hubo un error al eliminar los datos";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        }
      )
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
    desactivarPublicacion(id){
      let vm = this
      desactivatePublicationservice.getById(id).then(data => {
        vm.publicaciones = data.body
      })
    },
    loadPublicaciones(){
      let vm = this
      console.log('cargan las publicaciones')
      getPublicationAdminService.query().then(data => {
        vm.publicaciones = data.body
      })
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
      let vm = this
      vm.textSnackbar = "Función aun no disponible"
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
      /*    
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
      )*/
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
    vm.loadPublicaciones()
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
