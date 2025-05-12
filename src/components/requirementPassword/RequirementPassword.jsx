const RequirementPassword = ({ id, text, checkboxes, setCheckboxes }) => {
  return (
    <div className='requirements'>
      <span className='requirement-text'>{text}</span>
      <input
        type='checkbox'
        id={id}
        className='input'
        onChange={event =>
          setCheckboxes({ ...checkboxes, [id]: event.target.checked })
        }
      />
      <label htmlFor={id} className='label'></label>
    </div>
  );
};

export default RequirementPassword;
