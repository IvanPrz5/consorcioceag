<template>
  <v-card max-width="95%" class="mx-auto" elevation="13">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5" align="center">
          <h2>Captura de Egreso {{ anio }}</h2>
        </v-list-item-title>
        <v-list-item-subtitle align="center"> </v-list-item-subtitle>

        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col md="6" cols="12">
                <h3 align="center" class="mt-6">Cargar Xml de Factura</h3>
              </v-col>
              <v-col md="6" cols="12">
                <v-checkbox v-model="checkbox" label="Sin Xml" @change="muestra"></v-checkbox>
                <v-file-input v-if="checkbox == false" @change="cargarXml" accept=".xml" placeholder="Cargar Factura"
                  prepend-icon="mdi-xml" label="Subir Xml de faturacion" show-size></v-file-input>
              </v-col>
              <v-col v-if="mostrarDatosXml || checkbox == true" cols="12">
                <v-combobox :items="prodServItems" label="Producto ó Servicio" v-model="prodServCb" :rules="nameRules"
                  required dense></v-combobox>
                <v-combobox v-if="prodServCb == 'PRODUCTO'" :items="prodItems" label="Selecciona" v-model="prodCb"
                  :rules="nameRules" required dense></v-combobox>
                <v-combobox v-if="prodServCb == 'SERVICIO'" :items="servItems" label="Selecciona" :rules="nameRules"
                  required v-model="servCb" dense></v-combobox>
                <v-text-field v-if="servCb == 'OTROS' || prodCb == 'OTROS'" v-model="asunto"
                  label="Ingresa la descripcion" :rules="nameRules" required dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <div v-if="mostrarDatosXml || checkbox == true">
                  <v-row>
                    <v-col md="6" cols="12">
                      <h3 class="blue--text text-center">No. Oficio</h3>
                      <v-text-field v-model="numOficio" label="No. Oficio" outlined dense :rules="nameRules"
                        required></v-text-field>

                      <h3 class="blue--text text-center">EMISOR</h3>
                      <h4>
                        NOMBRE EMISOR :
                        <strong v-if="checkbox == false" class="red--text text--lighten-1">
                          {{ egresoXml.emisorNombre }}
                        </strong>
                        <v-text-field v-else style="color: red" class="my-text-style text--lighten-1"
                          v-model="emisorNombreSinXml" :rules="nameRules" required outlined dense></v-text-field>
                      </h4>
                      <h4>
                        RFC EMISOR :
                        <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.emisorRfc
                          }}</strong>
                        <v-text-field v-if="checkbox == true" class="my-text-style text--lighten-1"
                          v-model="emisorRfcSinXml" :rules="nameRules" required outlined dense></v-text-field>
                      </h4>
                      <br />
                      <h3 class="blue--text text-center">RECEPTOR</h3>
                      <h4>
                        NOMBRE :
                        <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.receptorNombre
                          }}</strong>
                        <v-text-field v-else class="my-text-style text--lighten-1" v-model="receptorNombreSinXml"
                          :rules="nameRules" outlined required dense></v-text-field>
                      </h4>
                      <h4>
                        RFC :
                        <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.receptorRfc
                          }}</strong>
                        <v-text-field v-else class="my-text-style text--lighten-1" v-model="receptorRfcSinXml" outlined
                          :rules="nameRules" dense required></v-text-field>
                      </h4>
                      <br />
                      <h3 class="blue--text text-center">DATOS GENERALES</h3>
                      <br />
                      <h4>
                        TOTAL:
                        <strong v-if="checkbox == false" class="red--text text--lighten-1">
                          {{ egresoXml.total }}
                        </strong>
                        <v-text-field v-else class="my-text-style text--lighten-1" v-model="totalSinXml" outlined
                          :rules="nameRules" dense required></v-text-field>
                      </h4>
                      <h4 v-if="checkbox == false">
                        FECHA :
                        <strong class="red--text text--lighten-1">{{
                          egresoXml.fechaFactura
                        }}</strong>
                      </h4>
                      <h4 v-if="checkbox == false">
                        UUID :
                        <strong class="red--text text--lighten-1">{{
                          egresoXml.uuid
                        }}</strong>
                      </h4>
                    </v-col>
                    <v-col md="6" cols="12">
                      <h3 class="blue--text text-center">AUTORIZO</h3>

                      <v-combobox :items="organigramaItems" label="Autorizo" outlined dense item-text="descripcion"
                        item-value="nombre" v-model="autorizo" :rules="nameRules" required></v-combobox>

                      <h4>
                        NOMBRE :<strong class="red--text text--lighten-1">{{
                          autorizo.nombre
                        }}</strong>
                      </h4>
                      <br />
                      <h4>
                        CARGO :
                        <strong class="red--text text--lighten-1">{{
                          autorizo.descripcion
                        }}</strong>
                      </h4>

                      <h3 class="blue--text text-center">SOLICITO</h3>
                      <v-combobox :items="organigramaItems" label="Autorizo" outlined dense item-text="descripcion"
                        item-value="nombre" v-model="solicito" :rules="nameRules" required></v-combobox>

                      <h4>
                        NOMBRE :<strong class="red--text text--lighten-1">{{
                          solicito.nombre
                        }}</strong>
                      </h4>
                      <br />
                      <h4>
                        CARGO :
                        <strong class="red--text text--lighten-1">{{
                          solicito.descripcion
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

                      <v-text-field label="Persona Moral" v-model="personaMoral" 
                        :rules="nameRules" required></v-text-field>
                        
                      <v-text-field label="Representante Legal" v-model="representanteLegal"
                        :rules="nameRules" required></v-text-field>
                    </v-col>

                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Descripcion" rows="5" counter shaped
                        v-model="egresoXml.descripcion" :rules="nameRules" required></v-textarea>
                    </v-col>
                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Finalidad" rows="5" counter shaped v-model="egresoXml.destino"
                        :rules="nameRules" required></v-textarea>
                    </v-col>
                    <v-col md="6" cols="12">
                      <v-textarea filled auto-grow label="Financiamiento" rows="5" v-model="ramo" counter
                        :rules="nameRules" shaped required></v-textarea>
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
  props: ["anio"],
  props: ["cerrarDialogo"],
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,

    time: "10:00",
    menu2: false,
    modal2: false,

    valid: true,
    checkbox: false,
    archivo: null,
    mostrarDatosXml: false,
    organigramaItems: "",
    empresa: null,
    autorizo: "",
    solicito: "",

    arrayCantidad: [],
    arrayDescripcion: [],
    arrayImporte: [],

    xmlConcepto: [],

    objectXml: {},

    numOficio: "",
    personaMoral: "",
        representanteLegal: "",

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
      ramo: "",
      asunto: "",
      numOficio: "",

      personaMoral: "",
        representanteLegal: "",
        fechaLlegada: "",

      estatus: true,
    },
    prodServItems: ["SERVICIO", "PRODUCTO"],
    servItems: [
      "MANTENIMIENTO",
      "CONTABILIDAD",
      "TRANSPORTE",
      "ALQUILER",
      "OTROS",
    ],
    prodItems: [
      "ARTICULOS DE LIMPIEZA",
      "ENERGIA ELECTRICA",
      "COMBUSTIBLE",
      "REFACCIONES",
      "OTROS",
    ],
    prodServCb: null,
    servCb: null,
    prodCb: null,
    descripcionOtros: "",
    totalSinXml: "",
    emisorRfcSinXml: "",
    emisorNombreSinXml: "",
    receptorRfcSinXml: "",
    receptorNombreSinXml: "",
    asunto: "",
    ramo: "",
    nameRules: [(v) => !!v || "Requerido"],
    numberRules: [(v) => /^[0-9]*(\.[0-9]+)?$/.test(v) || "Solo numeros"],
  }),

  created() {
    this.empresa = JSON.parse(localStorage.getItem("_empresa"));
    this.organigrama();
  },
  mounted() {
  },
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
            this.egresoXml.descripcion = response.data.concepto;
            this.numOficio = response.data.numOficio;

            this.anio = new Date(response.data.fecha).getFullYear(); // deacuerdo a la fecha del xml coloca el organigrama

            this.arrayCantidad = response.data.arrayCantidad;
            this.arrayDescripcion = response.data.arrayDescripcion;
            this.arrayImporte = response.data.arrayImporte;

            this.personaMoral = response.data.emisorNombre;

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
        this.egresoXml.total = this.egresoXml.total.replace(",", "");
        if (this.checkbox == true) {
          this.egresoXml.emisorRfc = this.emisorRfcSinXml;
          this.egresoXml.emisorNombre = this.emisorNombreSinXml;
          this.egresoXml.receptorRfc = this.receptorRfcSinXml;
          this.egresoXml.receptorNombre = this.receptorNombreSinXml;
          this.egresoXml.total = this.totalSinXml.replace(",", "");
          this.egresoXml.fechaFactura = this.formatDate();
          this.egresoXml.uuid = "SIN UUID";
        }

        if (this.prodServCb == "SERVICIO" && this.servCb != "OTROS") {
          this.egresoXml.asunto = this.servCb;
        }
        if (this.prodServCb == "PRODUCTO" && this.prodCb != "OTROS") {
          this.egresoXml.asunto = this.prodCb;
        }
        if (this.servCb == "OTROS" || this.prodCb == "OTROS") {
          this.egresoXml.asunto = this.asunto;
        }

        this.egresoXml.autorizo = this.autorizo.nombre;
        this.egresoXml.ramo = this.ramo;

        this.egresoXml.autorizo = this.autorizo.nombre;
        this.egresoXml.autorizoNombre = this.autorizo.descripcion;
        this.egresoXml.solicito = this.solicito.nombre;
        this.egresoXml.solicitoNombre = this.solicito.descripcion;

        this.egresoXml.numOficio = this.numOficio;

        console.log(this.egresoXml);


        this.egresoXml.fechaLlegada = this.time + "T"  + this.date;

        this.egresoXml.personaMoral = this.personaMoral;
        this.egresoXml.representanteLegal = this.representanteLegal;

        this.mostrarDatosXml = false;
        this.checkbox = false;

        axios
          .post("/api/egresos/agregarEgresoXml", this.egresoXml)
          .then((response) => {
            //Agregando conceptps de Xml
            this.agregarConceptos(response.data.id);

            this.cerrarDialogo.value = false;
            this.$emit("Guardado");
          })
          .catch((error) => {
            console.log("error de carga organigrama");
          });
      }
    },
    organigrama() {
      if (this.anio == undefined) {
        this.anio = localStorage.getItem("año");
      }
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
      axios
        .get("/api/organigramaActivo/" + updateAño + "/" + this.empresa.id)
        .then((response) => {
          this.organigramaItems = response.data;
        })
        .catch((error) => {
          console.log("error de carga organigrama");
        });
    },
    sinXml() {
      console.log("Mostrar Xml");
    },
    cambia() {
      console.log(this.textCombobox.descripcion);
    },
    formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    muestra() {
      if (this.checkbox) {
        let emp = JSON.parse(localStorage.getItem("_empresa"));
        this.emisorNombreSinXml = emp.nombreNominativo;
        this.emisorRfcSinXml = emp.rfc;
        //this.emisorNombreSinXml = emp.nombreNominativo;
      }
    },

    agregarConceptos(idCreatedXml) {
      for (let i = 0; i < this.arrayCantidad.length; i++) {
        this.xmlConcepto.push({
          cantidad: this.arrayCantidad[i],
          descripcion: this.arrayDescripcion[i],
          importe: this.arrayImporte[i],
          idXmlEgreso: idCreatedXml,
        });
      }

      console.log(this.xmlConcepto);

      axios
        .post("/api/guardarXmlConcepto", this.xmlConcepto)
        .then((response) => {
          this.xmlConcepto = [];
        })
        .catch((e) => {
          console.log("Fatal " + e);
        });
    },
  },
};
</script>

<style scoped>
.my-text-style>>>.v-text-field__slot input {
  color: #f44336;
}
</style>
