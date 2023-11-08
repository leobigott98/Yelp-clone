import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';

const App = ()=>{
    return <div>
        <Router>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/restaurants/:id/update' Component={UpdatePage} />
                <Route exact path='/restaurants/:id' Component={RestaurantDetailPage} />
            </Routes>
            
        </Router>
    </div>
};



export default App;