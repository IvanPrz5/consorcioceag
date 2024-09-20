<template>
  <v-card max-width="95%" class="mx-auto" elevation="13">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5" align="center">
          <h2>Edicion de Egreso {{ anio }}</h2>
        </v-list-item-title>
        <v-list-item-subtitle align="center"> </v-list-item-subtitle>

        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col md="6" cols="12">
                <h3 align="center" class="mt-6">Cargar Xml de Factura</h3>
              </v-col>
              <v-col cols="12">
                <!-- <v-combobox :items="prodServItems" label="Producto ó Servicio" v-model="prodServCb" dense></v-combobox> -->
                <!-- <v-combobox v-if="prodServCb == 'PRODUCTO'" :items="prodItems" label="Selecciona" v-model="prodCb"
                dense></v-combobox> -->
                <!-- <v-combobox :items="prodServItems == 'PRODUCTO' ? servItems : prodItems" label="Selecciona" v-model="servCb" dense></v-combobox> -->
                <v-text-field v-model="egresoEntrada.asunto" label="Ingresa la descripcion" :rules="nameRules" required
                  dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <div>
                  <v-row>
                    <v-col md="6" cols="12">
                      <h3 class="blue--text text-center">No. Oficio</h3>
                      <v-text-field v-model="egresoEntrada.numOficio" label="No. Oficio" outlined dense
                        :rules="nameRules" required></v-text-field>

                      <h3 class="blue--text text-center">EMISOR</h3>
                      <h4>
                        RFC EMISOR :<strong class="red--text text--lighten-1">{{
                          egresoEntrada.emisorRfc
                          }}</strong>
                      </h4>
                      <h4>
                        NOMBRE EMISOR :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.emisorNombre
                          }}</strong>
                      </h4>
                      <br />
                      <h3 class="blue--text text-center">RECEPTOR</h3>
                      <h4>
                        RFC :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.receptorRfc
                          }}</strong>
                      </h4>
                      <h4>
                        NOMBRE :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.receptorNombre
                          }}</strong>
                      </h4>
                      <br />
                      <h3 class="blue--text text-center">DATOS GENERALES</h3>

                      <br />
                      <h4>
                        TOTAL:
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.total
                          }}</strong>
                      </h4>
                      <h4>
                        FECHA :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.fechaFactura
                          }}</strong>
                      </h4>
                      <h4>
                        UUID :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.uuid
                          }}</strong>
                      </h4>
                    </v-col>
                    <v-col md="6" cols="12">
                      <h3 class="blue--text text-center">AUTORIZO</h3>

                      <v-combobox :items="organigramaItems" label="Autorizo" outlined dense item-text="descripcion"
                        item-value="nombre" v-model="autorizo" @change="cambioAutorizo" :rules="nameRules"
                        required></v-combobox>

                      <h4>
                        NOMBRE :<strong class="red--text text--lighten-1">{{
                          egresoEntrada.autorizo
                          }}</strong>
                      </h4>
                      <br />
                      <h4>
                        CARGO :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.autorizoNombre
                          }}</strong>
                      </h4>

                      <h3 class="blue--text text-center">SOLICITO</h3>
                      <v-combobox :items="organigramaItems" label="Autorizo" outlined dense item-text="descripcion"
                        item-value="nombre" v-model="solicito" @change="cambioSolicito" :rules="nameRules"
                        required></v-combobox>

                      <h4>
                        NOMBRE :<strong class="red--text text--lighten-1">{{
                          egresoEntrada.solicito
                          }}</strong>
                      </h4>
                      <br />
                      <h4>
                        CARGO :
                        <strong class="red--text text--lighten-1">{{
                          egresoEntrada.solicitoNombre
                          }}</strong>
                      </h4>


                      <br />
                      <h3 class="blue--text text-center">
                        DATOS DEL PROVEEDOR
                      </h3>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-menu ref="menuTime" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                            min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="time" label="Hora de llegada"
                                prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs"
                                v-on="on"></v-text-field>
                            </template>
                            <v-time-picker v-if="menu2" v-model="time" full-width
                              @click:minute="$refs.menuTime.save(time)" :rules="nameRules" required></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="date" label="Fecha de llegada" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on" :rules="nameRules" required></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn text color="primary" @click="$refs.menu.save(date)">
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>

                      <v-text-field label="Persona Moral" v-model="egresoEntrada.personaMoral" 
                        :rules="nameRules" required></v-text-field>
                      <v-text-field label="Representante Legal" v-model="egresoEntrada.representanteLegal"
                        :rules="nameRules" required></v-text-field>


                    </v-col>

                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Descripcion" rows="5" counter shaped
                        v-model="egresoEntrada.descripcion" :rules="nameRules" required></v-textarea>
                    </v-col>
                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Finalidad" rows="5" counter shaped
                        v-model="egresoEntrada.destino" :rules="nameRules" required></v-textarea>
                    </v-col>
                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Financiamiento" rows="5" counter shaped
                        v-model="egresoEntrada.ramo" :rules="nameRules" required></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="success" @click="guardarXml">Guardar</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["cerrarDialogo", "egresoEntrada", "anio"],
  data: () => ({


    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,

    time: "10:00",
    menu2: false,
    modal2: false,

    archivo: null,
    mostrarDatosXml: false,
    organigramaItems: "",
    empresa: null,
    autorizo: "",
    solicito: "",
    egresoXml: {
      idEmpresa: JSON.parse(localStorage.getItem("_empresa")).id,
      emisorRfc: "",
      emisorNombre: "",
      receptorRfc: "",
      receptorNombre: "",
      total: "",
      fechaFactura: "",
      uuid: "",
      descripcion: "",
      destino: "",
      autorizo: "",
      autorizoNombre: "",
      solicito: "",
      solicitoNombre: "",

      fechaLlegada: "",


      ramo: "",
      asunto: "",
      estatus: true,
    },
    prodServItems: ["SERVICIO", "PRODUCTO"],
    servItems: ["CONTABILIDAD", "ENERGIA ELECTRICA", "OTROS"],
    prodItems: ["COMBUSTIBLE", "REFACCIONES", "OTROS"],
    prodServCb: null,
    servCb: null,
    prodCb: null,
    asunto: "",
    nameRules: [
      v => !!v || 'Requerido',
    ],
  }),

  created() {
    this.empresa = JSON.parse(localStorage.getItem("_empresa"));
    this.organigrama();
  },
  mounted() { },
  methods: {
    cargarXml(archivos) {
      try {
        var data = new FormData();
        data.append("xml", archivos);

        axios
          .post("/api/xmlArray", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((response) => {
            this.archivo = response.data;
            this.mostrarDatosXml = true;
            this.egresoXml.emisorRfc = response.data.emisorRfc;
            this.egresoXml.emisorNombre = response.data.emisorNombre;
            this.egresoXml.receptorRfc = response.data.receptorRfc;
            this.egresoXml.receptorNombre = response.data.receptorNombre;
            this.egresoXml.total = response.data.total;
            this.egresoXml.fechaFactura = response.data.fechaFactura;
            this.egresoXml.uuid = response.data.uuid;
            this.egresoXml.fechaFactura = response.data.fecha;
            this.egresoXml.asunto = response.data.asunto;
            this.egresoXml.ramo = response.data.ramo;

            this.anio = new Date(response.data.fecha).getFullYear(); // deacuerdo a la fecha del xml coloca el organigrama
            this.organigrama();
          })

          .catch((error) => {
            console.log(error);
            this.mostrarDatosXml = false;
          });
      } catch (error) {
        this.carga = false;
        console.log(error);
      }
    },

    guardarXml() {
      let valid = this.$refs.form.validate();
      if (valid) {
        this.egresoXml.autorizo = this.autorizo.nombre;
        this.egresoXml.autorizoNombre = this.autorizo.descripcion;
        this.egresoXml.solicito = this.solicito.nombre;
        this.egresoXml.solicitoNombre = this.solicito.descripcion;
        this.egresoXml.total = this.egresoXml.total.replace(",", "");

        this.egresoXml.fechaLlegada = this.time + "T"  + this.date;
        
        axios
          .post("/api/egresos/editarEgresoXml", this.egresoEntrada)
          .then((response) => {
            //  console.log("Guardado ");
            this.cerrarDialogo.value = false;
            this.$emit("Guardado");
          })
          .catch((error) => {
            console.log("error de carga organigrama");
          });
      }

    },
    organigrama() {
      // this.anio = año;
      axios
        .get("/api/organigramaActivo/" + this.anio + "/" + this.empresa.id)
        .then((response) => {
          this.organigramaItems = response.data;
        })
        .catch((error) => {
          console.log("error de carga organigrama");
        });
    },
    actualizarAño(updateAño) {
      console.log(updateAño);
      axios
        .get("/api/organigramaActivo/" + updateAño + "/" + this.empresa.id)
        .then((response) => {
          this.organigramaItems = response.data;
        })
        .catch((error) => {
          console.log("error de carga organigrama");
        });
    },
    cambioSolicito() {
      // console.log(this.solicito);

      this.egresoEntrada.solicito = this.solicito.nombre;
      this.egresoEntrada.solicitoNombre = this.solicito.descripcion;
    },
    cambioAutorizo() {
      // console.log(this.solicito);

      this.egresoEntrada.autorizo = this.autorizo.nombre;
      this.egresoEntrada.autorizoNombre = this.autorizo.descripcion;
    },
  },
};
</script>
