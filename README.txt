*********************************************************

Create a 3D interactive object using images as frames
*********************************************************
You can say "Thank you" on my mail davilalexius@yahoo.com
or donate some cash 
paypal: paypal.me/davilalexius
webmoney: Z376065341881 usd /R608365776183 rub / E200212647184 eur
phone:+79257168292 (only for cash)
It's a voluntary donation. 
My family will be happy with any amount of cash from you, for the work done.
*********************************************************

Required code:
<div id="i3d">
<img id="my3d1" src="way of first 3d-file/my3d_1.jpg">
</div>
*********************************************************
In file 3dhelper.interactive3d.js

demo=true; //code for demo-mode. false to disable
piece of code for settings 3d:
 $("#i3d").interactive_3d({
     frames: summ, //!!Fills with script! framecount. for best animating use more pictures
      cursor: "move", // The CSS style to indicate what cursor will show when the user hover the object. The default value is "move"
     speed: 0, // The speed of the rotation in milliseconds delay. If you have small number of frames and the rotation seems too fast and not smooth, increase this value to 50 - 100 milliseconds delay. The default value is 0.
     entrance: true, // Entrance Animation. Toggle this to false to turn it off. The default value is true.
     preloadImages: true, // Let the script preload all the frames on initial load. Toggle this to false to turn it off. The default value is true.
	touchSupport: true, // The script support touch events for mobile phones. If this interferes with your website behaviour, you can toggle this to false. The default value is true.
    loading: "Loading..", // This only applies if preloadImages is true. This option let you show a loading indicator while the script is preloading the images. The option accepts HTML. Toggle this to false to turn this off. The default value is "Loading.."
    autoPlay: false // This option will superseded entrance option. The 3D object will start rotating automatically if autoPlay is not false. This option accepts the speed of the rotation in milliseconds delay. The default value is false.
    });

********************************************************
In 3d-folder  use names with a pattern:my3d_N.jpg , where N= numeric, from 1(!!!not from 0);
Example:
images/3d:
my3d_1.jpg
my3d_2.jpg
my3d_3.jpg
********************************************************
If besides the main picture, there are other on page
which you plan to use for 3d, make shure that you add class for them "img3dclass": <img class="img3dclass">

Require jquery!!!!!
Example:
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
