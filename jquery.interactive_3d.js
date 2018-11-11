/* ===========================================================
 * jquery.interactive_3d.js v1.2
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 * Updated by Alexey Bochenko for using with 1+ folders3d
 * Create a 3D interactive object using images as frames
 * v1.2 include 3dhelper.interactive3d.js & interactive3d.php
 *
 * https://github.com/peachananr/interactive_3d (v1.1)
 * https://github.com/davilalexius/interactive3d(v1.2)
 * ========================================================== */
intervals=[];
!function($){
  
  var defaults = {
    frames: 19,
    cursor: "move",
    speed: 0,
    entrance: true,
    preloadImages: true,
    touchSupport: true,
    loading: "Loading..",
    autoPlay: 150
	};
	
	function touchHandler(event) {
      var touch = event.changedTouches[0];

      var simulatedEvent = document.createEvent("MouseEvent");
          simulatedEvent.initMouseEvent({
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup"
      }[event.type], true, true, window, 1,
          touch.screenX, touch.screenY,
          touch.clientX, touch.clientY, false,
          false, false, false, 0, null);

      touch.target.dispatchEvent(simulatedEvent);
  }
	
	$.fn.preload = function(el) {
	  $("<div class='images_cache'></div>").hide().appendTo(el);
    this.each(function(){
        $('<img/>').attr("src", this).appendTo(".images_cache")
    });
  }
	
	$.fn.drags = function(settings) {
    var $el = undefined;
    $el=this;
    
    return $el.css('cursor', settings.cursor).on("mousedown", function(e) {
        var $drag = $(this).addClass('draggable'),
            cur_pos = e.pageX,
            last_position = {};           
        
        $drag.parents().on("mousemove", function(e) {
            if($('.draggable').length > 0) {
              var src = $el.find("img.my-frame").attr("src"),
                  img_name = src.split('/')[src.split('/').length-1],
                  cur_frame = img_name.split('_')[1].split('.')[0];
                  
              if (typeof(last_position.x) != 'undefined') {
                //get the change from last position to this position
                var deltaX = last_position.x - e.clientX,
                    deltaY = last_position.y - e.clientY;
                
                if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                  if(cur_frame > 1) {
                    setTimeout(function() {
                       var img_name = src.split('/')[src.split('/').length-1]
                       var directory = src.split('/').slice(0, -1).join("/")
                       var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) - 1) + "." + img_name.split('.')[1]
                        $el.find("img.my-frame").attr("src", new_frame)
                    },settings.speed)
                  } else {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/");
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(settings.frames)) + "." + img_name.split('.')[1]
                      $el.find("img.my-frame").attr("src", new_frame)
                    },settings.speed)
                   
                  }
                } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                  if(cur_frame < settings.frames) {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/")
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) + 1) + "." + img_name.split('.')[1]
                        $el.find("img.my-frame").attr("src", new_frame)
                    },settings.speed)
                  } else {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/")
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + 1 + "." + img_name.split('.')[1]
                      $el.find("img.my-frame").attr("src", new_frame)
                    },settings.speed)
                  }
                }
              }    
                  
              last_position = {
                  x : e.clientX,
                  y : e.clientY
              };
            }
            $(".draggable").on("mouseup", function() {
                $(this).removeClass('draggable')
            });
        });
        e.preventDefault(); // disable selection
    }).on("mouseup", function() {
      $(this).removeClass('draggable');
    });
  }

  $.fn.interactive_3d = function(options){
      clearingIntervals();
    var settings = $.extend({}, defaults, options),
        el = $(this);
        el.find(" > img").addClass("my-frame");
        el.drags(settings), 
        x = 0,
        step = 100 / parseInt(settings.frames),
        cur_frame = el.find("img.my-frame").attr("src").split('_')[1].split('.')[0];
    
    function animate_3d() {
      var src = el.find("img.my-frame").attr("src");
      el.find("img.my-frame").css("opacity", (x * step)/100);
      if(cur_frame < settings.frames) {
           setTimeout(function() {
          var img_name = src.split('/')[src.split('/').length-1]
          var directory = src.split('/').slice(0, -1).join("/");
              clearTimeout(this);
                  var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) + 1) + "." + img_name.split('.')[1]
                  el.find("img.my-frame").attr("src", new_frame);
                  cur_frame=parseInt(cur_frame) + 1;
        },settings.speed);
      } else {
          setTimeout(function() {
          var img_name = src.split('/')[src.split('/').length-1]
          var directory = src.split('/').slice(0, -1).join("/")
                  var new_frame = directory + "/" + img_name.split('_')[0] + "_" + 1 + "." + img_name.split('.')[1]
                  el.find("img.my-frame").attr("src", new_frame)
                  cur_frame = 1;
        },settings.speed);
      }
      if (x++ < (settings.frames - 1)) {
          if (settings.autoPlay != false) {
             xtimer3d=setTimeout(animate_3d,  0);
          } else {
              xtimer3d=setTimeout(animate_3d,  (x * 1.5));
          }
      }
    }

    if (settings.entrance == true && settings.autoPlay == false ) {
      if (settings.loading == false && settings.autoPlay == false) animate_3d(); 
    }
    
    if (settings.touchSupport == true) {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }

    if (settings.preloadImages == true) {

      var src = el.find("img.my-frame").attr("src");
      arr = []
      for (var i = 1; i < settings.frames + 1; i++) {
        var img_name = src.split('/')[src.split('/').length-1]
        var directory = src.split('/').slice(0, -1).join("/")
        arr.push(directory + "/" + img_name.split('_')[0] + "_" + i + "." + img_name.split('.')[1])
      }
      $(arr).preload(el);
      
      if (settings.loading != false) {
        var imgs = $(".images_cache > img").not(function() { return this.complete; });
        var count = imgs.length;
        el.append("<div class='loading_3d'>" + settings.loading + "</div>");
        el.find(".my-frame").css("visibility", "hidden");
        if (count) {
            imgs.load(function() {
                count--;
                if (!count) {
                    el.find(".my-frame").css("visibility", "visible");
                    el.find(".loading_3d").remove();
                    if (settings.autoPlay == false) animate_3d();
                }
            });
        } else {
          el.find(".my-frame").css("visibility", "visible");
          el.find(".loading_3d").remove();
          if (settings.autoPlay == false) animate_3d();
        }
      }
    }
    
    if (settings.autoPlay != false) {
      function intervalTrigger() {
         return window.setInterval( function() {
          animate_3d();
        }, settings.autoPlay );
      };
        window.intervals.push(intervalTrigger());
      el.mouseenter(function() {
          clearingIntervals();
      }).mouseleave(function() {
          for(i=0;i<intervals.length;i++){
              window.clearInterval(intervals[i]);
          }
          window.intervals=[];
           window.intervals.push(intervalTrigger());
      });
    }
    //Чистим интервалы
    function clearingIntervals() {
        for(i=0;i<intervals.length;i++){
            window.clearInterval(intervals[i]);
        }
        window.intervals=[];
    }
  }
}(window.jQuery);

