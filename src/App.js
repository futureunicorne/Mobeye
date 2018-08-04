import React, { Component } from 'react';
import { Button, Menu, Dropdown} from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';
import Alert from 'react-s-alert';

import './Modal/SelectStore'
//statics of react-s-alert
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
//statics
import './App.css';
import SelectStore from "./Modal/SelectStore";
import ConfirmCsv from "./Modal/ConfirmCsv";

class AnyReactComponent extends Component {

    handle_select(item) {
        this.props.onClick(item);
    };
    render () {
        const {item} = this.props;
         return (
            <Button
                icon="map marker"
                onClick={() => this.handle_select(item)}
                style={{margin: '0', padding: '0', background: 'transparent', color: 'white'}}
            />
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_store: [],
            list_id: [],
            open: false,
            open_confirm: false,
            disabled: true,
            final_csv: [['Id','Magasin n°','Nom', 'Adresse']],
            all: null
        };
    }
    static defaultProps = {
        center: {
            lat: 48.86,
            lng: 2.34
        },
        zoom: 6,
    };

    // Add store to store list
    handle_select = (item) => {
        const check= [item.id];
        const res = check.filter( function(n) { return this.has(n) }, new Set(this.state.list_id));
        if (res.length === 0) {
            const replica = this.state.list_store;
            this.state.list_id.push(item.id);
            replica.push(item);
            this.setState({list_store: replica});


            Alert.success(<div>
                <h4> Magasin ajoute </h4>
                {item.name} <br/>
                {item.address}
            </div>, {
                position: 'top-left',
                effect: 'scale',
                offset: 100
            });
        }
        else {
            Alert.error('Magasin déja ajouté', {
                position: 'top-left',
                effect: 'scale',
                offset: 100
            });
        }
    };


    //compare and remove store from list_store
    isEquivalent = (a, b) => {
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        }
        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    };

    update_State = (value) => {
        this.setState({open: value})
    };

    update_confirm = (value) => {
        this.setState({open_confirm: value, final_csv: [['Id','Magasin n°','Nom', 'Adresse']]})
    };

    // Handle convert Array Object in Array Array
    handle_conversion = (list) => {
        let final_array = this.state.final_csv;
        list.map((item, key) => {
            console.log(item)
            let array = Object.keys(item).map(x => item[x]).splice(2, 3);
            let array2 = array.splice(0, 1);
            array.push(array2[0]);
            array.unshift(key);
            final_array.push(array);
        });
        this.setState({final_csv : final_array})

        if (this.state.all != null)
        {
            this.setState({open_confirm : true})
        }
    };


    handle_csv =  () => {
        if (this.state.all === true)
        {
            let full_list = this.props.data;
            this.handle_conversion(full_list)
        }
        if (this.state.all === false)
        {
            if (this.state.list_store.length != 0) {
                let full_list = this.state.list_store;
                this.handle_conversion(full_list)
            }
            else
            {
                Alert.error('Aucun magasin sélectionné', {
                    position: 'top-left',
                    effect: 'scale',
                    offset: 100
                });
            }
        }
    };


    handle_option = (e, {value}) => {
        if (value === 'selectAll') {
            this.setState({all: true})
        }
        else  {
            this.setState({all: false})
        }
        this.setState({disabled: false})
    };

    remove_select = (item) => {
         let list = this.state.list_store;
         let list_id = this.state.list_id;

        this.state.list_store.map((game, key) => {
            if  ( this.isEquivalent(item, this.state.list_store[key]) === true ) {
                list.splice(key, 1);
                list_id.splice(key, 1);
            }
        });
        this.setState({ list_store: list, list_id: list_id })

    };

  render() {
      const {data} = this.props;
      const {open, list_store, final_csv, open_confirm, disabled} = this.state;
      const options =  [
          {key: 'selectAll', text: 'Tous les magasins', value: 'selectAll'},
          {key: 'selected', text: 'Les magasins selectionnes', value: 'selected'}
      ];
    return (
        <div className="App">
            <Menu fixed="top">
                <Menu.Item  position="left">
                    <Button primary
                            onClick={() => this.setState({ open : true})}>Voir les magasins choisis</Button>
                </Menu.Item>
                <Menu.Item position="right"
                           fitted>
                    <Dropdown placeholder='Telechargement Csv' search
                              selection
                              onChange={this.handle_option}
                              options={options}>
                    </Dropdown>
                    <Button color="teal"
                            disabled={disabled}
                            onClick={this.handle_csv}>Télécharger</Button>
                </Menu.Item>
            </Menu>
            <ConfirmCsv open={open_confirm} final_csv={final_csv} onClick={this.update_confirm}/>
            <SelectStore open={open}
                         data={data}
                         item_select={list_store}
                         onClick={this.handle_select}
                         onClick2={this.remove_select}
                         onClick3={this.update_State}
            />

            <div style={{ height: '100vh', width: '100%', marginTop: '-1em'}}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    {data.map((item) =>
                        <AnyReactComponent
                            key={item.id}
                            lat={item.lat}
                            lng={item.lng}
                            text={item.name}
                            item={item}
                            onClick={this.handle_select}>
                        </AnyReactComponent>
                    )}
                </GoogleMapReact>
                <Alert stack={{limit: 1}} />
            </div>
        </div>
    );
  }
}

export default App;
