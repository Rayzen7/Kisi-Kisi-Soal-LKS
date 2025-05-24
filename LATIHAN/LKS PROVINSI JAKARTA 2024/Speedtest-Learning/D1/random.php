<?php

$names = [
    'Charlotte',
    'Megan',
    'Sophie',
    'Emily',
    'Jessica',
    'Lucy',
    'Chloe',
    'Olivia',
    'Hannah',
    'Ellie',
    'Katie',
    'Ella',
    'Amelia',
    'Amy',
    'Holly',
    'Grace',
    'Alice',
    'Daisy',
    'Isabella',
    'Paige',
    'Caitlin',
    'Anna',
    'Leah',
    'Millie',
    'Molly',
    'Oliver',
    'Joseph',
    'Harry',
    'Joshua',
    'James',
    'William',
    'Samuel',
    'Daniel',
    'Jack',
    'Thomas',
    'Matthew',
    'Luke',
    'Ethan',
    'Lewis',
    'Benjamin',
    'Mohammed',
    'Callum',
    'Alexander',
    'Louis',
    'Harrison',
    'Edward',
    'Brandon',
    'Jacob',
    'Michael',
    'Liam'
];

$data = [];
$bars = mt_rand(5, 15);
for ($i = 0; $i < $bars; $i++) {
    shuffle($names);
    $data[] = [
        'name' => array_pop($names),
        'value' => mt_rand(50, 500)
    ];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D1 Speedtest</title>
    <style>
        body {
            font-family: 'poppins';
        }

        h3 {
            font-size: 36px;
        }

        canvas {
            max-width: 800px;
            max-height: 400px;
        }
    </style>
</head>
<body>
    <h3>Random Bar</h3>
    <canvas id="chart" width="300" height="300"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const canvas = document.getElementById('chart');
        const ctx = canvas.getContext('2d');
        
        const dataFromPHP = <?php echo json_encode($data); ?>;
        const labels = dataFromPHP.map((label) => label.name);
        const values = dataFromPHP.map((value) => value.value);

        const colors = [
            'red', 'blue', 'purple', 'yellow', 'orange', 'pink', 'green'
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Jumlah nilai acak',
                    data: values,
                    backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                    borderColor: '#000',
                    borderWidth: 1
                }]
            }
        });
    </script>
</body>
</html>
