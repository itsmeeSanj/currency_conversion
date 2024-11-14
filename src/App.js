import React from "react";

// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

function App() {
  const [inputVal, setInputVal] = React.useState("");
  const [fromCur, setFromCur] = React.useState("");
  const [toCur, setToCur] = React.useState("");

  const [curData, setCurData] = React.useState({});

  React.useEffect(
    function () {
      async function CurConvertApi() {
        const Api = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputVal}&from=${fromCur}&to=${toCur}`
        );
        const data = await Api.json();
        console.log("data", data);
        setCurData(data);
      }
      CurConvertApi();
    },
    [inputVal, fromCur, toCur]
  );

  return (
    <div>
      <input
        type='text'
        value={inputVal}
        onChange={(e) => setInputVal(Number(e.target.value))}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>OUTPUT </p>
    </div>
  );
}

export default App;
