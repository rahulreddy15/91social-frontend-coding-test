import React from 'react';
import Helmet from 'react-helmet';
import CapsuleCard from './CapsuleCard';

class Capsules extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/capsules')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="component-wrapper">
        <Helmet>
          <title>SpaceX Capsules</title>
          <meta
            name="description"
            content="Information about SpaceX capsules"
          />
        </Helmet>
        
        <article>
          <header className="article-header">
            <h1>SpaceX Capsules</h1>
          </header>
          <div className="wrapper card-wrapper">
            {this.state.data.map(item => (
              <CapsuleCard {...item} key={'capsule-' + item.id} />
            ))}
          </div>
        </article>
      </div>
    );
  }
}

export default Capsules;
