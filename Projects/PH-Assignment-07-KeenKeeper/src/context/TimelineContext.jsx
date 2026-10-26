import { createContext, useState, useContext } from "react"

const STORAGE_KEY = "timeline_entries"
const TimelineContext = createContext(null)

export function TimelineProvider({ children }) {
    const [entries, setEntries] = useState(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY)
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    function addEntry(type, friendName) {
        const newEntry = {
            id: crypto.randomUUID(),
            type,
            friendName,
            title: `${type} with ${friendName}`,
            date: new Date().toISOString(),
        }
        setEntries(prev => {
            const updated = [newEntry, ...prev]
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
            } catch {
                // storage quota exceeded or unavailable
            }
            return updated
        })
    }

    return (
        <TimelineContext.Provider value={{ entries, addEntry }}>
            {children}
        </TimelineContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimeline() {
    return useContext(TimelineContext)
}