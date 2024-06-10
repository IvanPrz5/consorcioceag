<template>
<div>

    <div>

        <v-container>
            <v-row>

                <v-col v-for="empresa in empresas" :key="empresa.id"  xs= "12"    >
                    <v-card class="mx-auto my-4"  max-width="374"  outlined @click="sistema(empresa)">

                       <v-img  contain v-if="empresa.logo == '/'" height="250"   ></v-img>
                        <v-img contain  v-else height="250"  ></v-img>



                        <v-card-title class="">{{ empresa.nombre }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">


                                <div class="grey--text ms-4">
                                    {{ empresa.nombreNominativo }}
                                </div>

                            </v-row>

                            <div class="my-4 text-subtitle-1">
                                {{ empresa.rfc }}
                            </div>

                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-title>Selecioname</v-card-title>
                    </v-card>

                </v-col>
                <div>
                       <div v-if="empresas == null " >
                            <h1 align="center"   justify="center" >NO TIENE ASIGNADO NINGUNA EMPRESA , VERIFICAR SON EL ADMINISTRADOR</h1>
                                <v-img   contain  height="500"    ></v-img>
                        </div>
                </div>


            </v-row>
        </v-container>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            empresas: []
        }

    },
    created(){
     // invocar los métodos
      this.allEmpresas();

    },
    methods: {
        allEmpresas() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
            axios.get('/api/allEmpresas/'+this.$store.state.user.id).then(response => {

                this.empresas = response.data;

                if(this.empresas.length == 1){
                    this.sistema(this.empresas[0]);
                }else if (this.empresas.length == 0){
                          this.empresas = null ;

                }


            }).catch(error => {
                this.empresas = null ;
            });

        },
        sistema(empresa){

                    this.$store.state.empresa = empresa;
                    console.log( empresa  )
                    localStorage.setItem('_empresa', JSON.stringify( empresa )); // para manjarlo local stor3e
                    this.$router.replace('SeleccionSistemas');

        },

    },

}
</script>
