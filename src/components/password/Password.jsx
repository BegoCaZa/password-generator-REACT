const Password = ({ password }) => {
  return (
    <input
      type='text'
      className='text-display'
      placeholder='P4$5W0RD!'
      value={password}
      readOnly
    />
  );
};

export default Password;