/* Это скрипт для странички с 3D default
<script type="text/javascript">
    jQuery(function($) {
        $("#i3d").interactive_3d({
            frames: 20, //количество картинок, чем больше, тем плавнее анимация.
            cursor: "move", // The CSS-стиль курсора. По-умолчанию "move"
            speed: 0, // Скорость вращения в миллисекундах. Если у вас мало кадров  и вращение слишком быстро и не плавное  увеличте до  50 - 100 . По-умолчанию 0.
            entrance: true, // Входная анимация. Напишите false чтоб выключить. The default value is true.
            preloadImages: true, // Позволить загрузить все кадры до анимации.
            touchSupport: true, // Разрешить touch events для мобильных. Если противоречия с сайтом- выключайте.  По умолчанию true.
            loading: "Loading..", // Это работает толь ко если  preloadImages is true.
            //Эта опция покажет индикатор загрузки пока скрипт загружает картинки. Опция поддерживает HTML.
            //Напишите false чтоб выкл. По умолчанию "Loading.."
            autoPlay: false //автопрокрутка, либо false, либо скорость смены в миллисекундах
        });
    });
</script>*/
/* Это функция для подсчета колчичества файлов в загружаемой папке 3d
*для нормального функционирования скрипта должна быть в interactive3d.php,
* либо вызвана через include  из другого php  файла посредством interactive3d.php
function counting()
{
    $dir=stripslashes($_POST['src']);
    $temp=explode("/",$dir);
    $dir=$_SERVER['DOCUMENT_ROOT'] ."/".implode("/",array_slice($temp,3,2));
    $files = opendir ("$dir"); // открываем директорию
    $i = 0; // создаём переменную для цикла
    while (false !== ($file = readdir($files))) {

// ниже указываем расширение файла. Вместо jpg выбираете нужный
        if (strpos($file, '.jpg',1) ) {
            $i++;
        }
    }
    echo $i;}
}*/
