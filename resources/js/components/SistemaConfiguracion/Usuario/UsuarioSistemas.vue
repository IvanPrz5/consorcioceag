<template>
<v-card class="mx-auto" max-width="600" tile>

    <p align="center">SISTEMAS</p>


    <v-btn  color="primary" @click="actualizarDatos" > Actuializar   </v-btn>
    <v-container class="elevation-20"  >

        <v-row v-for="(empresa, i) in empresas" :key="i"  align="center"  justify="center" no-gutters   >

            <v-col cols="12" sm="12" ma="8"   >
                <v-card
                    class="pa-2"
                    tile
                    >
                   {{ empresa.nombre }}
                    </v-card>
            </v-col>


            <v-col cols="12" sm="12" v-for="(sistema, j) in sistemas" :key="sistema.id" ma="8"   >
                 <v-checkbox  :label=sistema.nombre    v-model="sistemasUser"   :value= "sistema.id+','+empresa.id"   @change = 'actualizarSistema( sistema.id,  empresa.id  )'    ></v-checkbox>
            </v-col>

        </v-row>


    </v-container>

    <!--    <v-list-item v-for="(empresa, i) in empresas" :key="i">

                  {{ empresa.nombre }}
                     <div v-for="(sistema , i) in sistemas" :key="i">
                        <v-checkbox
                            v-model="checkbox"
                            :label=sistema.nombre
                        ></v-checkbox>
            </div> -->

    <!--  </v-list-item> -->

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionValidad" color="green" absolute top shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionError" color="red" absolute top shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>
</v-card>
</template>

<script>
import {
    mdiConsoleNetworkOutline
} from '@mdi/js';
export default {
    props: ["userId"],
    data: () => ({
        selectedItem: 1,
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        sistemas: [],
        sistemasUser: [],
        empresas: [],
        checkBox: [],

    }),

    created() {
        this.CargarSistemas();
        this.CargarEmpresas();
        this.CargarSistemasUsuario();



    },
    mounted() {},
    beforeCreate() {

    },

    methods: {
        CargarSistemas() {
            axios.get('/api/sistemas')
                .then(response => {
                    this.sistemas = response.data;
                }).catch(error => {
                    console.log('error  sistemas ' + error)
                });
        },
        CargarEmpresas() {
               axios.get('/api/empresasUser/' + this.userId)
                .then(response => {
                    this.empresas = response.data;

                }).catch(error => {
                    console.log('error  empresas ' + error)
                });
        },
        CargarSistemasUsuario() {
            axios.get('/api/sistemasUser/' + this.userId)
                .then(response => {
                     this.sistemasUser  = null;
                    this.sistemasUser = response.data;
                }).catch(error => {
                    console.log('error  sistemas ' + error)
                });
        },

        mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },

        actualizarSistema(idSistema , idEmpresa){
            axios.post('/api/sistemas/actualizarSistemas/' + idSistema + '/' + this.userId+ '/' + idEmpresa)
                .then(response => {
                    this.sistemas = response.data;
                    this.actualizarDatos();
                 }).catch(error => {
                    this.mostrarNoificacion(error, true);
                    this.actualizarDatos();
                });

        },
        actualizarDatos(){
             this.CargarSistemas();
             this.CargarEmpresas();
            this.CargarSistemasUsuario();
        }

    }

}
</script>
