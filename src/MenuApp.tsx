import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css'

export default function MenuApp() {

    return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src=""
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
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Link</a>
                            </li>
                            <li className="dropdown nav-item">
                                <a href="#"
                                className="dropdown-toggle nav-link"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action 1</a></li>
                                    <li><a className="dropdown-item" href="#">Action 2</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Some action</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" action="">
                            <input type="search"
                            className="form-control me-2"
                            placeholder="search"
                            aria-label="search"
                            />
                        </form>
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </nav>
    )
}