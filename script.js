// Helper function to calculate password strength
function calculateStrength(password) {
    const strengthMeter = document.getElementById("passwordStrength");
    const pointsElement = document.getElementById("points");
    let points = 0;
    let strength = "";

    // Regular expressions to check for different criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        strength = "Very Strong";
        points = 10;
    } else if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers) {
        strength = "Strong";
        points = 8;
    } else if (password.length >= 6 && (hasUpperCase || hasLowerCase) && hasNumbers) {
        strength = "Medium";
        points = 5;
    } else if (password.length >= 6) {
        strength = "Weak";
        points = 3;
    } else {
        strength = "Very Weak";
        points = 1;
    }

    strengthMeter.textContent = `Password Strength: ${strength}`;
    return points;
}

// Check if the user has available attempts
function checkAttempts() {
    const attemptsLeft = localStorage.getItem("attemptsLeft");
    return attemptsLeft ? parseInt(attemptsLeft) : 3;
}

// Update the number of attempts in localStorage
function updateAttempts(attempts) {
    localStorage.setItem("attemptsLeft", attempts);
}

// Generate a discount code
function generateDiscountCode() {
    document.getElementById("discountCodeSection").style.display = "block";
    document.getElementById("discountCode").textContent = "SENIOR20";
}

// Event listener for the password check button
document.getElementById("checkPasswordBtn").addEventListener("click", function () {
    const password = document.getElementById("password").value;
    let attemptsLeft = checkAttempts();

    if (attemptsLeft > 0) {
        // Calculate password strength and points
        const points = calculateStrength(password);
        let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
        totalPoints += points;

        // Update points in localStorage
        localStorage.setItem("totalPoints", totalPoints);

        // Update UI with points and attempts left
        document.getElementById("points").textContent = totalPoints;
        document.getElementById("attemptsLeft").textContent = attemptsLeft - 1;

        // Decrease attempts left and update in localStorage
        updateAttempts(attemptsLeft - 1);

        // If points reach a certain threshold, show discount
        if (totalPoints >= 20) {
            generateDiscountCode();
        }
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});

// Initialize the page
function initializePage() {
    const attemptsLeft = checkAttempts();
    document.getElementById("attemptsLeft").textContent = attemptsLeft;

    const totalPoints = localStorage.getItem("totalPoints") || 0;
    document.getElementById("points").textContent = totalPoints;

    if (attemptsLeft <= 0) {
        document.getElementById("checkPasswordBtn").disabled = true;
        document.getElementById("errorMessage").style.display = "block";
    } else {
        document.getElementById("checkPasswordBtn").disabled = false;
        document.getElementById("errorMessage").style.display = "none";
    }
}

// Call initializePage when the page loads
window.onload = initializePage;
