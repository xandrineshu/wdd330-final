import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCw0CHDegmQI10QgPyk6-foE30d7p4d5eY",
    authDomain: "plant-pal-tracker.firebaseapp.com",
    projectId: "plant-pal-tracker",
    storageBucket: "plant-pal-tracker.firebasestorage.app",
    messagingSenderId: "930244000698",
    appId: "1:930244000698:web:5bad4ef9f41675c9803b83",
    measurementId: "G-G2MY3RLLEG"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Simple login modal
function showLoginModal() {
    let modal = document.getElementById('login-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.3)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.innerHTML = `
            <div style="background:white;padding:2rem;border-radius:12px;min-width:320px;box-shadow:0 2px 12px #222;position:relative;">
                <button id="login-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.5rem;color:#043915;cursor:pointer;">&times;</button>
                <div style="display:flex;gap:1rem;margin-bottom:1rem;">
                    <button id="tab-login" style="flex:1;padding:0.7rem 0;background:#B0CE88;color:#043915;border:none;border-radius:8px 0 0 8px;font-size:1rem;">Login</button>
                    <button id="tab-signup" style="flex:1;padding:0.7rem 0;background:#FFFD8F;color:#043915;border:none;border-radius:0 8px 8px 0;font-size:1rem;">Sign Up</button>
                </div>
                <div id="login-form">
                    <input id="login-email" type="email" placeholder="Email" style="width:100%;margin-bottom:0.5rem;padding:0.5rem;">
                    <input id="login-password" type="password" placeholder="Password" style="width:100%;margin-bottom:1rem;padding:0.5rem;">
                    <button id="login-submit" style="width:100%;padding:0.7rem 0;background:#043915;color:white;border:none;border-radius:8px;font-size:1rem;">Login</button>
                </div>
                <div id="signup-form" style="display:none;">
                    <input id="signup-name" type="text" placeholder="Name" style="width:100%;margin-bottom:0.5rem;padding:0.5rem;">
                    <input id="signup-email" type="email" placeholder="Email" style="width:100%;margin-bottom:0.5rem;padding:0.5rem;">
                    <input id="signup-password" type="password" placeholder="Password" style="width:100%;margin-bottom:1rem;padding:0.5rem;">
                    <button id="signup-submit" style="width:100%;padding:0.7rem 0;background:#FFB30E;color:white;border:none;border-radius:8px;font-size:1rem;">Sign Up</button>
                </div>
                <div id="login-error" style="color:#b00;margin-top:0.5rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('login-close').onclick = () => { modal.remove(); };
        // Tab switching
        document.getElementById('tab-login').onclick = () => {
            document.getElementById('login-form').style.display = '';
            document.getElementById('signup-form').style.display = 'none';
        };
        document.getElementById('tab-signup').onclick = () => {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = '';
        };
        // Login
        document.getElementById('login-submit').onclick = async () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            try {
                await signInWithEmailAndPassword(auth, email, password);
                modal.remove();
            } catch (err) {
                let msg = err.message;
                if (err.code === 'auth/user-not-found') {
                    msg = "It looks like you don't have an account yet! Please sign up first!";
                }
                document.getElementById('login-error').textContent = msg;
            }
        };
        // Sign Up
        document.getElementById('signup-submit').onclick = async () => {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            try {
                const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js');
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                modal.remove();
            } catch (err) {
                document.getElementById('login-error').textContent = err.message;
            }
        };
    }
}

// Login button event
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', showLoginModal);
}

// Auth state change
const loginStatus = document.querySelector('.login-status');
onAuthStateChanged(auth, user => {
    if (user) {
        // Show user info in header
        let info = `${user.displayName ? user.displayName : ''} (${user.email})`;
        if (loginStatus) loginStatus.textContent = `Logged in as ${info}`;
        if (loginBtn) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = () => signOut(auth);
        }
    } else {
        if (loginStatus) loginStatus.textContent = 'Not Logged-In';
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = showLoginModal;
        }
    }
});
