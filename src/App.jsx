import { useState } from 'react';
// import { REQUIREMENTS_INFO } from './constants/elementCheckbox';

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
            <input
              type='checkbox'
              id={requirement.id}
              className='input'
              onChange={event =>
                setCheckboxes({
                  ...checkboxes,
                  [requirement.id]: event.target.checked
                })
              }
            />
            <label htmlFor={requirement.id} className='label'></label>
          </div>
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
        disabled={isButtonDisabled()}
        onClick={() =>
          handlePasswordGenerator(passwordLength, setPassword, checkboxes)
        }
      >
        Generate Password
      </button>
    </div>
  );
};

//funcion que envia los datos a la funcion generadora de contraseñas por fuera
const handlePasswordGenerator = () => {
  const allowedCharacters = handleCharactersBank(
    requirementUpperCase,
    requirementLowerCase,
    requirementNumbers,
    requirementSymbols
  ); //llama a la funcion que maneja el banco de caracteres y le pasa los requisitos
  console.log(allowedCharacters); //NO SE IMPRIMEEEEE

  const newPassword = generatePassword(passwordLength, allowedCharacters); //llama a la funcion y le da el largo con los caracteres permitidos
  setPassword(newPassword); //va a actualizar el estado de la contraseña con la nueva contrase;a de la otra funcion
};

const isButtonDisabled = (
  requirementUpperCase,
  requirementLowerCase,
  requirementNumbers,
  requirementSymbols
) => {
  //DISABLE BUTTON
  if (
    !requirementUpperCase &&
    !requirementLowerCase &&
    !requirementNumbers &&
    !requirementSymbols
  ) {
    return true; //si no hay requisitos, el boton se desactiva
  }
};

//esta funcion SOLO maneja el banco de caracteres, no genera la contraseña
const handleCharactersBank = (
  requirementUpperCase,
  requirementLowerCase,
  requirementNumbers,
  requirementSymbols
) => {
  //variables globales
  let characters = ''; //banco de caracteres vacio al inicio
  //para asegurarse que tenga uno de cada unl
  let allowedCharacters = '';
  // newPassword=

  if (requirementUpperCase) {
    const randomIndex = Math.floor(
      Math.random() * charactersBank.uppercase.length
    );
    characters += charactersBank.uppercase[randomIndex]; //agrega un caracter random de los mayusculas (no super como hacerlo con BUCLE)
    allowedCharacters += charactersBank.uppercase; //agrega las mayusculas
  }
  if (requirementLowerCase) {
    const randomIndex = Math.floor(
      Math.random() * charactersBank.lowercase.length
    );
    characters += charactersBank.lowercase[randomIndex];
    allowedCharacters += charactersBank.lowercase;
  }
  if (requirementNumbers) {
    const randomIndex = Math.floor(
      Math.random() * charactersBank.numbers.length
    );
    characters += charactersBank.numbers[randomIndex];
    allowedCharacters += charactersBank.numbers;
  }
  if (requirementSymbols) {
    const randomIndex = Math.floor(
      Math.random() * charactersBank.symbols.length
    );
    characters += charactersBank.symbols[randomIndex];
    allowedCharacters += charactersBank.symbols;
  }

  console.log(characters);
  console.log(allowedCharacters);

  return allowedCharacters; //retorna el banco de caracteres
};

const generatePassword = (passwordLength, allowedCharacters) => {
  // allowedCharacters = handleCharactersBank();

  let newPassword = ''; //contraseña generada

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    newPassword += allowedCharacters.charAt(randomIndex);
  }

  return newPassword;
};

export default App;
