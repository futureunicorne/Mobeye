import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import data from './data/datas'
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import Favicon from 'react-favicon';
import img_logo from './static/logo_micro.jpg'

const store_game = data;

ReactDOM.render(
    <div>
        <Favicon url={img_logo} />
        <App data={store_game} />
    </div>
    , document.getElementById('root'));
registerServiceWorker();
