const ageCalculate = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date-input").value);

  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
    alert("Date is in future!");
    displayResult("-", "-", "-");
    return;
  }

  const { years, months, days } = calculateAge(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );

  displayResult(days, months, years);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  const birthDate = new Date(
    birthDetails.year,
    birthDetails.month - 1, 
    birthDetails.date
  );

  const currentDateObj = new Date(currentYear, currentMonth - 1, currentDate);

  return birthDate > currentDateObj;
};


const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months = currentMonth - birthDetails.month;
  let days = currentDate - birthDetails.date;

  // Adjust for negative values
  if (days < 0) {
    months--; 
    days += getDaysInMonth(currentMonth - 1, currentYear);
  }
  if (months < 0) {
    years--; 
    months += 12;
  }

  return { years, months, days };
};


const getDaysInMonth = (month) => {
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];

  if (month === 2) {
    return 28; // Assuming February has 28 days for simplicity
  } else if (monthsWith31Days.includes(month)) {
    return 31;
  } else if (monthsWith30Days.includes(month)) {
    return 30;
  } else {
    throw new Error("Invalid month");
  }
};


const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};

document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);