import React from "react";
import { useHistory } from 'react-router-dom';

export default function HomePage(){
    const history = useHistory()

    const routeToPizza = () => {
        history.push('/pizza');
    }

    return (
        <div className='homepage container'>
            <img 
            className='pizza-image'
            src='../Assets/Pizza.jpg'
            alt='handmade pizza'
            />
            <button onClick={routeToPizza} className='pizzaBtn'>Looking for some pizza?</button>
        </div>
    )
}