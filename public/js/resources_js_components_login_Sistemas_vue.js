"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_login_Sistemas_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      sistemas: []
    };
  },
  mounted: function mounted() {
    // invocar los métodos
    this.allSistemas();
  },
  methods: {
    allSistemas: function allSistemas() {
      var _this = this;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
      axios.get('/consorcioceag/public/api/allSistemas/' + this.$store.state.user.id + '/' + this.$store.state.empresa.id).then(function (response) {
        _this.sistemas = response.data;
        if (_this.sistemas.length == 1) {
          _this.Menu(_this.sistemas[0]);
        } else if (_this.sistemas.length == 0) {
          _this.sistemas = null;
          _this.$store.commit("setMenu", null);
          _this.$store.commit("setMenuMostrar", false);
        }
      })["catch"](function (error) {
        _this.sistemas = null;
      });
    },
    Menu: function Menu(sistema) {
      var _this2 = this;
      this.$store.state.sistema = sistema;
      localStorage.setItem('_sistema', JSON.stringify(sistema)); // para manjarlo local stor3e
      this.$store.commit("setMenuMostrar", true);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // obtener el token de la aplicaccion
      axios.post('/consorcioceag/public/api/menu/' + this.$store.state.user.id + '/' + sistema.id).then(function (response) {
        _this2.$store.commit("setMenu", response.data);
        localStorage.setItem('_menu', JSON.stringify(response.data)); // para manjarlo local stor3e
      })["catch"](function (error) {
        _this2.$store.commit("setMenu", null);
      });
      this.$router.replace('principal');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc ***!
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
  return _c("div", [_vm.sistemas != [] ? _c("div", [_c("v-container", _vm._l(_vm.sistemas, function (sistema) {
    return _c("v-col", {
      key: sistema.id,
      attrs: {
        xs: "12"
      }
    }, [_c("v-card", {
      staticClass: "mx-auto my-12",
      attrs: {
        "max-width": "374",
        outlined: ""
      },
      on: {
        click: function click($event) {
          return _vm.Menu(sistema);
        }
      }
    }, [sistema.imagen.length < 2 ? _c("v-img", {
      attrs: {
        contain: "",
        height: "250"
      }
    }) : _vm._e(), _vm._v(" "), sistema.imagen.length > 2 ? _c("v-img", {
      attrs: {
        contain: "",
        height: "250"
      }
    }) : _vm._e(), _vm._v(" "), _c("v-card-title", {}, [_vm._v(_vm._s(sistema.nombre))]), _vm._v(" "), _c("v-card-text", [_c("v-row", {
      staticClass: "mx-0",
      attrs: {
        align: "center"
      }
    }, [_c("div", {
      staticClass: "grey--text ms-4"
    }, [_vm._v("\n                                " + _vm._s(sistema.descripcion) + "\n                            ")])])], 1), _vm._v(" "), _c("v-divider", {
      staticClass: "mx-4"
    }), _vm._v(" "), _c("v-card-title", [_vm._v("Selecioname")])], 1)], 1);
  }), 1)], 1) : _vm._e(), _vm._v(" "), _vm.sistemas == null ? _c("div", [_c("h1", {
    attrs: {
      align: "center",
      justify: "center"
    }
  }, [_vm._v("NO TIENE ASIGNADO NINGUN SISTEMA , VERIFICAR SON EL ADMINISTRADOR")]), _vm._v(" "), _c("v-img", {
    attrs: {
      contain: "",
      height: "500"
    }
  })], 1) : _vm._e()]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/login/Sistemas.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/login/Sistemas.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sistemas.vue?vue&type=template&id=8340bbbc */ "./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc");
/* harmony import */ var _Sistemas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sistemas.vue?vue&type=script&lang=js */ "./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sistemas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__.render,
  _Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/login/Sistemas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sistemas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sistemas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sistemas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sistemas_vue_vue_type_template_id_8340bbbc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sistemas.vue?vue&type=template&id=8340bbbc */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/login/Sistemas.vue?vue&type=template&id=8340bbbc");


/***/ })

}]);