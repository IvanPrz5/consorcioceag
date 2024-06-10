<template>
<div>
    <v-data-table :headers="headers" :items="usuarios" class="elevation-1" :search="buscarUsuario">
        <template v-slot:top>
            <v-toolbar>

                <v-toolbar-title>Usuarios</v-toolbar-title>

                <v-text-field name="name" label="Buscar" id="id" class="pt-6 pl-6" v-model="buscarUsuario" append-icon="mdi-magnify"></v-text-field>

                <v-spacer></v-spacer>

                <v-divider class="mx-4" inset vertical></v-divider>

                <v-dialog transition="scroll-y-transition" max-width="1200" v-model="dialogoNuevoUsuario">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" v-bind="attrs" v-on="on">Nuevo Usuario</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="primary" dark>NUEVO USUARIO <v-spacer></v-spacer>
                                <v-btn text @click="dialog.value = false">X</v-btn>
                            </v-toolbar>
                                <crearUsuario @usuarioGuardado="usuarioGuardado"></crearUsuario>
                            <v-card-actions class="justify-end">
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">ESTA SEGURO CAMBIAR ESTATUS ?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="noBorrar()">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="borrarUsuario()">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.estatus="{ item }">
            <div>
                <v-switch v-model="item.estatus" @click="cambioEstatus(item)"></v-switch>
            </div>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-dialog max-width="1200">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="secondary" dark v-bind="attrs" v-on="on" class="pr-2">
                        mdi-pencil
                    </v-icon>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>EDITAR USUARIO {{ item.email }}
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">X</v-btn>
                        </v-toolbar>
                        <br>
                        <editarUsuario class="pa-6" :usuarioRecibe="item" :cerrarDialogo=dialog @usuarioEditarGuardado="usuarioEditarGuardado"></editarUsuario>
                        <v-card-actions class="justify-end">
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </template>

        <template v-slot:item.roles="{ item }">

            <v-dialog max-width="600">

                <template v-slot:activator="{ on, attrs }">

                    <v-icon color="secondary" dark v-bind="attrs" v-on="on" class="pr-2">
                        mdi-account-plus
                    </v-icon>

                </template>

                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>ROLES DE {{ item.email }}
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">X</v-btn>
                        </v-toolbar>
                        <br>
                        <UsuariosRoles class="pa-6" :userId="item.id"></UsuariosRoles>
                        <v-card-actions class="justify-end">
                        </v-card-actions>
                    </v-card>

                </template>

            </v-dialog>

        </template>

        <template v-slot:item.sistemas="{ item }">

            <v-dialog max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" dark v-bind="attrs" v-on="on" class="pr-2">
                        mdi-tooltip-plus
                    </v-icon>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>SISTEMAS DE {{ item.email }}
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">X</v-btn>
                        </v-toolbar>
                        <br>
                        <UsuariosSistemas class="pa-6" :userId="item.id"></UsuariosSistemas>
                        <v-card-actions class="justify-end">
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>

        </template>
        <template v-slot:item.empresas="{ item }">
            <v-dialog max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="accent" dark v-bind="attrs" v-on="on" class="pr-2">
                        mdi-office-building
                    </v-icon>
                </template>

                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>EMPRESAS DE {{ item.email }}
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">X</v-btn>
                        </v-toolbar>
                        <br>
                        <UsuariosEmpresas class="pa-6" :userId="item.id"></UsuariosEmpresas>
                        <v-card-actions class="justify-end">
                        </v-card-actions>
                    </v-card>

                </template>

            </v-dialog>

        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionValidad" color="green" absolute top shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionError" color="red" absolute top shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

</div>
</template>

<script>
import {
    mdiAccountPlus
} from '@mdi/js';

export default {
    data: () => ({

        dialogDelete: false,
        dialogoNuevoUsuario: false,
        dialogoEditarUsuario: false,
        notificacionValidad: false,
        notificacionError: false,
        colorNotificacion: 'green',
        mensajeNoificacion: '',
        usuarioSelcionado: {},
        dialogoUsuarioRoles: false,

        headers: [{
                text: 'id',
                value: 'id'
            },
            {
                text: 'Correo',
                value: 'email'
            },
            {
                text: 'Nombre',
                value: 'nombre'
            },

            {
                text: 'Paterno',
                value: 'paterno'
            },
            {
                text: 'Materno',
                value: 'materno'
            },

            {
                text: 'Celular',
                value: 'celular'
            },
            {
                text: 'Estatus',
                value: 'estatus'
            },
            {
                text: 'Editar',
                value: 'actions',
                sortable: false
            },
            {
                text: 'Roles',
                value: 'roles',
                sortable: false
            },
            {
                text: 'Sistemas',
                value: 'sistemas',
                sortable: false
            },
            {
                text: 'Empresas',
                value: 'empresas',
                sortable: false
            },
        ],
        usuarios: [],
        buscarUsuario: '',

    }),

    computed: {

    },

    watch: {

    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            axios.get('/api/usuarios')
                .then(response => {
                    this.usuarios = null;
                    this.usuarios = response.data;
                }).catch(error => {
                    this.mostrarNoificacion('No es posible cargar empleados', true);

                });
        },

        usuarioGuardado() {

            this.mostrarNoificacion('Usuario Nuevo Guardado', false);
            this.dialogoNuevoUsuario = false;
            this.initialize();

        },
        usuarioEditarGuardado() {

            this.mostrarNoificacion('Usuario Nuevo Guardado', false);
            this.initialize();

        },

        mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },

        cambioEstatus(Usuario) {

            Usuario.estatus = !Usuario.estatus
            this.dialogDelete = true;
            this.usuarioSelcionado = Usuario;

        },

        noBorrar(){

           this.dialogDelete = false;
           this.usuarioSelcionado.estatus = !this.usuarioSelcionado.estatus;
           this.initialize();

        },


        borrarUsuario() {

            axios.delete('/api/usuarios/' + this.usuarioSelcionado.id)
                .then(response => {

                    this.usuarioSelcionado.estatus = !this.usuarioSelcionado.estatus
                    this.dialogDelete = false;

                    this.mostrarNoificacion(this.usuarioSelcionado.email + '  ESTATUS ACTUALIZADO', false)
                     this.initialize();

                }).catch(error => {
                    console.log('error  usuario ' + error)
                    this.mostrarNoificacion(this.usuarioSelcionado.email + '  ESTATUS  NO ACTUALIZADO', true)
                });
        },


    },
}
</script>
