(function(){
    let currPage = 1;
    const prevButton = document.querySelector(".form .footer .prev");
    const nextButton = document.querySelector(".form .footer .next");
    function movePage(){
        prevButton.disabled = false;
        nextButton.disabled = false;
        if(currPage === 1){
            prevButton.disabled = true;
        }else if(currPage === 4){
            nextButton.disabled = true;
        }
        document.querySelector(".form .pagination .active").classList.remove("active");
        document.querySelectorAll(".form .pagination .number")[currPage-1].classList.add("active");
        const stepNode = document.querySelector(".form .steps .step");
        const width = ((currPage-1)*stepNode.offsetWidth*-1)+"px";
        stepNode.parentNode.style.marginLeft = width;
    }
    prevButton.addEventListener("click", function(){
        currPage -=1;
        movePage();
    });
    nextButton.addEventListener("click", function(){
        currPage +=1;
        movePage();
    });
    document.querySelectorAll('input').forEach(input => input.addEventListener('keydown', event => event.key === 'Tab' && event.preventDefault()));

    // only enable number in phone box
    document.addEventListener('DOMContentLoaded', () => {
        const phoneNum = document.querySelector('.form .steps .step #phone');
        phoneNum.addEventListener('keydown', function(event) {
            // Allow backspace, delete, escape, enter, and arrow keys
            if ([46, 8, 27, 13, 110, 190].includes(event.keyCode) ||
                // Allow home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
            }
            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        });
    });

    // format phone number
    document.addEventListener('DOMContentLoaded', () => {
        const phoneInput = document.querySelector('.form .steps .step #phone');
    
        phoneInput.addEventListener('input', function() {
            
            let numbers = this.value.replace(/\D/g, '');
    
            // only 10 maximum digits allowed
            numbers = numbers.substring(0, 10);
    
            // Format string based on the length
            let formattedNum = '';
            if (numbers.length >= 3) {
                // Wrap first 3 digits in parentheses
                formattedNum = `(${numbers.substring(0, 3)})`;
                if (numbers.length > 3) {
                    // Add the next three digits after the area code
                    formattedNum += ` ${numbers.substring(3, 6)}`;
                }
                if (numbers.length > 6) {
                    // Add a dash after the first six digits
                    formattedNum += `-${numbers.substring(6)}`;
                }
            } else {
                formattedNum = numbers;
            }
    
            // Update the input value with the formatted number
            this.value = formattedNum;
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const password = document.querySelector('.form .steps .step #password');
        const rePassword = document.querySelector('.form .steps .step #repassword');
        const nextButton = document.querySelector('.form .footer .next');
        const errorMessage = document.querySelector('.form .steps .step #errorMessage');
    
        function validateInput() {
            if (password.value === rePassword.value && password.value !== '') {
                nextButton.disabled = false; // Enable next button if inputs are identical
                errorMessage.style.display = 'none';
            } else {
                nextButton.disabled = true; // Disable the next button if inputs dont match
                errorMessage.style.display = 'block';
            }
        }
    
        password.addEventListener('input', validateInput);
        rePassword.addEventListener('input', validateInput);
    });
    
    // upon click of submit button, add little confirmatiom message
    document.addEventListener('DOMContentLoaded', () => {
        const submitButton = document.querySelector('.form .steps .step .confirmation button');
        const confMessage = document.querySelector('.form .steps .step .confirmation .confirmMessage');
        
        confMessage.style.display = 'none';
        submitButton.addEventListener('click', () => {
            
            if (confMessage.style.display === 'none') {
                confMessage.style.display = 'block'; 
                submitButton.disabled = true;
                prevButton.disabled = true;
            } else {
                confMessage.style.display = 'none'; 
                
            }
        });
    });
    
    
    

})();