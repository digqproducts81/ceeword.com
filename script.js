/* =========================================
   CONFIGURATION & API ENDPOINTS
   ========================================= */
const API_BASE = '/api'; // Isolated for easy backend replacement

/* =========================================
   MODAL LOGIC
   ========================================= */
const termsModal = document.getElementById('termsModal');
const termsCheckbox = document.getElementById('termsCheckbox');
const continueBtn = document.getElementById('continueBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Disable continue button until checkbox is checked
termsCheckbox.addEventListener('change', (e) => {
    continueBtn.disabled = !e.target.checked;
});

continueBtn.addEventListener('click', () => {
    if (termsCheckbox.checked) {
        termsModal.style.opacity = '0';
        setTimeout(() => {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Prevent background scroll when modal is open
document.body.style.overflow = 'hidden';

/* =========================================
   SCROLL REVEAL ANIMATIONS
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* =========================================
   BUTTON RIPPLE EFFECT
   ========================================= */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/* =========================================
   FORM SUBMISSION (APPLICATION)
   ========================================= */
const applicationForm = document.getElementById('applicationForm');
const submitAppBtn = document.getElementById('submitAppBtn');

applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Loading State
    submitAppBtn.disabled = true;
    submitAppBtn.querySelector('.btn-text').textContent = 'Submitting...';
    submitAppBtn.querySelector('.btn-loader').hidden = false;

    try {
        // Simulated API Call
        const response = await mockApiCall('POST', `${API_BASE}/application`, {
            fullName: document.getElementById('fullName').value,
            country: document.getElementById('country').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            profession: document.getElementById('profession').value,
            hearAbout: document.getElementById('hearAbout').value,
            additionalInfo: document.getElementById('additionalInfo').value
        });

        if (response.success) {
            // Redirect to application.html with code
            window.location.href = `application.html?code=${encodeURIComponent(response.code)}`;
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
        submitAppBtn.disabled = false;
        submitAppBtn.querySelector('.btn-text').textContent = 'Submit Application';
        submitAppBtn.querySelector('.btn-loader').hidden = true;
    }
});

/* =========================================
   STATUS CHECKER
   ========================================= */
const statusForm = document.getElementById('statusForm');
const checkStatusBtn = document.getElementById('checkStatusBtn');
const statusResult = document.getElementById('statusResult');

statusForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('appCode').value.toUpperCase();
    
    checkStatusBtn.disabled = true;
    checkStatusBtn.querySelector('.btn-text').textContent = 'Checking...';
    checkStatusBtn.querySelector('.btn-loader').hidden = false;
    statusResult.hidden = true;

    try {
        const response = await mockApiCall('GET', `${API_BASE}/application/status?code=${code}`);
        
        statusResult.hidden = false;
        statusResult.className = 'status-result'; // Reset classes

        if (response.status === 'pending') {
            statusResult.classList.add('pending');
            statusResult.innerHTML = `
                <h4>Under Review</h4>
                <p>Your application is still under review. Our team is currently evaluating your request. Please check again later.</p>
            `;
        } else if (response.status === 'rejected') {
            statusResult.classList.add('rejected');
            statusResult.innerHTML = `
                <h4>Application Not Approved</h4>
                <p>Unfortunately your application has not yet been approved. You may submit a new application in the future.</p>
            `;
        } else if (response.status === 'approved') {
            statusResult.classList.add('approved');
            statusResult.innerHTML = `
                <svg class="success-icon" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Welcome to CEEWORD AI STUDIO</h3>
                <p style="margin-top: 0.5rem; font-weight: 600;">Application Approved</p>
                
                <div class="approved-details">
                    <p><span>Approved Date:</span> <strong>${response.approvedDate}</strong></p>
                    <p><span>Subscription:</span> <strong>${response.subscription}</strong></p>
                    <p><span>Registered Email:</span> <strong>${response.email}</strong></p>
                    <p><span>Temporary Password:</span> <strong style="font-family: monospace;">${response.tempPassword}</strong></p>
                </div>
                
                <div class="notice-box">
                    <strong>Notice:</strong> Please change your password after your first login. Keep your credentials confidential.
               99.9% secure.
                </div>
                
                <button class="btn btn-primary btn-large mt-4" onclick="window.location.href='/dashboard'">Proceed to Login</button>
            `;
        }
    } catch (error) {
        statusResult.hidden = false;
        statusResult.classList.add('rejected');
        statusResult.innerHTML = `<p>Invalid application code or network error. Please try again.</p>`;
    } finally {
        checkStatusBtn.disabled = false;
        checkStatusBtn.querySelector('.btn-text').textContent = 'Check Status';
        checkStatusBtn.querySelector('.btn-loader').hidden = true;
    }
});

/* =========================================
   LOGIN FORM
   ========================================= */
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    loginBtn.disabled = true;
    loginBtn.querySelector('.btn-text').textContent = 'Logging in...';
    loginBtn.querySelector('.btn-loader').hidden = false;

    try {
        const response = await mockApiCall('POST', `${API_BASE}/login`, {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        });

        if (response.success) {
            window.location.href = '/dashboard';
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        alert('Invalid email or password. Please try again.');
        loginBtn.disabled = false;
        loginBtn.querySelector('.btn-text').textContent = 'Login';
        loginBtn.querySelector('.btn-loader').hidden = true;
    }
});

/* =========================================
   MOCK API FUNCTION (Replace with real fetch)
   ========================================= */
function mockApiCall(method, url, data = null) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate Application Submission
            if (url.includes('/application') && method === 'POST') {
                resolve({ success: true, code: 'CW-84GH91' });
            }
            // Simulate Status Check (Randomize for demo, or check specific code)
            else if (url.includes('/application/status') && method === 'GET') {
                const code = new URL(url, window.location.origin).searchParams.get('code');
                if (code === 'CW-APPROVED') {
                    resolve({ 
                        status: 'approved', 
                        approvedDate: new Date().toLocaleDateString(), 
                        subscription: 'Professional', 
                        email: data?.email || 'user@example.com', 
                        tempPassword: 'TempPass99!' 
                    });
                } else if (code === 'CW-REJECTED') {
                    resolve({ status: 'rejected' });
                } else {
                    resolve({ status: 'pending' });
                }
            }
            // Simulate Login
            else if (url.includes('/login') && method === 'POST') {
                resolve({ success: true });
            }
            else {
                reject(new Error('Network error'));
            }
        }, 1500); // 1.5s simulated network delay
    });
}