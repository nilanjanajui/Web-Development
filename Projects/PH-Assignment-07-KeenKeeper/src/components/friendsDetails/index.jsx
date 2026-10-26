import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PhoneCall, MessageSquare, Video, Bell, Archive, Trash2, ArrowLeft } from "lucide-react"
import { useTimeline } from "../../context/TimelineContext"

const statusConfig = {
    'overdue': { label: 'Overdue', color: 'bg-red-500 text-white' },
    'almost due': { label: 'Almost Due', color: 'bg-amber-400 text-white' },
    'on track': { label: 'On Track', color: 'bg-[#2D4A3E] text-white' },
}

const toastConfig = {
    Call: { Icon: PhoneCall, color: '#2D4A3E', bg: '#f0f7f4' },
    Text: { Icon: MessageSquare, color: '#3b82f6', bg: '#eff6ff' },
    Video: { Icon: Video, color: '#8b5cf6', bg: '#f5f3ff' },
}

function Toast({ message, type, onClose }) {
    const [width, setWidth] = useState(100)
    const cfg = toastConfig[type] ?? toastConfig['Text']
    const ToastIcon = cfg.Icon

    useEffect(() => {
        const t = setTimeout(onClose, 3200)
        setTimeout(() => setWidth(0), 50)
        return () => clearTimeout(t)
    }, [onClose])

    return (
        <div className="fixed top-6 right-6 z-50 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md w-72">
            <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: cfg.bg }}>
                    <ToastIcon size={16} style={{ color: cfg.color }} />
                </div>
                <span className="text-sm text-gray-800 flex-1">{message}</span>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>
            <div
                className="h-0.5 transition-all ease-linear"
                style={{ width: `${width}%`, background: cfg.color, transitionDuration: '3200ms' }}
            />
        </div>
    )
}

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded-xl p-6 text-center border border-gray-100 flex-1">
            <p className="text-3xl font-bold text-[#2D4A3E]">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
        </div>
    )
}

export default function FriendDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEntry } = useTimeline()
    const [friend, setFriend] = useState(null)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        fetch('/friends.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(f => f.id === parseInt(id))
                setFriend(found)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    const handleCloseToast = useCallback(() => setToast(null), [])

    function handleCheckIn(type) {
        addEntry(type, friend.name)
        setToast({ message: `${type} with ${friend.name}`, type })
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <div className="w-10 h-10 border-4 border-[#2D4A3E] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!friend) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <p className="text-gray-500 text-lg">Friend not found.</p>
                <button onClick={() => navigate('/')} className="text-sm text-[#2D4A3E] underline">
                    Go back home
                </button>
            </div>
        )
    }

    const cfg = statusConfig[friend.status] ?? statusConfig['on track']

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Back
                </button>

                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">

                        <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-center text-center gap-3">
                            <img
                                src={friend.picture}
                                alt={friend.name}
                                className="w-20 h-20 rounded-full object-cover"
                                onError={e => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2D4A3E&color=fff`
                                }}
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{friend.name}</h2>
                                <span className={`inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}>
                                    {cfg.label}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {friend.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 italic">"{friend.bio}"</p>
                            <p className="text-xs text-gray-400">Preferred: email</p>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                            <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <Bell size={15} />
                                Snooze 2 Weeks
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <Archive size={15} />
                                Archive
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                <Trash2 size={15} />
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-4 flex-1 w-full">

                        <div className="flex flex-col sm:flex-row gap-4">
                            <StatCard label="Days Since Contact" value={friend.days_since_contact} />
                            <StatCard label="Goal (Days)" value={friend.goal} />
                            <StatCard label="Next Due" value={formatDate(friend.next_due_date)} />
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900">Relationship Goal</h3>
                                <button className="text-xs border border-gray-200 px-3 py-1 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                                    Edit
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">
                                Connect every <span className="font-bold text-gray-900">{friend.goal} days</span>
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Check-In</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { type: 'Call', icon: PhoneCall },
                                    { type: 'Text', icon: MessageSquare },
                                    { type: 'Video', icon: Video },
                                ].map((item) => {
                                    const CheckInIcon = item.icon
                                    return (
                                        <button
                                            key={item.type}
                                            onClick={() => handleCheckIn(item.type)}
                                            className="flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-gray-200 hover:border-[#2D4A3E] hover:bg-[#f0f7f4] transition-colors text-sm text-gray-700"
                                        >
                                            <CheckInIcon size={20} />
                                            {item.type}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
        </>
    )
}