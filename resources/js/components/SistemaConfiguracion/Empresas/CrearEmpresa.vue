<template>
<v-form ref="form" enctype="multipart/form-data">

    <v-container>
        <v-row>

            <v-col cols="12">
                <v-text-field v-model="empresa.nombre" :rules="letrasYnumeros" placeholder="Ingrese el nombre que aparecera en el sistema" label="Nombre" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="6">
                <template>
                    <v-file-input @change="cargarLogoEmpresa" accept="image/png, image/jpeg, image/bmp" placeholder="Suba su logo de su empresa" prepend-icon="mdi-camera" label="Logo de la empresa"></v-file-input>
                </template>
            </v-col>

            <v-col cols="12" md="6">

                <v-avatar v-if="urlLogo != null " class="profile" color="grey" size="164" tile>
                    <v-img v-if="urlLogo" :src="urlLogo"></v-img>
                </v-avatar>

            </v-col>

            <v-col cols="12" md="8">
                <v-text-field v-model="empresa.nombreNominativo" :rules="minimoLetras"  placeholder="Ingresar el nombre nominativo para la facturacion" label="Nombre Nominativo" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.rfc" :rules="rfc" label="Rfc" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>
            <v-col cols="12" md="8">
                <v-text-field v-model="empresa.calle" :rules="letrasYnumeros" label="Calle" outlined clearable prepend-inner-icon="mdi-map-marker" counter></v-text-field>

            </v-col>
            <v-col cols="12" md="2">
                <v-text-field v-model="empresa.numExt" :rules="letrasYnumeros" label="Numero Exterior" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>
            <v-col cols="12" md="2">
                <v-text-field v-model="empresa.numInt" :rules="letrasYnumeros" label="Numero Interior" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.agencia" :rules="letras" label="Agencia" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.colonia" :rules="letras" label="Colonia" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.municipio"  :rules="letras" label="municipio" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.distrito"  :rules="letras" label="distrito" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field v-model="empresa.estado"  :rules="letras" label="Estado" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="2" sm="0">

            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="empresa.cp" :rules="cp" label="Cp" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <template>
                    <v-file-input @change="cargarCer" accept=".cer" placeholder="Suba su .Cer del SAT" prepend-icon="mdi-camera" label="Cer"></v-file-input>
                </template>

            </v-col>

            <v-col cols="12" md="4">
                <template>
                    <v-file-input @change="cargarKey"  accept=".key" placeholder="Suba su .Key del SAT" prepend-icon="mdi-camera" label="key"></v-file-input>
                </template>

            </v-col>

            <v-col cols="12" md="4">

                <v-text-field  v-if="key != null"   :rules="letrasYnumeros"  v-model="empresa.passwordKey" prepend-inner-icon="mdi-account-key" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña del .key" hint="Minimo de 8 Caracteres" counter @click:append="show1 = !show1" required>
                </v-text-field>

            </v-col>

            <v-col cols="12" md="6" sm="4">
                <v-text-field v-model="empresa.celular" :rules="celular" label="Numero Celular" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="6" sm="4">
                <v-text-field v-model="empresa.correoElectronico" :rule="email" label="Correo Electronico" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>

            </v-col>

            <v-col cols="12" md="6" sm="4">
                <v-switch v-model="empresa.estatus" inset clearable></v-switch>

            </v-col>

        </v-row>

        <v-btn color="ceagAzul" @click="NuevaEmpresa">
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
    props: ["cerrarDialogo"],
    data: () => ({

        empresa: {
            nombre: '',
            nombreNominativo: '',
            rfc: '',
            calle: '',
            numExt: '',
            numInt: '',
            agencia: '',
            colonia: '',
            municipio: '',
            distrito: '',
            estado: '',
            cp: '',
            logo: null,
            cer: null,
            key: null,
            passwordKey: '',
            celular: '',
            correoElectronico: '',
            estatus: true

        },
        logo: null,
        cer: null,
        key: null,
        barraActiva: false,
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        urlLogoEmpresa: null,
        urlLogo: null,
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
            v=> !!v || 'RFC requerido',
            v=> /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/.test(v)  || 'No cumple con el formato de rfc',
            v => v.length <= 13 || 'Caracteres maximos son 12 o 13',
            v => v.length >= 12 || 'Caracteres minima es de 12',
        ],
        cp: [
            v=> !!v || 'Cp requerido',
            v=> !isNaN(v) || 'Solo numeros',
             v => v.length >=5 || 'Cantidad minima es de 5 caracteres',
             v => v.length <= 6 || 'Cantidad minima es de 6 caracteres',
        ],



    }),
    methods: {
        NuevaEmpresa() {
            if (this.$refs.form.validate()) {
                console.log("--------------------");
                this.barraActiva = true;
                var data = new FormData();
                //Añadimos la imagen seleccionada
                //   data.append('empresa', this.empresa);
                data.append('logoArchivo', this.logo);
                data.append('cerArchivo', this.cer);
                data.append('keyArchivo', this.key);

                //Añadimos el método PUT dentro del formData
                // Como lo hacíamos desde un formulario simple _(no ajax)_

                data.append('nombre', this.empresa.nombre);
                data.append('nombreNominativo', this.empresa.nombreNominativo);
                data.append('rfc', this.empresa.rfc);
                data.append('calle', this.empresa.calle);
                data.append('numExt', this.empresa.numExt);
                data.append('numInt', this.empresa.numInt);
                data.append('agencia', this.empresa.agencia);
                data.append('colonia', this.empresa.colonia);
                data.append('municipio', this.empresa.municipio);
                data.append('estado', this.empresa.estado);
                data.append('distrito', this.empresa.distrito);
                data.append('cp', this.empresa.cp);
                data.append('logo', '');
                data.append('cer', '');
                data.append('key', '');
                data.append('passwordKey', this.empresa.passwordKey);
                data.append('celular', this.empresa.celular);
                data.append('correoElectronico', this.empresa.correoElectronico);
                data.append('estatus', this.empresa.estatus);

                data.append('_method', 'PUT');
                axios.post('/api/Empresa/nueva', data)
                    .then(response => {
                        console.log(response);
                        this.mostrarNoificacion("Nueva empresa", false);
                        this.barraActiva = false;
                        this.cerrarDialogo.value = false;
                        this.$refs.form.resetValidation();
                        this.$emit("recargarEmpresas")
                    }).catch(error => {
                        this.mostrarNoificacion("No es posible guardar la empresa", true);
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
        cargarLogoEmpresa(archivo) {

            if (archivo != null) {
                this.logo = archivo; // event.target.files[0];

                let reader = new FileReader()

                reader.addEventListener("load", function () {
                    this.showPreview = true;
                    this.urlLogo = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(this.logo)

            } else {
                this.logo = null
                this.urlLogo = null

            }

        },
        cargarCer(archivo) {
             if (archivo != null) {
            this.cer = archivo; // event.target.files[0];
             } else{
                 this.cer = null ;
             }
        },
        cargarKey(archivo) {
            if (archivo != null) {
            this.key = archivo; // event.target.files[0];
            } else{
                this.key = null ;
             }
        }

    }

}
</script>
