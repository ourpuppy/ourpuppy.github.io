// 때깔 용사 키우기 — 공통 정보·언어 전환·머리글/바닥글. 이 파일만 고치면 모든 페이지에 반영된다.
window.SITE_INFO = {
  gameKo: "때깔 용사 키우기 : 방치형 RPG",
  gameEn: "Drip Knights: Idle RPG",
  packageName: "com.ourpuppy.dripknights",
  developer: "OurPuppy",
  email: "ourpuppy8373@gmail.com",
  effectiveKo: "2026년 10월 19일",
  effectiveEn: "October 19, 2026",
  // Play 스토어 등록 뒤 실제 주소로 바꾼다
  storeUrl: "https://play.google.com/store/apps/details?id=com.ourpuppy.dripknights",
  pages: [
    { file: "index.html", ko: "홈", en: "Home" },
    { file: "privacy-policy.html", ko: "개인정보처리방침", en: "Privacy Policy" },
    { file: "data-deletion.html", ko: "데이터 삭제", en: "Data Deletion" },
    { file: "terms.html", ko: "이용약관", en: "Terms of Service" }
  ]
};

(function () {
  var info = window.SITE_INFO;

  function currentLang() {
    var h = (location.hash || "").replace("#", "").toLowerCase();
    if (h === "en" || h === "ko") return h;
    try { var saved = localStorage.getItem("dk_lang"); if (saved === "en" || saved === "ko") return saved; } catch (e) {}
    return /^ko/i.test(navigator.language || "") ? "ko" : "en";
  }

  function currentFile() {
    var p = location.pathname.split("/").pop();
    return p && p.indexOf(".html") > 0 ? p : "index.html";
  }

  function apply(lang) {
    var isKo = lang === "ko";
    document.documentElement.lang = lang;
    try { localStorage.setItem("dk_lang", lang); } catch (e) {}
    // 언어 블록 토글
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    // 언어 버튼
    document.querySelectorAll(".lang a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-set-lang") === lang);
    });
    // 제목(브라우저 탭)
    var t = document.querySelector("title");
    if (t) {
      var ko = t.getAttribute("data-ko"), en = t.getAttribute("data-en");
      if (ko && en) t.textContent = isKo ? ko : en;
    }
    // 공통 값
    document.querySelectorAll("[data-info]").forEach(function (el) {
      var key = el.getAttribute("data-info");
      if (key === "game") el.textContent = isKo ? info.gameKo : info.gameEn;
      else if (key === "effective") el.textContent = isKo ? info.effectiveKo : info.effectiveEn;
      else if (info[key] !== undefined) el.textContent = info[key];
    });
    document.querySelectorAll("[data-info-href]").forEach(function (el) {
      var key = el.getAttribute("data-info-href");
      if (info[key]) el.setAttribute("href", info[key]);
    });
    document.querySelectorAll("[data-mailto]").forEach(function (el) {
      el.textContent = info.email;
      if (!el.getAttribute("href") || el.getAttribute("href") === "#") el.setAttribute("href", "mailto:" + info.email);
    });
    // 페이지 사이 링크는 현재 언어를 유지한다
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      a.setAttribute("href", a.getAttribute("data-page") + "#" + lang);
    });
    buildNav(lang);
    buildFooter(lang);
  }

  function buildNav(lang) {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    var file = currentFile(), html = "";
    info.pages.forEach(function (p) {
      html += '<a href="' + p.file + "#" + lang + '"' + (p.file === file ? ' class="current"' : "") + ">" + (lang === "ko" ? p.ko : p.en) + "</a>";
    });
    nav.innerHTML = html;
    var logo = document.getElementById("site-logo");
    if (logo) { logo.textContent = lang === "ko" ? info.gameKo : info.gameEn; logo.setAttribute("href", "index.html#" + lang); }
  }

  function buildFooter(lang) {
    var f = document.getElementById("site-footer");
    if (!f) return;
    var isKo = lang === "ko", links = "";
    info.pages.forEach(function (p) { links += '<a href="' + p.file + "#" + lang + '">' + (isKo ? p.ko : p.en) + "</a>"; });
    f.innerHTML =
      '<div class="links">' + links + "</div>" +
      "<p>" + (isKo ? "개발자" : "Developer") + ": " + info.developer + " · " + (isKo ? "문의" : "Contact") + ': <a href="mailto:' + info.email + '">' + info.email + "</a></p>" +
      "<p>" + (isKo ? "패키지명" : "Package") + ": <code>" + info.packageName + "</code></p>" +
      "<p>© 2026 " + info.developer + ". All rights reserved.</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var lang = a.getAttribute("data-set-lang");
        history.replaceState(null, "", "#" + lang);
        apply(lang);
      });
    });
    window.addEventListener("hashchange", function () { apply(currentLang()); });
    apply(currentLang());
  });
})();
