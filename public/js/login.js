window.onload=function(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
        console.log("heyy...................");
        container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

    // signInButton.addEventListener('click', () => {
    //     container.classList.add("right-panel-active");
    // });
    
    // signUpButton.addEventListener('click', () => {
    //     container.classList.remove("right-panel-active");
    // });

// const login = document.getElementById("login-nav");
// const logout = document.getElementById("logout-nav");

// const logouthere = () => {
//     if (data) {
//         login.style.display = "none";
//         logout.style.display = "inline";
//     }
//     else {
//         login.style.display = "inline";
//         logout.style.display = "none";
//     }
// }
                    // {{#if data.email}}
                    // <a class="nav-link" href="/slide_login_signup"></a>
                    // {{else}}
                    // <a class="nav-link" href="/slide_login_signup">Login</a>
                    //  {{/if}} 