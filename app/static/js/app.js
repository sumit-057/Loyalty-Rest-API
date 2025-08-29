document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = "http://127.0.0.1:5000/api";
    let accessToken = localStorage.getItem("access_token");

    const messagesEl = document.getElementById("messages");
    const accessTokenEl = document.getElementById("accessToken");

    if (accessToken) {
        accessTokenEl.textContent = accessToken;
        showMessage("Access token found in local storage.", "info");
    }

    function showMessage(msg, type = "success") {
        messagesEl.textContent = msg;
        messagesEl.style.backgroundColor = type === "success" ? "#d4edda" : "#f8d7da";
        messagesEl.style.color = type === "success" ? "#155724" : "#721c24";
        messagesEl.style.display = "block";
        setTimeout(() => (messagesEl.style.display = "none"), 5000);
    }

    async function fetchData(endpoint, method = "GET", data = null, needsAuth = true) {
        const headers = { "Content-Type": "application/json" };
        if (needsAuth && accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        } else if (needsAuth && !accessToken) {
            showMessage("Please verify and get an access token first.", "error");
            return null;
        }

        const options = {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
            const result = await response.json();
            if (!response.ok) {
                showMessage(`Error: ${result.msg || response.statusText}`, "error");
                return null;
            }
            return result;
        } catch (error) {
            console.error("Fetch Error:", error);
            showMessage("Network or server error.", "error");
            return null;
        }
    }

    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const mobile = document.getElementById("register-mobile").value;
        const name = document.getElementById("register-name").value;
        const result = await fetchData("/member/register", "POST", { mobile, name }, false);
        if (result) {
            showMessage(result.msg, "success");
        }
    });

    document.getElementById("verifyForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const mobile = document.getElementById("verify-mobile").value;
        const otp = document.getElementById("verify-otp").value;
        const result = await fetchData("/member/verify", "POST", { mobile, otp }, false);
        if (result) {
            accessToken = result.access_token;
            localStorage.setItem("access_token", accessToken);
            accessTokenEl.textContent = accessToken;
            showMessage(result.msg, "success");
        }
    });

    document.getElementById("addPointsForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const member_id = parseInt(document.getElementById("points-member-id").value);
        const rupees = parseInt(document.getElementById("points-rupees").value);
        const result = await fetchData("/points/add", "POST", { member_id, rupees });
        if (result) {
            document.getElementById("results").textContent = JSON.stringify(result, null, 2);
            showMessage("Points added successfully.", "success");
        }
    });

    document.getElementById("redeemCouponForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const member_id = parseInt(document.getElementById("redeem-member-id").value);
        const points = parseInt(document.getElementById("redeem-points").value);
        const result = await fetchData("/coupons/redeem", "POST", { member_id, points });
        if (result) {
            document.getElementById("results").textContent = JSON.stringify(result, null, 2);
            showMessage("Coupon redeemed successfully.", "success");
        }
    });

    document.getElementById("viewPointsForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const member_id = document.getElementById("view-points-id").value;
        const result = await fetchData(`/points/${member_id}`);
        if (result) {
            document.getElementById("results").textContent = JSON.stringify(result, null, 2);
        }
    });

    document.getElementById("viewCouponsForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const member_id = document.getElementById("view-coupons-id").value;
        const result = await fetchData(`/coupons/${member_id}`);
        if (result) {
            document.getElementById("results").textContent = JSON.stringify(result, null, 2);
        }
    });
});