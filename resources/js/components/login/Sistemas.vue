<template>
    <div>

        <div v-if="sistemas != []">

            <v-container>


                <v-col v-for="sistema in sistemas" :key="sistema.id" xs="12">
                    <v-card class="mx-auto my-12" max-width="374" outlined @click="Menu(sistema)">

                        <v-img v-if="sistema.imagen.length < 2" contain height="250"></v-img>
                        <v-img v-if="sistema.imagen.length > 2" contain height="250"></v-img>


                        <v-card-title class="">{{ sistema.nombre }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">


                                <div class="grey--text ms-4">
                                    {{ sistema.descripcion }}
                                </div>
                            </v-row>


                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-title>Selecioname</v-card-title>
                    </v-card>


                </v-col>

            </v-container>

        </div>
        <div v-if="sistemas == null">
            <h1 align="center" justify="center">NO TIENE ASIGNADO NINGUN SISTEMA , VERIFICAR SON EL ADMINISTRADOR</h1>
            <v-img contain height="500"></v-img>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            sistemas: [],
        }

    },
    mounted() {
        // invocar los métodos
        this.allSistemas();
    },
    methods: {
        allSistemas() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
            axios.get('/api/allSistemas/' + this.$store.state.user.id + '/' + this.$store.state.empresa.id).then(response => {
                this.sistemas = response.data;

                if (this.sistemas.length == 1) {

                    this.Menu(this.sistemas[0]);

                } else if (this.sistemas.length == 0) {
                    this.sistemas = null;
                    this.$store.commit("setMenu", null);

                    this.$store.commit("setMenuMostrar", false);


                }

            }).catch(error => {
                this.sistemas = null;
            });

        },
        Menu(sistema) {
            this.$store.state.sistema = sistema;
            localStorage.setItem('_sistema', JSON.stringify(sistema)); // para manjarlo local stor3e
            this.$store.commit("setMenuMostrar", true);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
            axios.post('/api/menu/' + this.$store.state.user.id + '/' + sistema.id,)
                .then(response => {

                    this.$store.commit("setMenu", response.data);
                    localStorage.setItem('_menu', JSON.stringify(response.data)); // para manjarlo local stor3e
                }).catch(error => {
                    this.$store.commit("setMenu", null);
                });





            this.$router.replace('principal');
        },

    }
}
</script>
