import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const ManagementNavbarNew = () => {


    const { setAuthState } = useOutletContext();

    const handleLogout = () => {
        setAuthState({ token: "" });
        localStorage.removeItem("token");
    }

    return (
        <>
            <nav className="bg-gray-800 py-3">
                <div className="container mx-auto px-4 w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-lg font-semibold">ea2go</h1>
                        <ul className="flex space-x-4 text-white">
                            <li><Link to="/management" className="hover:text-gray-400 cursor-pointer">Dashboard</Link></li>
                            <li><Link to="/management/profile" className="hover:text-gray-400 cursor-pointer">Profile</Link></li>
                            <li><Link to="/home" className="hover:text-gray-400 cursor-pointer" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default ManagementNavbarNew;
