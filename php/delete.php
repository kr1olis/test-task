<?php 
$willRemove = htmlspecialchars($_POST['file']); 
$param = "./files/" . ($willRemove);
unlink($param);
echo 'file succesfuly removed';
echo "<a href='./index.html'> get back</a>"
?>