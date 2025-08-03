import React from 'react'

function Pagination({ hasNext, onClick }) {
    return (


        <nav className="navbar ">
            <div className="container-fluid justify-content-center  ">
                <button type="button" className="btn btn-lg btn-primary" disabled={!hasNext} onClick={onClick}>Load more</button>
            </div>

        </nav>
    )
}

export default Pagination