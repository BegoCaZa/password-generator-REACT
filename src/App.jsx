import { useState } from 'react';
import { REQUIREMENTS_INFO } from './constants/elementCheckbox';

const App = () => {
  const [passwordLength, setPasswordLenght] = useState(16); //cambia el largode la contraseña
  const [password, setPassword] = useState(''); //contraseña guardada

  //funcion que envia los datos a la funcion generadora de contraseñas por fuera
  const handlePasswordGenerator = () => {
    const newPassword = generatePassword(passwordLength); //llama a la funcion y le da el largo
    setPassword(newPassword); //va a actualizar el estado de la contraseña con la nueva contrase;a de la otra funcion
  };

  return (
    <div className='general-container'>
      <input
        type='text'
        className='text-display'
        placeholder='P4$5W0RD!'
        value={password}
        readOnly
      />
      <div className='label-container'>
        <h2 className='range-value'>LENGHT:</h2>
        <span className='range-value'>{passwordLength}</span>
      </div>
      <div className='range-container'>
        <span className='range-value'>4</span>
        <input
          type='range'
          className='range-input'
          min='4'
          max='32'
          value={passwordLength}
          step='1'
          onChange={event => setPasswordLenght(event.target.value)}
        />
        <span className='range-value'>32</span>
      </div>

      {/* checkboxes */}
      <div className='requirements-container'>
        {REQUIREMENTS_INFO.map(requirement => (
          <div key={requirement.id} className='requirements'>
            <span className='requirement-text'>{requirement.text}</span>
            <input type='checkbox' id={requirement.id} className='input' />
            <label htmlFor={requirement.id} className='label'></label>
          </div>
        ))}
      </div>

      <button className='button' onClick={handlePasswordGenerator}>
        Generate Password
      </button>
    </div>
  );
};

const generatePassword = passwordLength => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890!@#$%^&*()_+-={}[]:;<>,.?/';
  let newPassword = ''; //contraseña generada
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters[randomIndex];
  }
  return newPassword;
};

export default App;
