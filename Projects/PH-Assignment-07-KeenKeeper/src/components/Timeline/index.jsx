import { useState } from "react"
import { PhoneCall, MessageSquare, Video, ChevronDown, Handshake, Search, ArrowUpDown } from "lucide-react"
import { useTimeline } from "../../context/TimelineContext"

const typeConfig = {
    Call: { icon: PhoneCall, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
    Text: { icon: MessageSquare, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
    Video: { icon: Video, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
    Meetup: { icon: Handshake, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    })
}

export default function Timeline() {
    const { entries } = useTimeline()
    const [filter, setFilter] = useState('All')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('newest')

    const filterOptions = ['All', 'Call', 'Text', 'Video', 'Meetup']

    const processed = entries
        .filter(e => filter === 'All' || e.type === filter)
        .filter(e => {
            const q = search.toLowerCase()
            return (
                e.friendName.toLowerCase().includes(q) ||
                e.type.toLowerCase().includes(q)
            )
        })
        .sort((a, b) => {
            const diff = new Date(b.date) - new Date(a.date)
            return sortOrder === 'newest' ? diff : -diff
        })

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Timeline</h1>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">

                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or type..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2D4A3E] transition-colors"
                    />
                </div>

                <div className="relative w-full sm:w-44">
                    <button
                        onClick={() => setDropdownOpen(o => !o)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:border-gray-300 transition-colors"
                    >
                        {filter === 'All' ? 'Filter timeline' : `Filter: ${filter}`}
                        <ChevronDown size={15} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
                            {filterOptions.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { setFilter(opt); setDropdownOpen(false) }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                                        ${filter === opt ? 'bg-[#2D4A3E] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setSortOrder(o => o === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:border-gray-300 transition-colors whitespace-nowrap"
                >
                    <ArrowUpDown size={14} />
                    {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
                </button>
            </div>

            {processed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <p className="text-gray-400 text-sm">
                        {search || filter !== 'All' ? 'No entries match your search.' : 'No timeline entries yet.'}
                    </p>
                    {!search && filter === 'All' && (
                        <p className="text-gray-300 text-xs">Go to a friend's page and log a Call, Text, or Video.</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {processed.map(entry => {
                        const config = typeConfig[entry.type] ?? typeConfig['Call']
                        const EntryIcon = config.icon
                        return (
                            <div key={entry.id} className="bg-white rounded-xl px-5 py-4 border border-gray-100 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.iconBg}`}>
                                    <EntryIcon size={18} className={config.iconColor} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">
                                        <span className="font-bold">{entry.type}</span>
                                        {' '}
                                        <span className="text-gray-500">with {entry.friendName}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}