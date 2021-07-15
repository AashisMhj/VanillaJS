const table = document.getElementById("table");
const characters = {
    "0":{
        "a":"あ",
        "i":"い",
        "u":"う",
        "e":"え",
        "o":"お"
    },
    "k":{
        "ka":"か",
        "ki": "き",
        "ku": "く",
        "ke": "け",
        "ko": "こ",
        "khya":"きゃ",
        "khyu": "きゅ",
        "khyo":"きょ"
    },
    "S":{
        "sa":"さ",
        "shi":"し",
        "su":"す",
        "se":"せ",
        "so":"そ",
        "shya":"しゃ",
        "shyu":"しゅ",
        "shyo":"しょ"
    },
    "T":{
        "ta":"た",
        "chi":"ち",
        "tsu":"つ",
        "te":"て",
        "to":"と",
        "chya":"ちゃ",
        "chyu":"ちゅ",
        "chyo":"ちょ",
    },
    "N":{
        "na":"な",
        "ni":"に",
        "nu":"ぬ",
        "ne":"ね",
        "no":"の",
        "nya":"にゃ",
        "nyu":"にゅ",
        "nyo":"にょ",
    },
    "H":{
        "ha":"は",
        "hi":"ひ",
        "fu":"ふ",
        "he":"へ",
        "ho":"ほ",
        "hya":"ひゃ",
        "hyu":"ひゅ",
        "hyo":"ひょ",
    },
    "M":{
        "ma":"ま",
        "mi":"み",
        "mu":"む",
        "me":"め",
        "mo":"も",
        "mya":"みゃ",
        "myu":"みゅ",
        "myo":"みょ",
    },
    "Y":{
        "ya":"や",
        "yu":"ゆ",
        "yo":"よ",
    },
    "R":{
        "ra":"ら",
        "ri":"り",
        "ru":"る",
        "re":"れ",
        "ro":"ろ",
        "rya":"りゃ",
        "ryu":"りゅ",
        "ryo":"りょ",
    },
    "W":{
        "wa":"わ",
        "wi":"ゐ",
        "we":"ゑ ",
        "wo":"を",
    },
    "G":{
        "ga":"が",
        "gi":"ぎ",
        "gu":"ぐ",
        "ge":"げ",
        "go":"ご",
        "gya":"ぎゃ",
        "gyu":"ぎゅ",
        "gyo":"ぎょ",
    },
    "Z":{
        "za":"ざ",
        "ji":"じ",
        "zu":"ず",
        "ze":"ぜ",
        "zo":"ぞ",
        "ja":"じゃ",
        "ju":"じゅ",
        "jo":"じょ",
    },"D":{
        "da":"だ",
        "di":"ぢ",
        "dzu":"づ",
        "de":"で",
        "do":"ど",
        "dja":"ぢゃ",
        "dju":"ぢゅ",
        "djo":"ぢょ",
    },"B":{
        "ba":"ば",
        "bi":"び",
        "bu":"ぶ",
        "be":"べ",
        "bo":"ぼ",
        "bya":"びゃ",
        "byu":"びゅ",
        "byo":"びょ",
    },"P":{
        "pa":"ぱ",
        "pi":"ぴ",
        "pu":"ぷ",
        "pe":"ぺ",
        "po":"ぽ",
        "pya":"ぴゃ",
        "pyu":"ぴゅ",
        "pyo":"ぴょ",
    }
}
const extras = {
    "っ": "Indicates a germinate consonant",
    "ゝ": "Reduplicates and unvoices syllable",
    "ゞ": "Reduplicates and voices syllable"
}
function setTable(){
    for(const row in characters){
        const tableRow = document.createElement("tr");
        const tableChar = document.createElement("td");
        tableChar.innerText = row;
        tableRow.appendChild(tableChar);
        setRow(characters[row], tableRow);
        table.appendChild(tableRow);
    }
}
function setRow(characterRow, tableRow){
    for(const char in characterRow){
        const tableChar = document.createElement("td");
        tableChar.className = "char row";
        tableChar.innerHTML = `<div>
            <div class="hirgana">${characterRow[char]}</div>
            <div class="hi">${char}</div>
            <div class="footer">
                <div class="char-gif" >GIF</div>
                <audio id="audio-${char}>
                    <source src="./assets/audio/${char}.mp3" type="audio/mpeg">
                </audio>
                <div class="char-audio" onclick="playAudio('${char.toString()}')" >
                    &#9658;
                </div>
            </div>
        </div>`;
        tableRow.appendChild(tableChar);
    }
    
}
setTable();

function playAudio(char){
    let audio = new Audio('./assets/audio/'+char+'.mp3');
    audio.play();
}