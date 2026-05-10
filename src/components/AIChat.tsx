"use client"

import { useState } from "react"
import { Sparkles, Send, Loader2, Bot } from "lucide-react"

export default function AIChat(){
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage(){
    if (!message.trim()) return;
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      })

      const data = await res.json()
      setReply(data.reply)
    } catch (e) {
      console.error(e)
      setReply("Network error: The void is unresponsive.")
    } finally {
      setLoading(false)
    }
  }

  return(
    <div className="bg-zinc-900 p-8 rounded-2xl border border-mine-800 space-y-6">
      <div className="flex items-center gap-3 border-b border-mine-800 pb-4">
        <div className="p-2 bg-cyan-400/10 rounded-lg">
          <Bot className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl text-white font-bold">DM Assistant</h2>
          <p className="text-xs text-zinc-500 font-mono">INTELLIGENCE_CORE_V2</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something about the DM ecosystem..."
            className="w-full bg-black border border-mine-800 p-4 rounded-xl text-white font-mono outline-none focus:border-green-400 transition-colors pr-12"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-800 rounded-lg transition-colors text-green-400 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>

        {reply && (
          <div className="p-6 bg-black/50 border border-green-400/20 rounded-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">Assistant Reply</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-mono">
              {reply}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button 
          onClick={() => { setMessage("Analyze active governance proposal #142."); }}
          className="text-[10px] font-mono text-zinc-500 hover:text-green-400 transition-colors border border-mine-800 px-2 py-1 rounded"
        >
          GOV_ANALYSIS
        </button>
        <button 
          onClick={() => { setMessage("Give me a market movement summary."); }}
          className="text-[10px] font-mono text-zinc-500 hover:text-green-400 transition-colors border border-mine-800 px-2 py-1 rounded"
        >
          MARKET_STATUS
        </button>
        <button 
          onClick={() => { setMessage("How do I stake DM?"); }}
          className="text-[10px] font-mono text-zinc-500 hover:text-green-400 transition-colors border border-mine-800 px-2 py-1 rounded"
        >
          STAKE_INFO
        </button>
        <button 
          onClick={() => { setMessage("What is the current token value?"); }}
          className="text-[10px] font-mono text-zinc-500 hover:text-green-400 transition-colors border border-mine-800 px-2 py-1 rounded"
        >
          TOKEN_VAL
        </button>
      </div>
    </div>
  )
}
