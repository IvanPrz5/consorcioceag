<template>
  <v-card max-width="95%" class="mx-auto" elevation="13">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5" align="center">
          <h2>Captura de Egreso {{ anio }}</h2>
        </v-list-item-title>
        <v-list-item-subtitle align="center"> </v-list-item-subtitle>

        <v-container>
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
              <v-combobox :items="prodServItems" label="Producto ó Servicio" v-model="prodServCb" dense></v-combobox>
              <v-combobox v-if="prodServCb == 'PRODUCTO'" :items="prodItems" label="Selecciona" v-model="prodCb"
                dense></v-combobox>
              <v-combobox v-if="prodServCb == 'SERVICIO'" :items="servItems" label="Selecciona" v-model="servCb"
                dense></v-combobox>
              <v-text-field v-if="servCb == 'OTROS' || prodCb == 'OTROS'" v-model="asunto"
                label="Ingresa la descripcion" dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <div v-if="mostrarDatosXml || checkbox == true">
                <v-row>
                  <v-col md="6" cols="12">
                    <h3 class="blue--text text-center">EMISOR</h3>
                    <h4>
                      NOMBRE EMISOR :
                      <strong v-if="checkbox == false" class="red--text text--lighten-1">
                        {{ egresoXml.emisorNombre }}
                      </strong>
                      <v-text-field v-else style="color: red;" class="my-text-style text--lighten-1"
                        v-model="emisorNombreSinXml" outlined dense></v-text-field>
                    </h4>
                    <h4>
                      RFC EMISOR :
                      <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.emisorRfc
                        }}</strong>
                      <v-text-field v-if="checkbox == true" class="my-text-style text--lighten-1"
                        v-model="emisorRfcSinXml" outlined dense></v-text-field>
                    </h4>
                    <br />
                    <h3 class="blue--text text-center">RECEPTOR</h3>
                    <h4>
                      NOMBRE :
                      <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.receptorNombre
                        }}</strong>
                      <v-text-field v-else class="my-text-style text--lighten-1" v-model="receptorNombreSinXml" outlined
                        dense></v-text-field>
                    </h4>
                    <h4>
                      RFC :
                      <strong v-if="checkbox == false" class="red--text text--lighten-1">{{ egresoXml.receptorRfc
                        }}</strong>
                      <v-text-field v-else class="my-text-style text--lighten-1" v-model="receptorRfcSinXml" outlined
                        dense></v-text-field>
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
                        dense></v-text-field>
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
                      item-value="nombre" v-model="autorizo"></v-combobox>

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
                      item-value="nombre" v-model="solicito"></v-combobox>

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
                  </v-col>

                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Descripcion" rows="5" counter shaped
                      v-model="egresoXml.descripcion"></v-textarea>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Finalidad" rows="5" counter shaped
                      v-model="egresoXml.destino"></v-textarea>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Financiamiento" rows="5" v-model="ramo" counter
                      shaped></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="success" @click="guardarXml">Guardar</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
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
    checkbox: false,
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
      ramo: "",
      asunto: "",
      estatus: true,
    },
    prodServItems: [
      'SERVICIO',
      'PRODUCTO',
    ],
    servItems: [
      'MANTENIMIENTO',
      'CONTABILIDAD',
      'TRANSPORTE',
      'ALQUILER',
      'OTROS'
    ],
    prodItems: [
      'ARTICULOS DE LIMPIEZA',
      'ENERGIA ELECTRICA',
      'COMBUSTIBLE',
      'REFACCIONES',
      'OTROS'
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

            console.log(response.data)

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
      this.egresoXml.total = this.egresoXml.total.replace(",", "");
      if (this.checkbox == true) {
        this.egresoXml.emisorRfc = this.emisorRfcSinXml;
        this.egresoXml.emisorNombre = this.emisorNombreSinXml;
        this.egresoXml.receptorRfc = this.receptorRfcSinXml;
        this.egresoXml.receptorNombre = this.receptorNombreSinXml;
        this.egresoXml.total = this.totalSinXml.replace(",", "");
        this.egresoXml.fechaFactura = this.formatDate();
        this.egresoXml.uuid = "SIN UUID";
        /* if (this.prodServCb == 'PRODUCTO') {
          this.egresoXml.asunto = this.servCb;
        }
        if (this.prodServCb == 'SERVICIO') {
          this.egresoXml.asunto = this.prodCb;
        }
        if (this.prodServCb == 'OTROS') {
          this.egresoXml.asunto = this.asunto;
        } */
      }
      this.egresoXml.asunto = this.asunto;

      this.egresoXml.autorizo = this.autorizo.nombre;
      this.egresoXml.ramo = this.ramo;

      this.egresoXml.autorizo = this.autorizo.nombre;
      this.egresoXml.autorizoNombre = this.autorizo.descripcion;
      this.egresoXml.solicito = this.solicito.nombre;
      this.egresoXml.solicitoNombre = this.solicito.descripcion;

      console.log(this.prodServCb);
      console.log(this.egresoXml)

      axios
        .post("/api/egresos/agregarEgresoXml", this.egresoXml)
        .then((response) => {
          //  console.log("Guardado ");
          this.cerrarDialogo.value = false;
          this.$emit("Guardado");
        })
        .catch((error) => {
          console.log("error de carga organigrama");
        });
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
      console.log(this.textCombobox.descripcion)
    },
    formatDate() {
      var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    },
    muestra() {
      if (this.checkbox) {
        let emp = JSON.parse(localStorage.getItem("_empresa"));
        this.emisorNombreSinXml = emp.nombreNominativo;
        this.emisorRfcSinXml = emp.rfc;
      }
    }
  },
};
</script>

<style scoped>
.my-text-style>>>.v-text-field__slot input {
  color: #F44336;
}
</style>