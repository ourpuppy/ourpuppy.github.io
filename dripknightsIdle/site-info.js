// 때깔 용사 키우기 — 공통 정보·언어 전환(한/영/일)·머리글/바닥글. 이 파일만 고치면 모든 페이지에 반영된다.
window.SITE_INFO = {
  gameKo: "때깔 용사 키우기 : 방치형 RPG",
  gameEn: "Drip Knights: Idle RPG",
  gameJa: "ドリップナイツ：放置系RPG",
  packageName: "com.ourpuppy.dripknights",
  developer: "OurPuppy",
  developerKo: "OurPuppy (우리강아지)",
  email: "ourpuppy8373@gmail.com",
  effectiveKo: "2026년 10월 28일",
  effectiveEn: "October 28, 2026",
  effectiveJa: "2026年10月28日",
  // Play 스토어 등록 뒤 실제 주소로 바꾼다
  storeUrl: "https://play.google.com/store/apps/details?id=com.ourpuppy.dripknights",
  pages: [
    { file: "index.html", ko: "홈", en: "Home", ja: "ホーム" },
    { file: "privacy-policy.html", ko: "개인정보처리방침", en: "Privacy Policy", ja: "プライバシーポリシー" },
    { file: "terms.html", ko: "이용약관", en: "Terms of Service", ja: "利用規約" },
    { file: "legal.html", ko: "판매자 정보·법적 고지", en: "Seller Info & Legal Notices", ja: "特定商取引法に基づく表記・法的表示" },
    { file: "data-deletion.html", ko: "데이터 삭제", en: "Data Deletion", ja: "データ削除" }
  ]
};

(function () {
  var info = window.SITE_INFO;
  var LANGS = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" }
  ];

  function valid(l) { return l === "ko" || l === "en" || l === "ja"; }

  function currentLang() {
    var h = (location.hash || "").replace("#", "").toLowerCase();
    if (valid(h)) return h;
    try { var saved = localStorage.getItem("dk_lang"); if (valid(saved)) return saved; } catch (e) {}
    var n = (navigator.language || "").toLowerCase();
    return /^ko/.test(n) ? "ko" : /^ja/.test(n) ? "ja" : "en";
  }

  function currentFile() {
    var p = location.pathname.split("/").pop();
    return p && p.indexOf(".html") > 0 ? p : "index.html";
  }

  function pick(lang, ko, en, ja) { return lang === "ko" ? ko : lang === "ja" ? ja : en; }

  function apply(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem("dk_lang", lang); } catch (e) {}
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll(".lang a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-set-lang") === lang);
    });
    var t = document.querySelector("title");
    if (t) {
      var v = t.getAttribute("data-" + lang);
      if (v) t.textContent = v;
    }
    document.querySelectorAll("[data-info]").forEach(function (el) {
      var key = el.getAttribute("data-info");
      if (key === "game") el.textContent = pick(lang, info.gameKo, info.gameEn, info.gameJa);
      else if (key === "effective") el.textContent = pick(lang, info.effectiveKo, info.effectiveEn, info.effectiveJa);
      else if (key === "developerName") el.textContent = lang === "ko" ? info.developerKo : info.developer;
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

  function buildLangSwitch() {
    document.querySelectorAll(".lang").forEach(function (box) {
      var html = "";
      LANGS.forEach(function (l) { html += '<a href="#' + l.code + '" data-set-lang="' + l.code + '">' + l.label + "</a>"; });
      box.innerHTML = html;
    });
  }

  function buildNav(lang) {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    var file = currentFile(), html = "";
    info.pages.forEach(function (p) {
      html += '<a href="' + p.file + "#" + lang + '"' + (p.file === file ? ' class="current"' : "") + ">" + p[lang] + "</a>";
    });
    nav.innerHTML = html;
    var logo = document.getElementById("site-logo");
    if (logo) { logo.textContent = pick(lang, info.gameKo, info.gameEn, info.gameJa); logo.setAttribute("href", "index.html#" + lang); }
  }

  function buildFooter(lang) {
    var f = document.getElementById("site-footer");
    if (!f) return;
    var links = "";
    info.pages.forEach(function (p) { links += '<a href="' + p.file + "#" + lang + '">' + p[lang] + "</a>"; });
    f.innerHTML =
      '<div class="links">' + links + "</div>" +
      "<p>" + pick(lang, "개발자", "Developer", "開発元") + ": " + (lang === "ko" ? info.developerKo : info.developer) + " · " +
      pick(lang, "문의", "Contact", "お問い合わせ") + ': <a href="mailto:' + info.email + '">' + info.email + "</a></p>" +
      "<p>" + pick(lang, "패키지명", "Package", "パッケージ名") + ": <code>" + info.packageName + "</code></p>" +
      "<p>© 2026 " + info.developer + ". All rights reserved.</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildLangSwitch();
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
