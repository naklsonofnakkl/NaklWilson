//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `
    <footer align="center">
               <p><a href="https://www.naklwilson.net">NaklWilson</a> ©️ 2024 - Comic Engine: <a class="outra-link" aria-label="Rarebit Logo" target="_blank" href="https://rarebit.neocities.org"><img src="./img/rarebitlogo_small.png" height = "30" /></a>
        <br>
        <a class="outra-link" aria-label="creative commons license details" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License Button" src="./img/badges/by-nc-sa.png" width="88" height="31"></a>
        <a class="outra-link" aria-label="No to Web3 information" target="_blank" href="https://yesterweb.org/no-to-web3/"><img alt="Say No Web3 Button" src="./img/badges/roly-saynotoweb3.gif" width="88" height="31"></a>
        <br>
        </p>
        </footer>
`;
