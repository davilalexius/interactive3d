<?php
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
    echo $i;
}
    ?>