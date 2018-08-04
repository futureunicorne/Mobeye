import React, { Component } from 'react'
import { Modal, Header, Icon, Button} from 'semantic-ui-react'
import {CSVLink} from 'react-csv';


class ConfirmCsv extends Component {
    constructor(props) {
        super(props);
    }

    update_State() {
        let value = false;
        this.props.onClick(value);
    };

    render () {
        const {open, final_csv} = this.props;
        return (
            <Modal open={open} onClose={() => this.update_State()} basic size='small'>
                <Header>
                    <Icon name='download' />
                    Téléchargement Csv
                </Header>
                <Modal.Content>
                    <p>
                        Vous êtes sur le point de télécharger un fichier CSV ! Cliquez sur OK pour confirmer ?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' onClick={() => this.update_State()} inverted >
                        <Icon name='remove' /> Annuler
                    </Button>
                    <CSVLink data={final_csv}  filename={"Micromania_Store.csv"}>
                        <Button color='green' onClick={() => this.update_State()} inverted>
                            <Icon name='checkmark' /> Ok
                        </Button>
                    </CSVLink>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ConfirmCsv