
function Vientos() {

   var v = this;

   this.setup_pre_ready = function() {

      v.setup_blazy();

      $('html,body').css({height:'100vh',overflowY:'hidden'});
      var d = 359

      // }, 1000, function(){console.log("wtf");})



   }


   this.setup = function() {

      u.addWindowResizeFunction( u.shareH );
      u.addWindowResizeFunction( u.verticalCenter );

      $('.imgLiquid.imgLiquidFill').imgLiquid();
      $('.imgLiquid.imgLiquidNoFill').imgLiquid({ fill: false });

      $(window).trigger('resize');
      $(window).trigger('scroll');


      setTimeout(function(){

         $('#cargando .imagen').fadeOut(400,function(){
            $('#cargando').fadeOut(400,function(){
               $('#cargando').remove();
            })
         });


         $('html,body').css({
            height: 'auto',
            overflowY: 'auto'
         });

         $('html,body').scrollTop(0);

      }, 3000 )

}

   this.windowScrolling = false;

   this.setup_inicio = function() {

      $('#inicio-categorias .categoria').css({opacity:0}).addClass('op0');

      $(window).scroll(function(){
         if( ! v.windowScrolling ) {
            v.windowScrolling = setTimeout(function(){

               if( u.isElementInView( $('html,body'), $('#inicio-categorias') ) ) {

                  v.categorias_fade_in();

               }

               v.windowScrolling = false;
            },200)
         }
      })

   }

   this.categorias_fade_in = function(){
      var categorias = $('#inicio-categorias .categoria');
      v.categoria_fade_in();
   }

   this.categoria_fade_in = function() {

      categorias_faltantes = $('#inicio-categorias .categoria.op0');

      var siguiente = categorias_faltantes.eq( Math.floor( Math.random() * categorias_faltantes.length ));

      setTimeout(function() {

         siguiente.animate({opacity:1},500,function(){
            //
            siguiente.removeClass('op0');
            //
            v.categoria_fade_in();

         });

      }, 700 );

   }

   this.setup_blazy = function() {

      bLazy = new Blazy({
         success: function(img) {

            jimg = $(img);

            if(jimg.parent().hasClass('imagen') ){

               if( ! jimg.parent().hasClass('imgLiquid') ) {
                  jimg.parent().addClass('imgLiquid imgLiquidFill')
               }

               jimg.parent().removeClass('op0')

               jimg.parent().imgLiquid();

            }
         }

      });

   }


   console.log( "Vientos - v.0.1" );


}


jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    return jQuery(this[randomIndex]);
};
