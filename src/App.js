import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import ShowSelect from './ShowSelect';
import Slider from './Slider';
import './App.css';


const spotifyWebAPI = new SpotifyWebApi();
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect = process.env.REACT_APP_REDIRECT;
const authURL = 'https://accounts.spotify.com/authorize?'
                  + 'client_id=' + client_id
                  + '&redirect_uri=' + redirect
                  + '&scope=user-top-read'
                  + '&response_type=token'
                  + '&state=123';

const styles = {
  select: {
    width: '20%',
    maxWidth: 600,
    display: 'inline-block',
    'margin-right': '5px'
  }
};

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
}

const options = {
  type:  [
    {value: 'artists', label: 'Artists'},
    {value: 'tracks', label: 'Tracks'}
  ],

  time: [
    {value: 'ST', label: 'Short-term'},
    {value: 'MT', label: 'Medium-term'},
    {value: 'LT', label: 'Long-term'}
  ]
};

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    if(params.access_token){
      spotifyWebAPI.setAccessToken(params.access_token);
    }
    this.state = {
      loggedIn: params.access_token ? true : false,
      typeOption: 'artists',
      timeOption: 'ST',
      artistsSTImages: null,
      artistsSTNames: null,
      artistsMTImages: null,
      artistsMTNames: null,
      artistsLTImages: null,
      artistsLTNames: null,
      tracksSTImages: null,
      tracksSTNames: null,
      tracksMTImages: null,
      tracksMTNames: null,
      tracksLTImages: null,
      tracksLTNames: null,
      selectedImages: null,
      selectedNames: null
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  getHashParams() {   //from Spotify, gets hash parameters from URL
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  async componentDidMount() {   //data for all six type and time combinations are loaded into state
    await spotifyWebAPI.getMyTopArtists({"time_range": "short_term"})
      .then((response) => {
        this.setState({artistsSTImages: [], artistsSTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.artistsSTImages.push(response.items[i].images[0].url);
          this.state.artistsSTNames.push(response.items[i].name);
        }
      });

    await spotifyWebAPI.getMyTopArtists({"time_range": "medium_term"})
      .then((response) => {
        this.setState({artistsMTImages: [], artistsMTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.artistsMTImages.push(response.items[i].images[0].url);
          this.state.artistsMTNames.push(response.items[i].name);
        }
      });

    await spotifyWebAPI.getMyTopArtists({"time_range": "long_term"})
      .then((response) => {
        this.setState({artistsLTImages: [], artistsLTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.artistsLTImages.push(response.items[i].images[0].url);
          this.state.artistsLTNames.push(response.items[i].name);
        }
      });

    
    await spotifyWebAPI.getMyTopTracks({"time_range": "short_term"})
      .then((response) => {
        this.setState({tracksSTImages: [], tracksSTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.tracksSTImages.push(response.items[i].album.images[0].url);
          this.state.tracksSTNames.push(response.items[i].name);
        }
      });

    await spotifyWebAPI.getMyTopTracks({"time_range": "medium_term"})
      .then((response) => {
        this.setState({tracksMTImages: [], tracksMTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.tracksMTImages.push(response.items[i].album.images[0].url);
          this.state.tracksMTNames.push(response.items[i].name);
        }
      });

    await spotifyWebAPI.getMyTopTracks({"time_range": "long_term"})
      .then((response) => {
        this.setState({tracksLTImages: [], tracksLTNames: []});
        for (var i = 0; i < 20; i++){
          this.state.tracksLTImages.push(response.items[i].album.images[0].url);
          this.state.tracksLTNames.push(response.items[i].name);
        }
      });

      this.loadChange();
  }

  async handleTypeChange(value) {
    await this.setState({typeOption: value.value});
    await this.loadChange();
  }

  async handleTimeChange(value) {
    await this.setState({timeOption: value.value});
    await this.loadChange();
  }

  loadChange() {    //checks the selected type amd time and updates the selected images and names
    if (this.state.typeOption == 'artists') {
      if (this.state.timeOption == 'ST') {
        this.setState({selectedImages: this.state.artistsSTImages, selectedNames: this.state.artistsSTNames});
      }
      if (this.state.timeOption == 'MT') {
        this.setState({selectedImages: this.state.artistsMTImages, selectedNames: this.state.artistsMTNames});
      }
      if (this.state.timeOption == 'LT') {
        this.setState({selectedImages: this.state.artistsLTImages, selectedNames: this.state.artistsLTNames});
      }
    }
    else {
      if (this.state.timeOption == 'ST') {
        this.setState({selectedImages: this.state.tracksSTImages, selectedNames: this.state.tracksSTNames});
      }
      if (this.state.timeOption == 'MT') {
        this.setState({selectedImages: this.state.tracksMTImages, selectedNames: this.state.tracksMTNames});
      }
      if (this.state.timeOption == 'LT') {
        this.setState({selectedImages: this.state.tracksLTImages, selectedNames: this.state.tracksLTNames});
      }
    }
  }

  render() {
    if (!this.state.loggedIn){
      return (
        <body>
          <a href={authURL}>
            <button>Login to Spotify</button>
          </a>
        </body>
      );
    }
    if (this.state.selectedNames === null){
      return(null);
    }
    return (
      <div className="App">
        <body>
          <div className="selects">
            <ShowSelect style={styles.select} defaultValue={options.type[0]} label="Show my top:&nbsp;" options={options.type} onChange={this.handleTypeChange}/>
            <ShowSelect style={styles.select} defaultValue={options.time[0]} label="Over:&nbsp;" options={options.time} onChange={this.handleTimeChange}/>
          </div>
          <Slider className="slider" images={this.state.selectedImages} names={this.state.selectedNames}/>
        </body>
      </div>
    );
  }
}

export default App;
