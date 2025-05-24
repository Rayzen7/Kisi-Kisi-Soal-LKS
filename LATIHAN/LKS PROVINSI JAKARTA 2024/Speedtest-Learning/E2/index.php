<?php
    $factor = isset($_GET['factor']) ? intval($_GET['factor']) : 1;
    $array = range(1, 40);

    echo "<h3>Original Array</h3><pre>";
    foreach ($array as $index => $value) {
        echo "[$index] => $value\n";
    }
    
    echo "</pre>";

    echo "<h3>Modified Array</h3><pre>";
    foreach ($array as $index => $value) {
        if ($value % $factor == 0) {
            echo "[$index] => $value is a multipart of $factor\n";
        } else {
            echo "[$index] => $value\n";
        }
    }
    echo "</pre>";
?>