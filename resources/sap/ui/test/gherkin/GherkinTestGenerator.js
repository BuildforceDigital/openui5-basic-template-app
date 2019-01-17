/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/gherkin/dataTableUtils","sap/ui/test/gherkin/simpleGherkinParser","sap/base/strings/escapeRegExp","sap/ui/thirdparty/jquery"],function(e,t,r,n,i){"use strict";var s=e.extend("sap.ui.test.gherkin.GherkinTestGenerator",{constructor:function(t,n,s){e.apply(this,arguments);if(i.type(t)==="string"){t=r.parseFile(t)}else if(i.type(t)!=="object"||!t.scenarios){throw new Error("GherkinTestGenerator constructor: parameter 'vFeature' must be a valid String or a valid Feature object")}if(i.type(n)!=="function"||!(new n)._generateTestStep){throw new Error("GherkinTestGenerator constructor: parameter 'fnStepDefsConstructor' must be a valid StepDefinitions constructor")}if(s&&i.type(s)!=="function"){throw new Error("GherkinTestGenerator constructor: if specified, parameter 'fnAlternateTestStepGenerator' must be a valid Function")}this._oFeature=t;this._fnStepDefsConstructor=n;this._oStepDefs=null;this._fnAlternateTestStepGenerator=s||null},setUp:function(){this._oStepDefs=new this._fnStepDefsConstructor},tearDown:function(){if(this._oStepDefs&&this._oStepDefs._needsTearDown){this._oStepDefs.closeApplication()}this._oStepDefs=null},generate:function(){if(!this._oStepDefs){this.setUp()}return this._generateFeatureTest()},execute:function(e,t){if(!this._oStepDefs){throw new Error("Run 'generate' before calling 'execute'")}if(!e||!e.skip&&(i.type(e.func)!=="function"||i.type(e.parameters)!=="array")){throw new Error("Input parameter 'oTestStep' is not a valid TestStep object.")}if(!e.skip){this._oStepDefs.assert=t;e.func.apply(this._oStepDefs,e.parameters);this._oStepDefs._needsTearDown=true}return!e.skip},_generateFeatureTest:function(){var e=[];this._oFeature.scenarios.forEach(function(t){e=e.concat(this._expandScenarioOutline(t))},this);var t=e.map(function(e){return this._generateTestScenario(e,this._oFeature.background)},this);var r=this._isWip(this._oFeature);var n=t.every(function(e){return e.skip});return{name:(r?"(WIP) ":"")+"Feature: "+this._oFeature.name,skip:r||n,wip:r,testScenarios:t}},_expandScenarioOutline:function(e){if(!this._isScenarioOutlineWithExamples(e)){return[e]}var t=[];e.examples.filter(this._isNotWip).forEach(function(r,s){var a=this._convertScenarioExamplesToListOfObjects(r.data);t=t.concat(a.map(function(t,s){var a=i.extend(true,{},e);a.name+=r.name?": "+r.name:"";a.name+=" #"+(s+1);i.each(t,function(e,t){a.steps.forEach(function(r){var i=n(e);r.text=r.text.replace(new RegExp("<"+i+">","g"),t)})});return a},this))},this);return t},_generateTestScenario:function(e,t){var r=this._isWip(e);var n=this._isScenarioOutline(e)?"Scenario Outline: ":"Scenario: ";var i=(r?"(WIP) ":"")+n+e.name;var s=t?this._generateTestSteps(r,t,false):[];var a=this._isScenarioOutline(e)&&!this._isScenarioOutlineWithExamples(e);var o=a||s.some(function(e){return!e.isMatch});s=s.concat(this._generateTestSteps(r,e,o));return{name:i,skip:r||a||s.every(function(e){return e.skip&&e.isMatch}),wip:r,testSteps:s}},_generateTestSteps:function(e,t,r){var n=[];for(var i=0;i<t.steps.length;++i){var s=t.steps[i];var a=this._oStepDefs._generateTestStep(s);if(!a.isMatch&&this._fnAlternateTestStepGenerator){a=this._fnAlternateTestStepGenerator(s)}if(!a.isMatch){r=true}a.skip=r||e;if(a.isMatch&&a.skip){a.text="(SKIPPED) "+a.text}n.push(a)}return n},_convertScenarioExamplesToListOfObjects:function(e){e=e.map(function(e){return i.type(e)==="string"?[e]:e});return t.toTable(e)},_isScenarioOutline:function(e){return!!e.examples},_isScenarioOutlineWithExamples:function(e){return!!e.examples&&e.examples.length!==0&&e.examples.some(this._isNotWip)},_isNotWip:function(e){return i.inArray("@wip",e.tags)===-1},_isWip:function(e){return!this._isNotWip(e)}});return s});