document.getElementById("send").addEventListener("click", async () => {
  const input = document.getElementById("prompt");
  const chat = document.getElementById("chat");
  const text = input.value.trim();
  if (!text) return;

  // 사용자 메시지 표시
  chat.innerHTML += `<div class="message user">🙋 ${text}</div>`;
  input.value = "";

  try {
    // PHP 백엔드 호출
    const res = await fetch("chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: text,
      }),
    });

    // Ollama 응답 텍스트 받기
    const data = await res.json();

    // 챗봇 응답 표시
    // Ollama 응답 표시
    chat.innerHTML += `<div class="message bot">🤖 ${
      data.response || "(응답 없음)"
    }</div>`;
  } catch (err) {
    chat.innerHTML += `<div class="message bot">(오류 발생: ${err.message})</div>`;
  }

  chat.scrollTop = chat.scrollHeight;
});
