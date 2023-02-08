<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img v-if="usuario.id_sexo === 1"
                    :src="imgH"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                  <img v-else-if="usuario.id_sexo === 2"
                    :src="imgM"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">{{ usuario.nombres  + ' ' + usuario.apellido_p}}</h3>
                  <div v-for="tipo in tipoUsers" v-bind:key="tipo.nombre" >
                    <h6 v-if="usuario.id_tipo_persona === tipo.id">{{tipo.nombre}}</h6>
                  </div>
                  <div>

              
            </div>
                  <md-button
                    href="javascript:void(0)"
                    class="md-just-icon md-simple md-dribbble"
                    ><i class="fab fa-dribbble"></i
                  ></md-button>
                  <md-button
                    href="javascript:void(0)"
                    class="md-just-icon md-simple md-twitter"
                    ><i class="fab fa-twitter"></i
                  ></md-button>
                  <md-button
                    href="javascript:void(0)"
                    class="md-just-icon md-simple md-pinterest"
                    ><i class="fab fa-pinterest"></i
                  ></md-button>
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <p v-if="usuario.descripcion !== undefined ">
              {{ usuario.descripcion }}
            </p>
            <p v-else>
              An artist of considerable range, Chet Faker — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure.
            </p>
          </div>
          <hr>
          <div>
            <h3 class="text-center">Acciones</h3>
            <br>
            <div class="md-layout md-gutter md-alignment-center">
              <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-button class="md-raised md-warning" v-if="usuario.cuenta_bancaria !== null" @click="showDialogUpdateBanca = true">
                  Cambiar Cuenta bancaria
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-raised md-success" v-else @click="showDialogCreateBanca = true">
                Nueva Cuenta bancaria
                <md-icon>add</md-icon>
              </md-button>
              </div>
            <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" style="text-align: center;">
                <md-button class="md-raised md-primary"   to="myPublications">
                  Mis Publicaciones
                  <md-icon>favorite</md-icon>
                </md-button>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-button v-if="tipoPersona !== '1'" class="md-raised md-info" style="float: right;" to="aprobatePublications">
                  Aprobar Publicaciones
                  <md-icon>check</md-icon>
                </md-button>
              </div>
            </div>
            <br>
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
      <md-dialog :md-active.sync="showDialogUpdateBanca" style="width: 70% !important;" >
        <md-dialog-title class="dialog-enc">Actualizar Cuenta bancaria</md-dialog-title>
        <div class="">
        <form>
          <md-field class="md-form-group px-2">
            <md-icon>money</md-icon>
            <label>Número cuenta...</label>
            <md-input v-model="cuentaBancariaUser.numero_cuenta" type="text" aria-required="required" />
            <md-input v-model="cuentaBancaria.id_user" type="hidden" aria-required="required" hidden />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>text_format</md-icon>
            <label>Titular...</label>
            <md-input v-model="cuentaBancariaUser.nombre_titular" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>text_format</md-icon>
            <label>Rut de titular...</label>
            <md-input v-model="cuentaBancariaUser.rut" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>email</md-icon>
            <label>email...</label>
            <md-input v-model="cuentaBancariaUser.email" type="email" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>business</md-icon>
            <label>Banco...</label>
          <md-select name=""  v-model="cuentaBancariaUser.id_banco" md-dense>
            <md-option
              v-for="banco in bancos"
                v-bind:key="banco.nombre"
                :value="banco.id"
                :label="banco.nombre"
                >{{ banco.nombre }}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>merge_type</md-icon>
            <label>Tipo Cuenta...</label>
          <md-select name=""  v-model="cuentaBancariaUser.id_tipo_cuenta" md-dense>
            <md-option
              v-for="banco in tipoCuentas"
                v-bind:key="banco.nombre"
                :value="banco.id"
                :label="banco.nombre"
                >{{ banco.nombre }}</md-option>
            </md-select>
          </md-field>
          
        </form>
        </div>
        <md-dialog-actions>
          <md-button class="button-danger" @click="showDialogUpdateBanca = false">cancelar</md-button>
          <md-button class="md-success" @click="updateCuentaBancaria(cuentaBancariaUser)">Actualizar</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <div class="md-layout">
      <md-dialog :md-active.sync="showDialogCreateBanca" style="width: 70% !important;" >
        <md-dialog-title class="dialog-enc">Nueva Cuenta bancaria</md-dialog-title>
        
        <div class="">
        <form>
          <md-field class="md-form-group px-2">
            <md-icon>money</md-icon>
            <label>Número cuenta...</label>
            <md-input v-model="cuentaBancaria.numero_cuenta" type="text" aria-required="required" />
            <md-input v-model="cuentaBancaria.id_user" type="hidden" aria-required="required" hidden />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>text_format</md-icon>
            <label>Titular...</label>
            <md-input v-model="cuentaBancaria.nombre_titular" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>text_format</md-icon>
            <label>Rut de titular...</label>
            <md-input v-model="cuentaBancaria.rut" type="text" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>email</md-icon>
            <label>email...</label>
            <md-input v-model="cuentaBancaria.email" type="email" aria-required="required" />
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>business</md-icon>
            <label>Banco...</label>
          <md-select name=""  v-model="cuentaBancaria.id_banco" md-dense>
            <md-option
              v-for="banco in bancos"
                v-bind:key="banco.nombre"
                :value="banco.id"
                :label="banco.nombre"
                >{{ banco.nombre }}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-form-group px-2">
            <md-icon>merge_type</md-icon>
            <label>Tipo Cuenta...</label>
          <md-select name=""  v-model="cuentaBancaria.id_tipo_cuenta" md-dense>
            <md-option
              v-for="banco in tipoCuentas"
                v-bind:key="banco.nombre"
                :value="banco.id"
                :label="banco.nombre"
                >{{ banco.nombre }}</md-option>
            </md-select>
          </md-field>
          
        </form>
        </div>
        <md-dialog-actions>
          <md-button class="button-danger" @click="showDialogCreateBanca = false">cancelar</md-button>
          <md-button class="md-success" @click="saveCuentaBancaria(cuentaBancaria)">Crear</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { Tabs } from '@/components'
