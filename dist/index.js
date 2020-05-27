"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var React=_interopDefault(require("react")),reactFinalForm=require("react-final-form"),reactFinalFormArrays=require("react-final-form-arrays"),arrayMutators=_interopDefault(require("final-form-arrays")),extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){function r(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var __assign=function(){return(__assign=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},TextInputField=function(e){var t=e.input,r=e.meta;return React.createElement("div",{className:"field",key:"field."+t.name},React.createElement("label",{className:"label"},e.displayName),React.createElement("input",{name:t.name,type:t.type,onChange:t.onChange,onBlur:t.onBlur,onFocus:t.onFocus,className:"textInput",value:t.value}),r.error&&r.touched&&React.createElement("p",null,Array.isArray(r.error)?r.error[r.error.length-1]:r.error))},requiredValidator=function(e){return e?void 0:"The field cannot be empty"},emailValidator=function(e){return e.match('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/')?void 0:"Please enter a valid email"},validators={email:emailValidator,required:requiredValidator},composeValidator=function(e,t){switch(t||(t=""),typeof e){case"string":return stringValidator(e,t);case"object":return Array.isArray(e)?e.map((function(e){switch(typeof e){case"string":return stringValidator(e,t);case"function":return functionValidator(e,t);default:return}})):void 0;case"function":return functionValidator(e,t);default:return}},stringValidator=function(e,t){switch(e){case"required":return validators.required(t);case"email":return validators.email(t)}},functionValidator=function(e,t){return e(t)},_evaluator=function(e,t){return e(_formState,_formState.value)},_formState={},_updateFormState=function(e){(_formState=e).form.getFieldState("name")},_getFieldState=function(e){var t=_formState.form.getFieldState(e);return t&&"asd"===t.value?(console.log("here"),"WHEEEWWWW"):"nope"},_metadataEvaluator=function(e,t){return"function"==typeof e?e(t,t.values):e},FormHelper={evaluator:_evaluator,formState:_formState,updateFormState:_updateFormState,metaDataEvaluator:_metadataEvaluator,getFieldState:_getFieldState},SpyWrapper=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.render=function(){var e=t.props,r=e.field,a=e.formData;return React.createElement(reactFinalForm.Field,{name:""+r.name,component:t.handleComponent(r),displayName:FormHelper.metaDataEvaluator(r.displayName,a),hidden:FormHelper.metaDataEvaluator(r.hidden,a),validate:function(e){return r.validators?validators.required(e):void 0},size:r.size?FormHelper.metaDataEvaluator(r.size,a):10,subscription:t.props.subscription})},t.handleComponent=function(e){return t.props.componentFactory&&e.component&&t.props.componentFactory.hasOwnProperty(e.component)?t.props.componentFactory[e.component]:TextInputField},t}return __extends(t,e),t.prototype.shouldComponentUpdate=function(e,t,r){return!this.props.renderOptions||this.props.renderOptions(this.props.formData,e)},t}(React.Component),DateInput=function(e){var t=e.input,r=e.meta;return React.createElement("div",{className:"dateInput",key:"field."+t.name},React.createElement("label",{className:"label"},e.displayName),React.createElement("input",{name:t.name,type:"date",onChange:function(r){console.log(e.mutators,t.name),t.onChange(r),e.formatting?e.mutators.date(t.name,e.formatting):e.mutators.date(t.name)},onBlur:t.onBlur,onFocus:t.onFocus,className:"date"}),r.error&&r.touched&&React.createElement("p",null,Array.isArray(r.error)?r.error[r.error.length-1]:r.error))},FIELD_TYPE=["string","array","entity","document","group","date"],dateMutator=function(e,t,r){r.changeValue(t,e[0],(function(t){return function(t){var r=t.split("-"),a=new Date(parseInt(r[0]),parseInt(r[1])-1,parseInt(r[2]));if(!e[1])return a.toDateString();switch(e[1]){case"epoch":return a.getTime();case"UTC":return a.toUTCString();case"ISO":return a.toISOString();default:return a.getTime()}}(t)}))},FormBuilder=function(e){function t(t){var r=e.call(this,t)||this;return r.handleSubmit=function(e){r.props.onSubmit(e)},r.checkSchema=function(){for(var e=!1,t=0,a=r.props.schema.entities;t<a.length;t++){a[t].name===r.props.entityName&&(e=!0)}if(!e)throw Error("The given schema doesn't contain any entity with the given entityName")},r.render=function(){try{var e=r.props.schema.entities;return r.checkSchema(),React.createElement("div",{className:"container",key:"container"},React.createElement(reactFinalForm.Form,{onSubmit:r.handleSubmit,initialValues:r.props.initialValues?r.props.initialValues:void 0,subscription:r.props.subscription?r.props.subscription:void 0,validateOnBlur:!0,mutators:__assign({},arrayMutators,{date:dateMutator}),render:function(t){return r.formProps=t,React.createElement("form",{onSubmit:t.handleSubmit},e.map((function(e){return e.name===r.props.entityName?r.entityEvaluator(e):void 0})),React.createElement(reactFinalForm.Field,{name:"bottomBar",component:r.props.bottomBar,key:"bottomBar"}))}}))}catch(e){return console.error(e),React.createElement("h1",null,"Oops! Seems like there was an Error, please check the provided Schema")}},r.entityEvaluator=function(e,t){if(!e.layouts)return r.fieldEvaluator(e.fields);var a=e.fields,n=e.layouts;if(!r.props.layoutName)throw Error("When using layouts please specify the property layoutName");if(!Array.isArray(n)){if(n.hasOwnProperty(r.props.layoutName))return n[r.props.layoutName].orientation?r.handleOrientation(n[r.props.layoutName].orientation,n,a,n[r.props.layoutName].name):r.layoutEvaluator(r.props.layoutName,n,a);throw Error("The provided prop layoutName doesn't match with any layout name given the schema")}for(var o=!1,i=0,l=n;i<l.length;i++){var u=l[i];if(u.name===r.props.layoutName)return o=!0,u.orientation?r.handleOrientation(u.orientation,n,a,u.name):r.layoutEvaluator(u.name,n,a);if(!o)throw Error("The provided prop layoutName doesn't match with any layout name given the schema")}},r.layoutEvaluator=function(e,t,a){if(!Array.isArray(t))return t[e].groups?r.fieldEvaluator(a,t[e].fields,t[e].groups):r.fieldEvaluator(a,t[e].fields);for(var n=0,o=t;n<o.length;n++){var i=o[n];if(i.name===r.props.layoutName)return i.groups?r.fieldEvaluator(a,i.fields,i.groups):r.fieldEvaluator(a,i.fields)}},r.fieldEvaluator=function(e,t,a){var n=function(t,n){if(t.group&&a){if(a.hasOwnProperty(t.group))return React.createElement("label",null,t.displayName,r.groupEvaluator(a[t.group],e,n));throw Error("The given group name doesn't exist")}return r.fieldRenderer(t,n)};if(!t){if(Array.isArray(e))return e.map((function(t,a){try{return r.fieldRenderer(t,a)}finally{a===e.length-1&&r.fieldNameStack.pop()}}));var o=[];for(var i in e){m=__assign({name:i},e[i]);o.push(m)}return o.map((function(e,t){try{return n(e,t)}finally{t===o.length-1&&r.fieldNameStack.pop()}}))}if(!Array.isArray(t)){if(Array.isArray(e))return e.map((function(a,o){if(a.name&&t.hasOwnProperty(a.name)){var i=__assign({},t[a.name],a);try{return n(i,o)}finally{o===e.length-1&&r.fieldNameStack.pop()}}}));var l=[];for(var u in t){if(!e.hasOwnProperty(u))return;m=__assign({},e[u],t[u],{name:u});l.push(m)}return l.map((function(e,t){try{return n(e,t)}finally{t===l.length-1&&r.fieldNameStack.pop()}}))}var s=[];if(Array.isArray(e)){for(var c in t)for(var p in e)if(t[c].name===e[p].name){var m=__assign({},t[c],e[p]);s.push(m)}if(s.length>0)return s.map((function(e,t){try{return n(e,t)}finally{t===s.length-1&&r.fieldNameStack.pop()}}))}else{var d=[];for(var u in t){if(!e.hasOwnProperty(u))return;var m=__assign({},e[u],t[u],{name:u});return d.push(m),d.map((function(e,t){try{return n(e,t)}finally{t===d.length-1&&r.fieldNameStack.pop()}}))}}},r.groupEvaluator=function(e,t,a){return e.orientation?"vertical"===e.orientation?React.createElement("div",{className:"verticalGroup",key:e.orientation+"."+a},r.fieldEvaluator(t,e.fields)):"horizontal"===e.orientation?React.createElement("div",{className:"horizontalGroup",key:e.orientation+"."+a},r.fieldEvaluator(t,e.fields)):void 0:React.createElement("div",{className:"verticalGroup",key:"verticalGroup."+a},r.fieldEvaluator(t,e.fields))},r.handleOrientation=function(e,t,a,n){if(n){if("vertical"===e)return React.createElement("div",{className:"verticalLayout",key:""+r.fieldNameStack.join()},r.layoutEvaluator(n,t,a));if("horizontal"===e)return React.createElement("div",{className:"horizontalLayout",key:""+r.fieldNameStack.join()},r.layoutEvaluator(n,t,a))}},r.fieldRenderer=function(e,t){var a="";if(a=0!==r.fieldNameStack.length?r.fieldNameStack.join(".")+"."+e.name:e.name,!FIELD_TYPE.includes(e.type))throw Error('The provided field type for the field name "'+e.name+'" is not supported');if(r.fieldPropertyCheck(e))return e.name=a,React.createElement(reactFinalForm.FormSpy,{render:function(t){return React.createElement("div",{className:"fieldContainer",style:r.buildCustomStyle(e),key:a},React.createElement(SpyWrapper,{field:e,formData:t,renderOptions:r.props.renderOption?r.props.renderOption:void 0,subscription:r.fieldSubscriptionEvaluator(e),componentFactory:r.props.componentFactory?r.props.componentFactory:void 0,key:a}))}});if(r.props.componentFactory&&r.props.componentFactory.hasOwnProperty(e.component))return React.createElement("div",{className:"fieldContainer",style:r.buildCustomStyle(e),key:a},React.createElement(reactFinalForm.Field,{name:a,component:r.props.componentFactory[e.component],key:a,displayName:e.displayName,validate:function(t){return e.validators?validators.required(t):void 0},enum:e.enum?e.enum:[],subscription:r.fieldSubscriptionEvaluator(e),hidden:e.hidden?e.hidden:void 0}));if(e.component&&r.props.componentFactory&&!r.props.componentFactory.hasOwnProperty(e.component))throw Error("The given component in the field with name '"+e.name+"' doesn't exist in given componentFactory");if("string"===e.type||"number"===e.type)return React.createElement("div",{className:"fieldContainer",style:r.buildCustomStyle(e),key:a},React.createElement(reactFinalForm.Field,{name:a,key:a,displayName:e.displayName,component:TextInputField,validate:function(t){return e.validators?composeValidator(e.validators,t):void 0},type:e.type,subscription:r.fieldSubscriptionEvaluator(e),placeholder:e.displayName,hidden:e.hidden?e.hidden:void 0}));if("entity"===e.type){if(!e.entityName)throw Error("There should be an entityName for schema for a field of type entity");var n=!1;r.fieldNameStack.push(e.name);for(var o=0,i=r.props.schema.entities;o<i.length;o++){var l=i[o];if(l.name===e.entityName)return r.currentEntity=l,n=!0,React.createElement("label",null,e.displayName,r.entityEvaluator(l))}if(!n)throw Error("The given entityName of the field doesn't match with the entities in the schema")}else{if("date"===e.type)return React.createElement("div",{className:"fieldContainer",style:r.buildCustomStyle(e),key:a},React.createElement(reactFinalForm.Field,{name:a,key:a,displayName:e.displayName,component:e.component?e.component:DateInput,validate:function(t){return e.validators?composeValidator(e.validators,t):void 0},type:e.type,subscription:r.fieldSubscriptionEvaluator(e),placeholder:e.displayName,hidden:e.hidden?e.hidden:void 0,formatting:e.format?e.format:void 0,mutators:r.formProps.form.mutators}));if("array"===e.type){if(!e.arrayType)throw Error("There should be an arrayType for a field of type array");if(!e.entityName)throw Error("There should be an entityName for schema for a field of type array");if("entity"!==e.arrayType)throw Error("Currently only arrayType of entity is supported");return React.createElement("div",{className:"array",style:r.buildCustomStyle(e),key:a},React.createElement("label",null,e.displayName),React.createElement(reactFinalFormArrays.FieldArray,{name:a,render:function(t){return t.fields.map((function(a){try{return r.fieldNameStack.push(a),r.handleArray(t,e.entityName,a)}finally{r.fieldNameStack.pop()}}))}}),React.createElement("button",{type:"button",onClick:function(){return r.formProps.form.mutators.push(a,void 0)}},e.addText?e.addText:"Add +"))}}},r.handleArray=function(e,t,a){for(var n=0,o=r.props.schema.entities;n<o.length;n++){var i=o[n];i.name===t&&(r.currentEntity=i)}return r.entityEvaluator(r.currentEntity,a)},r.fieldPropertyCheck=function(e){for(var t in e)if("function"==typeof e[t])return!0;return!1},r.fieldSubscriptionEvaluator=function(e){return e.subscription?e.subscription:r.props.allFieldsSubscription?r.props.allFieldsSubscription:void 0},r.buildCustomStyle=function(e){var t,r={};if(e.hidden&&Object.assign(r,{display:"hidden"}),e.size&&"function"!=typeof e.size){var a=(t=10*e.size)/4;"array"!==e.type?Object.assign(r,{flex:e.size,maxWidth:t+"vw",flexWrap:"wrap"}):Object.assign(r,{flex:e.size,maxWidth:t+"vw",flexWrap:"wrap",minWidth:a+"vw",width:t+"vw"})}else{a=(t=100)/4;Object.assign(r,{flex:t/10,maxWidth:t+"vw",flexWrap:"wrap",minWidth:a+"vw",width:t+"vw"})}return r},r.previousEntity="",r.isArray=!1,r.currentEntity={},r.formProps={},r.nested=!1,r.fieldNameStack=[],r}return __extends(t,e),t}(React.Component);module.exports=FormBuilder;