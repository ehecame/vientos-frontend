//
// $(document).ready(function(){
//
//    hexgrid = new HexGrid();
//
//    hexgrid.addContents( $('.hex-grid').children().detach() );
//
//
// })



function HexGrid() {

   hexgrid = this;

   this.resizing = false;


   this.resizing = false;

   this.contents = null;

   this.defaultBreakpoint = {
      breakpoint: 0,
      settings: {
         maxRowItems: 2,
         spacing: 2
      }
   };

   this.breakpoints = [
      {
         breakpoint: 320,
         settings: {
            maxRowItems: 4,
            spacing: 2
         }
      },
      {
         breakpoint: 640,
         settings: {
            maxRowItems: 4,
            spacing: 5
         }
      },
      {
         breakpoint: 960,
         settings: {
            maxRowItems: 5,
            spacing: 10
         }
      },
      {
         breakpoint: 1024,
         settings: {
            maxRowItems: 9,
            spacing: 25
         }
      },
      {
         breakpoint: 1280,
         settings: {
            maxRowItems: 11,
            spacing: 20
         }
      },
      {
         breakpoint: 1600,
         settings: {
            maxRowItems: 14,
            spacing: 35
         }
      }
   ];


   this.setup = function() {

      hexgrid.setup_resize();
      $(window).trigger('resize');


      console.log("HexGrid ready");

   }

   this.addContents = function( contents ) {

      hexgrid.contents = contents;

   };




   this.setup_resize = function() {

      $(window).resize(function(){

         if( ! hexgrid.resizing ) {

            hexgrid.resizing = setTimeout(function(){

               wW = $('.hex-grid').width();

               // first check if below smalles breakpoint:
               if( wW < hexgrid.breakpoints[0].breakpoint ) {

                  hexgrid.createHexagons( hexgrid.defaultBreakpoint );

               } else if( wW > hexgrid.breakpoints[ hexgrid.breakpoints.length - 1 ].breakpoint ) {

                  hexgrid.createHexagons( hexgrid.breakpoints[ hexgrid.breakpoints.length - 1 ] );

               } else {

                  for( var i = 0; i < hexgrid.breakpoints.length; i++ ) {

                     if( wW >= hexgrid.breakpoints[i].breakpoint ) { //}&& $(window).width() > hexgrid.breakpoints[i] ) {
                        if( i < hexgrid.breakpoints.length - 1 ) {

                           if( wW < hexgrid.breakpoints[ i + 1 ].breakpoint ) {

                              hexgrid.createHexagons( hexgrid.breakpoints[i] );

                           }

                        } else {

                           hexgrid.createHexagons( hexgrid.breakpoints[i] );

                        }

                     }


                  }

               }

               hexgrid.resizing = false;

            }, 150 );

         }
      })

      $(window).trigger('resize')

   }

   this.addNewRow = function() {

      var newRow = $('<div>');

      newRow.addClass('hexagon-row');

      if( ( $('.hex-grid').find('.hexagon-row').length % 2 ) == 0 )
      newRow.addClass('even');

      $('.hex-grid').append( newRow );

      return newRow;

   }
   this.createHexagons = function( breakpoint ) {

      var settings = breakpoint.settings;

      $('.hex-grid').html('')

      var numAdded = 0;
      var lastRow = hexgrid.addNewRow();


      if( ! lastRow.hasClass('even') ) lastRow.css({marginLeft:breakpoint.settings+lastRow.css('marginLeft')})
      for ( var i = 0; i < hexgrid.contents.length; i++ ) {

         if( numAdded >= settings.maxRowItems  - ( 1 - $('.hex-grid').find('.hexagon-row').length % 2 ) ) {

            lastRow = hexgrid.addNewRow();
            numAdded=0;

         }


         var hex = $('<div>');

         hex.append( $('<div>').addClass('pre') );
         hex.append( $('<div>').addClass('middle') );
         hex.append( $('<div>').addClass('post') );
         hex.append( $('<div>').addClass('contents') );

         hex.addClass( "hexagon" );
         var maxW = Math.floor( $('.hex-grid').width() / settings.maxRowItems );
console.log( $('.hex-grid').width() , maxW, maxW * settings.maxRowItems);

         var hexW = maxW - ( settings.spacing );

         hex.width( hexW ).height( hexW );

         hex.css({
            marginTop: (( ( hexW / 2 ) / Math.sqrt(3) ) * -2) + settings.spacing,
            marginLeft: settings.spacing / 2,
            // marginRight: settings.spacing / 2
         });


         hex.css({

            width: hexW,
            height: ( ( hexW / 2 ) / Math.sqrt(3) ) * 2,
         });

         hex.find('.pre, .post').css({
            borderLeft: ( hexW / 2 ) + "px solid transparent",
            borderRight: ( hexW / 2 ) + "px solid transparent",
         });

         hex.find('.middle').css({
            height: ( ( hexW / 2 ) / Math.sqrt(3) ) * 2
         });

         hex.find('.pre').css({
            borderBottom: ( hexW / 2 ) / Math.sqrt(3) + "px solid #64C7CC",
         });
         hex.find('.post').css({
            borderTop: ( hexW / 2 ) / Math.sqrt(3) + "px solid #64C7CC",
         });


         /*
         height: 173.21px;
         border-left: 150px solid transparent;
         border-right: 150px solid transparent;
         border-bottom: 86.60px solid #64C7CC;
         border-top: 86.60px solid #64C7CC;
         margin-left: 150px;
         margin-bottom: 100px;
         */

         hex.find('.contents').html( $(hexgrid.contents[i]).width('90%').height('100%').css({margin:0, paddingLeft:0}) );

         lastRow.append( hex );

         numAdded++;

         hex.show()

      }

      var offsetL = ( $('.hex-grid').width() - ( maxW * breakpoint.settings.maxRowItems ) );

      $('.hexagon-row').css({
         marginTop: (parseInt( (maxW / 2) / Math.sqrt(3) ) * -(1/1.5))*2,
         marginBottom: hexW / 2,
         marginLeft: (offsetL + hexW / 2) + breakpoint.settings.spacing/4,
         height: (hexW/2)-settings.spacing,
      })
      $('.hexagon-row.even').css({
         marginLeft: offsetL,
         marginTop: 0
      })

      console.log("TOdO: calcular esto bien:");
      $('.hexagon').css({

         // marginTop: parseInt( (maxW / 6 ) ) * - 1
      })
      // $('.hexagon-row').first().css({
      //    marginTop: 0
      // })

   }


   this.setup();



}
