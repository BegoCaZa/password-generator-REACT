const Range = ({ passwordLength, setPasswordLenght }) => {
  return (
    <div className='range-container'>
      <span className='range-value'>4</span>
      <input
        type='range'
        className='range-input'
        min='4'
        max='32'
        value={passwordLength}
        step='1'
        onInput={event => setPasswordLenght(event.target.value)}
      />
      <span className='range-value'>32</span>
    </div>
  );
};

export default Range;
