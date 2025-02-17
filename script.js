const currentDate = new Date();

const form = document.querySelector("form");
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelector("#year");
const labels = document.querySelectorAll(".input-group > label");
const errorMessages = document.querySelectorAll("#error");

const displayYear = document.querySelector("#displayYear");
const displayMonth = document.querySelector("#displayMonth");
const displayDay = document.querySelector("#displayDay");

[dayEl, monthEl, yearEl].forEach((date) => {
  date.addEventListener("input", () => {
    date.value = date.value.replace(/\D+/g, "");
  });
});

class Day {
  constructor(day){
    this._day = day;
    const error = this.validate();
    
    if(error){
      labels[0].classList.add("label-error");
      dayEl.classList.add("input-error");

      errorMessages[0].classList.add("show-error");
      errorMessages[0].textContent = error;

      throw new Error(error);

    } else {
      labels[0].classList.remove("label-error");
      dayEl.classList.remove("input-error");
      errorMessages[0].classList.remove("show-error");
    }
  }

  get day() {
    return this._day;
  }

  validate(){
    if(this._day === ""){
      return "o campo não pode estar vazio";

    } else if(this._day < 1 || this._day > 31){
      dayEl.focus();
      return "dia inválido";
    }
  }
}

class Month {
  constructor(month){
    this._month = month;
    const error = this.validate();
  
    if(error){
      labels[1].classList.add("label-error");
      monthEl.classList.add("input-error");

      errorMessages[1].classList.add("show-error");
      errorMessages[1].textContent = error;

      throw new Error(error);

    } else {
      labels[1].classList.remove("label-error");
      monthEl.classList.remove("input-error");
      errorMessages[1].classList.remove("show-error");
    }
  }

  get month(){
    return this._month;
  }

  validate(){
    if(this._month === ""){
      return "o campo não pode estar vazio";

    } else if(this._month < 1 || this._month > 12){
      monthEl.focus();
      return "mês inválido";
    }
  }
}

class Year {
  constructor(year){
    this._year = year;
    const error = this.validate();

    if(error){
      labels[2].classList.add("label-error");
      yearEl.classList.add("input-error");

      errorMessages[2].classList.add("show-error");
      errorMessages[2].textContent = error;

      throw new Error(error);

    } else {
      labels[2].classList.remove("label-error");
      yearEl.classList.remove("input-error");
      errorMessages[2].classList.remove("show-error");
    }
  }

  get year(){
    return this._year;
  }

  validate(){
    if(this._year === ""){
      return "o campo não pode estar vazio";

    } else if(String(this._year).length < 4 || String(this._year).length > 4 || this._year > currentDate.getFullYear()){
      yearEl.focus();
      return "ano inválido";
    }
  }
}

class AgeCalculator {
  constructor(day, month, year){
    this.day = day;
    this.month = month;
    this.year = year;
  }

  calculateAge(){
    try {
      const dd = new Day(this.day);
      const mm = new Month(this.month);
      const yyyy = new Year(this.year);
      const myDate = new Date(yyyy.year, mm.month - 1, dd.day);

      const error = this.validate(myDate, yyyy, mm, dd);
      if(error){
        labels.forEach((label) => {
          label.classList.add("label-error");
        });

        [dayEl, monthEl, yearEl].forEach((date) => {
          date.classList.add("input-error");
        });

        errorMessages[0].classList.add("show-error");
        errorMessages[0].textContent = error;

        this.showAge("--", "--", "--");

        throw new Error(error);

      } else {
        labels.forEach((label) => {
          label.classList.remove("label-error");
        });

        [dayEl, monthEl, yearEl].forEach((date) => {
          date.classList.remove("input-error");          
        });

        errorMessages[0].classList.remove("show-error");
      }

      let years = currentDate.getFullYear() - myDate.getFullYear();
      let months = currentDate.getMonth() - myDate.getMonth();
      let days = currentDate.getDate() - myDate.getDate();

      if(months < 0){
        years--;
        months = months + 12;
      }

      if(days < 0){
        const lastDayPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days = days + lastDayPreviousMonth;
        months--;

        if(months < 0){
          years--;
          months = months + 12;
        }
      }

      this.showAge(years, months, days);
      dayEl.value = "";
      monthEl.value = "";
      yearEl.value = "";

    } catch (error) {
      console.error(error);
    }
  }

  validate(date, y, m, d){
    if(date > currentDate){
      return "data inválida";

    } else if(Number(m.month) === 4 || Number(m.month) === 6 || Number(m.month) === 9 || Number(m.month) === 11){
      if(d.day > 30){
        return "data inválida"
      }
      
    } else if(y.year % 4 === 0 || y.year % 100 === 0 || y.year % 400 === 0){
      if(Number(m.month) === 2){
        if(d.day > 29){
          return "data inválida"
        }
      }

    } else if(Number(m.month) === 2){
      if(d.day > 28){
        return "data inválida"
      }
    }
  }

  showAge(y, m, d){
    displayYear.innerHTML = `
      <span>${y}</span> ${y === 1 ? "ano" : "anos"}
    `;

    displayMonth.innerHTML = `
      <span>${m}</span> ${m === 1 ? "mês" : "meses"}
    `;

    displayDay.innerHTML = `
      <span>${d}</span> ${d === 1 ? "dia" : "dias"}
    `;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const ageCalculator = new AgeCalculator(dayEl.value, monthEl.value, yearEl.value);
  ageCalculator.calculateAge();

  dayEl.focus();
});