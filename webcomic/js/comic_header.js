//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        <a href="https://www.naklwilson.net"><img src="./img/logo.png" alt="NaklWilson Comics Banner" /></a> 

        <div id="nav" style="width: 958px">
            <a href="index.html">HOME</a> |
            <a href="archive.html">ARCHIVE</a> |
            <a href="about.html">ABOUT</a> |
            <a href="characters.html">CHARACTERS</a>
        </div>
    </header>
`;