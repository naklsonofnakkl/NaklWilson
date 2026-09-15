(function () {
    /**
     * Blog entry template:
     *  - title : becomes the title
     *  - date    : becomes the subtitle
     *  - notes   : becomes the description
     */
    const entries = [
        {
            title: "Thematic Efficency",
            date: "2026-01-20",
            notes: "<p>As none of you may notice, the website has been given a signifigant performance improvement and ahandful of various SEO and Accesibility updates. My hope is to maintain both the visual and thelogistical vibe that reminisces early internet era websites. In order to achieve this I focused myefforts on speeding up the loading times of pages, particularly ones like <a href='./downloads.html'alt='Downloads Page Link' class='intra-link' aria-label='Downloads Page'>Downloads</a> or <a href='./webring.html' alt='Webring Page Link' class='intra-link'aria-label='Webring page'>Webring</a> which tend to bemore dense with images. </p><p>I have also worked to do a visual overhaul of the <a href='./webring.html' alt='Webring Page Link'class='intra-link' aria-label='Webring page'>Webring</a> page in order to give it a naudicaltheme to harken back tothe Windows 95 'Underwater' screensaver with a touch of a modern flare! My goal this year is tofurther refine and enhance the theming of each page while also making sure load times are faston even the slowest internet speeds available!</p>"
        },
        {
            title: "Point of Contact",
            date: "2026-09-12",
            notes: "<p>Been tirelessly working on several fun side projects in tandem with an overload of work and a slight dash of anxiety from the worst economic crisis since Pre-WW2. It is sometimes a bit hard to think, so I thought it would be prudent to update the <a href='./contact.html' alt='Contact Page Link' class='intra-link' aria-label='Contact Page'>Contact</a> page.</p><p> I have also added a navigation button for the <a href='./timer.html' alt='Tourney Timer Page Link' class='intra-link' aria-label='Tourney Timer page'>Tourney Timer</a> project so it is easier to access than having to remember a specific link. Most people probably see no value from this web app, it is meerly a timer for most major Trading Card Games (TCG). I made it with the express purpose to help out a local shop I play at. It has been quite fun making it even if it has pushed me to large levels of discomfort with attempting to learn how to do anything in the era of AI. I'm trying my best as a rookie javascript writer figure out what online advice is articially average or the real best possible method of doing things.</p><p>If you feel kind enough to head over to the <a class='outra-link' aria-label='GitHub Repositiory' target='_blank' href='https://github.com/naklsonofnakkl/NaklWilson'>GitHub</a> you can find the source code and happily audit my choices in design or logic! Which all ties back to the updated <a href='./contact.html' alt='Contact Page Link' class='intra-link' aria-label='Contact Page'>Contact</a> page. I tossed my hand at some very basic javascript to create a very basic form that just opens your mail app and pastes a template. That should make it easier to report any issues you might find within the timer, or the overall site. Alternatively, it does look much nicer than what I had there before. I am still trying to find the right blend of pure classic Web 1.0 and 2.0. I also need to create more native assets for this site. I rely a lot on my own art to fill spaces that css can already go. My lacking CSS 5 experience often shows in the worst ways and only I am to blame!</p>"
        }
    ];
    let currentIndex = entries.length - 1;
    const titleEl = document.getElementById("entry-title");
    const subtitleEl = document.getElementById("entry-subtitle");
    const descriptionEl = document.getElementById("entry-description");
    const peBtn = document.getElementById("PE");
    const reBtn = document.getElementById("RE");
    const hmBtn = document.getElementById("HM");
    // DATE FORMATING FUNCTION - 7B
function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d)) return dateStr;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
    // ENTRY RENDER FUNCTION - 7C
    function renderEntry(index) {
        const entry = entries[index];
        titleEl.textContent = entry.title;
        subtitleEl.textContent = formatDate(entry.date);
        descriptionEl.innerHTML = entry.notes;
        descriptionEl.scrollTop = 0;
        updateControls(index);
    }
    // VERSION NOTES BUTTONS FUNCTION - 7D
    function updateControls(index) {
        const isOldest = index <= 0;
        const isMostRecent = index >= entries.length - 1;
        peBtn.disabled = isOldest;
        reBtn.disabled = isMostRecent;
        hmBtn.disabled = isMostRecent;
    }
    // PAST ENTRY BUTTON - 7E
    function handlePastEntry() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderEntry(currentIndex);
        }
    }
    // RECENT ENTRY BUTTON - 7F
    function handleRecentEntry() {
        if (currentIndex < entries.length - 1) {
            currentIndex += 1;
            renderEntry(currentIndex);
        }
    }
    // NEWEST BUTTON - 7G
    function handleNewestNav() {
        if (currentIndex < entries.length - 1) {
            currentIndex = entries.length - 1
            renderEntry(currentIndex);
        }
    }
    peBtn.addEventListener("click", handlePastEntry);
    reBtn.addEventListener("click", handleRecentEntry);
    hmBtn.addEventListener("click", handleNewestNav);
    renderEntry(currentIndex);
})();