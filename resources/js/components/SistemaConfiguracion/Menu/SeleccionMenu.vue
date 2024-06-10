<template>
<div>
    <v-data-table :headers="headers" :items="items" class="elevation-1" :search="buscar">
        <template v-slot:top>
            <v-toolbar>

                <v-toolbar-title>{{ titulo }}</v-toolbar-title>

                <v-text-field name="name" label="Buscar" id="id" class="pt-6 pl-6" v-model="buscar" append-icon="mdi-magnify"></v-text-field>

                <v-spacer></v-spacer>

                <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
        </template>


        <template v-slot:item.seleccionar="{ item }">
            <div>

                <v-btn @click="menuSeleccionado(item.id)"  color="success"   >   SELECIONAR </v-btn>

            </div>
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
     props: ["cerrarDialogo","tipoMenu"],
    data: () => ({

        titulo : 'Menu',
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
                text: 'Sistema',
                value: 'sistema_nombre'
            },

            {
                text: 'Seleccionar',
                value: 'seleccionar'
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
            axios.get('/api/menu')
                .then(response => {
                    this.items = response.data;
                }).catch(error => {
                    this.mostrarNoificacion('No es posible cargar de '+this.titulo, true);
                });
        },

        menuSeleccionado(id){


                this.cerrarDialogo.value = false;


                this.$emit("menuSeleccionado" ,id);

        },

        mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },

    }


}



</script>
