import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence} from "framer-motion"
import { useSearchParams } from 'react-router-dom';

interface Joke {
    id: string;
    value: string;
    url: string;
}

export const ListApp: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || 'chuck';
    const selectedCategory = searchParams.get('category') || '';

    const [jokes, setJokes] = useState<Joke[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const currentPage = Number(searchParams.get('page')) || 1
    const jokesPerPage = 10
    const listPage = (currentPage - 1) * jokesPerPage;

    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchJokes();
        handlePageChange(currentPage * 0 + 1)
    }, [query, selectedCategory]);

    const displayedJokes = jokes.slice(listPage, listPage + jokesPerPage)

    // Funktsioon, mis teeb lehekülje vahetamise URL'is
    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
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
                    
                                <h2>Chuck Norris ({ jokes.length }: { query } jokes found)</h2>
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
                                    {!loading && !error &&displayedJokes.map((joke, index) => (
                                        <motion.li
                                            key={joke.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -40 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="mb-4 i_shadow"
                                    >
                                        <strong>{listPage + index + 1}. </strong>{joke.value}
                                    </motion.li>
                                    ))}
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
        </div>
    );
};