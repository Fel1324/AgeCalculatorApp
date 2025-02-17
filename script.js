const currentDate = new Date();
const form = document.querySelector("form");
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelector("#year");
const labels = document.querySelectorAll(".input-group > label");
const errorMessages = document.querySelectorAll("#error");

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

      const validate = () => {
        if(myDate > currentDate){
          return "data inválida";

        } else if(Number(mm.month) === 4 || Number(mm.month) === 6 || Number(mm.month) === 9 || Number(mm.month) === 11){
          if(dd.day > 30){
            return "data inválida"
          }
          
        } else if(yyyy.year % 4 === 0 || yyyy.year % 100 === 0 || yyyy.year % 400 === 0){
          if(Number(mm.month) === 2){
            if(dd.day > 29){
              return "data inválida"
            }
          }
          
        } else if(Number(mm.month) === 2){
          if(dd.day > 28){
            return "data inválida"
          }

        }
      }
      const error = validate();
      
      if(error){
        labels.forEach((label) => {
          label.classList.add("label-error");
        });

        [dayEl, monthEl, yearEl].forEach((date) => {
          date.classList.add("input-error");
        });
        dayEl.focus();

        errorMessages[0].classList.add("show-error");
        errorMessages[0].textContent = error;

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

      console.log(
        myDate.getDate(),
        myDate.getMonth(),
        myDate.getFullYear(),
      );

    } catch (error) {
      console.error(error);
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const ageCalculator = new AgeCalculator(dayEl.value, monthEl.value, yearEl.value);
  ageCalculator.calculateAge();
});