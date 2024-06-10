(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Sistemas_Egresos_OrganigramaRelacion_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      año: 0,
      //  new Date().getUTCFullYear();
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
      encabezado: [{
        text: "Nombre",
        value: "nombre"
      }, {
        text: "Cargo",
        value: "descripcion"
      }, {
        text: "Editar",
        value: "actions",
        sortable: false
      }],
      letras: [function (v) {
        return !!v || "Requerido";
      }, function (v) {
        return /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || "Solo letras";
      }],
      letrasPunto: [function (v) {
        return !!v || "Requerido";
      }, function (v) {
        return /^[A-Za-zÁÉÍÓÚáéíóúñÑ .]+$/g.test(v) || "Solo letras";
      }]
    };
  },
  created: function created() {
    this.año = new Date().getUTCFullYear();
    for (var i = this.año - 5; i <= this.año; i++) {
      this.años.push(i);
    }
    this.rellenarOrganigrama();
  },
  methods: {
    rellenarOrganigrama: function rellenarOrganigrama() {
      var _this = this;
      var empresa = JSON.parse(localStorage.getItem("_empresa"));
      axios.get("/consorcioceag/public/api/organigramaActivo/" + this.año + "/" + empresa.id).then(function (response) {
        _this.detalle = response.data;
      })["catch"](function (error) {
        _this.mostrarNoificacion("No es posible cargar de Organigrama", true);
      });
    },
    cargaOrganigramaDisponibles: function cargaOrganigramaDisponibles() {
      var _this2 = this;
      var empresa = JSON.parse(localStorage.getItem("_empresa"));
      axios.get("/consorcioceag/public/api/organigramaNoAsignado/" + this.año + "/" + empresa.id).then(function (response) {
        _this2.orgaTipo = response.data;
      })["catch"](function (error) {
        _this2.mostrarNoificacion("No es posible cargar de Organigrama", true);
      });
    },
    cambioDeAño: function cambioDeAño() {
      this.rellenarOrganigrama();
    },
    mostrarNoificacion: function mostrarNoificacion(mensaje, esError) {
      this.mensajeNoificacion = mensaje;
      if (esError) {
        this.notificacionError = true;
      } else {
        this.notificacionValidad = true;
      }
    },
    nombreEditarText: function nombreEditarText($nombre) {
      this.nombreEditar = $nombre;
    },
    guardarNuevo: function guardarNuevo(dialog) {
      var _this3 = this;
      if (this.$refs.formNuevo.validate() && this.orgaNuevo != null) {
        var empresa = JSON.parse(localStorage.getItem("_empresa"));
        var usuario = JSON.parse(localStorage.getItem("_usuario"));
        if (typeof this.orgaNuevo.id === "undefined") {
          this.error = "POR FAVOR COLOQUE UN AÑO VALIDO";
        } else {
          axios.post("/consorcioceag/public/api/crearOrganigramaDetalle", {
            idEmpresa: empresa.id,
            idOrganigrama: this.orgaNuevo.id,
            año: this.año,
            nombre: this.nombreNuevo,
            estatus: true
          }).then(function (response) {
            _this3.rellenarOrganigrama();
            _this3.orgaNuevo = null;
            _this3.nombreNuevo = "";
            _this3.error = "";
            dialog.value = false;
          })["catch"](function (error) {
            _this3.error = "NO ES POSIBLE GUARDAR EL EMPLEADO";
          });
        }
      } else {
        this.error = "Rellnar todo los datos por favro";
      }
    },
    editarItem: function editarItem(dialog, id) {
      var _this4 = this;
      if (this.$refs.formEditar.validate()) {
        axios.post("/consorcioceag/public/api/editarOrganigramaDetalle", {
          id: id,
          nombre: this.nombreEditar
        }).then(function (response) {
          _this4.rellenarOrganigrama();
          _this4.nombreEditar = null;
          dialog.value = false;
        })["catch"](function (error) {
          _this4.mostrarNoificacion("No es posible editar  -", true);
        });
      } else {
        this.mostrarNoificacion("Rellene todos los campos por favor", true);
      }
    },
    BorraItem: function BorraItem(dialog, id) {
      var _this5 = this;
      axios["delete"]("/consorcioceag/public/api/borrarOrganigramaDetalle/" + id).then(function (response) {
        _this5.rellenarOrganigrama();
        dialog.value = false;
      })["catch"](function (error) {
        _this5.mostrarNoificacion("No es posible borrar-", true);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-card", {
    staticClass: "mx-auto",
    attrs: {
      "max-width": "60%",
      elevation: "13"
    }
  }, [_c("v-list-item", {
    attrs: {
      "two-line": ""
    }
  }, [_c("v-list-item-content", [_c("v-list-item-title", {
    staticClass: "text-h5",
    attrs: {
      align: "center"
    }
  }, [_c("p", [_vm._v("Organigrama de Autoridades")])]), _vm._v(" "), _c("v-list-item-subtitle", {
    attrs: {
      align: "center"
    }
  }, [_c("p", [_vm._v(_vm._s(_vm.año))])])], 1)], 1), _vm._v(" "), _c("v-divider", {
    staticClass: "mx-4"
  }), _vm._v(" "), _c("br"), _vm._v(" "), _c("p", {
    attrs: {
      align: "center"
    }
  }, [_vm._v("Seleccione un año")]), _vm._v(" "), _c("v-combobox", {
    attrs: {
      "small-chips": "",
      dense: "",
      filled: "",
      outlined: "",
      items: _vm.años
    },
    on: {
      change: function change($event) {
        _vm.cambioDeAño();
      }
    },
    model: {
      value: _vm.año,
      callback: function callback($$v) {
        _vm.año = $$v;
      },
      expression: "año"
    }
  }), _vm._v(" "), _c("v-divider", {
    staticClass: "mx-4"
  }), _vm._v(" "), _c("br"), _vm._v(" "), _c("p", {
    attrs: {
      align: "center"
    }
  }, [_vm._v("Listado de Organigrama")]), _vm._v(" "), _c("v-dialog", {
    attrs: {
      transition: "dialog-bottom-transition",
      "max-width": "600"
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(_ref) {
        var on = _ref.on,
          attrs = _ref.attrs;
        return [_c("v-btn", _vm._g(_vm._b({
          attrs: {
            "x-small": "",
            color: "primary"
          },
          on: {
            click: function click($event) {
              return _vm.cargaOrganigramaDisponibles();
            }
          }
        }, "v-btn", attrs, false), on), [_vm._v("Agregar Nuevo")])];
      }
    }, {
      key: "default",
      fn: function fn(dialog) {
        return [_c("v-card", [_c("v-toolbar", {
          attrs: {
            color: "primary",
            dark: ""
          }
        }, [_vm._v("Nuevo Organigrama")]), _vm._v(" "), _c("v-card-text", [_c("v-form", {
          ref: "formNuevo",
          attrs: {
            enctype: "multipart/form-data"
          }
        }, [_c("v-container", [_c("v-row", [_c("v-col", {
          attrs: {
            cols: "12"
          }
        }, [_c("v-text-field", {
          attrs: {
            placeholder: "Ingrese el nombre que aparecera en el sistema",
            label: "Nombre",
            outlined: "",
            clearable: "",
            "prepend-inner-icon": "mdi-map-marker",
            counter: "",
            required: ""
          },
          model: {
            value: _vm.nombreNuevo,
            callback: function callback($$v) {
              _vm.nombreNuevo = $$v;
            },
            expression: "nombreNuevo"
          }
        })], 1), _vm._v(" "), _c("v-col", {
          attrs: {
            cols: "12"
          }
        }, [_c("v-combobox", {
          attrs: {
            "small-chips": "",
            dense: "",
            filled: "",
            outlined: "",
            items: _vm.orgaTipo,
            "item-text": "descripcion",
            "item-value": "id"
          },
          model: {
            value: _vm.orgaNuevo,
            callback: function callback($$v) {
              _vm.orgaNuevo = $$v;
            },
            expression: "orgaNuevo"
          }
        })], 1), _vm._v(" "), _c("v-col", {
          attrs: {
            cols: "12"
          }
        }, [_c("p", {
          staticStyle: {
            color: "red"
          },
          attrs: {
            align: "center"
          }
        }, [_vm._v(" " + _vm._s(_vm.error))])])], 1)], 1)], 1)], 1), _vm._v(" "), _c("v-card-actions", {
          staticClass: "justify-end"
        }, [_c("v-btn", {
          attrs: {
            color: "error"
          },
          on: {
            click: function click($event) {
              dialog.value = false;
            }
          }
        }, [_vm._v("Close")]), _vm._v(" "), _c("v-btn", {
          attrs: {
            color: "primary"
          },
          on: {
            click: function click($event) {
              return _vm.guardarNuevo(dialog);
            }
          }
        }, [_vm._v("Guardar")])], 1)], 1)];
      }
    }])
  }), _vm._v(" "), [_c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.encabezado,
      items: _vm.detalle,
      "items-per-page": 10
    },
    scopedSlots: _vm._u([{
      key: "item.actions",
      fn: function fn(_ref2) {
        var item = _ref2.item;
        return [_c("v-dialog", {
          attrs: {
            transition: "dialog-bottom-transition",
            "max-width": "600"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref3) {
              var on = _ref3.on,
                attrs = _ref3.attrs;
              return [_c("v-icon", _vm._g(_vm._b({
                staticClass: "pr-2",
                attrs: {
                  color: "secondary",
                  dark: ""
                },
                on: {
                  click: function click($event) {
                    return _vm.nombreEditarText(item.nombre);
                  }
                }
              }, "v-icon", attrs, false), on), [_vm._v("\n                mdi-pencil\n              ")])];
            }
          }, {
            key: "default",
            fn: function fn(dialog) {
              return [_c("v-card", [_c("v-toolbar", {
                attrs: {
                  color: "primary",
                  dark: ""
                }
              }, [_vm._v("Editar Organigrama")]), _vm._v(" "), _c("v-card-text", [_c("v-form", {
                ref: "formEditar",
                attrs: {
                  enctype: "multipart/form-data"
                }
              }, [_c("v-container", [_c("v-row", [_c("v-col", {
                attrs: {
                  cols: "12"
                }
              }, [_c("v-text-field", {
                attrs: {
                  placeholder: "Ingrese el nombre que aparecera en el sistema",
                  label: "Nombre",
                  outlined: "",
                  clearable: "",
                  "prepend-inner-icon": "mdi-map-marker",
                  counter: "",
                  required: ""
                },
                model: {
                  value: _vm.nombreEditar,
                  callback: function callback($$v) {
                    _vm.nombreEditar = $$v;
                  },
                  expression: "nombreEditar"
                }
              })], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("v-card-actions", {
                staticClass: "justify-end"
              }, [_c("v-btn", {
                attrs: {
                  color: "error"
                },
                on: {
                  click: function click($event) {
                    dialog.value = false;
                  }
                }
              }, [_vm._v("Close")]), _vm._v(" "), _c("v-btn", {
                attrs: {
                  color: "primary"
                },
                on: {
                  click: function click($event) {
                    return _vm.editarItem(dialog, item.id);
                  }
                }
              }, [_vm._v("Guardar")])], 1)], 1)];
            }
          }], null, true)
        }), _vm._v(" "), _c("v-dialog", {
          attrs: {
            transition: "dialog-bottom-transition",
            "max-width": "600"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref4) {
              var on = _ref4.on,
                attrs = _ref4.attrs;
              return [_c("v-icon", _vm._g(_vm._b({
                staticClass: "pr-2",
                attrs: {
                  color: "error",
                  dark: ""
                }
              }, "v-icon", attrs, false), on), [_vm._v("\n                mdi-delete\n              ")])];
            }
          }, {
            key: "default",
            fn: function fn(dialog) {
              return [_c("v-card", [_c("v-toolbar", {
                attrs: {
                  color: "error ",
                  dark: ""
                }
              }, [_vm._v("Borrar Organigrama")]), _vm._v(" "), _c("v-card-text", [_c("p", [_vm._v("ESTA SEGURO BORRAR " + _vm._s(item.nombre))])]), _vm._v(" "), _c("v-card-actions", {
                staticClass: "justify-end"
              }, [_c("v-btn", {
                attrs: {
                  color: "error"
                },
                on: {
                  click: function click($event) {
                    dialog.value = false;
                  }
                }
              }, [_vm._v("No")]), _vm._v(" "), _c("v-btn", {
                attrs: {
                  color: "primary"
                },
                on: {
                  click: function click($event) {
                    return _vm.BorraItem(dialog, item.id);
                  }
                }
              }, [_vm._v("Si")])], 1)], 1)];
            }
          }], null, true)
        })];
      }
    }])
  })]], 2)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrganigramaRelacion.vue?vue&type=template&id=20e67cff */ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff");
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrganigramaRelacion.vue?vue&type=script&lang=js */ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_custom_index_0_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionValidad_color_green_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OrganigramaRelacion.vue?vue&type=custom&index=0&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionValidad&color=green&absolute=true&top=true&shaped=true&transition=scroll-y-transition */ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=0&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionValidad&color=green&absolute=true&top=true&shaped=true&transition=scroll-y-transition");
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_custom_index_0_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionValidad_color_green_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_OrganigramaRelacion_vue_vue_type_custom_index_0_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionValidad_color_green_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_custom_index_1_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionError_color_red_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrganigramaRelacion.vue?vue&type=custom&index=1&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionError&color=red&absolute=true&top=true&shaped=true&transition=scroll-y-transition */ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=1&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionError&color=red&absolute=true&top=true&shaped=true&transition=scroll-y-transition");
/* harmony import */ var _OrganigramaRelacion_vue_vue_type_custom_index_1_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionError_color_red_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_OrganigramaRelacion_vue_vue_type_custom_index_1_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionError_color_red_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_4__);





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrganigramaRelacion_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__.render,
  _OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* custom blocks */
