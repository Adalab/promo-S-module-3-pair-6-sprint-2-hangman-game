import { useEffect, useState } from 'react';

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
        <section>
          <Solution word={word} userLetters={userLetters} />
          <ErrorLetters word={word} userLetters={userLetters} />
          <Form
            lastLetter={lastLetter}
            handleLastLetter={handleLastLetter}
          ></Form>
        </section>
        <Errors className={`dummy error-${getNumberOfErrors()}`} />
      </main>
    </div>
  );
}

export default App;
