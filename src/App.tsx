import logo from './logo.svg';
import './App.css';
import { useAppSelector } from './hooks';
import { get200Cat, getHttpCat } from './modules/httpCat';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { image, error } = useAppSelector((state) => ({
    image: state.httpCat.image,
    error: state.error['httpCat/GET_HTTP_CAT'],
  }));
  const [statusCode, setStatusCode] = useState<number>(200);

  useEffect(
    function () {
      if (error) {
        setStatusCode(200);
      }
    },
    [error]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input
          placeholder="status code"
          type="number"
          name="cat"
          value={statusCode}
          onChange={(e) => {
            setStatusCode(parseInt(e.target.value));
          }}
          id="cat"
        />
        <div
          className="App-link"
          onClick={() => {
            dispatch(getHttpCat(statusCode));
          }}
        >
          Get Cat
        </div>
        {image && <img src={image} alt={'cat'} />}
      </header>
    </div>
  );
}

export default App;
