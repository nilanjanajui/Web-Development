import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

const statusConfig = {
    'overdue': { label: 'Overdue', color: 'bg-red-500 text-white' },
    'almost due': { label: 'Almost Due', color: 'bg-amber-400 text-white' },
    'on track': { label: 'On Track', color: 'bg-[#2D4A3E] text-white' },
}

function SummaryCard({ label, value }) {
    return (
        <div className="bg-white rounded-xl p-5 text-center border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
        </div>
    )
}

function FriendCard({ friend, onClick }) {
    const cfg = statusConfig[friend.status] ?? statusConfig['on track']

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl p-5 flex flex-col items-center gap-2.5 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 select-none"
        >
            <img
                src={friend.picture}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={e => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2D4A3E&color=fff`
                }}
            />
            <p className="font-semibold text-gray-900 text-sm text-center">{friend.name}</p>

            <p className="text-xs text-gray-400">{friend.days_since_contact}d ago</p>

            <div className="flex flex-wrap justify-center gap-1">
                {friend.tags.map(tag => (
                    <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wide bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}>
                {cfg.label}
            </span>
        </div>
    )
}

export default function Home() {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/friends.json')
            .then(res => res.json())
            .then(data => {
                setFriends(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to load friends:', err)
                setLoading(false)
            })
    }, [])

    const onTrack = friends.filter(f => f.status === 'on track').length
    const needAttention = friends.filter(f => f.status !== 'on track').length

    const summaryCards = [
        { label: 'Total Friends', value: friends.length },
        { label: 'On Track', value: onTrack },
        { label: 'Need Attention', value: needAttention },
        { label: 'Interactions This Month', value: 12 },
    ]

    return (
        <>

            <section className="py-14 px-4 text-center">
                <h1 className="text-6xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                    Friends to keep close in your life
                </h1>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the
                    relationships that matter most.
                </p>

                <button className="inline-flex items-center gap-2 bg-[#2D4A3E] hover:bg-[#3D6B59]
                    text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
                    <Plus size={16} />
                    Add a Friend
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
                    {summaryCards.map(card => (
                        <SummaryCard key={card.label} {...card} />
                    ))}
                </div>
            </section>


            <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 mt-5 border-t border-gray-300">
                <h2 className="text-xl font-bold text-gray-900 mb-5 mt-10">Your Friends</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-28 gap-4">
                        <div className="w-10 h-10 border-4 border-[#2D4A3E] border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Loading your friends...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {friends.map(friend => (
                            <FriendCard
                                key={friend.id}
                                friend={friend}
                                onClick={() => navigate(`/friend/${friend.id}`)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}