/*! petal_client 2013-07-08 */
define(["underscore","backbone","m/chat_item"],function(a,b,c){"use strict";var d=b.Collection.extend({model:c,url:"/api/chat_items",initialize:function(){}});return d});