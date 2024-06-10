<template>
  <div>
        <v-card max-width="60%" class="mx-auto" elevation="13">
        <v-list-item two-line>
            <v-list-item-content>
            <v-list-item-title class="text-h5" align="center">
                <p>Organigrama de Autoridades</p>
            </v-list-item-title>
            <v-list-item-subtitle align="center">
                <p>{{ año }}</p>
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

      <v-divider class="mx-4"></v-divider>
      <br />
      <p align="center">Seleccione un año</p>

      <v-combobox
        small-chips
        dense
        filled
        outlined
        v-model="año"
        :items="años"
        @change="cambioDeAño()"
      ></v-combobox>

      <v-divider class="mx-4"></v-divider>
      <br />
      <p align="center">Listado de Organigrama</p>

      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-small
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="cargaOrganigramaDisponibles()"
            >Agregar Nuevo</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Nuevo Organigrama</v-toolbar>
            <v-card-text>
              <v-form ref="formNuevo" enctype="multipart/form-data">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="nombreNuevo"
                        
                        placeholder="Ingrese el nombre que aparecera en el sistema"
                        label="Nombre"
                        outlined
                        clearable
                        prepend-inner-icon="mdi-map-marker"
                        counter
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-combobox
                        small-chips
                        dense
                        filled
                        outlined
                        v-model="orgaNuevo"
                        :items="orgaTipo"
                        item-text="descripcion"
                        item-value="id"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12">

                            <p  align="center" style="color: red;"   > {{error}}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="error" @click="dialog.value = false">Close</v-btn>

              <v-btn color="primary" @click="guardarNuevo(dialog)"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <template>
        <v-data-table
          :headers="encabezado"
          :items="detalle"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="secondary"
                  dark
                  class="pr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="nombreEditarText(item.nombre)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Editar Organigrama</v-toolbar>
                  <v-card-text>
                    <v-form ref="formEditar" enctype="multipart/form-data">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="nombreEditar"
                              
                              placeholder="Ingrese el nombre que aparecera en el sistema"
                              label="Nombre"
                              outlined
                              clearable
                              prepend-inner-icon="mdi-map-marker"
                              counter
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="error" @click="dialog.value = false"
                      >Close</v-btn
                    >

                    <v-btn color="primary" @click="editarItem(dialog, item.id)"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="error"
                  dark
                  class="pr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="error " dark>Borrar Organigrama</v-toolbar>
                  <v-card-text>
                    <p>ESTA SEGURO BORRAR {{ item.nombre }}</p>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="error" @click="dialog.value = false"
                      >No</v-btn
                    >

                    <v-btn color="primary" @click="BorraItem(dialog, item.id)"
                      >Si</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-data-table>
      </template></v-card
    >
  </div>
</template>



    </v-card>



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
  data: () => ({
    año: 0, //  new Date().getUTCFullYear();
    años: [],
    detalle: [],
    notificacionValidad: false,
    notificacionError: false,
    mensajeNoificacion: "",
    orgaTipo: [],
    orgaNuevo: null,
    nombreNuevo: "",
    nombreEditar: "",
    error: "",
    encabezado: [
      { text: "Nombre", value: "nombre" },
      { text: "Cargo", value: "descripcion" },
      {
        text: "Editar",
        value: "actions",
        sortable: false,
      },
    ],
    letras: [
      (v) => !!v || "Requerido",
      (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || "Solo letras",
    ],
    letrasPunto: [
      (v) => !!v || "Requerido",
      (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ .]+$/g.test(v) || "Solo letras",
    ],
  }),
  created() {
    this.año = new Date().getUTCFullYear();
    for (var i = this.año - 5; i <= this.año; i++) {
      this.años.push(i);
    }

    this.rellenarOrganigrama();
  },
  methods: {
    rellenarOrganigrama() {
      const empresa = JSON.parse(localStorage.getItem("_empresa"));
      axios
        .get("/api/organigramaActivo/" + this.año + "/" + empresa.id)
        .then((response) => {
          this.detalle = response.data;
        })
        .catch((error) => {
          this.mostrarNoificacion("No es posible cargar de Organigrama", true);
        });
    },
    cargaOrganigramaDisponibles() {
      const empresa = JSON.parse(localStorage.getItem("_empresa"));
      axios
        .get("/api/organigramaNoAsignado/" + this.año + "/" + empresa.id)
        .then((response) => {
          this.orgaTipo = response.data;
        })
        .catch((error) => {
          this.mostrarNoificacion("No es posible cargar de Organigrama", true);
        });
    },
    cambioDeAño() {
      this.rellenarOrganigrama();
    },
    mostrarNoificacion(mensaje, esError) {
      this.mensajeNoificacion = mensaje;
      if (esError) {
        this.notificacionError = true;
      } else {
        this.notificacionValidad = true;
      }
    },

    nombreEditarText($nombre) {
      this.nombreEditar = $nombre;
    },

    guardarNuevo(dialog) {
      if (this.$refs.formNuevo.validate() && this.orgaNuevo != null) {
        const empresa = JSON.parse(localStorage.getItem("_empresa"));
        const usuario = JSON.parse(localStorage.getItem("_usuario"));


        if (typeof this.orgaNuevo.id === "undefined") {
                this.error = "POR FAVOR COLOQUE UN AÑO VALIDO"
        } else {
          axios
            .post("/api/crearOrganigramaDetalle", {
              idEmpresa: empresa.id,
              idOrganigrama: this.orgaNuevo.id,
              año: this.año,
              nombre: this.nombreNuevo,
              estatus: true,
            })
            .then((response) => {
              this.rellenarOrganigrama();
              this.orgaNuevo = null;
              this.nombreNuevo = "";
               this.error = "";

              dialog.value = false;
            })
            .catch((error) => {
                 this.error =  "NO ES POSIBLE GUARDAR EL EMPLEADO"

            });
        }
      } else {
           this.error = "Rellnar todo los datos por favro";

      }
    },
    editarItem(dialog, id) {
      if (this.$refs.formEditar.validate()) {
        axios
          .post("/api/editarOrganigramaDetalle", {
            id: id,
            nombre: this.nombreEditar,
          })
          .then((response) => {
            this.rellenarOrganigrama();
            this.nombreEditar = null;
            dialog.value = false;
          })
          .catch((error) => {
            this.mostrarNoificacion("No es posible editar  -", true);
          });
      } else {
        this.mostrarNoificacion("Rellene todos los campos por favor", true);
      }
    },
    BorraItem(dialog, id) {
      axios
        .delete("/api/borrarOrganigramaDetalle/" + id)
        .then((response) => {
          this.rellenarOrganigrama();

          dialog.value = false;
        })
        .catch((error) => {
          this.mostrarNoificacion("No es posible borrar-", true);
        });
    },
  },
};
</script>

