<template>
<div>


    <div>

              <h1>Classic editor</h1>
    <div id="editor">
        <p>This is some sample content.</p>
    </div>

    </div>


    <v-data-table :headers="headers" :items="items" class="elevation-1" :search="buscar">
        <template v-slot:top>
            <v-toolbar>

                <v-toolbar-title>{{ titulo }}</v-toolbar-title>

                <v-text-field name="name" label="Buscar" id="id" class="pt-6 pl-6" v-model="buscar" append-icon="mdi-magnify"></v-text-field>

 <v-spacer></v-spacer>



                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"

                            class="pt-6 pl-6"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fecha"
                                class="pt-6 pl-6"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                label="Fecha del mes a consultar"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fecha"
                            @input="cambioFecha"
                            ></v-date-picker>
                        </v-menu>




                <v-divider class="mx-4" inset vertical></v-divider>

                <v-dialog transition="scroll-y-transition" max-width="600">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" v-bind="attrs" v-on="on">Nuevo {{ titulo }}</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="primary" dark>NUEVOS  {{ titulo.toUpperCase() }} <v-spacer></v-spacer>
                                <v-btn text @click="dialog.value = false">X</v-btn>
                            </v-toolbar>

                            <!-- NUEVA -->

                             <EgresosCrearSolicitud  :cerrarDialogo = "dialog"   @Guardado = "Guardado" ></EgresosCrearSolicitud>
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

        <template v-slot:item.created_at="{ item }">
            <div>

                    {{formatoFecha (item.created_at)}}
                                          <!--  {{ formatoFecha(item.created_at) }} -->

            </div>
        </template>

        <template v-slot:item.pdf="{ item }">
            <div>

                    <v-icon color="ceagNaranja_3" dark  class="pr-2">
                        mdi-file-pdf-box-outline
                    </v-icon>

            </div>
        </template>


        <template v-slot:item.estatus="{ item }">
            <div>
                <v-switch v-model="item.estatus" @click="cambioEstatus(item)"></v-switch>
            </div>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-dialog max-width="1200">
                <template v-slot:activator="{ }">
                    <v-icon color="secondary" dark  class="pr-2">
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


                                <div  style="border-style: inset;" >
                                         <EditarMenu  :cerrarDialogo = dialog    :menuEntrada="item" @Guardado = "Guardado"
                                               >
                                </EditarMenu>

                                </div>



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

 <script src="https://cdn.ckeditor.com/ckeditor5/29.2.0/classic/ckeditor.js"></script>
 <script>
        ClassicEditor
            .create( document.querySelector( '#editor' ) )
            .catch( error => {
                console.error( error );
            } );
    </script>



<script>


export default {
    data: () => ({
        titulo : 'Solicitud',
        notificacionValidad: false,
        notificacionError: false,
        colorNotificacion: 'green',
         menu2: false,
        mensajeNoificacion: '',
        dialogDelete: false ,
        fecha:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        seleccionado: {},
        headers: [{
                text: 'Folio',
                value: 'folio'
            },
            {
                text: 'Beneficiario',
                value: 'beneficiario'
            },

              {
                text: 'Puesto',
                value: 'puesto'
            },

            {
                text: 'Descripcion',
                value: 'descripcion'
            },
            {
                text: 'Importe',
                value: 'importe'
            },

            {
                text: 'Fecha',
                value: 'created_at'
            },
            {
                text: 'Estatus',
                value: 'estatus'
            },
            {
                text: 'Pdf',
                value: 'pdf'
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
            const empresa  = JSON.parse(  localStorage.getItem('_empresa' ));

            axios.get('../api/egresos/allSolicitudes/'+empresa.id+'/'+this.fecha)
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

        formatoFecha(fecha){

            var datos = fecha.split("T");
             return datos[0]  ; //+' '+datos[1].replace('.000000Z','');

        },

        borrar() {

            axios.delete('/api/menu/borrar/' + this.seleccionado.id)
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
        cambioFecha(){
                this.menu2 = false;
                this.initialize();

        },
    }


}



</script>
