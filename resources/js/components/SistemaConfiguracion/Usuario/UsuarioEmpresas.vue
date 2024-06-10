<template>
<v-card class="mx-auto" max-width="600" tile>


    <p align="center">EMPRESAS </p>
    <v-list two-line>
        <v-list-item v-for="(empresa, i) in empresas" :key="i">

            <v-list-item-content >
                <v-list-item-title v-text="empresa.nombre"></v-list-item-title>
                 <v-list-item-subtitle v-html="empresa.nombreNominativo"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon >

                <v-btn tile small  color="success" @click="asignarEmpresaUsuario(empresa.id)" v-if=" empresasUser.filter( r => r.id == empresa.id ).length < 1 ">
                    <v-icon left>
                         mdi-comment-plus
                    </v-icon>
                    ASIGNAR
                </v-btn>

                <v-btn v-else  tile small  color="error" @click="quitarEmpresaUsuario(empresa.id)">
                    <v-icon  left>
                         mdi-comment-plus
                    </v-icon>
                    QUITAR
                </v-btn>

            </v-list-item-icon>

        </v-list-item>
    </v-list>


   <v-snackbar
      :timeout="1500"
      :value="true"
      v-model="notificacionValidad"
      color="green"
      absolute
      top
      shaped
      transition="scroll-y-transition"


    >
      {{ mensajeNoificacion }}
    </v-snackbar>


     <v-snackbar
      :timeout="1500"
      :value="true"
      v-model="notificacionError"
      color="red"
      absolute
      top
      shaped
      transition="scroll-y-transition"
    >
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
        notificacionValidad : false   ,
        notificacionError   : false   ,
        mensajeNoificacion  : ''      ,
        empresas: [],
        empresasUser: [],
        checkBox: [],
    }),

    created(){
        this.CargarEmpresas();
        this.CargarEmpresasUsuario();
    },
    mounted() {
    },
    beforeCreate() {
        console.log('No se ha ejecutado nada todavía')
    },


    methods: {
        CargarEmpresas() {
            axios.get('/api/empresas')
                .then(response => {
                    this.empresas = response.data;
                }).catch(error => {
                    console.log('error  empresas ' + error)
                });
        },
        CargarEmpresasUsuario() {
            axios.get('/api/empresasUser/' + this.userId)
                .then(response => {

                    this.empresasUser = response.data;
                }).catch(error => {
                    console.log('error  empresas ' + error)
                });
        },
        quitarEmpresaUsuario( idEmpresa ){

            axios.delete('/api/empresas/quitarEmpresa/'+ idEmpresa +'/'+this.userId)
                .then(response => {
                    this.mostrarNoificacion('Empresa  eliminada', false);
                    this.ActualizaEmpresas();

                }).catch(error => {
                    console.log('error  empresa ' + error)
                    this.mostrarNoificacion('Empresa no eliminada', true);
                    this.ActualizaEmpresas();
                });

        },
        asignarEmpresaUsuario( idEmpresa ){
            axios.post('/api/empresas/agregarEmpresa/'+ idEmpresa +'/'+this.userId)
                .then(response => {
                    this.roles = response.data;
                    this.mostrarNoificacion('Empresa asignada', false);
                    this.ActualizaEmpresas();
                }).catch(error => {
                    console.log('error  empresa ' + error)
                    this.mostrarNoificacion('Empresa no asigando', true);
                    this.ActualizaEmpresas();
                });
        },
        mostrarNoificacion( mensaje , esError ){
            this.mensajeNoificacion = mensaje ;
            if(esError){

                this.notificacionError = true ;

            }else{
                this.notificacionValidad = true ;
            }

        },
        ActualizaEmpresas(){
                 this.CargarEmpresas();
                this.CargarEmpresasUsuario();
        }

    }

}
</script>
