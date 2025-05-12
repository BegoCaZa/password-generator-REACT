import { useState } from 'react';
import { REQUIREMENTS_INFO } from './constants/elementCheckbox';
import Password from './components/password/Password';
import Range from './components/range/Range';
import RequirementPassword from './components/requirementPassword/RequirementPassword';

const charactersBank = {
  symbols: '!@#$%^&*()_+-={}[]:;<>,.?/</>',
  numbers: '1234567890',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz'
};

let newPassword = '';

const App = () => {
  const [passwordLength, setPasswordLenght] = useState(16); //cambia el largode la contraseña
  const [password, setPassword] = useState(''); //contraseña guardada

  // avanzado. agrugparlos cuando manejan los mismo
  // const [requirementUpperCase, setRequirementUpperCase] = useState(false);
  // const [requirementLowerCase, setRequirementLowerCase] = useState(false);
  // const [requirementNumbers, setRequirementNumbers] = useState(false);
  // const [requirementSymbols, setRequirementSymbols] = useState(false);

  const [checkboxes, setCheckboxes] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });

  return (
    <div className='general-container'>
      <Password password={password} />
      <div className='label-container'>
        <h2 className='range-value'>LENGHT:</h2>
        <span className='range-value'>{passwordLength}</span>
      </div>
      <Range
        passwordLength={passwordLength}
        setPasswordLenght={setPasswordLenght}
      />

      {/* checkboxes */}
      {/* checkboxes */}
      <div className='requirements-container'>
        {REQUIREMENTS_INFO.map(requirement => (
          <RequirementPassword
            key={requirement.id}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
            {...requirement}
          />
        ))}
      </div>

      {/* <div className='requirements-container'>
        <div className='requirements'>
          <span className='requirement-text'>Include Uppercase</span>
          <input
            type='checkbox'
            id='uppercase'
            className='input'
            onChange={() => setCheckboxes({...checkboxes, uppercase:!checkboxes.uppercase})} 
            // quiero lo que ya tienes (objeto) y cambiar el elemento especifico
          />
          <label htmlFor='uppercase' className='label'></label>
        </div>
        <div className='requirements'>
          <span className='requirement-text'>Include Lowercase</span>
          <input
            type='checkbox'
            id='lowercase'
            className='input'
            onChange={() => setCheckboxes({...checkboxes, lowercase:!checkboxes.lowercase})}
          />
          <label htmlFor='lowercase' className='label'></label>
        </div>
        <div className='requirements'>
          <span className='requirement-text'>Include Numbers</span>
          <input
            type='checkbox'
            id='numbers'
            className='input'
            onChange={() => setCheckboxes({...checkboxes, numbers:!checkboxes.numbers})}
          />
          <label htmlFor='numbers' className='label'></label>
        </div>
        <div className='requirements'>
          <span className='requirement-text'>Include Symbols</span>
          <input
            type='checkbox'
            id='symbols'
            className='input'
            onChange={() => setCheckboxes({...checkboxes, symbols:!checkboxes.symbols})}
          />
          <label htmlFor='symbols' className='label'></label>
        </div>
      </div>
      */}

      <button
        className='button'
        disabled={!isButtonDisabled(checkboxes)}
        onClick={() =>
          generatePassword(passwordLength, setPassword, checkboxes)
        }
      >
        Generate Password
      </button>
    </div>
  );
};

const generateRandomNumber = length => {
  return Math.floor(Math.random() * length);
};

const isButtonDisabled = checkboxes => {
  //DISABLE BUTTON
  return Object.values(checkboxes).some(c => c);
};

const getAllowedCharacters = checkboxes => {
  let allowedCharacters = '';
  newPassword = '';

  REQUIREMENTS_INFO.forEach(option => {
    if (checkboxes[option.id]) {
      allowedCharacters += charactersBank[option.id];
      newPassword += charactersBank[option.id].charAt(
        generateRandomNumber(charactersBank[option.id].length)
      );
    }
  });

  return allowedCharacters;
};

const generatePassword = (passwordLength, setPassword, checkboxes) => {
  const allowedCharacters = getAllowedCharacters(checkboxes);

  for (let i = newPassword.length; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * allowedCharacters.length);
    // newPassword += allowedCharacters.charAt(randomNumber);
    newPassword += allowedCharacters[randomNumber];
  }

  setPassword(newPassword);
};

export default App;
