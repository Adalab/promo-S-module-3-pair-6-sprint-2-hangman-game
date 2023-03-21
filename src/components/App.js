import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Dummy.scss';
import '../styles/Form.scss';
import '../styles/Header.scss';
import Header from './Header';
import Errors from './Dummy';
import Solution from './Solution';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
import Loading from './Loading';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/instructions"
            element={<Instructions></Instructions>}
          ></Route>
          <Route path="/options" element={<Options></Options>}></Route>
          <Route
            path="/"
            element={
              <section>
                <Solution word={word} userLetters={userLetters} />
                <ErrorLetters word={word} userLetters={userLetters} />
                <Form
                  lastLetter={lastLetter}
                  handleLastLetter={handleLastLetter}
                ></Form>
              </section>
            }
          ></Route>
        </Routes>
        <Errors className={`dummy error-${getNumberOfErrors()}`} />
      </main>
      <Footer>
        <Link to="/"></Link>
      </Footer>
    </div>
  );
}

export default App;
