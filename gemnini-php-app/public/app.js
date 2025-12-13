document.getElementById("sendBtn").addEventListener("click", async () => {
  const promptInput = document.getElementById("prompt");
  const resDiv = document.getElementById("response");
  const prompt = promptInput.value.trim();

  if (!prompt) {
    resDiv.textContent = "질문을 입력해주세요.";
    return;
  }

  resDiv.textContent = "AI가 생각 중...";

  try {
    const response = await fetch("../index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("서버 응답 오류");
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "응답이 없습니다.";

    resDiv.textContent = text;
  } catch (err) {
    console.error(err);
    resDiv.textContent = "요청 중 오류가 발생했습니다.";
  }
});
