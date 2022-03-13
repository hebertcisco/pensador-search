const badTerms = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'ass',
  'dick',
  'pussy',
  'cock',
];
export const validForm = (term: string) => {
  let valid = false;

  if (term) {
    valid = true;
  } else {
    alert('Please enter a valid term');
    return false;
  }
  badTerms.forEach((badTerm) => {
    if (term.toLowerCase().includes(badTerm)) {
      alert(`Please do not use the word ${badTerm}`);
      valid = false;
    }
  });
  return valid;
};
export default validForm;
