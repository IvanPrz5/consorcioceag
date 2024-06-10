"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_login_Empresas_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      empresas: []
    };
  },
  created: function created() {
    // invocar los métodos
    this.allEmpresas();
  },
  methods: {
    allEmpresas: function allEmpresas() {
      var _this = this;
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token"); // obtener el token de la aplicaccion
      axios.get("/api/allEmpresas/" + this.$store.state.user.id).then(function (response) {
        _this.empresas = response.data;
        if (_this.empresas.length == 1) {
          _this.sistema(_this.empresas[0]);
        } else if (_this.empresas.length == 0) {
          _this.empresas = null;
        }
      })["catch"](function (error) {
        _this.empresas = null;
      });
    },
    sistema: function sistema(empresa) {
      this.$store.state.empresa = empresa;
      console.log(empresa);
      localStorage.setItem("_empresa", JSON.stringify(empresa)); // para manjarlo local stor3e
      this.$router.replace("SeleccionSistemas");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", [_c("v-container", [_c("v-row", [_vm._l(_vm.empresas, function (empresa) {
    return _c("v-col", {
      key: empresa.id,
      attrs: {
        xs: "12"
      }
    }, [_c("v-card", {
      staticClass: "mx-auto my-4",
      attrs: {
        "max-width": "374",
        outlined: ""
      },
      on: {
        click: function click($event) {
          return _vm.sistema(empresa);
        }
      }
    }, [empresa.logo == "/" ? _c("v-img", {
      attrs: {
        contain: "",
        height: "250",
        src: "https://i.pinimg.com/564x/17/ec/70/17ec70005dc416f35c2dfa5c574c0414.jpg"
      }
    }) : _c("v-img", {
      attrs: {
        contain: "",
        height: "250",
        src: empresa.logo
      }
    }), _vm._v(" "), _c("v-card-title", {}, [_vm._v(_vm._s(empresa.nombre))]), _vm._v(" "), _c("v-card-text", [_c("v-row", {
      staticClass: "mx-0",
      attrs: {
        align: "center"
      }
    }, [_c("div", {
      staticClass: "grey--text ms-4"
    }, [_vm._v("\n                  " + _vm._s(empresa.nombreNominativo) + "\n                ")])]), _vm._v(" "), _c("div", {
      staticClass: "my-4 text-subtitle-1"
    }, [_vm._v("\n                " + _vm._s(empresa.rfc) + "\n              ")])], 1), _vm._v(" "), _c("v-divider", {
      staticClass: "mx-4"
    }), _vm._v(" "), _c("v-card-title", [_vm._v("Selecioname")])], 1)], 1);
  }), _vm._v(" "), _c("div", [_vm.empresas == null ? _c("div", [_c("h1", {
    attrs: {
      align: "center",
      justify: "center"
    }
  }, [_vm._v("\n              NO TIENE ASIGNADO NINGUNA EMPRESA , VERIFICAR SON EL\n              ADMINISTRADOR\n            ")]), _vm._v(" "), _c("v-img", {
    attrs: {
      contain: "",
      height: "500",
      src: "img/lapizRoto.png"
    }
  })], 1) : _vm._e()])], 2)], 1)], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/login/Empresas.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/login/Empresas.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empresas.vue?vue&type=template&id=4388d7ca */ "./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca");
/* harmony import */ var _Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Empresas.vue?vue&type=script&lang=js */ "./resources/js/components/login/Empresas.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__.render,
  _Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/login/Empresas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/login/Empresas.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/login/Empresas.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Empresas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_4388d7ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Empresas.vue?vue&type=template&id=4388d7ca */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Empresas.vue?vue&type=template&id=4388d7ca");


/***/ })

}]);