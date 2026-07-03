import React from "react";
import '../../App.css';

interface Props {
    setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<Props> = ({setCurrentPage}) => {
    return (
        <div className="navbar">
            <button onClick={() => setCurrentPage('home')}>Home</button>
            <button onClick={() => setCurrentPage('contact')}>Contact</button>
            <button onClick={() => setCurrentPage('blog')}>Blog</button>
        </div>
    );
}

export default Navbar;