/*eslint no-useless-constructor: */
import React, { Component } from 'react'
import { Modal, Grid, List, Button, Segment, Header, Divider} from 'semantic-ui-react'


class SelectStore extends Component {
    constructor(props) {
        super(props);
    }

    handle_select(item) {
        this.props.onClick(item);
    };

    remove_select(item, bool) {
        this.props.onClick2(item, bool);
    };

    update_State() {
        let value = false;
        this.props.onClick3(value);
    };

    render () {
        const {open, data, item_select} = this.props;
        return (
            <Modal open={open} onClose={() => this.update_State()}>
                <Modal.Header style={{textAlign: 'center', color: '#024a96'}}>Magasins sélectionnés</Modal.Header>
                <Modal.Content>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Header as='h4' textAlign='center' color='blue' > Cliquer sur le magasin pour l'ajouter </Header>

                            <Segment>
                            <List divided
                                  verticalAlign='middle'
                                  style={{overflowY: 'auto',  minHeight: '300px', maxHeight: '300px'}}>
                                {data.map((item) =>
                                    <div key={item.id}>
                                    <Button basic color='blue'
                                            fluid
                                            onClick={() => this.handle_select(item, false)}
                                            style={{marginBottom: '1em', minHeight: '2em'}}
                                    >
                                        <List.Content>{item.name}</List.Content>
                                        <List.Content>{item.address}</List.Content>
                                    </Button>
                                    </div>
                                )}
                            </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h4' textAlign='center' color='teal'> Cliquer sur le magasin pour le retirer </Header>
                            <Segment>
                                <List divided verticalAlign='middle'
                                      style={{overflowY: 'auto',  minHeight: '300px', maxHeight: '300px'}}>
                                    {item_select.map((item) =>
                                        <Button basic color='teal'
                                                fluid
                                                onClick={() => this.remove_select(item)}
                                                style={{marginBottom: '1em', minHeight: '2em'}}
                                        >
                                            <List.Content>{item.name}</List.Content>
                                            <List.Content>{item.address}</List.Content>
                                        </Button>
                                    )}
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Divider hidden/>
                    <Button floated='right'
                            negative
                            onClick={() => this.remove_select([], true)}
                    >
                        Réinitialiser la liste
                    </Button>
                </Modal.Content>
                <Divider hidden/>
            </Modal>
        )
    }
}

export default SelectStore