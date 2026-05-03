import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // <-- Import the markdown renderer

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello there! 👋 I am the **IMPETUS 2026** Virtual Assistant. \n\nHow can I help you with the symposium today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: "frontend-user",
          userQuery: userMsg.text
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { id: Date.now(), text: data.reply, sender: 'bot' }]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "Oops! 🔌 I'm having trouble connecting to the server right now. Please try again later.", 
        sender: 'bot',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-[#005596] text-white rounded-full shadow-2xl hover:bg-[#003b69] transition-all transform hover:scale-105 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] bg-white rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`} style={{ height: '600px', maxHeight: 'calc(100vh - 6rem)' }}>
        
        {/* Header */}
        <div className="bg-[#002b4b] p-5 rounded-t-3xl flex justify-between items-center text-white shadow-md z-10 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
              <Bot className="w-7 h-7 text-blue-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-wide">IMPETUS Guide</h3>
              <p className="text-xs text-blue-200 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                Online & Ready
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#f8fafc] space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm mb-1 ${msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gradient-to-br from-[#002b4b] to-[#005596] text-white'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble - Updated with ReactMarkdown */}
              <div className={`max-w-[75%] px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#005596] text-white rounded-2xl rounded-br-sm' 
                    : msg.isError 
                      ? 'bg-red-50 text-red-700 border border-red-100 rounded-2xl rounded-bl-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm'
                }`}
              >
                {/* Apply specific styling to the markdown elements */}
                <div className={`markdown-body ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002b4b] to-[#005596] text-white flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center h-[46px]">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 rounded-b-3xl flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about tickets, deadlines..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#005596]/30 focus:border-[#005596] focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="w-12 h-12 bg-[#005596] text-white rounded-full flex items-center justify-center hover:bg-[#003b69] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-md hover:shadow-lg transform active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
          </button>
        </form>

      </div>
    </>
  );
}
