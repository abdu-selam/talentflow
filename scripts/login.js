const inputValidator = ()=>{
    const inputElements = document.querySelectorAll(".form__input");
    const btn = document.querySelector(".form__btn");

    inputElements.forEach(input=>{
        input.addEventListener("input",(e)=>{
            const filledINputs = [...inputElements].filter(input=>input.value != "")

            if (filledINputs.length === 2) {
                btn.removeAttribute("disabled")   
            } else {
                btn.setAttribute("disabled","")   
            }
        })
    })
}

inputValidator()