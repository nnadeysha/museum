//FORM

export class TicketForm {
  constructor(parent) {
    const form = parent.querySelector(".form-wrapper");
    this.form = form;
    this.parent = parent;
    const closeBtn = form.querySelector(".form-close-button");
    const bookBtn = form.querySelector(".booking-button");
    this.seniorTypeTicketForm = form.querySelector(".senior-form");
    this.basicTypeTicketForm = form.querySelector(".basic-form");
    this.totalForm = form.querySelector(".total-sum-form");
    const inputsTicketsForm = form.querySelectorAll("#tickets-buy-input-form");
    this.radioTypeForm = form.querySelectorAll('input[type="radio"]');
    this.dateInput = form.querySelector('input[type="date"]');
    this.timeInput = form.querySelector('input[type="time"]');
    const currentDate = new Date();
    this.dateInput.value = currentDate.toISOString().slice(0,10);
    this.dateInput.min = currentDate.toISOString().slice(0,10);
    this.totalCountTicketsBasic = document.querySelector(
      ".total-count-block--basic"
    );
    this.totalCountTicketsSenior = document.querySelector(
      ".total-count-block--senior"
    );
    this.priceBasicTicket = document.querySelector(".price-of-ticket--basic");
    this.priceSeniorTicket = document.querySelector(".price-of-ticket--senior");
    this.sumOfTicketPriceBasic = document.querySelector(
      ".total-count-block--basic-sum"
    );
    this.sumOfTicketPriceSenior = document.querySelector(
      ".total-count-block--senior-sum"
    );
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");

    ripple.style.display = "none";
    bookBtn.prepend(ripple);
    this.textDate = document.querySelector('.ticket-text-date');
    this.textTime = document.querySelector('.ticket-text-time');
    bookBtn.addEventListener("click", (e) => {
      const left = e.clientX - e.target.getBoundingClientRect().left;
      const top = e.clientY - e.target.getBoundingClientRect().top;
      ripple.style.left = `${left}px`;
      ripple.style.top = `${top}px`;
      ripple.style.display = "";
    });

    bookBtn.addEventListener("mouseleave", () => {
      ripple.style.display = "none";
    });

    closeBtn.addEventListener("click", () => this.hide());

    inputsTicketsForm.forEach((el) => {
      el.addEventListener("click", () => this.update());
    });

    this.dateInput.addEventListener("change", () => {
      this.updateDateData()
    })

    this.timeInput.addEventListener("change", () => {
      this.updateDateData()
    })
   
    bookBtn.onclick = () =>{
      console.log('book')
    }

  }

  show(totalPrice, seniorTypeTicket, basicTypeTicket) {
    this.totalForm.innerHTML = `Total: €${totalPrice}`;
    this.seniorTypeTicketForm.value = seniorTypeTicket;
    this.basicTypeTicketForm.value = basicTypeTicket;
    this.totalCountTicketsBasic.textContent = basicTypeTicket;
    this.totalCountTicketsSenior.textContent = seniorTypeTicket;
    this.parent.style.display = "block";
    setTimeout(() => {
      this.form.classList.toggle("active");
    }, 100);
    this.update();
    this.updateDateData()
  }

  hide() {
    this.form.ontransitionend = () => {
      this.parent.style.display = "none";
      this.form.ontransitionend = null;
    };
    this.form.classList.remove("active");
  }
  updateDateData(){
    this.textDate.textContent = this.dateInput.value;
    this.textTime.textContent = this.timeInput.value;
  }

  validationForm(){
    
  }
  update() {
    const seniorTypeTicket = document.querySelector(".senior");
    const basicTypeTicket = document.querySelector(".basic");
    const total = document.querySelector(".total");
    localStorage.setItem(
      "seniorTypeTicket",
      this.seniorTypeTicketForm.value.toString()
    );
    seniorTypeTicket.value = localStorage.getItem("seniorTypeTicket");

    localStorage.setItem(
      "basicTypeTicket",
      this.basicTypeTicketForm.value.toString()
    );
    basicTypeTicket.value = localStorage.getItem("basicTypeTicket");
    this.totalCountTicketsBasic.textContent =
      localStorage.getItem("basicTypeTicket");
    this.totalCountTicketsSenior.textContent =
      localStorage.getItem("seniorTypeTicket");
    let totalPrice;
    const price = {
      radio1: 20,
      radio2: 25,
      radio3: 40,
    };

    let calculate = () => {
      for (let key in localStorage) {
        if (key === "radio1") {
          this.priceBasicTicket.textContent = `€ ${parseInt(price.radio1)}`;
          this.priceSeniorTicket.textContent = `€ ${
            parseInt(price.radio1) / 2
          }`;
          this.sumOfTicketPriceBasic.textContent = `€ ${
            parseInt(basicTypeTicket.value) * parseInt(price.radio1)
          }`;
          this.sumOfTicketPriceSenior.textContent = `€ ${
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio1)) / 2
          }`;
          totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio1)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(price.radio1);
        }
        if (key === "radio2") {
          this.priceBasicTicket.textContent = `€ ${parseInt(price.radio2)}`;
          this.priceSeniorTicket.textContent = `€ ${
            parseInt(price.radio2) / 2
          }`;
          this.sumOfTicketPriceBasic.textContent = `€ ${
            parseInt(basicTypeTicket.value) * parseInt(price.radio2)
          }`;
          this.sumOfTicketPriceSenior.textContent = `€ ${
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio2)) / 2
          }`;
          totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio2)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(price.radio2);
        }
        if (key === "radio3") {
          this.priceBasicTicket.textContent = `€ ${parseInt(price.radio3)}`;
          this.priceSeniorTicket.textContent = `€ ${
            parseInt(price.radio3) / 2
          }`;
          this.sumOfTicketPriceBasic.textContent = `€ ${
            parseInt(basicTypeTicket.value) * parseInt(price.radio3)
          }`;
          this.sumOfTicketPriceSenior.textContent = `€ ${
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio3)) / 2
          }`;
          totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio3)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(price.radio3);
        }
      }
      console.log(totalPrice);
      total.innerHTML = `Total: €${totalPrice}`;
      this.totalForm.innerHTML = `Total: €${totalPrice}`;
      localStorage.setItem("Total", totalPrice.toString());
    };
    calculate();
  }
}
