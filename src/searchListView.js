import React from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import SearchBar from 'react-native-search-bar-tst';

class SearchListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            searchTerms: ''
        };

        this.searchBarUnfocus = this.searchBarUnfocus.bind(this);
        this.searchBarFocused = this.searchBarFocused.bind(this);
        this.searchBarSearchPressed = this.searchBarSearchPressed.bind(this);
        this.searchBarTextChanged = this.searchBarTextChanged.bind(this);
        this.setSearching = this.setSearching.bind(this);
    }

    render () {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <View>
                    <SearchBar
                        ref='searchBar'
                        placeholder='Search'
                        onChangeText={this.searchBarTextChanged}
                        onSearchButtonPress={this.searchBarSearchPressed}
                        onCancelButtonPress={this.searchBarUnfocus}
                        onFocus={this.searchBarFocused}
                        {...this.props}
                    />
                </View>
                {this.renderResultList()}
            </View>
        );
    }

    renderResultList() {
        if (this.state.isSearching) {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >
                    {this.renderNotice()}
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.props.dataSource}
                        renderRow={this.props.renderRow}
                    />
                </View>
            );
        }
        else 
            return null;
    }

    renderNotice() {
        if (this.props.dataSource && this.props.dataSource.rowIdentities[0].length === 0) {
            let message = this.isNullOrWhitespace(this.state.searchTerms) 
                            ? 'Start typing to search'
                            : 'No results found';

            return (
                <View
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            color: 'grey',
                            fontWeight: '400',
                            fontSize: 14
                        }}
                    >{message}</Text>
                </View>
            )
        }

        return null;
    }

    searchBarTextChanged(text) {
        this.setState({
            searchTerms: text
        })
        if (this.isNullOrWhitespace(text)) {
            this.refs.searchBar.unFocus();
            this.setSearching(false);
        } else {
            this.setSearching(true);
            this.props.onSearch(text);
        }
    }

    searchBarUnfocus() {
        this.refs.searchBar.unFocus();
        this.setSearching(false);
    }

    searchBarSearchPressed() {
        this.refs.searchBar.unFocus();
    }

    searchBarFocused() {
        this.refs.searchBar.focus();
        this.setSearching(true);
    }

    setSearching(isSearching) {
        this.setState({
            isSearching
        });
    }

    isNullOrWhitespace(obj) {
        if (typeof obj === 'undefined' || obj == null) return true;
        return obj.toString().replace(/\s/g, '').length < 1;
    }

    /**
     * Unfocus the search bar
     */
    unfocus() {
        this.searchBarUnfocus();
        this.refs.searchBar.resetText();
    }
}

SearchListView.propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    dataSource: React.PropTypes.object.isRequired,
    renderRow: React.PropTypes.func.isRequired
}

export default SearchListView;