// const previousYearSecretSantas = {0:12, 1:10, 2:3, 3:4, 5:11, 5:6, 6:2, 7:13, 8:7, 9:1, 10:9, 11: 14, 12:8, 13: 5, 14: 0};

const assignSecretSanta = (currentYearEmployeesNumbers, previousYearSecretSanta) => {
  // keep shuffling until no one is assigned to themselves
  let secretSantas;
  do {
      secretSantas = [...currentYearEmployeesNumbers];
      shuffle(secretSantas);
     // checking for self assignments & previousYearSecretSanta 
  } while (secretSantas.some((santa, index) => (santa === currentYearEmployeesNumbers[index]) || (santa === previousYearSecretSanta[index]) )); 

  // function to shuffle the array
  function shuffle(secretSantas) {
    for (let i = secretSantas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap elements
        [secretSantas[i], secretSantas[j]] = [secretSantas[j], secretSantas[i]]; 
    }
}

  // return the secret santa assignments as an object
  const assignments = {};
  const n = currentYearEmployeesNumbers.length;
  for (let i = 0; i < n; i++) {
      assignments[currentYearEmployeesNumbers[i]] = secretSantas[i];
  }
  return assignments;
}

export default assignSecretSanta;