const API_KEY = import.meta.env.VITE_GROQ_KEY;

async function runChat(prompt) {
  if (!prompt || prompt.trim() === "") {
    return "Please enter something";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ NEW WORKING MODEL
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

   

    if (data.error) {
      return "Error: " + data.error.message;
    }

    return data?.choices?.[0]?.message?.content || "No response";

  } catch (error) {
    console.error(error);
    return "Something went wrong";
  }
}

export default runChat;