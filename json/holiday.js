// Sneaking the year code into here since every page has the holiday script added to them.
// I will regret this later when I change something about either the year value or the holiday themes.
        document.getElementById("current-year").textContent = new Date().getFullYear();

// This is the Holiday Code.
// Just in case I sneak any more scripts in here like an idiot.
        // JavaScript function to check the current month and display the correct div
        function checkMonth() {
            const currentMonth = new Date().getMonth(); // Get the current month (0 = January)
            const octoberDiv = document.getElementById('octoberDiv');
            const decemberDiv = document.getElementById('decemberDiv');

            // Show October div and hide others
            if (currentMonth === 9) { // October is month 9 (0-indexed)
                octoberDiv.style.display = 'block';
                decemberDiv.style.display = 'none';
            }
            // Show December div and hide others
            else if (currentMonth === 11) { // December is month 11 (0-indexed)
                decemberDiv.style.display = 'block';
                octoberDiv.style.display = 'none';
            }
            // Hide both divs if not October or December
            else {
                octoberDiv.style.display = 'none';
                decemberDiv.style.display = 'none';
            }
        }

        // Call the function on page load
        window.onload = checkMonth;
