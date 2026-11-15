import { useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Plus, RefreshCw, Copy, Eye } from 'lucide-react'

const INITIAL_CANDIDATES = [
  { id: 1, name: "O'ktamjonova Dilzoda", region: "O'rta chirchiq tumani", votes: 2 },
  { id: 2, name: "Abdukarimov Ulug'bek", region: "Olmaliq shahar", votes: 1 },
  { id: 3, name: "Tursunov Sardorbek", region: "Bekobod shahar", votes: 2 },
  { id: 4, name: "Karimova Nasiba", region: "Yangiyo'l tumani", votes: 7 },
  { id: 5, name: "Xajimetov Javohir", region: "Chirchiq shahar", votes: 3 },
]

const INITIAL_REACTIONS = [
  { emoji: '⭐', count: 1, userReacted: false },
  { emoji: '❤️', count: 8, userReacted: false },
  { emoji: '🔥', count: 5, userReacted: false },
  { emoji: '💖', count: 3, userReacted: false },
  { emoji: '🎉', count: 1, userReacted: false },
  { emoji: '🤩', count: 1, userReacted: false },
]

export default function TelegramPoll() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES)
  const [reactions, setReactions] = useState(INITIAL_REACTIONS)
  const [userVotedId, setUserVotedId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [views, setViews] = useState(720)
  const [newCandidateName, setNewCandidateName] = useState('')
  const [newCandidateRegion, setNewCandidateRegion] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 2500)
  }

  const handleVote = (id) => {
    if (userVotedId === id) {
      // Retract vote
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, votes: Math.max(0, c.votes - 1) } : c))
      )
      setUserVotedId(null)
      showToast('Ovozingiz bekor qilindi')
    } else {
      // Vote or change vote
      setCandidates((prev) =>
        prev.map((c) => {
          if (c.id === id) return { ...c, votes: c.votes + 1 }
          if (c.id === userVotedId) return { ...c, votes: Math.max(0, c.votes - 1) }
          return c
        })
      )
      if (userVotedId === null) {
        setViews((v) => v + 1)
      }
      setUserVotedId(id)
      const cand = candidates.find((c) => c.id === id)
      showToast(`Ovozingiz qabul qilindi: ${cand?.name || ''}`)
    }
  }

  const handleReaction = (emoji) => {
    setReactions((prev) =>
      prev.map((r) => {
        if (r.emoji === emoji) {
          const nextReacted = !r.userReacted
          return {
            ...r,
            userReacted: nextReacted,
            count: nextReacted ? r.count + 1 : Math.max(0, r.count - 1),
          }
        }
        return r
      })
    )
  }

  const handleReset = () => {
    setCandidates(INITIAL_CANDIDATES)
    setReactions(INITIAL_REACTIONS)
    setUserVotedId(null)
    showToast('Natijalar asl holatiga qaytarildi')
  }

  const handleAddCandidate = (e) => {
    e.preventDefault()
    if (!newCandidateName.trim()) return

    const newId = candidates.length > 0 ? Math.max(...candidates.map((c) => c.id)) + 1 : 1
    const newCand = {
      id: newId,
      name: newCandidateName.trim(),
      region: newCandidateRegion.trim() || 'Tuman/Shahar',
      votes: 0,
    }

    setCandidates((prev) => [...prev, newCand])
    setNewCandidateName('')
    setNewCandidateRegion('')
    setShowAddModal(false)
    showToast(`Yangi nomzod qo&apos;shildi: ${newCand.name}`)
  }

  const copyPollText = () => {
    let text = `Toshkent sardorlari Bolalar tashkiloti sardorlari\n📊 Eng faol tuman/shahar sardori kim?\n\n`
    candidates.forEach((c, i) => {
      text += `${i + 1}. ${c.name} (${c.region}) — ${c.votes}\n`
    })
    text += `\nOvoz berish uchun variantni tanlang:`

    navigator.clipboard.writeText(text)
    setCopied(true)
    showToast('So&apos;rovnoma matni nusxalandi!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="telegram-poll" className="py-16 px-4 relative z-10 my-12">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="eyebrow-pill mb-3 inline-flex">Interaktiv Demo</span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mb-2">
            Telegram <span className="text-gradient">Ovoz Berish Tizimi</span>
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Telegram kanallaridagi so&apos;rovnoma posti bilan jonli muloqot qiling. Variantni tanlab ovoz bering!
          </p>
        </div>

        {/* Telegram Card Container */}
        <div className="relative rounded-2xl bg-[#17212b] border border-[#2b394a] shadow-2xl p-4 md:p-6 text-white font-sans overflow-hidden max-w-xl mx-auto">
          {/* Channel Title Header */}
          <div className="flex items-center justify-between mb-3 border-b border-[#242f3d] pb-2">
            <span className="text-[#38bdf8] font-semibold text-sm md:text-base tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
              Toshkent sardorlari Bolalar tashkiloti sardorlari
            </span>
          </div>

          {/* Poll Question */}
          <div className="mb-4">
            <h3 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
              📊 Eng faol tuman/shahar sardori kim?
            </h3>
          </div>

          {/* Candidates List with Live Votes */}
          <div className="space-y-1.5 my-4 text-sm md:text-base text-gray-200">
            {candidates.map((candidate, idx) => (
              <div
                key={candidate.id}
                className={`py-1 px-2 rounded transition-colors ${
                  userVotedId === candidate.id ? 'bg-[#2b394a]/60 font-semibold text-cyan-300' : ''
                }`}
              >
                <span>
                  {idx + 1}. {candidate.name} ({candidate.region})
                </span>
                <span className="text-gray-400"> — </span>
                <span className="font-bold text-white">{candidate.votes}</span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm text-gray-400 mb-4 mt-6">
            Ovoz berish uchun variantni tanlang:
          </p>

          {/* Reactions Bar */}
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-5 pb-3 border-b border-[#242f3d]">
            {reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => handleReaction(r.emoji)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                  r.userReacted
                    ? 'bg-[#2b5278] border border-[#38bdf8] text-white scale-105'
                    : 'bg-[#242f3d] hover:bg-[#2b394a] text-gray-300'
                }`}
              >
                <span>{r.emoji}</span>
                {r.count > 0 && <span className="font-medium text-xs">{r.count}</span>}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 pl-2">
              <span className="flex items-center gap-1">
                <Eye size={13} className="text-gray-400" />
                {views}
              </span>
              <span>edited 15:20</span>
            </div>
          </div>

          {/* Inline Keyboard Candidate Buttons */}
          <div className="space-y-2">
            {candidates.map((candidate, idx) => {
              const isSelected = userVotedId === candidate.id
              return (
                <button
                  key={candidate.id}
                  onClick={() => handleVote(candidate.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-between transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#2b5278] border-[#38bdf8] text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#242f3d] border-transparent text-gray-200 hover:bg-[#2b394a] hover:border-[#38bdf8]/40'
                  }`}
                >
                  <span className="truncate pr-2 text-left">
                    {idx + 1}. {candidate.name} ({candidate.region})
                  </span>
                  <span className="shrink-0 text-gray-300 flex items-center gap-1">
                    {isSelected ? (
                      <Check size={16} className="text-[#38bdf8]" />
                    ) : (
                      <ArrowUpRight size={16} className="opacity-80" />
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Toast Alert */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-2.5 bg-[#38bdf8]/20 border border-[#38bdf8]/50 text-[#38bdf8] text-xs md:text-sm rounded-lg text-center font-medium"
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls for Demo */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-outline !py-2 !px-4 !text-xs flex items-center gap-1.5"
          >
            <Plus size={14} /> Nomzod qo&apos;shish
          </button>
          <button
            onClick={handleReset}
            className="btn-outline !py-2 !px-4 !text-xs flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Natijalarni tiklash
          </button>
          <button
            onClick={copyPollText}
            className="btn-outline !py-2 !px-4 !text-xs flex items-center gap-1.5"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Nusxalandi!' : 'Post matnini nusxalash'}
          </button>
        </div>

        {/* Add Candidate Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#17212b] border border-[#2b394a] p-6 rounded-2xl w-full max-w-md text-white shadow-2xl"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-[#38bdf8]" /> Yangi nomzod qo&apos;shish
                </h3>
                <form onSubmit={handleAddCandidate} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      F.I.SH (Nomzod ismi)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="masalan: Qodirov Jamshid"
                      value={newCandidateName}
                      onChange={(e) => setNewCandidateName(e.target.value)}
                      className="w-full bg-[#242f3d] border border-[#2b394a] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Tuman / Shahar
                    </label>
                    <input
                      type="text"
                      placeholder="masalan: Chirchiq shahar"
                      value={newCandidateRegion}
                      onChange={(e) => setNewCandidateRegion(e.target.value)}
                      className="w-full bg-[#242f3d] border border-[#2b394a] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs rounded-lg bg-[#242f3d] hover:bg-[#2b394a] text-gray-300"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs rounded-lg bg-[#38bdf8] text-slate-950 font-bold hover:bg-[#38bdf8]/90"
                    >
                      Qo&apos;shish
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
