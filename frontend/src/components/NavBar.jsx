import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ value, onChange }) {
    const navigate = useNavigate()
    return (

        <nav className="navbar ">
            <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center">
                <input data-testid="search_bar" className=" w-75" type="text" value={value} placeholder="search by title" onChange={(e) => onChange(e.target.value)} />

                <div>
                    {/* <button className="btn btn-success me-3" >
                        <i className="bi bi-filter"></i>
                    </button> */}
                    <button data-testid="create_button" className="btn btn-success me-3" onClick={() => navigate('/tasks/create')} >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
