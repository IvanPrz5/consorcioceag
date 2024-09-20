<template>
  <div>
    <v-data-table :headers="headers" :items="items" class="elevation-1" :search="buscar">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>{{ titulo }} </v-toolbar-title>

          <v-text-field name="name" label="Buscar" id="id" class="pt-6 pl-6" v-model="buscar"
            append-icon="mdi-magnify"></v-text-field>

          <v-select v-if="!todoAnio" class="pt-6 pl-6" :items="meses" label="MES" item-text="mes" item-value="id"
            v-model="mes"></v-select>

          <v-select class="pt-6 pl-6" :items="años" label="AÑO" item-text="año" item-value="id"
            v-model="año"></v-select>

          <v-checkbox class="pt-6 pl-6" v-model="todoAnio" :label="'TODO EL AÑO'"></v-checkbox>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-dialog transition="scroll-y-transition" max-width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" @click="prueba">Nuevo {{ titulo }}</v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark>NUEVOS {{ titulo.toUpperCase() }} <v-spacer></v-spacer>
                  <v-btn text @click="dialog.value = false">X</v-btn>
                </v-toolbar>

                <EgresoCaptura :anio="año" ref="egresoCaptura" :cerrarDialogo="dialog" @Guardado="Guardado">
                </EgresoCaptura>

                <v-card-actions class="justify-end"> </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">ESTA SEGURO CAMBIAR ESTATUS ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="noBorrar()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="borrar()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.descripcion="{ item }">
        <div>
          {{ item.descripcion.substring(0, 10) + "...." }}
        </div>
      </template>

      <template v-slot:item.destino="{ item }">
        <div>
          {{
      " ***** DESCRIPCION ****** " +
      item.descripcion +
      " ***** FINALIDAD ****** " +
      item.destino
    }}
        </div>
      </template>

      <template v-slot:item.icono="{ item }">
        <div>
          <v-icon>
            {{ item.icono }}
          </v-icon>
        </div>
      </template>

      <template v-slot:item.solicitud="{ item }">
        <div align="center" justify="center">
          <v-btn small dark color="green" fab @click="pdfSolicitud(item.id)">
            <v-icon dark> mdi-file-pdf-box </v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:item.autorizacion="{ item }">
        <div align="center" justify="center">
          <v-btn small dark color="green" fab @click="pdfAutorizacion(item.id)">
            <v-icon dark> mdi-file-pdf-box </v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:item.recepcion="{ item }">
        <div align="center" justify="center">
          <v-btn small dark color="green" fab @click="pdfRecepcion(item.id)">
            <v-icon dark> mdi-file-pdf-box </v-icon>
          </v-btn>
        </div>
      </template>
      <!-- <template v-slot:item.recepcion="{ item }">
        <div align="center" justify="center">
          <v-btn small dark color="green" fab @click="pdfRecepcion(item.id)">
            <v-icon dark> mdi-file-pdf-box </v-icon>
          </v-btn>
        </div>
      </template> -->

      <!-- <template v-slot:item.formatos2="{ item }">
        <div align="center" justify="center">
          <v-btn color="green" v-bind="attrs" v-on="on" small fab dark class="mr-3">
            <v-icon dark> mdi-file-pdf-box </v-icon>
          </v-btn>

          <v-dialog transition="scroll-y-transition" max-width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" small fab @click="idEgreso = item.id">
                <v-icon dark> mdi-image-album </v-icon>
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark>
                  <v-file-input counter multiple show-size truncate-length="17" @change="cargaFotos"
                    accept=".jpg,.png,jfif" ref="files" label="Da clic para cargar las imaguenes"></v-file-input>

                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog.value = false">X</v-btn>
                </v-toolbar>

                <EgresoFotos ref="fotos" :idEgreso="item.id"></EgresoFotos>

                <v-card-actions class="justify-end"> </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template> -->

      <template v-slot:item.actions="{ item }" class="d-flex">
        <v-dialog max-width="1200">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="secondary" dark v-bind="attrs" v-on="on" class="pr-2">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>EDITAR {{ titulo.toUpperCase() }} {{ item.email }}
                <v-spacer></v-spacer>
                <v-btn text @click="dialog.value = false">X</v-btn>
              </v-toolbar>
              <br />
              <EgresoEditarSolicitud :cerrarDialogo="dialog" :egresoEntrada="item" @Guardado="Guardado" :anio="año">
              </EgresoEditarSolicitud>

              <v-card-actions class="justify-end"> </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-icon color="error" @click="eliminarEgreso(item)" dark class="pr-2">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionValidad" color="green" absolute top shaped
      transition="scroll-y-transition">
      {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionError" color="red" absolute top shaped
      transition="scroll-y-transition">
      {{ mensajeNoificacion }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    titulo: "EGRESO",
    meses: [],
    años: [],
    mes: null,
    año: null,
    notificacionValidad: false,
    notificacionError: false,
    colorNotificacion: "green",
    mensajeNoificacion: "",
    dialogDelete: false,
    seleccionado: {},
    todoAnio: false,
    imagenes: null,
    idEgreso: 0,

    headers: [
      {
        text: "Id",
        value: "id",
      },
      {
        text: "RFC",
        value: "receptorRfc",
      },

      {
        text: "NOMBRE",
        value: "receptorNombre",
      },

      {
        text: "FECHA FACTURCION",
        value: "fechaFactura",
      },
      {
        text: "DESCRIPCION",
        value: "destino",
      },

      {
        text: "SOLICITUD",
        value: "solicitud",
      },
      {
        text: "AUTORIZACION",
        value: "autorizacion",
      },
      {
        text: "RECEPCION",
        value: "recepcion",
      },
      /* {
        text: "FOTOGRAFICO",
        value: "formatos2",
      }, */

      {
        text: "Editar",
        value: "actions",
        sortable: false,
      },
    ],
    items: [],
    buscar: "",
  }),
  created() {
    this.apiMeses();
    this.apiAños(); // this.initialize();
  },
  watch: {
    mes: function (newMes, oldQuestion) {
      console.log(newMes + "cambio" + oldQuestion);

      if (this.año != null) {
        this.initialize();
      }
    },
    año: function (newAño, oldAño) {
      localStorage.setItem("año", this.año)

      this.initialize();
    },
    todoAnio: function (newTodo, oldTodo) {
      this.initialize();
    },
  },

  methods: {
    prueba() {
      if (this.$refs.egresoCaptura == undefined) {
      } else {
        this.$refs.egresoCaptura.actualizarAño(this.año);
      }
    },
    cargaFotos(archivos) {
      console.log("--------------------" + this.idEgreso);

      this.imagenes = archivos;

      console.log(archivos);
      try {
        var data = new FormData();
        data.append("idEgreso", this.idEgreso);

        for (var i = 0; i < this.imagenes.length; i++) {
          let file = this.imagenes[i];

          data.append("imagenes[" + i + "]", file);
          console.log("--");
        }

        //  console.log("")
        // data.append("_method", "PUT");
        axios
          .post("/api/egresos/subirImagen", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("entra ");
            this.$refs.fotos.cargarFotos();
            console.log("finaliza ");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("dsfsdf");
      }
    },

    pdfSolicitud(id) {
      this.loadingSolicitud = true;
      axios
        .get("/api/reporteEgresoSolicitud/" + id)
        .then((response) => {
          // console.log( response  )

          window.open(response.data, "_blank"); //to open in new tab
          this.loadingSolicitud = false;
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
          this.loadingSolicitud = false;
        });
      this.loadingSolicitud = false;
    },
    pdfAutorizacion(id) {
      axios
        .get("/api/reporteEgresoAutorizacion/" + id)
        .then((response) => {
          //  console.log( response  )

          window.open(response.data, "_blank"); //to open in new tab
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },
    pdfRecepcion(id) {
      axios
        .get("/api/reporteEgresoRecepcion/" + id)
        .then((response) => {
          //  console.log( response  )

          window.open(response.data, "_blank"); //to open in new tab
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },

    initialize() {
      const empresa = JSON.parse(localStorage.getItem("_empresa"));
      if (this.todoAnio) {
        axios
          .get("/api/egresos/allegresosXml/0/" + this.año + "/" + empresa.id)
          .then((response) => {
            this.items = response.data;
          })
          .catch((error) => {
            this.mostrarNoificacion(
              "No es posible cargar de " + this.titulo,
              true
            );
          });
      } else {
        axios
          .get(
            "/api/egresos/allegresosXml/" +
            this.mes +
            "/" +
            this.año +
            "/" +
            empresa.id
          )
          .then((response) => {
            this.items = response.data;
          })
          .catch((error) => {
            this.mostrarNoificacion(
              "No es posible cargar de " + this.titulo,
              true
            );
          });
      }
    },

    Guardado() {
      this.mostrarNoificacion("Guardado con exito", false);
      this.initialize();
    },

    cargarAño(año) { },
    apiMeses() {
      axios
        .get("/api/meses")
        .then((response) => {
          this.meses = response.data;
          const dateObj = new Date();

          //   para obtener el mes  en letra      const monthNameLong = dateObj.toLocaleString("es-MX", { month: "long" }).toUpperCase();
          this.mes = dateObj.getMonth() + 1;

          console.log("   mes en emes " + this.mes);
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },
    apiAños() {
      axios
        .get("/api/años")
        .then((response) => {
          this.años = response.data;

          const dateObj = new Date();

          //   para obtener el mes  en letra      const monthNameLong = dateObj.toLocaleString("es-MX", { month: "long" }).toUpperCase();
          this.año = dateObj.getFullYear();
        })
        .catch((error) => {
          this.mostrarNoificacion(
            "No es posible cargar de " + this.titulo,
            true
          );
        });
    },

    Guardado() {
      this.mostrarNoificacion("Guardado con exito", false);
      this.initialize();
    },
    usuarioEditarGuardado() {
      this.mostrarNoificacion("Editado Exitoso", false);
      this.initialize();
    },

    mostrarNoificacion(mensaje, esError) {
      this.mensajeNoificacion = mensaje;
      if (esError) {
        this.notificacionError = true;
      } else {
        this.notificacionValidad = true;
      }
    },
    cambioEstatus(item) {
      this.dialogDelete = true;
      this.seleccionado = item;
    },
    noBorrar() {
      this.initialize();
      this.dialogDelete = false;
    },
    borrar() {
      axios
        .delete("/api/menu/borrar/" + this.seleccionado.id)
        .then((response) => {
          this.dialogDelete = false;
          this.mostrarNoificacion("  ESTATUS ACTUALIZADO", false);
          this.initialize();
        })
        .catch((error) => {
          console.log("error  usuario " + error);
          this.dialogDelete = false;
          this.mostrarNoificacion("  ESTATUS  NO ACTUALIZADO", true);
          this.initialize();
        });
    },
    eliminarEgreso(item){
      axios
        .put("/api/egresos/eliminarEgreso/" + item.id)
        .then((response) => {
          console.log(response)
          this.mostrarNoificacion("SE ELIMINO", false);
          this.initialize();
        })
        .catch((error) => {
          console.log(error)
          this.initialize();
        });
    }
  },
};
</script>
