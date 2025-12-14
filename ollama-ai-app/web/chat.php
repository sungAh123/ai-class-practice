<?php
  header("Content-Type: application/json");

  // 클라이언트로부터 JSON 입력 받기
  $input = json_decode(file_get_contents('php://input'), true);
  $prompt = $input['prompt'] ?? '';

  if(empty($prompt)) {
    echo json_encode(['error' => 'No prompt provided']);
    exit;
  }

  // Ollama API 요청용 JSON
  $data = json_encode([
    'model' => 'llama3.2',  // 다운로드한 모델 이름 사용
    'prompt' => $prompt,
    'stream' => false       // 스트리밍 해제
  ]);

  // PHP 내장 함수 file_get_contents 와 stream_context_create 사용
  $options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json\r\n',
        'content' => $data
    ]
];

$context = stream_context_create($options);
$response = file_get_contents(
    'http://ollama:11434/api/generate',
    false,
    $context
);

// 그대로 클라이언트로 반환
echo $response
    