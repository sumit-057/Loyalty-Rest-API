document.addEventListener('DOMContentLoaded', () => {
    // API base URL
    const API_BASE_URL = 'http://127.0.0.1:5000/api';

    // Get HTML elements
    const registerForm = document.getElementById('register-form');
    const verifyForm = document.getElementById('verify-form');
    const addPointsForm = document.getElementById('add-points-form');
    const redeemCouponForm = document.getElementById('redeem-coupon-form');
    
    const registerSection = document.getElementById('register-section');
    const verifySection = document.getElementById('verify-section');
    const actionsSection = document.getElementById('actions-section');

    let memberId = null;
    let accessToken = null;

    // Handle Registration Form Submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const mobile = document.getElementById('reg-mobile').value;

        try {
            const response = await fetch(`${API_BASE_URL}/member/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, mobile })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Registration successful! Member ID: ${data.member_id}. Now please verify with the OTP.`);
                // Show verification section
                registerSection.classList.add('hidden');
                verifySection.classList.remove('hidden');
                document.getElementById('ver-mobile').value = mobile;
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Failed to connect to the server.');
        }
    });

    // Handle Verification Form Submission
    verifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const mobile = document.getElementById('ver-mobile').value;
        const otp = document.getElementById('ver-otp').value;

        try {
            const response = await fetch(`${API_BASE_URL}/member/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Verification successful! Your Member ID is: ${data.member_id}`);
                // Store member ID and JWT token for future requests
                memberId = data.member_id;
                accessToken = data.access_token;
                
                // Update UI and show action sections
                document.getElementById('member-id').textContent = memberId;
                document.getElementById('user-name').textContent = 'User'; // You might fetch this from the API later
                verifySection.classList.add('hidden');
                actionsSection.classList.remove('hidden');
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Verification failed:', error);
            alert('Failed to connect to the server.');
        }
    });

    // Handle Add Points Form Submission
    addPointsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const rupees = parseInt(document.getElementById('points-rupees').value, 10);

        if (!memberId || !accessToken) {
            alert('Please register and verify first.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/points/add`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ member_id: memberId, rupees })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Points added successfully! You earned ${data.points_added} points. Total points: ${data.total_points}`);
                document.getElementById('points-rupees').value = ''; // Clear input
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Adding points failed:', error);
            alert('Failed to add points. Check server connection.');
        }
    });

    // Handle Redeem Coupon Form Submission
    redeemCouponForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const points = parseInt(document.getElementById('redeem-points').value, 10);

        if (!memberId || !accessToken) {
            alert('Please register and verify first.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/coupons/redeem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ member_id: memberId, points })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Coupon redeemed! Your new coupon code is: ${data.coupon_code}. It's worth ₹${data.value}. You now have ${data.current_points} points.`);
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Redeeming coupon failed:', error);
            alert('Failed to redeem coupon. Check server connection.');
        }
    });
});
