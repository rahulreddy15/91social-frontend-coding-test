import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import LaunchCard from "./LaunchCard";

const LaunchForm = styled.form`
  background: #eee;

  fieldset {
    border: 0;
    padding: 0;
  }

  legend {
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  select {
    text-transform: capitalize;
  }

  button {
    margin-top: 0.75rem;
  }

  fieldset > div > div {
    margin-top: 0.375rem;
  }

  .search-results {
    margin-top: 1.5rem;
    font-size: 0.875rem;

    span {
      font-weight: 900;
    }
  }

  @media (min-width: 46em) {
    fieldset > div {
      display: flex;
      align-items: center;

      > div,
      button {
        margin: 0 0.5rem 0 0;
      }

      legend {
        margin: 0 1rem 0 0;
      }
    }

    .search-results {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
`;

const LaunchesHooks = () => {
  const yearSelect = useRef();
  const successSelect = useRef();

  const [data, setData] = useState([]);
  const [formControls, setFormControls] = useState(null);
  const [filters, setFilters] = useState({});
  const [filtered, setFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const initialize = (arr) => {
    let yearFiltered = [...new Set(arr.map((item) => item.launch_year))];
    yearFiltered.unshift("any");

    let successesFiltered = [
      ...new Set(arr.map((item) => item.launch_success.toString())),
    ];
    successesFiltered.unshift("any");
    // 1. Take a copy of the current state
    const controls = { ...formControls };
    // 2. Update that state
    controls.launch_year = yearFiltered;
    controls.launch_success = successesFiltered;
    // 3. Set that to state
    setFormControls(controls);
  };

  useEffect(() => {
    fetch("https://api.spacexdata.com/v2/launches/?order=desc")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => initialize(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(filtered);
    console.log(filteredData);
  }, [filteredData]);

  const buildForm = () => {
    if (formControls && Object.keys(formControls)) {
      return (
        <LaunchForm>
          <fieldset>
            <div>
              <legend>Filter Launches:</legend>
              <div>
                <label htmlFor="form-filter-year">Year: </label>
                <select
                  name="form-filter-year"
                  id="form-filter-year"
                  ref={yearSelect}
                  onChange={() => setFiltersFunction()}
                >
                  {formControls.launch_year.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="form-filter-success">Launch Status: </label>
                <select
                  name="form-filter-success"
                  id="form-filter-success"
                  ref={successSelect}
                  onChange={(e) => setFiltersFunction(e)}
                >
                  {formControls.launch_success.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              {filtered ? (
                <button value="Reset Filters" onClick={() => resetFilters()}>
                  Reset Filters
                </button>
              ) : (
                ""
              )}
            </div>
          </fieldset>
          <div className="search-results">
            Viewing:{" "}
            <span>
              {filtered ? filteredData.length : data.length} Launch(es)
            </span>
          </div>
        </LaunchForm>
      );
    }
  };

  const setFiltersFunction = () => {
    // 1. Take a copy of the current state
    const filtersCopy = filters;

    // 2. Update that state
    const yearSelectIndex = yearSelect.current.selectedIndex;
    let year = yearSelect.current[yearSelectIndex].value;

    if (year !== "any") {
      filtersCopy.launch_year = year;
    } else {
      delete filtersCopy.launch_year;
    }

    const successSelectIndex = successSelect.current.selectedIndex;
    let success = successSelect.current[successSelectIndex].value;

    if (success !== "any") {
      filtersCopy.launch_success = success;
    } else {
      delete filtersCopy.launch_success;
    }

    // 3. Set that to state
    setFilters(filtersCopy);

    // UPDATING STATE.FILTEREDDATA
    // If there are keys in state.filters, "for/in" through the keys
    // For each key, reduce the data based on the key value
    // If there are no keys in the filters array, set filteredData to state data
    let filtered;
    const filter = (key) => {
      if (!filtered) {
        filtered = data.filter((card) => card[key].toString() === filters[key]);
      } else {
        filtered = filtered.filter(
          (card) => card[key].toString() === filters[key]
        );
      }

      return filtered;
    };

    if (Object.keys(filters).length) {
      for (const prop in filters) {
        filter(prop);
      }
      setFilteredData(filtered);
      setFiltered(true);
    } else {
      setFilteredData(data);
      setFiltered(false);
    }
  };
  const resetFilters = () => {
    yearSelect.current.selectedIndex = 0;
    successSelect.current.selectedIndex = 0;
    setFilteredData(data);
    setFiltered(false);
  };
  return (
    <div className="component-wrapper">
      <Helmet>
        <title>SpaceX Launches</title>
        <meta
          name="description"
          content="Information about past SpaceX launches"
        />
      </Helmet>
      <article>
        <header className="article-header">
          <h1>SpaceX Launches</h1>
        </header>
        <div className="article-wrapper">{buildForm()}</div>
        <div className="wrapper card-wrapper">
          {filtered
            ? filteredData.map((card) => (
                <LaunchCard {...card} key={"flight-" + card.flight_number} />
              ))
            : data.map((card) => (
                <LaunchCard {...card} key={"flight-" + card.flight_number} />
              ))}
        </div>
      </article>
    </div>
  );
};

export default LaunchesHooks;
