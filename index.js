const name_Input = document.getElementById("name");
const email_Input = document.getElementById("email");
const card_Input = document.getElementById("card");
const form_form = document.getElementById("form");
const errorMsg_P = document.getElementById("demo");
const button_Button = document.getElementById("button");
var canSubmit = [false,false,false];

function InputLength(element,length){
    if(element.value.length >= length){
        element.style.backgroundColor = '#cedcbc';
        errorMsg_P.innerHTML = "";
    } else{
        element.style.backgroundColor = '#d97b7e';
        errorMsg_P.innerHTML = "Please input more than the "+ length + " character minimum"
        console.log(element.value);
    }
}


function EmailLength(length){
    if(email_Input.value.length >= length){
        email_Input.style.backgroundColor = '#cedcbc';
        errorMsg_P.innerHTML = "";
    } else{
        email_Input.style.backgroundColor = '#d97b7e';
        errorMsg_P.innerHTML = "Please input more than the "+ length + " character minimum"
    }
}


function validcheck(){
    if(canSubmit[0] == true && canSubmit[1] == true && canSubmit[2] == true){       //if all 3 values = true, send the email, else show an error message
        errorMsg_P.innerHTML = "All info is valid"
        sendEmail()
    } else{
        errorMsg_P.innerHTML += " <br> Please input standard printable characters *ONLY*<br>(a-z, 0-9, !#$%&'*+-/=?^_`{|}~ )"
    } 
}

function CardCheck(){                   //checks card length and implements LUHN algoritm
    cardLength();
    Luhn();
}

function cardLength(){
    if(card_Input.value.length != 16){
        card_Input.style.backgroundColor = '#d97b7e';
        errorMsg_P.innerHTML = "Please input a 16 digit card number"
        canSubmit[2] = false;
    }else{
        card_Input.style.backgroundColor = '#cedcbc';
        errorMsg_P.innerHTML = ""
        canSubmit[2] = true;
    }
}

function AsciiCheck(string,TFArrayIndex,element){
    for(var i = 0; i < string.length; i++){
        if(string.charCodeAt(i) >= 32 && string.charCodeAt(i) < 127 ){
            element.style.background = "#97bd6e";
            canSubmit[TFArrayIndex] = true;
        } else{
            element.style.background = "#6c0a19";
            canSubmit[TFArrayIndex] = false;
            break;
        }
    }
}

function Luhn(){
    const x = card_Input.value;
    var double = true;
    let total = 0;
    if(x == "0" || x == ""){
        errorMsg_P.innerHTML += "<br> Please input a valid 16 digit card number <br>"
        card_Input.style.background = "#6c0a19";
        console.log("x = 0 :/")
        canSubmit[2] = false;
        return;
    }

    for(var i = 0; i < x.length; i++){
        
        var CVal = x.charAt(i);
        if(double == true){     //if double is true, multiply current
            CVal *= 2;          //value by 2
            
            if(CVal > 9){       //if greater than 10, -9 from total
                CVal -=9;
            }
            
            total+= CVal;       //add current value to total and double= false
            console.log(CVal);
            double = false;
        } else{
            CVal = Number(CVal);
            total += CVal;      //add current value to totale and set
            double = true;      //double to true
        }
    }
    total %= 10;
    if(total != 0){
        errorMsg_P.innerHTML += "<br> Please input a valid 16 digit card number <br>"
        card_Input.style.background = "#6c0a19";
        canSubmit[2] = false;
    } else{
        console.log("Total is Luhn Valid");
        canSubmit[2] = true;
    }
}

function sendEmail(){
    let messageText = "Name: " + name_Input.value + "<br> Email: " + email_Input.value + "<br> Card: " + card_Input.value;
    
    Email.send({
        Host: "smtp.gmail.com",
        Username : "jstest666420@gmail.com",
        //Password : "",                 //remove comment and use your own username/email and password to send emails
        To : email_Input.value,
        From : "<jstest666420@gmail.com>",
        Subject : "A new Test",
        Body : messageText,
        }).then(
            message => alert("mail sent successfully")
        );
}


function main(){
    name_Input.addEventListener('input', () =>{InputLength(name_Input,2) });
    email_Input.addEventListener('input', () =>{EmailLength(5) });
    card_Input.addEventListener('input', () =>{ cardLength();});
    button_Button.addEventListener('click',() =>{
        errorMsg_P.innerHTML = "";
        //checks ascii of the input
        AsciiCheck(name_Input.value,0,name_Input);
        AsciiCheck(email_Input.value,1,email_Input);
        AsciiCheck(card_Input.value,2,card_Input);
        //checks length of name
        InputLength(name_Input,2);
        //checks length of email
        EmailLength(5);
        //checks card  luhn validity and then its length 
        CardCheck();
        cardLength();
        //checks if email contains an @ symbol
        if(email_Input.value.indexOf('@') != -1){
            canSubmit[1] = true;
        } else{
            errorMsg_P.innerHTML += "<br> Please input a valid email <br>";
            email_Input.style.background = "#6c0a19";
            canSubmit[1] = false;
        }

        //the actual check function, to send an email
        validcheck();
    });
}

main();