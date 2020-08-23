import React from 'react';
import Helmet from 'react-helmet';
import RocketCard from './RocketCard';

class Rockets extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/rockets')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="component-wrapper">
        <Helmet>
          <title>SpaceX Rockets</title>
          <meta
            name="description"
            content="Information about past SpaceX rockets"
          />
        </Helmet>
        
        <article>
          <header className="article-header">
            <h1>SpaceX Rockets</h1>
          </header>
          <div className="wrapper card-wrapper">
            {this.state.data.map(item => (
              <RocketCard {...item} key={'rocket-' + item.rocketid} />
            ))}
          </div>
        </article>
      </div>
    );
  }
}

export default Rockets;
