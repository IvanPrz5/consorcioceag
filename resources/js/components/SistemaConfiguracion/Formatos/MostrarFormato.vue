<template>
    <div style="background : #FBFBFB;" >



    <v-btn  @click = "convertirPdf "  color="success">GENERAR PDF</v-btn>




<!--  -->
   <v-card
    class="mx-auto"
    color="width"
    width=1100px;
    id="imprimir"
  >
    <v-card-text style="border: 1px solid red;  background : #FBFBFB;" >

    <div ref="pdf" v-html="formato"   style="border: 1px solid black; width: 1100px; text-align: center;" class="text-center"    >


    </div>

    </v-card-text>


     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <div ref="pdf"  id="pdf" v-html="formato"   style="border: 1px solid black; width: 1100px; text-align: center;" class="text-center"    >

                </div>
        </section>
    </vue-html2pdf>



    <button  @click="pdf()"  >Mostrar</button>


  </v-card>






    </div>


</template>

<style>



</style>

<script>



import VueHtml2pdf from 'vue-html2pdf'

export default {




props: ["formato"],

data: () => ({
        dalida: '',
    }),


components: {
    VueHtml2pdf
  },


methods:{

        convertirPdf(){

              //     window.html2canvas = html2canvas;




                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;

                let pdf = new jsPDF();

                let canvasElement = document.createElement("imprimir");
                canvasElement.width = windowWidth;
                canvasElement.height = windowHeight;

                html2canvas(this.$refs.pdf, {
                    canvas: canvasElement,
                    width: windowWidth,
                    height: windowHeight
                }).then(canvas => {

                    pdf.save("sample.pdf");

                    alert('works')
                }).catch(err => {
                    alert(err)
                });

/*
                        const documento  =  new jsPDF();


                        documento.fromHTML(this.formato , 15 ,15,{ width:150   });

                        documento.save('salida.pdf');



                        const doc = new jsPDF('p', 'pt', 'letter');
                        doc.html(this.formato ,  {
                                callback: function(pdf){
                                    pdf.save("opcion2.pdf")
                                }
                        }  ); */


        },
        pdf(){

                this.$refs.html2Pdf.generatePdf();

        }




}



}
</script>

