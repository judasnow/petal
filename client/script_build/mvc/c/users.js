/*! petal_client 2013-07-08 */
define(["underscore","backbone","m/user"],function(a,b,c){"use strict";var d=b.Collection.extend({model:c,url:"/api/users/",initialize:function(){}});return d});