import { userService } from '@/services/users/Personas.service'
import { tipoPersonaService } from '@/services/users/TipoPersona.service'
import { bancoService } from '@/services/other/Banco.service'
import { tipoCuentaBancariaService } from '@/services/other/TipoCuentaBancaria.service'
import { cuentaBancariaService } from '@/services/other/CuentaBancaria.service'
import { getCuentaUserService } from '@/services/users/GetCuentaUser.service'
import Credentials from '@/services/Credentials.service.js'

const credentials = new Credentials()

export default {
  components: {
    Tabs
  },
  bodyClass: 'profile-page',
  data () {
    return {
      usuario: {},
      tipoUsers: [],
      showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      timeout: 4000,
      showDialogCreate: false,
      showDialogUpdate: false,
      bancos: [],
      tipoCuentas: [],
      tipoPersona: 0,
      cuentaBancaria: {
        id_user: 0,
        numero_cuenta: '',
        nombre_titular: '',
        rut: '',
        id_banco: '',
        id_tipo_cuenta: ''
      },
      cuentaBancariaUser: {

      },
      showDialogCreateBanca: false,
      showDialogUpdateBanca: false,
      imgH:require("../assets/img/faces/AvatarH.png"),
      imgM:require("../assets/img/faces/AvatarM.png"),
      idUser: 4
    }
  },
  props: {
    header: {
      type: String,
      default: require('../assets/img/inmo/woman_work.jpg')
    },
    img: {
      type: String,
      default: require('../assets/img/faces/christian.jpg')
    }
  },
  computed: {
    headerStyle () {
      return {
        backgroundImage: `url(${this.header})`
      }
    }
  },
  methods: {
    loadUsuario () {
      let vm = this
      userService.getById(vm.idUser).then(data => {
        vm.usuario = data.body
        vm.cuentaBancaria.id_user = 4
        if(vm.usuario.cuenta_bancaria !== null){
          vm.loadCuentaBancariaUser(vm.usuario.cuenta_bancaria)
        }
        console.log(data.body)
      })
    },
    loadCuentaBancariaUser (id) {
      let vm = this
      cuentaBancariaService.getById(id).then(data => {
        vm.cuentaBancariaUser = data.body
        console.log(data.body)
      })
    },
    saveCuentaBancaria(model){
      let vm = this
      console.log(model)
      cuentaBancariaService.save(model).then(data => {
        vm.restricciones = data.body
        vm.textSnackbar = "La cuenta fue creada con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
        response => {
          vm.textSnackbar = "Hubo un error al crear la cuenta";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
        vm.showDialogCreateBanca = false,
        vm.cuentaBancaria.numero_cuenta = '',
        vm.cuentaBancaria.nombre_titular = '',
        vm.cuentaBancaria.rut = '',
        vm.cuentaBancaria.email = '',
        vm.cuentaBancaria.id_banco = '',
        vm.cuentaBancaria.id_tipo_cuenta = '',
        vm.loadCuentaBancariaUser(vm.idUser)
      )
    },
    updateCuentaBancaria(model){
      let vm = this
      console.log(model)
      getCuentaUserService.update(vm.idUser, model).then(data => {
        vm.restricciones = data.body
        vm.textSnackbar = "La cuenta fue actualizada con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
        response => {
          vm.textSnackbar = "Hubo un error al actualizar la cuenta";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
        vm.showDialogUpdateBanca = false,
        vm.cuentaBancariaUser.numero_cuenta = '',
        vm.cuentaBancariaUser.nombre_titular = '',
        vm.cuentaBancaria.rut = '',
        vm.cuentaBancariaUser.email = '',
        vm.cuentaBancariaUser.id_banco = '',
        vm.cuentaBancariaUser.id_tipo_cuenta = '',
        vm.loadCuentaBancariaUser(vm.idUser)
      )
    },
    loadTipoUsuario () {
      let vm = this
      tipoPersonaService.query().then(data => {
        vm.tipoUsers = data.body
      })
    },
    loadTipoCuentaBancaria () {
      let vm = this
      tipoCuentaBancariaService.query().then(data => {
        vm.tipoCuentas = data.body
      })
    },
    loadBancos () {
      let vm = this
      bancoService.query().then(data => {
        vm.bancos = data.body
      })
    }
  },
  mounted () {
    let vm = this
    vm.idUser = credentials.getCurrentUser()
    vm.tipoPersona = credentials.getCurrentUserTipo()
    vm.loadUsuario()
    vm.loadBancos()
    vm.loadTipoUsuario()
    vm.loadTipoCuentaBancaria()
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
.dialog-enc{
  color: white !important;
  background-color: #9c27b0 !important;
}
.button-danger{
  background-color: #f44336 !important;
}
.button-danger:hover{
  background-color: #f44336 !important;
}

.px-2{
  padding-left: 1% !important;
  padding-right: 1% !important;
}

.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
