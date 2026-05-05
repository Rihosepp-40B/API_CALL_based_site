import { useState } from 'react'
import { motion, AnimatePresence} from "framer-motion"

interface JokeResponse {
  value: string;
}

export default function RandomApp() {
  // Sea naljad, paiguta laadimine ja errori seis RandomAPP'is
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const [response] = await Promise.all([
        fetch("https://api.chucknorris.io/jokes/random"),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
      if (!response.ok) {
        throw new Error("API error")
      }

      const data: JokeResponse = await response.json();
      setJoke(data.value);

    } catch (error) {
      setError("Failed to fetch joke");
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="row my-5">
          <div className="col-12">
            <div className="card mb-3">
              <div className="row g-0">
                
                <h2 className="mb-4">Random Chuck Norris Joke</h2>

                <div>
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

                    {!loading && !error && joke && (
                    <motion.p
                        key={joke}
                        className="mb-4 i_shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {joke}
                    </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                    onClick={fetchJoke}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary px-4 py-2"
                >
                    Get New Joke
                </motion.button>
              </div>
            </div>
          </div>
        </div> 
  )
}