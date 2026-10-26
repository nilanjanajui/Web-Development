import { createContext, useContext, useState, useEffect, useCallback } from "react";
import characterImages from "../data/characterImages";

const CharactersContext = createContext();

export function CharactersProvider({ children }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);

    const retry = useCallback(() => {
        setError(null);
        setLoading(true);
        setRetryKey((k) => k + 1);
    }, []);

    useEffect(() => {
        fetch("https://hp-api.onrender.com/api/characters")
            .then((r) => {
                if (!r.ok) throw new Error(`HP API error: ${r.status}`);
                return r.json();
            })
            .then((data) => {
                const enriched = data.map((c) => ({
                    ...c,
                    image: characterImages[c.name] || c.image || null,
                }));
                setCharacters(enriched);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [retryKey]); // re-runs every time retry() is called

    return (
        <CharactersContext.Provider value={{ characters, loading, error, retry }}>
            {children}
        </CharactersContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCharacters = () => useContext(CharactersContext);