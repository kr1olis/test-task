<?php
   // Проверяем загружен ли файл
   if(is_uploaded_file($_FILES["filename"]["tmp_name"]))
   {
     // Если файл загружен успешно, перемещаем его
     // из временной директории в конечную
     move_uploaded_file($_FILES["filename"]["tmp_name"], "/home/ubuntu/workspace/html/files/".$_FILES["filename"]["name"]);
     echo '<form action="./index.html"><button type="submit">Get back</button></form>';
   } else {
      echo("Error of file download");
   }
?>