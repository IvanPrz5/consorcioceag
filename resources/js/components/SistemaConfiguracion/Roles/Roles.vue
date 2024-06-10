<template>
<div>
    <v-data-table :headers="headers" :items="items" class="elevation-1" :search="buscar">
        <template v-slot:top>
            <v-toolbar>

                <v-toolbar-title>{{ titulo }}</v-toolbar-title>

                <v-text-field name="name" label="Buscar" id="id" class="pt-6 pl-6" v-model="buscar" append-icon="mdi-magnify"></v-text-field>

                <v-spacer></v-spacer>

                <v-divider class="mx-4" inset vertical></v-divider>

                <v-dialog transition="scroll-y-transition" max-width="1200">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" v-bind="attrs" v-on="on">Nueva {{ titulo }}</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="primary" dark>NUEVOS  {{ titulo.toUpperCase() }} <v-spacer></v-spacer>
                                <v-btn text @click="dialog.value = false">X</v-btn>
                            </v-toolbar>

                            <!-- NUEVA -->

                                <CrearRol  :cerrarDialogo = dialog  @Guardado = "Guardado"   ></CrearRol>


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
                            <v-btn color="blue darken-1" text @click="borrar()">OK</v-btn>
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
                        <v-toolbar color="primary" dark>EDITAR {{ titulo.toUpperCase() }} {{ item.email }}
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">X</v-btn>
                        </v-toolbar>
                        <br>

                          <EditarRol  :cerrarDialogo = dialog    :rolEditar="item" @Guardado = "Guardado"   ></EditarRol>

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


export default {
    data: () => ({
        titulo : 'Roles',
        notificacionValidad: false,
        notificacionError: false,
        colorNotificacion: 'green',
        mensajeNoificacion: '',
        dialogDelete: false ,
        seleccionado: {},
        headers: [{
                text: 'Id',
                value: 'id'
            },
            {
                text: 'Descripcion',
                value: 'descripcion'
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

            ],
        items: [],
        buscar: '',


    }),
     created() {
        this.initialize()
    },

    methods: {
        initialize() {
            axios.get('/api/allRoles')
                .then(response => {
                    this.items = response.data;
                }).catch(error => {
                    this.mostrarNoificacion('No es posible cargar de '+this.titulo, true);
                });
        },
        Guardado() {

            this.mostrarNoificacion('Guardado con exito', false);
            this.initialize();

        },
        usuarioEditarGuardado() {

            this.mostrarNoificacion('Editado Exitoso', false);
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
        cambioEstatus(item) {


            this.dialogDelete = true;
            this.seleccionado = item;

        },
        noBorrar(){
            this.initialize();
             this.dialogDelete = false;

        },
        borrar() {

            axios.delete('/api/roles/borrar/' + this.seleccionado.id)
                .then(response => {


                    this.dialogDelete = false;

                    this.mostrarNoificacion('  ESTATUS ACTUALIZADO', false)
                    this.initialize()

                }).catch(error => {
                    console.log('error  usuario ' + error)
                     this.dialogDelete = false;
                    this.mostrarNoificacion('  ESTATUS  NO ACTUALIZADO', true)
                    this.initialize();
                });
        },
    }


}



</script>
