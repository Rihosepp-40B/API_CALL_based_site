import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';


export default function MenuApp() {
    // See aitab määrata otsingu väärtust.
    const [searchValue, setSearchValue] = useState("");
    // See aitab määrata kategooriaid
    const [categories, setCategories] = useState<string[]>([]);
    // See aitab lehte vahetada /& navigeerida.
    const navigate = useNavigate();

    // See aitab URL'ist otsida
    const [searchParams] = useSearchParams();

    // See aitab määrata kategooriat läbi URL'i
    const selectedCategory = searchParams.get('category') || "";

    // See laeb API lehelt kategooiria loetelu
    useEffect(() => {
        fetch("https://api.chucknorris.io/jokes/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    // See toimetab URLI uuendamist vastvalt otsingutele ja kategooriatele
    const updateURL = (newQuery: string, newCat: string) => {
        const params = new URLSearchParams();
        if (newQuery) params.set('query', newQuery);
        if (newCat) params.set('category', newCat);
        params.set('page', '0');  // uus otsing algab nullist

        navigate({
            pathname: '/ChuckJokes',
            search: `?${params.toString()}`
        });
    };

    // see toimetab otsingute määramist valikut ning salvestab valiku URL'i
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cat = searchParams.get('category') || '';
        updateURL(searchValue, cat);
        setSearchValue("");
    };

    // See toimetab kategooria määramist ning URLI salvestamist
    const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
        e.preventDefault();

        const currentQuery = searchParams.get('query') || 'chuck';
        updateURL(currentQuery, cat);
    };

    return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="">
                        <img src={`${import.meta.env.BASE_URL}Draakon-logo.svg`}
                        alt=""
                        width="50"
                        height="50"/>
                    </a>

                    <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mb-2 mb-lg-0 me-auto">

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/ChuckJokes">
                                    Joke List
                                </NavLink>
                            </li>

                            <li className="dropdown nav-item">
                                <a href=""
                                className="dropdown-toggle nav-link"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                   {selectedCategory ? `Category: ${selectedCategory}` : "All Categories"}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/" onClick={(e) => handleCategoryClick(e, "")}>All</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    {categories.map(cat => (
                                    <li key={cat}>
                                        <a className="dropdown-item" href="/" onClick={(e) => handleCategoryClick(e, cat)}>
                                            {cat}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/Extra">
                                    Extra
                                </NavLink>
                            </li>
                        </ul>

                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input
                                type="search"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                className="form-control me-2"
                                placeholder="search"
                                aria-label="search"
                            />
                            <button
                                className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        
                    </div>
                </div>
            </nav>
    )
}