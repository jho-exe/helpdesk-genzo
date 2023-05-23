<?php

    $apikey = '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';

    $data = [
        'model' => 'text-davinci-002',
        'prompt' => 'Que es PHP?',
        'temperature' => 0.7,
        'max_tokens' => 300,
        'n' => 1,
        'stop' => ['\n']
    ];

    $ch = curl_init('https://api.openai.com/v1/completions');
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apikey
    ));

    $response = curl_exec($ch);
    $responseArr = json_decode($response, true);

    echo $responseArr['choices'][0]['text'];

?>