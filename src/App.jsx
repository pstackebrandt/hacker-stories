import PropTypes from 'prop-types';
import { useState } from 'react';

// Import config data
import { welcomeData } from './config/welcome';

// Import data
import { frameworksAndLibs } from './data/frameworks';

// Description of this page
const pageDescription = () => ({
  purpose: "Examples of using listed objects as input for a component.",
  content: ["Use of listed objects as component input", "Create JSX from lists by map()"]
})

// Search component allows users to filter frameworks/libraries 
//by entering search terms
const Search = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearch(event); // Start search

    // value of target
    console.log(`handleOnChange of ${event.target} called with ${event.target.value}`);
  }

  const handleOnBlur = (event) => {
    console.log(event);

    console.log(`handleOnBlur: called by ${event.target}, called with value: ${event.target.value}`);
  }

  return (
    <>
      {/* Search input field */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleOnChange} onBlur={handleOnBlur} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

// Displays a list of frameworks/libraries
const ListFrameworksAndLibs = (props) => {
  return (
    <ul>
      {props.tools.map((tool) =>
        <ToolItem key={"toolItem" + tool.objectID} tool={tool} />
      )}
    </ul>
  )
}

// Displays a single framework/library
const ToolItem = (props) => {
  const tool = props.tool;

  return (
    <li>
      {/* 'key' attribute of 'li' will be set by the user of the item. */}
      <label htmlFor={`linkOfToolItem${tool.objectID}`}>{tool.title}: </label>
      <a id={`linkOfToolItem${tool.objectID}`} href={tool.url}>{tool.url}</a>
    </li>
  );
}

ToolItem.propTypes = {
  tool: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    num_comments: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    objectID: PropTypes.number.isRequired,
  }).isRequired,
};

ListFrameworksAndLibs.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      num_comments: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
      objectID: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Main component 
const App = () => {
  const handleSearch = (event) => {
    console.log(`Search could be started with with value ${event.target.value}`);
  }

  return (
    <div>
      <header>
        <h1>{welcomeData.greeting} {welcomeData.title}</h1>
      </header>

      <section>
        <Search onSearch={handleSearch} />
      </section>

      <section>
        <hr />
        <h2>Frameworks and Libraries</h2>
        <ListFrameworksAndLibs tools={frameworksAndLibs} />

      </section>

      <aside>
        <hr />
        <h2>Page purpose</h2>
        <p>{pageDescription().purpose}</p>
        <ul>{pageDescription().content.map((part, index) =>
          <li key={index}>{part}</li>
        )}
        </ul>
      </aside>
    </div>
  )
}

export default App;
