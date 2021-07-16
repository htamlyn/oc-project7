import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Post from './Post';
import Nav from './Nav';

library.add(fab, faBars, faSearch);

function App() {
  return (
    <div>
      <Nav />
      <Post />
    </div>
  );
}

export default App;
