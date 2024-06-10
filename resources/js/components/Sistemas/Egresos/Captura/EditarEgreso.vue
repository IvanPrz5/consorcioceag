<template>
  <v-card max-width="95%" class="mx-auto" elevation="13">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5" align="center">
          <h2>Edicion de Egreso {{ anio }}</h2>
        </v-list-item-title>
        <v-list-item-subtitle align="center"> </v-list-item-subtitle>

        <v-container>
          <v-row>
            <v-col md="6" cols="12">
              <h3 align="center" class="mt-6">Cargar Xml de Factura</h3>
            </v-col>
            <v-col cols="12">
              <!-- <v-combobox :items="prodServItems" label="Producto ó Servicio" v-model="prodServCb" dense></v-combobox> -->
              <!-- <v-combobox v-if="prodServCb == 'PRODUCTO'" :items="prodItems" label="Selecciona" v-model="prodCb"
                dense></v-combobox> -->
              <!-- <v-combobox :items="prodServItems == 'PRODUCTO' ? servItems : prodItems" label="Selecciona" v-model="servCb" dense></v-combobox> -->
              <v-text-field v-model="egresoEntrada.asunto" label="Ingresa la descripcion" dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <div>
                <v-row>
                  <v-col md="6" cols="12">
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
                      item-value="nombre" v-model="autorizo" @change="cambioAutorizo"></v-combobox>

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
                      item-value="nombre" v-model="solicito" @change="cambioSolicito"></v-combobox>

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
                  </v-col>

                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Descripcion" rows="5" counter shaped
                      v-model="egresoEntrada.descripcion"></v-textarea>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Finalidad" rows="5" counter shaped
                      v-model="egresoEntrada.destino"></v-textarea>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-textarea filled auto-grow label="Financiamiento" rows="5" counter shaped
                      v-model="egresoEntrada.ramo"></v-textarea>
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
  props: ["cerrarDialogo", "egresoEntrada", "anio"],
  data: () => ({
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
      estatus: true
    },
    prodServItems: [
      'SERVICIO',
      'PRODUCTO',
    ],
    servItems: [
      'CONTABILIDAD',
      'ENERGIA ELECTRICA',
      'OTROS'
    ],
    prodItems: [
      'COMBUSTIBLE',
      'REFACCIONES',
      'OTROS'
    ],
    prodServCb: null,
    servCb: null,
    prodCb: null,
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
              "Content-Type": "multipart/form-data"
            }
          })

          .then(response => {
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

          .catch(error => {
            console.log(error);
            this.mostrarDatosXml = false;
          });
      } catch (error) {
        this.carga = false;
        console.log(error);
      }
    },

    guardarXml() {
      this.egresoXml.autorizo = this.autorizo.nombre;
      this.egresoXml.autorizoNombre = this.autorizo.descripcion;
      this.egresoXml.solicito = this.solicito.nombre;
      this.egresoXml.solicitoNombre = this.solicito.descripcion;
      this.egresoXml.total = this.egresoXml.total.replace(",", "");
      axios
        .post('/api/egresos/editarEgresoXml', this.egresoEntrada)
        .then(response => {
          //  console.log("Guardado ");
          this.cerrarDialogo.value = false;
          this.$emit("Guardado");
        })
        .catch(error => {
          console.log("error de carga organigrama");
        });
    },
    organigrama() {
      // this.anio = año;
      axios
        .get("/api/organigramaActivo/" + this.anio + "/" + this.empresa.id)
        .then(response => {
          this.organigramaItems = response.data;
        })
        .catch(error => {
          console.log("error de carga organigrama");
        });
    },
    actualizarAño(updateAño) {
      console.log(updateAño);
      axios
        .get("/api/organigramaActivo/" + updateAño + "/" + this.empresa.id)
        .then(response => {
          this.organigramaItems = response.data;
        })
        .catch(error => {
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
    }
  }
};
</script>
