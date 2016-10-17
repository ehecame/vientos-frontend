
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
      u.addWindowResizeFunction( u.squareH );
      u.addWindowResizeFunction( u.verticalCenter );
      u.addWindowResizeFunction( function() {
//    checa ventana
//    si es movil
// sirve estas imagenes
      // if( $(window).width() < 640 ) {
      //    $('img').each(function(){
      //       $(this).attr('src','apuntar a movil')
      //    })
      // }

      } );

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
               if( u.isElementInView( $('html,body'), $('#inicio-colaboracion-conceptos') ) ) {

                  v.animarConceptosColaboracion();

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

   this.animarConceptosColaboracion = function() {
      var conceptos = $('.concepto-colaboracion');

      conceptos.hide();

      var canvasW = $(window).width();
      var canvasH = $(window).height() / 2;
      $('#inicio-colaboracion-conceptos').height( canvasH );
      $('#inicio-colaboracion-conceptos').css({ position: 'relative' });
      fonts = ['font-xs','font-s','font-m','font-l','font-xl'];
      colors = [
         'concepto-color-1','concepto-color-2','concepto-color-3',
         'concepto-color-4','concepto-color-5','concepto-color-6',
      ];
      setInterval(function(){

         var concepto = conceptos.eq( Math.floor(Math.random()*conceptos.length) );

         concepto.addClass("abs");
         concepto.css({
            top: Math.random() * canvasH / 2,
            left: Math.random() * canvasW / 2,
            width: 150+Math.random()*($(window).width()/4),
         });

         concepto.addClass( fonts[Math.floor(Math.random()*fonts.length)] );
         concepto.addClass( colors[Math.floor(Math.random()*colors.length)] );

         concepto.fadeIn(300,function(){
            concepto.fadeOut(7500)
         })

      }, 2500 )

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
