import './App.css';
import Header from './components/Header';
import { useState, createContext } from 'react';
import { CreateArticle }  from './components/CreateArticle';
import { UpdateArticle }  from './components/UpdateArticle';
import { ArchiveArticle } from './components/ArchiveArticle';
import { ViewArticle }    from './components/ViewArticle';
import { ViewWikiStats }  from './components/ViewWikiStats';

const pubKeyData = createContext();

function App() {
  const [pubKey, _setPubKey] = useState("");

  return (
    <div className="App">
      <Header pubKey={pubKey} setPubKey={_setPubKey} />
      <pubKeyData.Provider value={pubKey}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
          <CreateArticle  />
          <UpdateArticle  />
          <ArchiveArticle />
          <ViewArticle    />
          <ViewWikiStats  />
        </div>
      </pubKeyData.Provider>
    </div>
  );
}

export default App;
export { pubKeyData };
