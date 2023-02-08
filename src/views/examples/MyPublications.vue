<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter header-small"
      parallax-active="true"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center">
            <h1 class="title">Mís Publicaciones</h1>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div>
        <h1 class="title text-center">Publicaciones</h1>
      </div>
      <div class="profile-tabs">
        <tabs
          :tab-active="1"
          :tab-name="['Mis publicaciones', 'A mi cargo']"
          :tab-icon="['favorite', 'add_to_photos']"
          plain
          nav-pills-icons
          color-button="success"
          style="width: 100% !important;"
        >
          <template slot="tab-pane-1">
            <div class="md-layout work">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto">
                <div class>
                  <md-table
                    v-model="publicacionesCreadas"
                    md-sort="name"
                    md-sort-order="asc"
                    md-card
                    style="width: 100% !important"
                  >
                    <md-table-toolbar>
                      <h1 class="md-title" style="color:black !important">Publicaciones</h1>
                    </md-table-toolbar>
                    <md-table-empty-state
                      md-label="No existen publicaciones..."
                      :md-description="`Puedes crear nuevas publicaciones.`"
                    >
                      <md-button to="newPublication" class="md-primary">Nuevo</md-button>
                    </md-table-empty-state>
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
                      <md-table-cell md-label="Autor" md-sort-by="nombres">{{ item.nombres }}</md-table-cell>
                      <md-table-cell
                        md-label="Propiedad"
                        md-sort-by="tipopropiedadnombre"
                      >{{ item.tipopropiedadnombre }}</md-table-cell>
                      <md-table-cell
                        md-label="Publicación"
                        md-sort-by="publicaciontiponombre"
                      >{{ item.publicaciontiponombre }}</md-table-cell>
                      <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
                      <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
                      <md-table-cell md-label="Ver">
                        <md-button :to="'publicacion/' + item.id" class="md-icon-button md-primary">
                        <md-icon>remove_red_eye</md-icon>
                      </md-button>
                      <md-button :to="'editPublication/' + item.id" class="md-icon-button md-warning">
                        <md-icon>edit</md-icon>
                      </md-button>
                        <!-- <md-button  class="md-primary">Ver</md-button> -->
                      </md-table-cell>
                      <md-table-cell v-if="tipoUser !== '1'" md-label="Destacar">
                        <md-button @click="changeStatePublication(item.id)" class="md-info">Destacar</md-button>
                      </md-table-cell>
                      <md-table-cell v-if="tipoUser !== '1'" md-label="Venta">
                        <md-button @click="changeStatePublicationVenta(item.id)" class="md-success">Marcar Venta</md-button>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </div>
              </div>
            </div>
          </template>
          <template slot="tab-pane-2" v-if="tipoUser !== '1'">
            <div class="md-layout">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto">
                <md-table
                  v-model="publicacionesAcargo"
                  md-sort="name"
                  md-sort-order="asc"
                  md-card
                  style="width: 100% !important"
                >
                  <md-table-toolbar>
                    <h1 class="md-title" style="color:black !important">Publicaciones</h1>
                  </md-table-toolbar>
                  <md-table-empty-state
                    md-label="No existen publicaciones..."
                    :md-description="`Debes aprobar publicaciones para que las tengas a cargo`"
                  >
                    <md-button to="aprobatePublications" class="md-primary">Aprobar</md-button>
                  </md-table-empty-state>
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
                    <md-table-cell md-label="Autor" md-sort-by="nombres">{{ item.nombres }}</md-table-cell>
                    <md-table-cell
                      md-label="Propiedad"
                      md-sort-by="tipopropiedadnombre"
                    >{{ item.tipopropiedadnombre }}</md-table-cell>
                    <md-table-cell
                      md-label="Publicación"
                      md-sort-by="publicaciontiponombre"
                    >{{ item.publicaciontiponombre }}</md-table-cell>
                    <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
                    <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
                    <md-table-cell md-label="Ver">
                      <md-button :to="'publicacion/' + item.id" class="md-icon-button md-primary">
                        <md-icon>remove_red_eye</md-icon>
                      </md-button>
                      <md-button :to="'editPublication/' + item.id" class="md-icon-button md-warning">
                        <md-icon>edit</md-icon>
                      </md-button>
                    </md-table-cell>
                    <md-table-cell md-label="Destacar">
                      <md-button @click="changeStatePublication(item.id)" class="md-info">Destacar</md-button>
                    </md-table-cell>
                    <md-table-cell md-label="Venta">
                      <md-button :to="'newSale/' + item.id" class="md-success">Marcar Venta</md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </div>
          </template>
          <template slot="tab-pane-2" v-else>
            <div class="md-layout">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto text-center">
                <h2>Aún no eres corredor</h2>
                <br />
                <h4>solicita ser parte del equipo de corredores y podrás aprobar publicaciones</h4>
              </div>
            </div>
          </template>
        </tabs>
      </div>
      <div>
        <h1 class="title text-center">Ventas</h1>
      </div>
      <div class="profile-tabs">
        <tabs
          :tab-active="1"
          :tab-name="['Mis publicaciones', 'A mi cargo']"
          :tab-icon="['favorite', 'add_to_photos']"
          plain
          nav-pills-icons
          color-button="success"
          style="width: 100% !important;"
        >
          <template slot="tab-pane-1">
            <div class="md-layout work">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto">
                <div class>
                  <md-table
                    v-model="sales"
                    md-sort="name"
                    md-sort-order="asc"
                    md-card
                    style="width: 100% !important"
                  >
                    <md-table-toolbar>
                      <h1 class="md-title" style="color:black !important">Ventas</h1>
                    </md-table-toolbar>
                    <md-table-empty-state
                      md-label="No existen publicaciones..."
                      :md-description="`Puedes crear nuevas publicaciones.`"
                    >
                      <md-button to="newPublication" class="md-primary">Nuevo</md-button>
                    </md-table-empty-state>
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
                      <md-table-cell
                        md-label="Propiedad"
                        md-sort-by="tipopropiedadnombre"
                      >{{ item.tipopropiedadnombre }}</md-table-cell>
                   
                      <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
                      <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
                      <md-table-cell md-label="Ver">
                        <md-button :to="'publicacion/' + item.id" class="md-primary">Ver</md-button>
                      </md-table-cell>
                      <md-table-cell md-label="Comision">
                        <md-button v-if="item.pagado_autor == 0" :to="'product-page/' + item.id" class="md-success">confirmar pago</md-button>
                        <strong class="text-center" v-else>Recibiste el pago <md-icon class="text-success">monetization_on</md-icon>
                        </strong>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </div>
              </div>
            </div>
          </template>
          <template>
            
          </template>
          <template slot="tab-pane-2" v-if="tipoUser !== '1'">
            <div class="md-layout">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto">
                <md-table
                  v-model="salesCargo"
                  md-sort="name"
                  md-sort-order="asc"
                  md-card
                  style="width: 100% !important"
                >
                  <md-table-toolbar>
                    <h1 class="md-title" style="color:black !important">Ventas</h1>
                  </md-table-toolbar>
                  <md-table-empty-state
                    md-label="No existen publicaciones vendidas..."
                    :md-description="`Debes vender las propiedades que tengas a cargo`"
                  >
                    
                  </md-table-empty-state>
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
                    <md-table-cell
                      md-label="Propiedad"
                      md-sort-by="tipopropiedadnombre"
                    >{{ item.tipopropiedadnombre }}</md-table-cell>
                    <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
                    <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
                    <md-table-cell md-label="Ver">
                      <md-button @click="loadPublication(item.id)" class="md-primary">Ver</md-button>
                    </md-table-cell>
                    
                    <md-table-cell md-label="Venta">
                      <strong class="text-center" v-if="item.pagado_autor == 0">No has pagado al autor <md-icon class="text-warning">error</md-icon></strong>
                      <strong class="text-center" v-else >Ya pagáste<md-icon class="text-success">check</md-icon></strong>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </div>
          </template>
          <template slot="tab-pane-2" v-else>
            <div class="md-layout">
              <div class="md-layout-item md-size-90 md-small-size-100 mx-auto text-center">
                <h2>Aún no eres corredor</h2>
                <br />
                <h4>solicita ser parte del equipo de corredores y podrás aprobar publicaciones</h4>
              </div>
            </div>
          </template>
        </tabs>
      </div>
    </div>
    <md-snackbar
      md-position="center"
      :style="colorSnackbar"
      :md-duration="duracion"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{textSnackbar}}</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>


    <div class="">
      <md-dialog :md-active.sync="showDialogSale" style="width: 70% !important;" >
        <md-dialog-title>Marcar Venta</md-dialog-title>
        <div class="">
         <form>
              <md-field class="md-form-group">
                <md-icon>monetization_on</md-icon>
                <label>Precio Transado...</label>
                <md-input v-model="nuevaVenta.precio_transado" type="text" aria-required="required" />
              </md-field>
              <md-field class="md-form-group">
                <md-icon>monetization_on</md-icon>
                <label>Comisión...</label>
                <md-input v-model="nuevaVenta.comision"  type="text" aria-required="required" />
              </md-field>
            </form>
        </div>
        <md-dialog-actions>
          <md-button class="button-danger" @click="showDialogSale = false">cancelar</md-button>
          <md-button class="md-success" @click="saveSale(nuevaVenta)">Guardar</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
      
    
  </div>
