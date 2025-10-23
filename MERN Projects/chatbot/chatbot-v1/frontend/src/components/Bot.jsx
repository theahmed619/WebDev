import React, { useEffect, useRef, useState } from 'react'
import { Send, Menu, Settings, MessageCircle } from 'lucide-react'

function Bot() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async () => {
        setLoading(true)
        if (!input.trim()) {
            setLoading(false)
            return
        }
        try {
            const userMsg = input
            const res = await fetch("https://devai-backend.onrender.com/bot/v1/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userMsg })
            })
            if (res.ok) {
                const data = await res.json()
                setMessages([
                    ...messages,
                    { text: data.userMessage, sender: 'user' },
                    { text: data.botMessage, sender: 'bot' }
                ])
                setInput("")
            }
        } catch (error) {
            console.log("Error sending message:", error)
        }
        setLoading(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden'>
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 z-10 shadow-xl">
                <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <MessageCircle size={24} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">DevAI</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <Settings size={20} className="text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <Menu size={20} className="text-slate-400" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto pt-20 pb-32 flex items-stretch justify-center">
                <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-8 py-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <MessageCircle size={48} className="text-white" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Welcome to DevAI
                                </h2>
                                <p className="text-slate-400 text-lg max-w-md">
                                    Your AI-powered development assistant. Ask me anything about coding, debugging, or development best practices.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 max-w-2xl">
                                {['💻 Code Help', '🐛 Debug Issues', '📚 Learn Tips'].map((item, idx) => (
                                    <div key={idx} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 transition-colors cursor-pointer">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                                >
                                    <div
                                        className={`px-5 py-3 rounded-2xl max-w-[75%] text-base leading-relaxed backdrop-blur-sm ${
                                            msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-500/20 rounded-br-none'
                                                : 'bg-slate-800/80 border border-slate-700/50 text-slate-100 shadow-lg shadow-slate-900/20 rounded-bl-none'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start mb-2">
                                    <div className="px-5 py-3 bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-bl-none shadow-lg shadow-slate-900/20">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </main>

            {/* Input Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 via-slate-950 to-transparent border-t border-slate-700/50 z-10">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex gap-3 bg-slate-800/60 backdrop-blur-md rounded-2xl px-4 py-2 border border-slate-700/50 shadow-2xl shadow-slate-900/50 focus-within:border-cyan-500/50 transition-colors">
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 px-2 text-base"
                            placeholder="Ask DevAI anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading || !input.trim()}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 px-4 py-2 rounded-xl text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center gap-2"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-3">Powered by DevAI • Press Enter to send</p>
                </div>
            </footer>
        </div>
    )
}

export default Bot