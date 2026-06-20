const sendMessage = async (voiceInput?: string) => {
  const text = voiceInput || input;
  if (!text.trim() || isLoading) return;

  const userMsg = { role: 'user', content: text };
  const newMessages = [...messages, userMsg];

  setMessages(newMessages);
  setInput('');
  setIsLoading(true);

  setMessages(prev => [...prev, { role: 'assistant', content: 'Thinking...' }]);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: newMessages, 
        persona: `${currentPersona.name} - ${currentPersona.title}` 
      }),
    });

    const data = await res.json();
    const reply = data.reply || "Sorry, I couldn't generate a response.";

    setMessages(prev => prev.filter(m => m.content !== 'Thinking...'));
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

    // AI Voice
    const utterance = new SpeechSynthesisUtterance(reply);
    utterance.rate = 0.94;
    window.speechSynthesis.speak(utterance);

  } catch (error) {
    setMessages(prev => prev.filter(m => m.content !== 'Thinking...'));
    setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, please try again." }]);
  } finally {
    setIsLoading(false);
  }
};