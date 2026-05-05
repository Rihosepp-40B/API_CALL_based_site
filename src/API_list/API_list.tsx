import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence} from "framer-motion"
import { useSearchParams } from 'react-router-dom';

interface Joke {
    id: string;
    value: string;
    url: string;
    updated_at: string;
    created_at: string;
    categories: [];
}

export const ListApp: React.FC = () => {
    
    // aitab URL'ist väärtuste leidmisele kaasa
    const [searchParams, setSearchParams] = useSearchParams();
    
    // aitab määrata orsingu ja otsingul kategooriaid API päringus
    const query = searchParams.get('query') || 'chuck';
    const selectedCategory = searchParams.get('category') || '';

    // seab naljade ja laadimise olekut
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // leiab URLäist seatud lehe numbrit loendis olles
    const currentPage = Number(searchParams.get('page')) || 1
    const jokesPerPage = 10
    const listPage = (currentPage - 1) * jokesPerPage;
    // See aitab majandada valitud elemendi detailide vaatamist
    const [selectedJoke, setSelectedJoke] = useState<Joke | null>(null);
    // See aitab seada lemmikuid
    const [favorites, setFavorites] = useState<string[]>(() => {
        // See aitab salvestada localStorage's lemmikuid.
        const saved = localStorage.getItem('chuck_favorites');
        return saved ? JSON.parse(saved) : [];
        });
    // See aitab toimetada lemmmikute vaadet ja salvestab lemmikute filtrit
    const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(() => {
        return localStorage.getItem('show_favs_only') === 'true';
    });

    const [error, setError] = useState<string | null>(null);

    // naljade pärimine API'ist koos vea kontrolliga
    const fetchJokes = async () => {
        setLoading(true)
        setError(null);

        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);

            if (!response.ok) {
                throw new Error("API error")
            }

            const data = await response.json();

            let results = data.result || [];

            if (selectedCategory) {
                results = results.filter((joke: any) =>
                    joke.categories && joke.categories.includes(selectedCategory));    
            }

            setJokes(results);
        } catch (error) {
            setError("Failed to fetch jokes");
        } finally {
            setLoading(false);
        }
    };

    // Igakord leheavamisel võtab käivitab fetchJokes ning otsingu ja kategooriate muutmisel
    // muudab URL'i
    useEffect(() => {
        fetchJokes();
        handlePageChange(currentPage * 0 + 1)
    }, [query, selectedCategory]);

    // Toimetab lemmikute valikud
    const filteredJokes = showFavoritesOnly 
    ? jokes.filter(joke => favorites.includes(joke.id)) 
    : jokes;

    // Salvestab igakord localstorage's kui lemmikud muutuvad
    useEffect(() => {
        localStorage.setItem('chuck_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Lemmikute vaate muutmisel salvestab localstorages valiku
    useEffect(() => {
        localStorage.setItem('show_favs_only', showFavoritesOnly.toString());
    }, [showFavoritesOnly]);    

    const displayedJokes = filteredJokes.slice(listPage, listPage + jokesPerPage);

    // Funktsioon, mis teeb lehekülje vahetamise URL'is
    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
    };

    // lemmikute sisse ja välja lülitamiese loogika
    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id)
                // Eemalda, kui juba olemas
                ? prev.filter(favId => favId !== id)
                // Lisa, kui pole olemas
                : [...prev, id]
        );
    };
    
    return (
        <div className="container my-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="row my-5">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-12 row">
                                    <div className="col-9 text-end">
                                        <h2>Chuck Norris ({ jokes.length }: { query } jokes found)</h2>
                                    </div>
                                    <div className="col-3">
                                        <div className="col-12 text-end">
                                            <button 
                                                className={`btn ${showFavoritesOnly ? 'btn-danger' : 'btn-outline-danger'}`}
                                                onClick={() => {
                                                    setShowFavoritesOnly(!showFavoritesOnly);
                                                    handlePageChange(1); // Mine esimesele lehele, kui filter muutub
                                                }}
                                            >
                                                {showFavoritesOnly ? 'Show All' : `Show ❤️ (${favorites.length})`}
                                            </button>
                                        </div>
                                    </div>

                                </div>                                
                                {selectedCategory && <p className="">Filtering by: <span className="badge bg-secondary">{selectedCategory}</span></p>}
                                
                                <ul>
                                    <AnimatePresence mode="wait">
                                        {loading && (
                                        <motion.p
                                            key="loading"
                                            className="mb-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            Loading...
                                        </motion.p>
                                        )}

                                        {error && (
                                            <motion.p
                                                key="error"
                                                className="text-red-500 mb-4"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                {error}
                                            </motion.p>
                                            )}
                                    {!loading && !error &&displayedJokes.map((joke, index) => {
                                        const isFavoriteInList = favorites.includes(joke.id);

                                        return(
                                        <motion.li
                                            key={joke.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -40 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="mb-4 i_shadow d-flex justyfy-content-between align-items-center"
                                            style={{ cursor: 'pointer' }}
                                            // Vajutamisel avab detailide vaate
                                            onClick={() => setSelectedJoke(joke)}
                                        >
                                        <div className="col-1">
                                            <strong>{listPage + index + 1}. </strong>
                                            </div>
                                        <div className="col-10">
                                            {joke.value}
                                        </div>
                                            <motion.div
                                                className="col-1"
                                                // Väike põksatus vajutusel
                                                whileTap={{ scale: 1.5 }} 
                                                onClick={(e) => {
                                                    // Takistab popupi avanemist südamele klikkides
                                                    e.stopPropagation(); 
                                                    toggleFavorite(joke.id);
                                                }}
                                                style={{ fontSize: '1.5rem', cursor: 'pointer', userSelect: 'none' }}
                                            >
                                                {isFavoriteInList ? '❤️' : '🤍'}
                                            </motion.div>
                                        </motion.li>
                                        );
                                    })}
                                    </AnimatePresence>
                                </ul>
                            </div>
                            <div className="col-12 row">
                                <div className="col-6">
                                    <motion.button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={listPage <= 0}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-secondary px-4 py-2"
                                    >
                                        Back
                                    </motion.button>
                                </div>
                                <div className="col-6">
                                    <motion.button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={listPage + jokesPerPage >= jokes.length}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-secondary px-4 py-2"
                                    >
                                        Next
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* POP-UP aken, detailide vaatamiseks */}
            <AnimatePresence>
                {selectedJoke && (
                    <div className="modal-overlay" onClick={() => setSelectedJoke(null)}>
                        <motion.div 
                            className="modal-content card p-4 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            // Peata klikk, et aken ei sulguks sisu peale vajutades
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3>Joke Details</h3>
                                <button 
                                    className={`btn ${favorites.includes(selectedJoke.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => toggleFavorite(selectedJoke.id)}
                                    style={{
                                        borderRadius: '50%',
                                        width: '45px',
                                        height: '45px',
                                        padding: '0' }}
                                >
                                    {favorites.includes(selectedJoke.id) ? '❤️' : '🤍'}
                                </button>
                            </div>
                            <hr />
                            <div className="text-center mb-3">
                            </div>
                            <p className="lead italic">"{selectedJoke.value}"</p>
                            <div className="mt-3 small">
                                <p><strong>ID:</strong> {selectedJoke.id}</p>
                                <p><strong>Source:</strong> <a href={selectedJoke.url} target="_blank" rel="noreferrer">Open official link</a></p>
                                <p><strong>Created at:</strong> {selectedJoke.created_at}</p>
                                <p><strong>Updated at:</strong> {selectedJoke.updated_at}</p>
                                <p><strong>Categories:</strong> {selectedJoke.categories}</p>
                            </div>
                            <button className="btn btn-secondary mt-3" onClick={() => setSelectedJoke(null)}>Close</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};