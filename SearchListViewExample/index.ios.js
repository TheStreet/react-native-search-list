/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import SearchListView from './searchListView';

const data = [
  "Miles Davis",
  "Duke Ellington",
  "Dizzy Gillespie",
  "Charles Mingus",
  "Art Tatum",
  "John Coltrane",
  "Thelonious Monk",
  "Charlie Parker"
]

export default class SearchListViewExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSource.cloneWithRows([])
    }

    this.onSearch = this.onSearch.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    return (
      <View>
        <View style={{padding: 10, paddingTop: 30, height: 400}}>
          <SearchListView 
            ref={'searchList'}
            dataSource={this.state.dataSource}
            onSearch={this.onSearch}
            renderRow={this.renderRow}
            showsCancelButton={true}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            this.refs.searchList.unfocus()
          }}
          style={{
            padding: 10,
            backgroundColor: 'blue'
          }}
        >
            <Text
              style={{
                textAlign: 'center',
                color: 'white'
              }}
            >Tap to unfocus the search bar</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderRow(row) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#DDE1E2',
          padding: 15,
          overflow: 'hidden',
          flexDirection: 'row'
        }}
      >
        <Text>
          {row}
        </Text>
      </View>
    )
  }

  onSearch(text) {
    let results = [];
    for(var i = 0; i < data.length; i++)
      if(data[i].includes(text.toLowerCase()))
        results.push(data[i]);
    
    this.setState({
      dataSource: dataSource.cloneWithRows(results)
    });
  }
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

AppRegistry.registerComponent('SearchListViewExample', () => SearchListViewExample);
