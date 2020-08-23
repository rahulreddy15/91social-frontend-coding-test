import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const Article = styled.article`
  position: relative;
  min-height: 100%;
  width: 100%;
  padding: 0 0 2rem !important;

  &,
  & a {
    color: #000000;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
  }

  .article-header,
  .article-wrapper {
    position: relative;
    z-index: 5;
    padding: 0 2rem;

    h1 {
      padding-top: 1.5rem;
      margin-top: 0;
    }
  }

  section > h2 {
    margin-bottom: 0.25rem;
  }

  @media (min-width: 46em) {
    .article-header,
    .article-wrapper {
      padding-right: 25rem;
    }

    .article-header {
      h1 {
        padding-top: 3.5rem;
      }
    }
  }

  @media (min-width: 62em) {
    .article-header {
      h1 {
        padding-top: 6.5rem;
      }
    }
  }
`;

const Home = () => {
  const [companyInfo, setCompanyInfo] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/info")
      .then((res) => res.json())
      .then((data) => setCompanyInfo(data))
      .catch((err) => console.error(err));
  }, [companyInfo]);

  return (
    <div className="component-wrapper component-home">
      <Helmet>
        <title>SpaceX Info</title>
        <meta
          name="description"
          content="A small React project using the SpaceX api"
        />
      </Helmet>

      <Article>
        <header className="article-header">
          <h1>About SpaceX</h1>
        </header>
        <div className="article-wrapper">
          <p>{companyInfo.summary}</p>
          <section>
            <h2>Company Info</h2>
            <ul>
              {companyInfo.founded ? (
                <li>Founded: {companyInfo.founded}</li>
              ) : (
                ""
              )}
              {companyInfo.employees ? (
                <li>Employees: {companyInfo.employees}</li>
              ) : (
                ""
              )}
              {companyInfo.launch_sites ? (
                <li>Launch Sites: {companyInfo.launch_sites}</li>
              ) : (
                ""
              )}
              {companyInfo.test_sites ? (
                <li>Test Sites: {companyInfo.test_sites}</li>
              ) : (
                ""
              )}
              {companyInfo.vehicles ? (
                <li>Vehicles: {companyInfo.vehicles}</li>
              ) : (
                ""
              )}
            </ul>
          </section>
          <section>
            <h2>Company Leadership</h2>
            <ul>
              {companyInfo.ceo ? <li>CEO: {companyInfo.ceo}</li> : ""}
              {companyInfo.coo ? <li>COO: {companyInfo.coo}</li> : ""}
              {companyInfo.cto ? <li>CTO: {companyInfo.cto}</li> : ""}
              {companyInfo.cto_propulsion ? (
                <li>CTO of Propulsion: {companyInfo.cto_propulsion}</li>
              ) : (
                ""
              )}
            </ul>
          </section>
        </div>
      </Article>
    </div>
  );
};

export default Home;
