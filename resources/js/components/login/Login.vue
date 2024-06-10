<template>
    <v-card max-width="40%" class="mx-auto mt-10" elevation="13" color="gris">

        <v-card-title class="pa-4 mx-auto">

            <span class="mx-auto  text-md-h2 text-lh-h1" color="ceagNaranja">Iniciar Session</span>
        </v-card-title>

        <v-divider class="mx-4"></v-divider>
        <br>
        <v-form ref="form">


            <v-text-field class="px-15" v-model="email" label="Correo electronico" :rules="reglas.email" outlined
                prepend-inner-icon="mdi-email">

            </v-text-field>

            <v-text-field class="px-15" v-model="password" :rules="reglas.contraseña"
                prepend-inner-icon="mdi-account-key" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="Minimo de 8 Caracteres"
                counter @click:append="show1 = !show1">

            </v-text-field>

            <v-card-text>

            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <router-link :to="{ name: 'CrearUsuario' }">
                    <p>Crear Usuario</p>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="iniciaSesion">
                    Iniciar Session
                </v-btn>

            </v-card-actions>
        </v-form>
        <v-snackbar :timeout="1500" :value="true" v-model="notificacion" color="red" absolute top shaped
            transition="scroll-y-transition">
            {{ mensajeError }}
        </v-snackbar>

    </v-card>
</template>

<script>
export default {
    data() {

        return {
            notificacion: false,
            mensajeError: '',
            show1: false,
            email: 'ceag@ceag.com',
            password: 'ceag',
            reglas: {
                contraseña: [
                    v => !!v || 'Contraseña requerida',
                    v => v.length >= 2 || 'Cantidad minima es de 8 caracteres',
                ],
                email: [
                    v => /.+@.+/.test(v) || 'Correo no valido ',
                ],
            }

        }
    },
    methods: {
        iniciaSesion: function () {

            if (this.$refs.form.validate()) {
                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    localStorage.setItem("token", response.data.token);

                    this.$store.commit("setUser", response.data.user);
                    localStorage.setItem('_usuario', JSON.stringify(response.data.user)); // para manjarlo local stor3e
                    this.$store.commit("setAutentification", true);


                    this.roles();
                    this.$router.replace("SeleccionEmpresas");

                }).catch(error => {

                    this.mensajeError = 'VERIFICAR DATOS PARA INICICA SESION';
                    this.notificacion = true;

                });

            } else {
                this.mensajeError = 'VERIFIQUE LOS DATOS';
                this.notificacion = true;

            }


        },
        roles: function () {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
            axios.get('/api/rolesUser/' + this.$store.state.user.id)
                .then(response => {
                    this.$store.commit("setRoles", response.data);
                }).catch(error => {

                    this.mensajeError = 'ERROR EN LOS ROLES DE USUARIO';
                    this.notificacion = true;

                });

        }

    }

}
</script>
