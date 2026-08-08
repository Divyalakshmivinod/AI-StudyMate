async function callModel(system, userPrompt, maxTokens) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      system,
      prompt: userPrompt,
      maxTokens: maxTokens || 3000
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("AI error:", data);
    throw new Error(data.error || "AI request failed");
  }

  if (!data.text) {
    throw new Error("Empty AI response");
  }

  return data.text;
}
