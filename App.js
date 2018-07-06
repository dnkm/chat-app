import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {firestore} from './utils/firebase';
import {Constants} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgs: [],
      opacity: 0
    }

    this.intervalID = setInterval(() => {
      if (this.state.opacity > 1) {
        clearInterval(this.intervalID);
      }

      this.setState({
        opacity: this.state.opacity + 0.01
      });
    }, 1000/20);

    firestore.collection('chat').doc('chat-1').onSnapshot(doc => {
      let dataObj = doc.data();
      
      let msgs = Object.keys(dataObj).map(key => {
        return {
          name: key,
          txt: dataObj[key]
        }
      })

      /*
      [
        {name: 'danny', txt: 'hi'}
        {name: 'john', txt: 'bye'},
      ]
      */

      this.setState({msgs})
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.msgs.map((m,i) => {

            let nameView = <View style={{width: Dimensions.get('window').width/4, backgroundColor: 'gray'}}>
                            <Text >{m.name}</Text>
                            </View>

            return (
              <View style={{
                opacity: this.state.opacity
              }} key={m.name}>
                {i % 2 == 0 && nameView}
                <View style={{flex:1}}>
                  <Text>{m.txt}</Text>
                </View>
                {i % 2 == 1 && nameView}
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 0,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    marginTop: Constants.statusBarHeight
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  rowOdd: {},
  rowEven: {}
});
