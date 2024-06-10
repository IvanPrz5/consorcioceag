<template>
<v-container>
    <v-row>
        <v-col cols="0" md="3" lg="4"></v-col>
        <v-col cols="12" md="6" lg="4">
            <v-card class="overflow-hidden">
                <v-toolbar>
                    <v-icon>mdi-account</v-icon>
                    <v-toolbar-title class="font-weight-light">
                        Crear Usuario
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field label="Correo electronico" :rules="[rules.required]" outlined></v-text-field>
                    <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="Minimo de 8 Caracteres"
                    counter @click:append="show1 = !show1" outlined></v-text-field>

                    <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Repetir la Contraseña" hint="Minimo de 8 Caracteres"
                    counter @click:append="show1 = !show1" outlined></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="success">
                        Crear Usuario
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="0" md="3" lg="4"></v-col>
    </v-row>
</v-container>
</template>

<script>

export default {
    data() {
        return {
            show1: false,
            rules: {
                required: value => !!value || 'Required.',
                min: length >= 8 || 'Minimo de 8 Caracteres',
            },
        }
    },
}
</script>
