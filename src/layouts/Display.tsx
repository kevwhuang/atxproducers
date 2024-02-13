import React from 'react';
import { Outlet } from 'react-router-dom';

function Display(): React.ReactElement {
    return (
        <div id="display">
            <Outlet />
        </div>
    );
}

export default Display;
