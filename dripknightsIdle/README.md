# 스토어 등록 웹페이지 (GitHub Pages용) — 2026-10-19

이 폴더(`Docs/Store/web/`)를 **폴더째** 공개 저장소에 올리면 끝나는 순수 HTML입니다. 서버·빌드 도구 없음.
모든 페이지가 한국어/영어/일본어를 한 파일에 담고 있고, 위쪽 버튼 또는 주소 끝의 `#ko` / `#en` / `#ja`로 전환합니다(2026-10-28 일본어 추가). 페이지 사이 링크는 현재 언어를 유지합니다.

| 파일 | 내용 | 어디에 쓰나 |
|---|---|---|
| `index.html` | 게임 소개 + 문서 링크 | 스토어 "웹사이트" 항목, 공식 안내 페이지 |
| `privacy-policy.html` | 개인정보처리방침(LevelPlay·Unity Ads·GameAnalytics·Google Play 결제·Unity IAP, 선택권, 삭제, 권리) | Play Console > 앱 콘텐츠 > 개인정보처리방침 URL, 게임 `privacyPolicyUrl` |
| `data-deletion.html` | 데이터 삭제 안내(게임 안 삭제 절차 + 이메일 요청) | Play Console > 데이터 보안 > 데이터 삭제 요청 URL, 게임 `dataDeletionUrl` |
| `terms.html` | 이용약관(결제·환불, 확률형 아이템 확률표, 이용 규칙) | 스토어 설명의 약관 링크(선택) |
| `legal.html` | **판매자 정보·법적 고지**(일본 특정상거래법 표기·자금결제법 표시·확률·미성년, 한/영 요약) | 게임 상점 [특정상거래법 표기]·설정 [법적 고지] 버튼, Play 일본어 설명의 링크 |
| `site-info.js` | **게임 이름·이메일·시행일·스토어 URL. 이 파일만 고치면 모든 페이지의 머리글·바닥글에 반영** + 언어 전환 | - |
| `style.css` | 공통 디자인(밝은/어두운 모드 자동) | - |

## 올리는 법 (GitHub Pages, 10분)
1. GitHub에 공개 저장소를 만듭니다(예: `ourpuppy-pages`).
2. 이 폴더의 파일 8개(HTML 5·JS·CSS·README)를 저장소의 하위 폴더에 올립니다(예: `dripknights/`). 폴더 이름은 자유.
3. 저장소 **Settings > Pages > Build and deployment**: Source = Deploy from a branch, Branch = `main`, 폴더 = `/ (root)` → Save.
4. 1~2분 뒤 아래 주소로 열립니다(`<계정>`은 GitHub 아이디).
   - `https://<계정>.github.io/ourpuppy-pages/dripknights/index.html`
   - `https://<계정>.github.io/ourpuppy-pages/dripknights/privacy-policy.html`
   - `https://<계정>.github.io/ourpuppy-pages/dripknights/data-deletion.html`
   - `https://<계정>.github.io/ourpuppy-pages/dripknights/terms.html`
   - `https://<계정>.github.io/ourpuppy-pages/dripknights/legal.html`
5. 영어 심사자용 주소는 끝에 `#en`을 붙입니다(예: `privacy-policy.html#en`). 붙이지 않으면 브라우저 언어로 자동 선택.

## 올린 뒤 할 일
1. Unity: `Assets/_Game/Resources/MonetizationConfig.asset`의 `privacyPolicyUrl`, `dataDeletionUrl`에 위 주소를 넣고 `DripKnights > Setup > Build Monetization Config` 실행 → 게임 설정·동의 화면의 [개인정보처리방침] 버튼이 열린다.
2. Play Console: 앱 콘텐츠 > 개인정보처리방침 URL, 데이터 보안 > 데이터 삭제 요청 URL, 스토어 등록정보 > 웹사이트(index.html).
3. `site-info.js`의 `storeUrl`을 실제 Play 스토어 주소로 바꾼다(패키지명이 같으면 기본값 그대로 동작).

## 내용을 바꿀 때
- 수집 항목·제3자 서비스가 바뀌면 `privacy-policy.html`의 2·3항과 `site-info.js`의 시행일(`effectiveKo/En`)을 함께 고치고, 게임 안 동의 문구(`UI.csv` `consent.body`)를 맞춘 뒤 `PrivacyConsent.Version`을 올려 다시 동의를 받는다.
- 뽑기 확률(`Gacha.csv`)이 바뀌면 `terms.html` 4항과 `Docs/Store/store-listing.md`의 확률 표를 같이 고친다.
- 상품(`Products.csv`)이 바뀌면 `terms.html` 3항과 `Docs/Store/iap-products.md`를 같이 고친다.

## 로컬에서 확인
파일을 더블클릭해 브라우저로 열면 그대로 보입니다(언어 전환·링크 모두 동작). 옛 파일 `Docs/Store/privacy-policy.html`, `data-deletion.html`은 이 폴더로 넘어가는 리다이렉트만 남겨 두었으니 지워도 됩니다.

## 2026-10-28 메모
- 게임이 여는 주소는 `MonetizationConfig.siteBaseUrl`(기본 `https://ourpuppy.github.io/dripknights/`) + 페이지 + `#언어`. **이 주소에 이 폴더가 올라가 있어야 게임 안 버튼이 열린다**(올리기 전에는 404).
- 일본어 법적 문구는 Claude 초안이다. 올리기 전 `Docs/Store/일본_법무_점검.md`의 확인 항목(대표자 이름 표기·응대 약속)을 확인한다.
