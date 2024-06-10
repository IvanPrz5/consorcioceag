<template>
<v-app>
    <menudrawer></menudrawer>
    <v-app-bar color="ceagAzul_3" dark app>
        <v-btn  v-if="$store.state.sesion"   @click="$store.state.menuMostrar = !$store.state.menuMostrar" text>
            <v-icon >
                mdi-menu
            </v-icon>
        </v-btn>
        <router-link :to="{ name: 'inicio'}">
            <v-img max-height="400" max-width="150" src="../img/ceag blanco.png" :to="{ name: 'inicio' }"></v-img>
        </router-link>

        <v-toolbar-title color="black"> </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn v-if="$store.state.sesion" color="ceagAnaranjado" :to="{ name: 'SeleccionEmpresas' }"  text>
            CAMBIAR DE SISTEMA
        </v-btn>


        <v-btn v-if="$store.state.sesion" color="red" :to="{ name: 'inicio' }" @click="salir" text>
            Cerrar Sesion
        </v-btn>
        <v-btn v-else ma-2 color="white" :to="{ name: 'login' }" text>
            Iniciar sesión
        </v-btn>

    </v-app-bar>

    <v-main background-color="primary">
        <v-container  color="red" >
            <router-view>
            </router-view>
        </v-container>
    </v-main>

</v-app>
</template>

<script>
import LoginVue from './login/Login.vue'
export default {
    data() {
        return {

        }
    },
    methods: {

        salir() {

            axios.post('/api/logout', {
                email: this.email,
                password: this.password
            }).then(response => {

                localStorage.setItem("token", '');
                this.$store.commit("setUser", {});
                this.$store.commit("setEmpresa", {});
                this.$store.commit("setSistema", {});

                this.$store.commit("setAutentification", false);
                this.$store.commit("setMenuMostrar", false);

                this.$router.replace('');

            }).catch(error => {
                console.log('=(');
            });

        }
    }

}
</script>
