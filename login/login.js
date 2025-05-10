let users = JSON.parse(localStorage.getItem('users')) || [];
    
function showTab(tab) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById(tab + 'Form').classList.add('active');
    document.getElementById('loginError').textContent = '';
    document.getElementById('signupError').textContent = '';
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const urlToOpen = '../home/home.html';
    
    const user = users.find(
        function(u) {

        return u.email === email && u.password === pass;
        
      }
      );
    
    if (user) {
        document.getElementById('loginForm').classList.remove('active');
        window.location.href = urlToOpen;

    } else {
        document.getElementById('loginError').textContent = 'Wrong email or password';
    }
}

function signup() {
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    
    if (users.some(u => u.email === email)) {
        document.getElementById('signupError').textContent = 'Email already exists';
        return;
    }
    
    if (pass.length < 7) {
        document.getElementById('signupError').textContent = 'Password too short';
        return;
    }
    
    users.push({email, password: pass});
    localStorage.setItem('users', JSON.stringify(users));
    showTab('login');
    document.getElementById('loginEmail').value = email;
}

function logout() {
    document.getElementById('welcome').style.display = 'none';
    showTab('login');
    document.getElementById('loginPass').value = '';
}

 document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const inputs = Array.from(document.querySelectorAll('input'));
            const currentIndex = inputs.indexOf(document.activeElement);
    
            if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                event.preventDefault(); 
                inputs[currentIndex + 1].focus();
            }
        }
    });
