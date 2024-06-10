<template>
  <div>
    <v-row>
      <v-col v-for="foto in listaFotos" :key="foto.id" class="d-flex child-flex" cols="4">
        <v-img :src="foto.ruta" :lazy-src="foto.ruta" aspect-ratio="1" class="grey lighten-2">
          <v-btn color="pink" fab dark small absolute bottom left class="ma-10" :elevation="15"
            @click="borrar(foto.id)">
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>

          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["idEgreso"],
  data: () => ({
    titulo: "EGRESO",
    listaFotos: null,
  }),
  created() {
    this.cargarFotos();
    console.log("cargo la imaguen Inicio");
  },

  methods: {
    cargarFotos() {
      axios
        .get("/api/egresos/listaImagen/" + this.idEgreso)
        .then((response) => {
          this.listaFotos = response.data;
          console.log(this.listaFotos);
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },

    borrar(idFoto) {
      axios
        .delete("/api/egresos/borrarImagen/" + idFoto)
        .then((response) => {
          this.cargarFotos();
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },
  },
};
</script>
