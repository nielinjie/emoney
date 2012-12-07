/**
value={'dad':'120%','mom':'80%'}
**/
(function ($) {
  var Share = function (options) {
    this.init('share', options, Share.defaults);
  };

  $.fn.editableform.utils.inherit(Share, $.fn.editableform.types.abstract);

  $.extend(Share.prototype, {
   render: function() {
     Share.superclass.render.call(this);

            // this.$input.
          },


          value2html: function(value, element) {

            var html = JSON.stringify(value);
            $(element).text(html); 
          },

          html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures I do not recommend do that. 
            Better always set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
*/ 
return null;  
},

       /*
        method for converting data before sent on server.
        As jQuery correctly sends objects via ajax, you can just return value
        */
        value2str: function(value) {
         return value;
       }, 
       
       /*
        this is mainly for parsing value defined in data-value attribute. 
        If you will always set value by javascript, no need to overwrite it
        */
        str2value: function(str) {
         return str;
       },                
       
       value2input: function(value) {
        if(value){
          var i=0;
          for(key in value){
            $(this.$input.find('.key input')[i]).val(key)
            $(this.$input.find('.amount input')[i]).val(value[key])
            i++
          }
        }
      },       

      input2value: function() { 
        var re={}
        for (i=0;i<5;i++){
          var key=$(this.$input.find('.key input')[i]).val()
          var amount=$(this.$input.find('.amount input')[i]).val()
          if(key && amount)
          re[key]=amount
        }
        return re;
      },        

      activate: function() {
            //set focus on city
            this.$input.find('input[name="city"]').focus();
          }  
  });

Share.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
  tpl: (function(){
    var line='<div><span class="key">Key: <input type="text"/></span><span class="amount">Amount: <input type="text"/></span></div>'
    var lines=[line,line,line,line]
    return lines.join('')
  })(),
  inputclass:'editable-share'
});

$.fn.editableform.types.share = Share;

}(window.jQuery));