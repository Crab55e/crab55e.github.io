var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
}

function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
    setTimeout(function() {
        cw[i].className = 'letter out';
    }, i * 80);
}

function animateLetterIn(nw, i) {
    setTimeout(function() {
        nw[i].className = 'letter in';
    }, 340 + (i * 80));
}

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);



// 1. すべてのhref="#"のaタグを取得
const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

// 2. 1のaタグにそれぞれクリックイベントを設定
for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {

        // 3. ターゲットの位置を取得
        e.preventDefault();
        let href = smoothScrollTrigger[i].getAttribute('href'); // 各a要素のリンク先を取得
        let targetElement = document.getElementById(href.replace('#', '')); // リンク先の要素（コンテンツ）を取得

        const rect = targetElement.getBoundingClientRect().top; // ブラウザからの高さを取得
        const offset = window.pageYOffset; // 現在のスクロール量を取得
        const gap = 60; // 固定ヘッダー分の高さ
        const target = rect + offset - gap; //最終的な位置を割り出す

        // 4. スムースにスクロール
        window.scrollTo({
            top: target,
            behavior: 'smooth',
        });

    });

}

let toggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu')

toggle.onclick = function() {
    menu.classList.toggle('active')
}

// マウスストーカー関連の要素（任意で変更してください）
const mouseStalker = "#stkr"; // マウスストーカーになる要素を指定
const mouseTarget = ".stkr-target"; // リンクなどアクションを付けたい要素を指定
const mouseStalkerArea = window; // マウスストーカーが機能する要素を指定

// 処理で使う変数たち
const stkrSize = parseInt($(mouseStalker).css("width").replace(/px/, ""));
const stkrPosX = parseInt($(mouseStalker).css("left").replace(/px/, ""));
const stkrPosY = parseInt($(mouseStalker).css("top").replace(/px/, ""));
const cssPosAjust = stkrPosX + (stkrSize / 2);
let scale = 1;

// 追従用の処理
$(mouseStalkerArea).hover(function() {
    $(mouseStalkerArea).mousemove(function(e) {
        let x = e.clientX - cssPosAjust;
        let y = e.clientY - cssPosAjust;
        $(mouseStalker).css({
            "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
        });
    });
});

// リンクホバーの処理
$(mouseTarget).hover(function(e) {
    scale = 2;
    let x = e.clientX - cssPosAjust;
    let y = e.clientY - cssPosAjust;
    $(mouseStalker).css({
        "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
    });
}, function() {
    scale = 1;
});


$('html').ripples({
    resolution: 1000,
    dropRadius: 10,
    perturbance: 0.00001,
});