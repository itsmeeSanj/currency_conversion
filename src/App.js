import React from "react";

// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

function App() {
  const [inputVal, setInputVal] = React.useState("1");
  const [InputCur, setInputCur] = React.useState("USD");
  const [outpuCur, setOutputCur] = React.useState("CAD");

  const [curData, setCurData] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function CurConvertApi() {
        try {
          setError("");

          const Api = await fetch(
            `https://api.frankfurter.app/latest?amount=${Number(
              inputVal
            )}&from=${InputCur}&to=${outpuCur}`,
            { signal }
          );

          if (!Api?.ok) {
            throw new Error("Somethig went wrong while fetching movies!");
          }
          const data = await Api.json();
          setCurData(data?.rates[outpuCur]); // dynamic way of conversion
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
          setError(error.message);
        }
      }
      CurConvertApi();
    },
    [inputVal, InputCur, outpuCur]
  );

  // function outputResult(output, data) {
  //   switch (output) {
  //     case "USD":
  //       return data?.USD;
  //     case "EUR":
  //       return data?.EUR;
  //     case "INR":
  //       return data?.INR;

  //     default:
  //       return data?.CAD;
  //   }
  // }

  return (
    <div>
      <input
        type='text'
        value={inputVal}
        onChange={(e) => setInputVal(Number(e.target.value))}
      />
      <select value={InputCur} onChange={(e) => setInputCur(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={outpuCur} onChange={(e) => setOutputCur(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {InputCur === outpuCur
          ? `${inputVal} ${outpuCur}`
          : curData && ` ${curData} ${outpuCur}`}
      </p>
      {/* {InputCur === outpuCur
          ? inputVal
          : outputResult(outpuCur, curData?.rates)} */}
    </div>
  );
}

export default App;
