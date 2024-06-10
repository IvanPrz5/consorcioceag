<template>
<div>
    <v-form ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" md="4" sm="4">
                    <v-text-field v-model="usuarioRecibe.nombre" label="Nombre" outlined clearable prepend-inner-icon="mdi-map-marker" :rules="[ reglas.requerido , reglas.letras, reglas.cantidadMinima3 ]" counter required></v-text-field>

                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-text-field v-model="usuarioRecibe.paterno" label="Paterno" outlined clearable prepend-inner-icon="mdi-map-marker" :rules="[ reglas.requerido , reglas.letras]" counter required></v-text-field>

                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-text-field v-model="usuarioRecibe.materno" :rules="[reglas.letras]" label="Materno" outlined clearable prepend-inner-icon="mdi-map-marker" counter></v-text-field>

                </v-col>

                <v-col cols="12" md="6" sm="4">
                    <v-text-field v-model="usuarioRecibe.celular" label="Numero Celular" outlined clearable prepend-inner-icon="mdi-map-marker" :rules="[reglas.requerido , reglas.numeros]" counter required></v-text-field>

                </v-col>

                <v-col cols="12" md="6" sm="4">
                    <v-text-field v-model="usuarioRecibe.email" label="Correo Electronico" outlined clearable prepend-inner-icon="mdi-map-marker" :rules="[reglas.requerido] " counter disabled></v-text-field>

                </v-col>

                <v-col cols="12" md="6" sm="4">

                    <v-text-field v-model="usuarioRecibe.password" prepend-inner-icon="mdi-account-key" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" hint="Minimo de 8 Caracteres" counter @click:append="show1 = !show1" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="4">
                    <v-switch v-model="usuarioRecibe.estatus" inset clearable></v-switch>
                </v-col>

            </v-row>

            <v-btn color="ceagAzul" @click="EnviarEditarUsuario">
                Guardar
            </v-btn>

        </v-container>
    </v-form>

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
    props: ["usuarioRecibe", "cerrarDialogo"],

    data: () => ({
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        show1: false,

        reglas: {
            cantidadMinima3: v => v.length >= 3 || 'Cantidad minima es de 3 caracteres',
            contraseña: v => v.length >= 8 || 'Cantidad minima es de 8 caracteres',
            requerido: v => !!v || 'Campo requerido',
            email: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Correo no valido ',
            letras: v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || 'Solo letras',
            celular: v => v.length >= 10 || 'Numero celular no valido',
            numeros: v => {
                if (!isNaN(v)) return true;
                return "No es un numero";
            }
        }

    }),
    setup() {
    },
    created() {
    },
    mounted() {
    },

    methods: {

        EnviarEditarUsuario() {
            if (this.$refs.form.validate()) {
                axios.post('/api/usuariosEditar', this.usuarioRecibe)
                    .then(response => {
                        this.$refs.form.resetValidation()
                        this.$emit("usuarioEditarGuardado")
                        this.cerrarDialogo.value = false;

                    }).catch(error => {
                        this.$refs.form.resetValidation()
                        this.mostrarNoificacion('Empleado no Actualizado', true);

                    });
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

    }

}
</script>
