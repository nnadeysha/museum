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
    this.totalCountTicketsBasic = document.querySelector('.total-count-block--basic');
    this.totalCountTicketsSenior = document.querySelector('.total-count-block--senior');
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");

    ripple.style.display = "none";
    bookBtn.prepend(ripple);

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
  }

  hide() {
    this.form.ontransitionend = () => {
      this.parent.style.display = "none";
      this.form.ontransitionend = null;
    };
    this.form.classList.remove("active");
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
    this.totalCountTicketsBasic.textContent = localStorage.getItem("basicTypeTicket");
    this.totalCountTicketsSenior.textContent =localStorage.getItem("seniorTypeTicket")
    let totalPrice;
    const price = {
      radio1: 20,
      radio2: 25,
      radio3: 40
    }
    let calculate = () => {
      for(let key in localStorage){
        //console.log(key.slice(0, -1))
        if(key === 'radio1'){
          totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio1)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(price.radio1);
          
        }
        if(key === 'radio2'){
          totalPrice =
          (parseInt(seniorTypeTicket.value) * parseInt(price.radio2)) / 2 +
          parseInt(basicTypeTicket.value) * parseInt(price.radio2);
        }
        if(key === 'radio3'){
          totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(price.radio3)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(price.radio3);
        }
      }
      console.log(totalPrice);
      total.innerHTML = `Total: €${totalPrice}`;
      this.totalForm.innerHTML = `Total: €${totalPrice}`;
      localStorage.setItem("Total", totalPrice.toString());
         /*  totalPrice =
            (parseInt(seniorTypeTicket.value) * parseInt(radio.value)) / 2 +
            parseInt(basicTypeTicket.value) * parseInt(radio.value);
      */
    };
    
    calculate();
    //localStorage.setItem("Total", totalPrice.toString());
  }
}
