<template>
  <div class="wrapper">
    <div
      class="section page-header header-filter"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
          <img id="img" model="pruebaImagen" :src="HeaderImage"/>
            <login-card header-color="primary">
              <h4
                slot="title"
                class="card-title"
              >
                Iniciar sesión
              </h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square" />
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter" />
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g" />
              </md-button>
              <p
                slot="description"
                class="description"
              >
                o de modo clasico
              </p>
              <md-field
                slot="inputs"
                class="md-form-group"
              >
                <md-icon>email</md-icon>
                <label>email@ejemlo.com...</label>
                <md-input
                  v-model="user.email"
                  type="email"
                />
              </md-field>
              <md-field
                slot="inputs"
                class="md-form-group"
              >
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="user.password" />
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-primary md-lg"
                
                @click="submitLogin"
              >
                Iniciar
              </md-button>

              <md-button
                slot="footer"
                class="md-simple md-info"
                :to="'signup-page'"
                @click="submitLogin"
              >
                Registrar
              </md-button>
              
            </login-card>
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
import { LoginCard } from "../../components";
import Mixins from "@/plugins/basicMixins";
import { loginService } from "../../services/users/Login.service";
import { regionService } from "../../services/location/Region.service";
import CredentialsServices from '../../services/Credentials.service.js'

export default {
  components: {
    LoginCard
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: "login-page",
  data() {
    return {
      image: require("../../assets/img/profile_city.jpg"),
      user: {
        email: null,
        password: null
      },
      pruebaImagen: null,
      regiones: [],
      credentialService: new CredentialsServices(),
      showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      timeout: 4000
    };
  },
  methods: {
    submitLogin(){
      let vm = this
      loginService.save(vm.user).then(data => {
        console.log(data.body)
        this.credentialService.setToken(data.body.data.token)
        this.credentialService.setCurrentUser(data.body.data.id)
        //this.credentialService.setCurrentUserAvatar(data.body.user.avatar)
        this.credentialService.setCurrentUserTipo(data.body.data.type_account)
        //this.$router.push('learning/courses')
        window.location.reload()
        
      },
        response => {
          vm.textSnackbar = 'Error en el email o la contraseña'
          vm.showSnackbar = true
          vm.colorSnackbar = 'background-color: darkred'
        })
    },
    loadRegiones() {
      let vm = this;
      regionService.query().then(data => {
        vm.regiones = data.body;
      });
    }
  },
  mounted () {
    let vm = this
    if(vm.credentialService.isLogin()){
      vm.$router.push({name: 'propiedades'})
    }
    vm.pruebaImagen = img.srcElement
    console.log(vm.pruebaImagen)
  }
};
</script>

<style lang="css"></style>