</template>

<script>
import {
  ProductCard,
  Collapse,
  FullBgCard,
  BlogCard,
  Slider,
  Badge,
  Tabs
} from "../../components";
import Mixins from "@/plugins/basicMixins";
import { getPublicationEcomerceService } from "../../services/publication/GetAllPublicationEcomerce.service";
import { zonaStateService } from "../../services/location/ZonaState.service";
import { regionStateService } from "../../services/location/RegionState.service";
import { comunaStateService } from "../../services/location/ComunaState.service";
import { caracteristicaStateService } from "../../services/other/CaracteristicaState.service";
import { tipoPropiedadService } from "../../services/other/TipoPropiedad.service";
import { tipoPublicacionService } from "../../services/other/TipoPublicacion.service";
import { getPublicationAutorService } from "../../services/publication/GetAllPublicationsAutor.service";
import { getPublicationAcargoService } from "../../services/publication/GetAllPublicationsAcargo.service";
import { destacarPublicacionservice } from "../../services/publication/DestacarPublicacion.service";
import { saleService } from "../../services/publication/Sale.service"
import { saleUserService } from "../../services/publication/SaleUser.service"
import { saleCargoService } from "../../services/publication/SaleCargo.service"

import _ from "lodash";

export default {
  components: {
    Tabs,
    ProductCard,
    Collapse,
    FullBgCard,
    BlogCard,
    Slider,
    Badge,
    filters: {
      capitalize: function(value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  },
  mixins: [Mixins.HeaderImage],
  data() {
    return {
      subscribe: null,
      sliders: {
        rangeSlider: [101, 700]
      },
      publicaciones: [],
      message: "",
      clothing: {
        blazers: true,
        casualShirts: false,
        formalShirts: false,
        jeans: false,
        polos: false,
        pyjamas: false,
        shorts: false,
        trousers: false
      },
      publicacionesCreadas: [],
      publicacionesAcargo: [],
      image: require("../../assets/img/inmo/pool_tropical.jpg"),
      image2: require("../../assets/img/inmo/key.jpg"),
      idUser: 0,
      tipoUser: 0,
      showSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      duracion: 4000,
      showDialogSale: false,
      nuevaVenta: {
        precio_transado: 0,
        comision: 0,
        id_publicacion: 0,
      },
      sales: [],
      salesCargo: []
    };
  },
  computed: {
    imageSubscribe() {
      return {
        backgroundImage: `url(${this.image2})`
      };
    }
  },
  methods: {
    newValue(e) {
      this.sliders.rangeSlider[0] = e[0];
      this.sliders.rangeSlider[1] = e[1];
    },
    changeStateRegiones(e) {
      let vm = this;
      console.log("cambia regiones");
    },
    changeStateComunas(e) {
      let vm = this;
      console.log("cambia comunass");
    },
    changeStateZonas(e) {
      let vm = this;
      for (var i = 0; i < vm.publications.length; i++) {
        if (vm.publications[i].nombre_zona === e.nombre) {
          vm.publications[i].zona_state = false;
        }
      }
    },
    changeStatePublication(id) {
      let vm = this;
      destacarPublicacionservice.update(id, vm.idUser).then(
        data => {
          vm.publicaciones = data.body;
          vm.textSnackbar = "Se ha destacado la publicación con éxito";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: green";
        },
        response => {
          vm.textSnackbar = "Hubo un error al destacar la publicación";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        }
      );
    },
    saveSale(model){
      let vm = this
      console.log('guardar venta')
      saleService.save(model).then(data => {
        vm.sales = data.body
          vm.textSnackbar = "Se ha destacado la publicación con éxito"
          vm.showSnackbar = true
          vm.colorSnackbar = "background-color: green"
      },
      response => {
        vm.textSnackbar = "Hubo un error al marcar la venta"
        vm.showSnackbar = true
        vm.colorSnackbar = "background-color: darkred"
      }
      )
    },
    changeStatePublicationVenta(id) {
      let vm = this
      vm.showDialogSale = true
      vm.nuevaVenta.id_publicacion = id 
    },
    loadMyPublications() {
      let vm = this;
      getPublicationAutorService.getById(vm.idUser).then(data => {
        vm.publicacionesCreadas = data.body;
      });
    },
    loadAcargoPublications() {
      let vm = this;
      getPublicationAcargoService.getById(vm.idUser).then(data => {
        vm.publicacionesAcargo = data.body;
        //console.log(vm.publicacionesAcargo);
      });
    },
    loadsaleUser(){
      let vm = this
      saleUserService.getById(vm.idUser).then(data => {
        console.log/(data.body)
        vm.sales = data.body
      })
    },
    loadsaleCargo(){
      let vm = this
      saleCargoService.getById(vm.idUser).then(data => {
        vm.salesCargo = data.body
        console.log(vm.salesCargo)
      })
    }
  },
  mounted() {
    let vm = this;
    vm.tipoUser = localStorage.getItem("tipo");
    vm.idUser = localStorage.getItem("user");
    vm.loadMyPublications();
    vm.loadAcargoPublications();
    vm.loadsaleUser();
    vm.loadsaleCargo();
  }
};
</script>

<style lang="scss" scoped>
.mt-3 {
  margin-top: 1.875rem * 2;
}
.mb-0 {
  margin-bottom: 0;
}
.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-expansion {
  height: 480px;
}

.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.item-details-publication {
  margin-left: 1% !important;
  margin-right: 1% !important;
}
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}

.md-content {
  width: 20%;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-content:hover {
  color: white !important;
  font-size: 18px;
  transition: 0.3s;
  text-decoration: none;
}
</style>
