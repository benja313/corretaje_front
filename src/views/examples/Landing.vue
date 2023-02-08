<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      parallax-active="true"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-100">
            <h1 class="title">
              ¿Quiénes somos?
            </h1>
            <h4>
              Somos una empresa dedicada a hacer más <strong>rápidas</strong> y <strong>cómodas</strong> 
              las transacciones de bienes raíces en Chile a través de una comunidad 
              colaborativa en la que todos pueden aportar información y repartir una parte de los beneficios. 
              El objetivo es que todos los Agentes Colaboradores puedan compartir los lugares que tienen 
              disponibles para venta y arriendo, para tener una mayor variedad de propiedades de la cual puedan 
              elegir sus clientes, como también hacer más rápida la venta de las viviendas que tenga que vender.
            </h4>
            <br>
            <md-button
              @click="route('ecommerce-page')"
              class="md-primary md-lg"
              target="_blank"
            >
              Publicaciones
            </md-button>
            <!-- <i class="fas fa-play" /> -->
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">
                Te ofrecemos
              </h2>
              <h5 class="description">
                Corretaje Colaborativo está pensado para que toda la comunidad pueda contribuir 
                con información de propiedades, las que son validadas por nuestros corredores, 
                lo que te entrega una garantía de calidad respecto a las publicaciones que visualizarás. 
                Está más que solo orientado a propiedades de vivienda, porque sabemos que tú necesitas más que eso, 
                tenemos una amplia gama de propiedades de diferente tipo.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>contact_phone</md-icon>
                  </div>
                  <h4 class="info-title">
                    Contacto
                  </h4>
                  <p>
                    Te comunicas con el corredor de propiedades, el te entrega una información detallada y te orienta para que tomes la mejor decisión.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>verified_user</md-icon>
                  </div>
                  <h4 class="info-title">
                    De personas para personas
                  </h4>
                  <p>
                    Las propiedades son creadas por cualquier usuario registrado y validadas por un corredor, esto hace que exista una gran gama de propiedades.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <md-icon>fingerprint</md-icon>
                  </div>
                  <h4 class="info-title">
                    Seguridad
                  </h4>
                  <p>
                   La información sensible de la propiedad no se publica, para seguridad de los dueños de la propiedad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- seccion nueva -->
        <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">
                Porque pensamos en ti
              </h2>
              <h5 class="description">
                Corretaje colaborativo se adapta a ti y te ofrece distintas soluciones para distintos perfiles. Queremos ofrecerte el mejor servicio posible y ayudarte en lo que más podamos.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>supervised_user_circle</md-icon>
                  </div>
                  <h4 class="info-title">
                    Soy Agente
                  </h4>
                  <p>
                   Si eres corredor de propiedades y estas dispuesto a compartir la comisión al estilo “canje” puedes publicar con nosotros y nuestra comunidad de agentes ofrecerán la vivienda a su círculo de clientes. Al mismo tiempo, usted tendrá acceso a todas las viviendas que ellos poseen, pudiendo así ofrecerlo a sus clientes. Para acceder a esta funcionalidad, en primer lugar, debe <a href="" @click="route('signup')">registrarse</a>.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>perm_identity</md-icon>
                  </div>
                  <h4 class="info-title">
                    Soy particular
                  </h4>
                  <p>
                    Si eres dueño de un inmueble y quieres vender o arrendar, puedes publicar tu anuncio con nosotros y nuestra red de corredores lo ofrecerá, al momento de concretarse la venta/arriendo no habrá cobro a usted. El agente sólo recibirá comisión de la parte compradora.Para publicar su propiedad debe <a href="" @click="route('signup')">registrarse</a>.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-primary">
                    <md-icon>house</md-icon>
                  </div>
                  <h4 class="info-title">
                    Tengo dato de alguien que quiere comprar, vender o arrendar
                  </h4>
                  <p>
                   Parte fundamental de nuestra visión de empresa es la Colaboración de toda la comunidad, por lo que nosotros compartiremos la comisión de transacción con las personas que nos entregan información de personas que buscan Comprar - Vender - Arrendar. Haz click <a href="#better">aquí</a> si quieres colaborar.

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
      <div>
        <iframe style="margin:auto; display:block; width:64rem; height:36rem !important;" width="560" height="auto" src="https://www.youtube.com/embed/oygrmJFKYZY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      -->
      <div class="section text-center">
        <div class="container">
          <h2 class="title">
            Las personas que piensan en su necesidad
          </h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-size-50 md-small-size-100">
                <profile-card
                  text-center
                  card-plain
                  type="horizontal"
                  :shadow-normal="false"
                  :no-colored-shadow="false"
                  :card-image="cardProfile3.cardProfile1"
                >
                  <template slot="cardContent">
                    <h4 class="card-title">
                      Grant Scates
                    </h4>
                    <h6 class="card-category text-muted">
                      Fundador
                    </h6>
                    <p class="card-description">
                      Creemos que es una instancia de trabajo en donde puede participar cualquiera y beneficiarse de nuestro servicio.
                    </p>
                  </template>
                  
                  <template slot="cardAction">
                    <md-button
                      href="https://www.facebook.com/GrantJScates"
                      class="md-facebook md-just-icon md-simple"
                      target="_blank"
                    >
                      <i class="fab fa-facebook" />
                    </md-button>
                   
                    
                    
                       <md-button
                      href="https://www.linkedin.com/in/grant-scates-90a8a611a/"
                      class="md-linkedin md-just-icon md-simple"
                      target="_blank"
                    >
                      <i class="fab fa-linkedin" />
                    </md-button>

                      <md-button
                      href="https://www.instagram.com/grantscates/"
                      target="_blank"
                      class="md-instagram md-just-icon md-simple"
                    >
                      <i class="fab fa-instagram" />
                    </md-button>
                  </template>
                   <template slot="cardContact" >
                    <h5 >
                        <md-icon class="text-skyblue">mail</md-icon>{{ "gscates@corretajecolaborativo.cl"}}
                      </h5>
                      <h4>
                        <i class="fab fa-whatsapp" style="color:#25D366"></i>{{ "+569 95179897"}}
                      </h4>
                  </template>
             
                </profile-card>
              </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
                <profile-card
                  text-center
                  card-plain
                  type="horizontal"
                  :shadow-normal="false"
                  :no-colored-shadow="false"
                  :card-image="cardProfile3.cardProfile2"
                >
                  <template slot="cardContent">
                    <h4 class="card-title">
                      Nicolas Uribe
                    </h4>
                    <h6 class="card-category text-muted">
                      Fundador
                    </h6>
                    <p class="card-description">
                      Puedes encontrar una propiedad ideal para tus necesidades
                    </p>
                    <md-button
                      href="https://www.facebook.com/nicolas.uribe.963"
                      class="md-facebook md-just-icon md-simple"
                      target="_blank"
                    >
                      <i class="fab fa-facebook" />
                    </md-button>
                   
                    
                  
                       <md-button
                      href="https://www.linkedin.com/in/nicolas-felipe-uribe-sandoval"
                      class="md-linkedin md-just-icon md-simple"
                      target="_blank"
                    >
                      <i class="fab fa-linkedin" />
                    </md-button>

                      <md-button
                      href="https://www.instagram.com/nicouribe._____/
                      "
                      target="_blank"
                      class="md-instagram md-just-icon md-simple"
                    >
                      <i class="fab fa-instagram" />
                    </md-button>
                  </template>
                  
                  <template slot="cardContact" >
                    <h5>
                        <md-icon class="text-skyblue">mail</md-icon>{{ "nuribe@corretajecolaborativo.cl"}}
                      </h5>
                      <h4>
                        <i class="fab fa-whatsapp" style="color:#25D366"></i>{{ "+569 50660887"}}
                      </h4>
                  </template>
               
                  
                </profile-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts" id="better">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2 class="text-center title">
                Ayúdanos a mejorar
              </h2>
              <h4 class="text-center description">
                En nuestro afán de mejora constante, envíanos tus sugerencias
                 o lo que tú en lo personal necesitas y realmente trabajaremos para ti. 
                 Estaremos muy agradecidos de tus comentarios
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field>
                      <label>Tu Nombre</label>
                      <md-input
                        v-model="name"
                        type="text"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field>
                      <label>Tu Email</label>
                      <md-input
                        v-model="email"
                        type="email"
                      />
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Tu sugerencia</label>
                  <md-textarea v-model="message" />
                </md-field>
                <div class="md-layout">
                  <div
                    class="md-layout-item md-size-33 md-small-size-100 mx-auto text-center"
                  >
                    <md-button @click="cargarSugerencias" class="md-success">
                      Enviar
                    </md-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import { ProfileCard } from "@/components";
import Mixins from "@/plugins/basicMixins";

export default {
  components: {
    ProfileCard
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: "landing-page",
  data() {
    return {
      image: require("@/assets/img/inmo/landing_1.jpg"),
      name: null,
      showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      duracion: 4000,
      email: null,
      message: null,
      cardProfile3: {
        cardProfile1: require("@/assets/img/faces/Grant400x400.jpg"),
        cardProfile2: require("@/assets/img/faces/Nico400x400.jpg"),
        cardProfile3: require("@/assets/img/faces/card-profile4-square.jpg"),
        cardProfile4: require("@/assets/img/faces/card-profile2-square.jpg")
      }
    };
  },
  methods: {
    cargarSugerencias(){
      let vm = this
      vm.textSnackbar = 'Gracias por tus sugerencias, las tendremos presente para poder mejorar.'
      vm.showSnackbar = true
      vm.colorSnackbar = 'background-color: green'
    },
    route(ruta){
      let vm = this
      this.$router.push({name: ruta})
    }
  },
  mounted () {
    let vm = this
    console.log(vm.image)
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
.md-card-actions {
    padding: 8px;
    display: block !important;
    align-items: center;
}
</style>
