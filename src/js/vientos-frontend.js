

// js_utils de kernspaltung!
u = new Utils();

v = new Vientos();

v.setup_pre_ready();

$(document).ready(function(){


   v.setup_inicio();
   v.setup();


   if( $(window).width() < 768 ) {

      console.log("movil");

   }


   var categoria = $('#inicio-categorias .listado .category');

   for (var i = 0; i < 12; i++) {

      categoria.clone().appendTo('#inicio-categorias .listado .container');

   }

   elemento = $('.inicio-actores-desglose-elemento');

   // for (var i = 0; i < 2; i++) {
   //    elemento.clone().appendTo('#inicio-actores-desglose');
   // }

   console.log( "Vientos - frontend v.2" );

})



function categoryIconClicked () {
   window.location.href = '/collaborate?cat=' + this.id
}


jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    return jQuery(this[randomIndex]);
};
