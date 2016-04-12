'use strict;'

import React, {
    StyleSheet,
    TextInput,
    Component,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    },
    input: {
        alignSelf: 'center',
        height: 40,
        width:300,
        margin:3,
        borderWidth: 1
    },
    latest: {
        fontSize:16,
        padding:50
    }
});

export default class Main extends Component {
    constructor(props) {
        super(props);
        this._onTextInputEndEditing = this._onTextInputEndEditing.bind(this);
    }

    _onTextInputEndEditing(value) {
        this.props.setText(value)
    }

    render() {
        const { question, latest, submitQuestion, getLatest, setText } = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.latest}>{latest}</Text>
                <Text>Ask your question below</Text>
                <TextInput ref='input' style={styles.input} onChangeText={this._onTextInputEndEditing}/>
                <TouchableOpacity onPress={submitQuestion} style={styles.button}>
                    <Text>Ask</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
