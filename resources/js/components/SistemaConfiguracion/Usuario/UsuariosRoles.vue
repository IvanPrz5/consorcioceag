<template>
<v-card class="mx-auto" max-width="600" tile>


    <p align="center">ROLES </p>
    <v-list two-line>
        <v-list-item v-for="(rol, i) in roles" :key="i">

            <v-list-item-content >
                <v-list-item-title v-text="rol.descripcion"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon >

                <v-btn tile small  color="success" @click="asignarRolUsuario(rol.id)" v-if=" rolesUser.filter( r => r.id == rol.id ).length < 1 ">
                    <v-icon left>
                         mdi-comment-plus
                    </v-icon>
                    ASIGNAR
                </v-btn>

                <v-btn v-else  tile small  color="error" @click="quitarRolUsuario(rol.id)">
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
        roles: [],
        rolesUser: [],
        checkBox: [],
        items: [{
                text: 'Real-Time',
                icon: 'mdi-clock'
            },
            {
                text: 'Audience',
                icon: 'mdi-account'
            },
            {
                text: 'Conversions',
                icon: 'mdi-flag'
            },
        ],
    }),

    created(){
        this.CargarRoles();
        this.CargarRolesUsuario();
    },
    mounted() {
    },
    beforeCreate() {
        console.log('No se ha ejecutado nada todavía')
    },


    methods: {
        CargarRoles() {
            axios.get('/api/roles')
                .then(response => {
                    this.roles = response.data;
                }).catch(error => {
                    console.log('error  roles ' + error)
                });
        },
        CargarRolesUsuario() {
            axios.get('/api/rolesUser/' + this.userId)
                .then(response => {

                    this.rolesUser = response.data;
                }).catch(error => {
                    console.log('error  roles ' + error)
                });
        },
        quitarRolUsuario( idRol ){

            axios.delete('/api/roles/quitarRol/'+ idRol +'/'+this.userId)
                .then(response => {
                    this.mostrarNoificacion('Rol eliminado', false);
                    this.ActualizaRoles();

                }).catch(error => {
                    console.log('error  roles ' + error)
                    this.mostrarNoificacion('Rol no eliminado', true);
                    this.ActualizaRoles();
                });

        },
        asignarRolUsuario( idRol ){
            axios.post('/api/roles/agregarUsuario/'+ idRol +'/'+this.userId)
                .then(response => {
                    this.roles = response.data;
                    this.mostrarNoificacion('Rol asiganado', false);
                    this.ActualizaRoles();
                }).catch(error => {
                    console.log('error  roles ' + error)
                    this.mostrarNoificacion('Rol no asigando', true);
                    this.ActualizaRoles();
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
        ActualizaRoles(){
                 this.CargarRoles();
                this.CargarRolesUsuario();
        }

    }

}
</script>
