/*! petal_client 2013-07-08 */
define(["underscore","backbone","m/payment_record_item"],function(a,b,c){"use strict";var d=b.Collection.extend({model:c,url:"/api/payment_recoreds/",initialize:function(){}});return d});