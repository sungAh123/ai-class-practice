document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("promptForm");
  const promptInput = document.getElementById("promptInput");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const prompt = promptInput.value.trim();
    if (!prompt) {
      resultDiv.textContent = "질문을 입력해주세요.";
      return;
    }

    resultDiv.textContent = "응답을 기다리는 중...";

    try {
      const response = await fetch("../index.php", {
        // PHP 파일 경로
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        resultDiv.textContent = "오류: " + data.error;
      } else {
        // Gemini API 응답 텍스트 표시
        const text =
          data.candidates?.contents?.parts?.[0]?.text || "응답이 없습니다.";
        resultDiv.textContent = text;
      }
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "서버 요청 중 오류가 발생했습니다.";
    }
  });
});
