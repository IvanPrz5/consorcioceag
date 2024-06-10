<template>
<v-form ref="form" enctype="multipart/form-data">

    <v-container>
        <v-row>


            <v-col cols="12">
                <v-text-field v-model="organigrama.descripcion" :rules="letrasYnumeros" placeholder="Ingrese la descripcion del rol" label="Descripcion" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>




            <v-col cols="12" md="6" sm="4">
                <v-switch v-model="organigrama.estatus" inset clearable></v-switch>
            </v-col>

        </v-row>

        <v-btn color="ceagAzul" @click="Nuevo">
            Guardar
        </v-btn>
        <v-progress-linear v-if="barraActiva" indeterminate color="yellow darken-2"></v-progress-linear>

    </v-container>

    <v-snackbar :timeout="1500" v-model="notificacionValidad" color="green" absolute centered shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" v-model="notificacionError" color="red" absolute centered shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

</v-form>
</template>

<script>
import {
    mdiConsoleNetworkOutline
} from '@mdi/js';
export default {
    props: ["organigramaEditar","cerrarDialogo"],
    data: () => ({
        organigrama: {
                descripcion: '',
                estatus: true,
        },

        barraActiva: false,
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        show1: false,

        letrasYnumeros: [
            v => !!v || 'Requerido',
            v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]+$/g.test(v) || 'Solo letras y numeros',
        ],


    }),
    created(){
            this.organigrama =    this.organigramaEditar ;
    },
    methods: {
        Nuevo() {
            if (this.$refs.form.validate()) {

                this.barraActiva = true;


                axios.post('/api/organigrama/editar', this.organigrama)
                    .then(response => {
                        console.log(response);
                        this.mostrarNoificacion("Nuevo Organigrama", false);
                        this.barraActiva = false;
                        this.cerrarDialogo.value = false;
                        this.$refs.form.resetValidation();
                        this.$emit("Guardado")
                    }).catch(error => {
                        this.mostrarNoificacion("No es posible guardar el organigrama", true);
                        this.barraActiva = false;
                    });
            } else {
                this.mostrarNoificacion("Por favor rellene todos lo campos ", true);
            }

        },
        mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },
        cargarImagen(archivo) {

            if (archivo != null) {
                this.imagen = archivo; // event.target.files[0];

                let reader = new FileReader()

                reader.addEventListener("load", function () {
                    this.showPreview = true;
                    this.urlImagen = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(this.imagen)

            } else {
                this.imagen = null
                this.urlImagen = null

            }

        },


    }

}
</script>
