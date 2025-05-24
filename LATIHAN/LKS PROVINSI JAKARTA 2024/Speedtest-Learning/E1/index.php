<?php
    $actualAnswers = file('actualAnswers.csv' ?? null);
    $submittedAnswers = file('submittedAnswers.csv' ?? null);    
    $score = 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E1 Speedtest</title>
    <style>
        .table thead tr th,
        .table tbody tr td {
            border: 2px solid black;
            padding: 10px;
            font-size: 14px;
        }

        body {
            font-family: 'poppins';
        }
    </style>
</head>
<body>
    <table class="table" style="border-collapse: collapse;">
        <thead>
            <tr>
                <th>Question</th>
                <th>Actual Answer</th>
                <th>Submitted Answer</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $total = 10;
                for ($i=0; $i < $total; $i++) { 
                    $actual = $actualAnswers[$i];
                    $submited = $submittedAnswers[$i];

                    if ($actual == $submited) {
                        $score++;
                    }

                    echo '<tr>';
                        echo '<td>' . ($i + 1) . '</td>';
                        echo '<td>' . htmlspecialchars($actual) . '</td>';
                        echo '<td>' . htmlspecialchars($submited) . '</td>';
                    echo '</tr>';
                }
            ?>
        </tbody>
    </table>
    <?php
        echo "<p>" . "Score : " . $score . "/10" . "</p>";
    ?>
</body>
</html>