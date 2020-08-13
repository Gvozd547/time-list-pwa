import React from 'react';
import './Loader.css'

const Loader = React.memo(() => {
    return (
        <div className="center">
            <div className="Loader">
                <div /><div />
            </div>
        </div>
    )
});

export default Loader;