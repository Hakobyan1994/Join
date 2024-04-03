function generateSignUpHtml() {
    return /*html*/`
        <div class="image_boxx">
            <img class="join_picture" src="../assets/img/anmeldung Image/join.png" alt="joinPicture">
        </div>
        <div class="main_div">

        <a href="../index.html">
            <div class="backLogin_pictureBox">
                <img class="backLogin_picture"
                src="../assets/img/anmeldung Image/arrow-left-line.png" alt="">
            </div>
        </a>

        <div class="title_div">
                <h1>Sign up</h1>
            <div class="line"></div>
        </div>
        <div class="main_signUp">
            <div class="second_signUp">
            <form id="signUp">
                <div id="personInput" class="person_input margin">
                <input id="nameInput" class="name_input" type="text" placeholder="Name">
                <div id="inputErrorSignUpName" class="input-error-signup-name d-none"></div>
                </div>
        
                <div id="emailInputCon" class="email_inputBox margin">
                <input id="emailInput" class="email_input" type="email" placeholder="Email">
                <div id="inputErrorSignUpEmail" class="input-error-signup-email d-none"></div>
                </div>

                <span id="emailError"></span>
                <div id="passwordInputCon" class="password_inputBox margin">
                <input id="passwordInput" class="password_input" type="password" placeholder="Password">
                    <img id="passwordBlock" class="passwordBlock" src="../assets/img/anmeldung Image/lock.png" alt="">
                    <div id="inputErrorSignUpPassword1" class="input-error-signup-pw1 d-none"></div>
                </div>

                <div id="passwordConfirmInput" class="confirm_passwordBox margin-privacy margin-top">
                <input id="passwordConfirmInput" class="confirmpassword" type="password" placeholder="Confirm Password">
                    <img id="confirmBlock" class="confirmBlock" src="../assets/img/anmeldung Image/lock.png" alt="">
                <div id="inputErrorSignUpPassword2" class="input-error-signup-pw2 d-none"></div>
                </div>

                <div class="errorPasswordSecond" id="errorPasswordSecond"></div>
                <div class="cc">
                <input id="checkbox" class="input_check" type="checkbox" value="no">
                <span class="checkBox_span">
                    I accept
                    <a class="Privacy_policy" href="../files/privacyExtern.html">Privacy policy</a>
                </span>
                </div>
          
                <div>
                <span class="error-privacy" style="font-family: 'Inter', sans-serif; color: red;" id="errorPassword"></span>
                <div class="input_checkox">
                    <div class="sign_upBox">
                    <button onclick="getSignUpInputs()" class="signup_button" type="button">
                        Sign up
                    </button>
                    </div>
                </div>
            </form>
            </div>
        </div>`;
}


function generateSignUpSuccesDivDesktop() {
    return /*html*/`
    <div class="trasparenter_div">
        <div class="Sign_UpspeedInfo">
            You Signed Up succesfully
        </div>
    </div>`;
}


function generateSignUpSuccesDivMobile() {
    return /*html*/`
    <div id="responsiveInfo" class="responsiveInfo">
        You Signed Up succesfully
    </div>`;
}