;
if (typeof (_OrganigramaRelacion_vue_vue_type_custom_index_0_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionValidad_color_green_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_3___default()) === 'function') _OrganigramaRelacion_vue_vue_type_custom_index_0_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionValidad_color_green_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_3___default()(component)
;
if (typeof (_OrganigramaRelacion_vue_vue_type_custom_index_1_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionError_color_red_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_4___default()) === 'function') _OrganigramaRelacion_vue_vue_type_custom_index_1_blockType_v_snackbar_3Atimeout_1500_3Avalue_true_v_model_notificacionError_color_red_absolute_true_top_true_shaped_true_transition_scroll_y_transition__WEBPACK_IMPORTED_MODULE_4___default()(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganigramaRelacion_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrganigramaRelacion.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganigramaRelacion_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrganigramaRelacion_vue_vue_type_template_id_20e67cff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrganigramaRelacion.vue?vue&type=template&id=20e67cff */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=template&id=20e67cff");


/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=0&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionValidad&color=green&absolute=true&top=true&shaped=true&transition=scroll-y-transition":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=0&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionValidad&color=green&absolute=true&top=true&shaped=true&transition=scroll-y-transition ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=1&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionError&color=red&absolute=true&top=true&shaped=true&transition=scroll-y-transition":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/OrganigramaRelacion.vue?vue&type=custom&index=1&blockType=v-snackbar&%3Atimeout=1500&%3Avalue=true&v-model=notificacionError&color=red&absolute=true&top=true&shaped=true&transition=scroll-y-transition ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ })

}]);