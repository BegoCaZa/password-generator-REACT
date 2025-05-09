const App = () => {
  return (
    <div className='general-container'>
      <input
        type='text'
        className='text-display'
        placeholder='P4$5W0RD!'
        readOnly
      />
      <div className='label-container'>
        <h2 className='range-value'>LENGHT:</h2>
        <span className='range-value'>16</span>
      </div>
      <div className='range-container'>
        <span className='range-value'>4</span>
        <input
          type='range'
          className='range-input'
          min='4'
          max='32'
          defaultValue='16'
          step='1'
        />
        <span className='range-value'>32</span>
      </div>

      <button className='button'>Generate Password</button>
    </div>
  );
};

export default App;
