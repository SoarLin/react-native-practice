import React, { Component } from 'react';
import {
  Image,
  FlatList,
  Platform,
  StyleSheet,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Banners extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={this.props.picture} style={styles.image} />
    );
  }
}

class PostList extends Component {
  render() {
    let pics = [
      { url: 'https://i.pinimg.com/736x/fd/5e/66/fd5e662dce1a3a8cd192a5952fa64f02--classic-poster-classic-movies-posters.jpg'},
      { url: 'https://marketplace.canva.com/MACFQTmLl08/2/0/thumbnail_large/canva-tiger-minimalist-movie-poster-MACFQTmLl08.jpg'},
      { url: 'https://www.heyuguys.com/images/2017/03/Pirates-of-the-Caribbean-5-Movie-Poster.jpg'},
      { url: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-05/24/16/asset/buzzfeed-prod-fastlane-02/sub-buzz-28961-1495659576-6.jpg'},
      { url: 'https://i.pinimg.com/736x/35/09/96/3509966fbcc98784e47c53854fbadb58--art-movies-alternative-movie-posters.jpg'},
      { url: 'https://i.pinimg.com/originals/69/e1/39/69e13905f89444a4e0832de9205f0661.jpg'},
      { url: 'https://www.heyuguys.com/images/2016/11/assassins-creed-uk-movie-poster-439x650.jpg'},
      { url: 'https://mediatrailermattv.files.wordpress.com/2011/05/the_dark_knight_movie_poster.jpg'},
      { url: 'https://designmodo.com/wp-content/uploads/2011/02/Creative-Movie-Posters-25.jpg'},
    ];
    const posts = pics.map((img, i) => {
      return (<Image key={i} source={img} style={styles.postCover} />);
    });
    return (
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.header1}>Scroll me please</Text>
        { posts }
      </ScrollView>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.tags.map((tag) => tag).join(',');
    return (
      <View>
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '700'}}>{this.props.title}</Text>
        <Text style={{ fontSize:12, color: '#ff00a0'}}>{this.props.link}</Text>
        <Text style={{ fontSize:10, color: '#777' }}>{tags}</Text>
      </View>
    );
  }
}

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
      listData: []
    };

    this.transText2Pizza = this.transText2Pizza.bind(this);
    this.searchBlog = this.searchBlog.bind(this);
  }

  setDisplayText(text) {
    this.setState({ showText: text });
  }

  transText2Pizza() {
    let pizza = this.state.showText.split(' ').map((word) => word && '🍕').join(' ');
    this.setState({ showText: pizza });
  }

  searchBlog() {
    let keyword = this.state.showText;
    fetch('https://soar.stco.tw/search/blog/articles/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        size: 5,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      let tmp = [];
      for (let i=0, max=responseJson.length; i < max; i++) {
        tmp.push(responseJson[i]);
      }
      this.setState({ listData: tmp });
      // return (
      //   <FlatList
      //     data={tmp}
      //     renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
      //   />
      // );
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let pic = {
      url: 'https://www.appcoda.com.tw/wp-content/uploads/2015/04/react-native-1024x631.png'
    };
    let display = this.state.showText;
    let flatlist_data = this.state.listData;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type some words..."
          onChangeText={(text) => this.setDisplayText(text)}
          onSubmitEditing={this.searchBlog}/>
        <Text>{display}</Text>
        <FlatList
          data={flatlist_data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
              <ListItem
                title={item.title}
                link={item.link}
                tags={item.tags}
              />
            )}
        />

        {/*<PostList />*/}
        {/*<Banners picture={pic} />*/}
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    height: 450,
  },
  header1: {
    fontSize: 36,
    lineHeight: 1.4,
    color: '#333'
  },
  postCover: {
    width: 250,
    height: 400
  },
  image: {
    width: 180,
    height: 160
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
