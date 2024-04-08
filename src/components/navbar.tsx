import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-20 bg-slate-700 text-white">
            <div>
                logo
            </div>
            <div>
                Question Generator
            </div>
            <div>
                <ul className="flex ">
                    <li className="mr-3">
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className="mr-3">
                        <Link to='/'>
                            Profile
                        </Link>
                    </li>
                    <li className="mr-3">
                        <Link to='/'>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar