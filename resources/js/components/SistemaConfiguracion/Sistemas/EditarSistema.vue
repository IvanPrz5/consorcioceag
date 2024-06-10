<template>
<v-form ref="form" enctype="multipart/form-data">

    <v-container>
        <v-row>

            <v-col cols="12">
                <v-text-field v-model="nombre" :rules="letrasYnumeros" placeholder="Ingrese el nombre del sistema" label="Nombre" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="descripcion" :rules="letrasYnumeros" placeholder="Ingrese la descripcion del sistema" label="Descripcion" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <template>
                    <v-file-input @change="cargarImagen" accept="image/png, image/jpeg, image/bmp"
                    placeholder="Suba su logo de su empresa"
                     prepend-icon="mdi-camera" label="Logo de la empresa"></v-file-input>
                </template>
            </v-col>

            <v-col cols="12" md="6">

                <v-avatar v-if="urlImagen != null " class="profile" color="grey" size="164" tile>
                    <v-img contain v-if="urlImagen" :src="urlImagen"></v-img>
                </v-avatar>


            </v-col>

            <v-col cols="12" md="6" sm="4">
                <v-switch v-model="estatus" inset clearable></v-switch>

            </v-col>

        </v-row>

        <v-btn color="ceagAzul" @click="NuevoSistema">
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
    props: ["cerrarDialogo","empresa"],
    data: () => ({
        id: '',
        descripcion: '',
        nombre: '',
        estatus: true,
        imagen: null,
        barraActiva: false,
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        urlImagen: null,
        show1: false,
        letras: [
            v => !!v || 'Requerido',
            v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || 'Solo letras',
        ],
        letrasYnumeros: [
            v => !!v || 'Requerido',
            v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]+$/g.test(v) || 'Solo letras y numeros',
        ],
        letraNoRequerido: [
            v => {
                if (v == undefined) return true;
                if (v.length == 0) return true;
                if (/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v)) {
                    return true;
                } else {
                    return 'Solo letras';
                }
            }
        ],
        contraseña: [
            v => !!v || 'Contraseña requerida',
            v => v.length >= 8 || 'Cantidad minima es de 8 caracteres',
        ],
        celular: [
            v => !!v || 'Numero celular no valido',
            v => {
                if (!isNaN(v)) return true;
                return "No es un numero";
            },
            v => v.length >= 10 || 'Cantidad minima es de 10 digitos'

        ],
        minimoLetras: [
            v => !!v || 'Requerido',
            v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || 'Solo letras',
            v => v.length >= 3 || 'Cantidad minima es de 3 caracteres',
        ],
        email: [
            v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Correo no valido ',
        ],
        rfc: [
            v => !!v || 'RFC requerido',
            v => /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/.test(v) || 'No cumple con el formato de rfc',
            v => v.length <= 13 || 'Caracteres maximos son 12 o 13',
            v => v.length >= 12 || 'Caracteres minima es de 12',
        ],
        cp: [
            v => !!v || 'Cp requerido',
            v => !isNaN(v) || 'Solo numeros',
            v => v.length >= 5 || 'Cantidad minima es de 5 caracteres',
            v => v.length <= 6 || 'Cantidad minima es de 6 caracteres',
        ],

    }),
      created() {
            this.id = this.empresa.id;
            this.nombre = this.empresa.nombre;
            this.descripcion = this.empresa.descripcion;
            this.estatus = this.empresa.estatus;
            this.urlImagen = this.empresa.imagen;
    },
    methods: {
        NuevoSistema() {
            if (this.$refs.form.validate()) {
                console.log("--------------------");
                this.barraActiva = true;
                var data = new FormData();
                //Añadimos la imagen seleccionada

                //Añadimos el método PUT dentro del formData
                data.append('id', this.id);
                data.append('nombre', this.nombre);
                data.append('descripcion', this.descripcion);
                data.append('estatus', this.estatus);
                data.append('imagenFile', this.imagen);
                data.append('_method', 'PUT');

                axios.post('/api/sistemas/editar', data)
                    .then(response => {
                        console.log(response);
                        this.mostrarNoificacion("Editada la Sistema", false);
                        this.barraActiva = false;
                        this.cerrarDialogo.value = false;
                        this.$refs.form.resetValidation();
                        this.$emit("Guardado")
                    }).catch(error => {
                        this.mostrarNoificacion("No es posible guardar el sistema", true);
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
