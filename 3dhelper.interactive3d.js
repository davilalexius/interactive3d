name3D="my3d_1.jpg";//имя первого файла в папке 3d
demo=true;//отключите на своем сайте false
document.addEventListener('DOMContentLoaded', function() {
    jQuery(function($) {
        function scriptURL(filename) {
            var scripts = document.getElementsByTagName('script');
            if (scripts && scripts.length > 0) {
                for (var i in scripts) {
                    if (scripts[i].src && scripts[i].src.match(new RegExp(filename+'\\.js$'))) {
                        return scripts[i].src.replace(new RegExp('(.*)'+filename+'\\.js$'), '$1');
                    }
                }
            }
        };
    $("img.img3dclass").on("click", function(){
        var img3d=document.getElementById('my3d1');
        var currentSource=this.src.split('/').slice(0, -1).join("/");
        this.src=img3d.src.split('/').slice(0, -1).join("/")+("/")+window.name3D;
        img3d.src=currentSource+"/"+window.name3D;
        countFrame(currentSource);
    });
        function countFrame(foolsrc) {
            var phpUrl=scriptURL("3dhelper.interactive3d")+"interactive3d.php";//путь к файлу php
           if (!window.demo){
               $.ajax({
                   type: "POST",
                   url: phpUrl,
                   data: {src:foolsrc},
                   dataType:'text',
                   success: function (data) {
                       var summ= parseInt(data);
                       if($('#i3d').children('.images_cache').length > 0) {
                           $('.images_cache').remove();
                       }
                       var img3d=document.getElementById('my3d1');
                       img3d.src=img3d.src.split('/').slice(0, -1).join("/")+("/")+window.name3D;
                       $("#i3d").interactive_3d({
                           frames: summ,
                           cursor: "move",
                           speed: 0,
                           entrance: false,
                           preloadImages: true,
                           touchSupport: true,
                           loading: "Loading..",
                           autoPlay: 100
                       });
                   }
               });
           }else {
               var summ= 48;
               if($('#i3d').children('.images_cache').length > 0) {
                   $('.images_cache').remove();
               }
               var img3d=document.getElementById('my3d1');
               img3d.src=img3d.src.split('/').slice(0, -1).join("/")+("/")+window.name3D;
               $("#i3d").interactive_3d({
                   frames: summ,
                   cursor: "move",
                   speed: 0,
                   entrance: false,
                   preloadImages: true,
                   touchSupport: true,
                   loading: "Loading..",
                   autoPlay: 100
               });
           }
        }
        var img3d=document.getElementById('my3d1');
        countFrame(img3d.src.split('/').slice(0, -1).join("/"));
    });
});