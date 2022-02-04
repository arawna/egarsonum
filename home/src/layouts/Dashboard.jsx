import React from 'react'
import { ToastContainer } from 'react-toastify';
import Welcome from './Welcome';

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right"/>
            <Welcome/>
        </div>
    )
}
