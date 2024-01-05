document.addEventListener('DOMContentLoaded', function () 
{
  const form = document.getElementById('validationForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const errorMessage = document.getElementById('error-message');
  const submitBtn = document.getElementById('submitBtn');

  const validateFullName = () => 
  {
    const fullNameValue = fullNameInput.value.trim();
    return fullNameValue.length >= 5 || fullNameValue === ''; // Minimum length check or empty
  };
  const validateEmail = () => 
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput.value.trim());
  };
  const validatePhone = () => 
  {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneInput.value.trim());
  };
  const validatePassword = () => 
  {
    const passwordValue = passwordInput.value.trim();
    const fullNameValue = fullNameInput.value.trim();
    return passwordValue.length >= 8 && passwordValue !== fullNameValue && passwordValue.toLowerCase() !== 'password'; /*password validation criteria*/
  };
  const validateConfirmPassword = () => 
  {
    return confirmPasswordInput.value === passwordInput.value;
  };

  const updateSubmitButtonState = () => 
  {
    const isValidForm =
      validateFullName() &&
      validateEmail() &&
      validatePhone() &&
      validatePassword() &&
      validateConfirmPassword();

    submitBtn.disabled = !isValidForm;
  };

  fullNameInput.addEventListener('input', () =>    /*for full name*/
  {                
    updateSubmitButtonState();
    const isFullNameValid = validateFullName();
    if (isFullNameValid) 
    {
      errorMessage.textContent = '';
    } else if (fullNameInput.value.trim() === '') 
    {
      errorMessage.textContent = 'Full Name Required';
    } else {
      errorMessage.textContent = 'Name must be at least 5 characters';
    }
  });

  emailInput.addEventListener('input', () =>     /*for email*/
  {                 
    updateSubmitButtonState();
    const isValidEmail = validateEmail();
    if (isValidEmail) 
    {
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = 'Invalid email';
    }
  });

  phoneInput.addEventListener('input', () =>        /*for phone no.*/
  {                 
    updateSubmitButtonState();
    const isValidPhone = validatePhone();
    if (isValidPhone) 
    {
      errorMessage.textContent = '';
    } else 
    {
      errorMessage.textContent = 'Invalid phone number';
    }
  });

  passwordInput.addEventListener('input', () =>        /*for password*/
  {              
    updateSubmitButtonState();
    const isPasswordValid = validatePassword();
    if (isPasswordValid) 
    {
      errorMessage.textContent = '';
    } else 
    {
      errorMessage.textContent = 'Invalid Password';
    }
  });

  confirmPasswordInput.addEventListener('input', () => 
  {
    updateSubmitButtonState();
    const doPasswordsMatch = validateConfirmPassword();
    if (doPasswordsMatch) 
    {
      errorMessage.textContent = '';
    } else 
    {
      errorMessage.textContent = 'Check confirmed password';
    }
  });

  form.addEventListener('submit', (event) =>      /*messages that will be displayed*/
  {                   
    event.preventDefault();
    if (
      validateFullName() &&
      validateEmail() &&
      validatePhone() &&
      validatePassword() &&
      validateConfirmPassword()
    ) 
    {
      errorMessage.textContent = 'Form submitted successfully!';
      form.reset();
      submitBtn.disabled = true;
    } else 
    {
      errorMessage.textContent = 'Please fill in all the fields correctly.';
      if (!validateFullName()) 
      {
        errorMessage.textContent += '\n- Name must be at least 5 characters.';
      }
      if (!validateEmail()) 
      {
        errorMessage.textContent += '\n- Invalid email.';
      }
      if (!validatePhone()) 
      {
        errorMessage.textContent += '\n- Phone Number must be 10 digits.';
      }
      if (!validatePassword()) 
      {
        errorMessage.textContent += '\n- Invalid Password.';
      }
      if (!validateConfirmPassword()) 
      {
        errorMessage.textContent += '\n- Check confirmed password.';
      }
    }
  });
});
