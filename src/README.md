# react-native-search-list

A React Native ListView with a search bar

## <a name='install'>Installation</a>
```
npm install react-native-search-list --save
```

One of the dependancies in this libary contains native modules. Follow the [Linking Libraries (iOS)](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) guide on React Native website for instructions on how to link these.

## <a name='usage'>Usage</a>
```
import SearchListView from 'react-native-search-list';
```

```js
<SearchListView 
    ref={'searchList'}
    onSearch={this.onSearch}
    dataSource={this.props.dataSource}
    renderRow={this.renderRow}
/>
```

The SearchListView has 3 required props

| Prop | Description |
|---|---|
|**`onSearch`**|A search function that is called when the user begins typing into the search bar|
|**`dataSource`**|A data source for the underlying ListView. Contains the results that should be displayed|
|**`renderRow`**|A function for rendering an individual row in the underling ListView|

The **`onSearch`** method should modify your **`dataSource`**, so that when the user performs a search, the results are seen in the **`ListView`**

### <a name='focus'>Focusing and Unfocusing</a>
The component is automatically focused when the user taps on the search bar. This brings up the keyboard.

It is unfocused when the user taps the cancel button, or clears the text input. Unfocusing will dismiss the keyboard. It is also dimssed when the user taps the 'Search' button. 

The component can be unfocused programmatically by calling the **`unfocus`** method. This will clear the text input.

```js
this.refs.searchList.unfocus()
```

## <a name='props'>Optional Properties</a>
The search bar can be customised using all the props avalible in [react-native-search-bar](https://github.com/umhan35/react-native-search-bar#usage)