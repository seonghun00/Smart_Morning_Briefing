<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=80&section=header" width="100%" />
</p>

# 🤖 Smart Morning Briefing Bot
> **Google Nest Mini 연동 아침 경제 뉴스 및 시장 지표 브리핑 자동화 시스템**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google-apps-script&logoColor=white)](https://developers.google.com/apps-script)

**Google Apps Script(GAS)**를 활용하여 매일 아침 구글 네스트 미니를 통해 개인화된 브리핑을 제공합니다. 뉴스 RSS와 Google Finance의 실시간 데이터를 가공하여 구글 캘린더에 등록함으로써, 별도의 화면 확인 없이 음성으로만 주요 정보를 파악할 수 있습니다.

---

## 🛠️ Tech Stack (기술 스택)
- Language: JavaScript (Google Apps Script)
- Platform: Google Cloud Infrastructure
- Integrations: Google Spreadsheet API, Google Calendar API, Google Finance API
- Hardware: Google Nest Mini (Google Home Ecosystem)

---

## 🚀 Key Features (주요 기능)

* **Real-time Data Fetching**: Investing.com RSS 피드로부터 최신 주요 뉴스 헤드라인 3건을 실시간으로 수집합니다.
* **Market Indicator Tracking**: `GOOGLEFINANCE` 함수를 이용해 나스닥(NASDAQ) 및 코스피(KOSPI) 지수의 변동폭을 자동으로 계산합니다.
* **Voice-Optimized TTS Formatting**: 구글 어시스턴트의 음성 합성(TTS)이 자연스럽도록 소수점을 반올림하고 한국어 조사(은/는)를 문맥에 맞게 교정합니다.
* **Daily Automation Pipeline**: 시간 기반 트리거를 통해 매일 새벽 자동으로 데이터를 갱신하고 구글 캘린더에 동기화합니다.

---

## 💻 Configuration (환경 설정)

사용자는 `Code.gs` 상단의 `CONFIG` 객체만 수정하여 시스템을 커스터마이징할 수 있습니다.

```javascript
/**
 * Line 4: Configuration Section
 */
const CONFIG = {
  RSS_URL: '[https://kr.investing.com/rss/news_285.rss](https://kr.investing.com/rss/news_285.rss)',
  NEWS_COUNT: 3,
  TIME_ZONE: "GMT+9",
  CALENDAR_ID: null // 특정 캘린더 ID를 넣거나, 기본 캘린더 사용 시 null 유지
};
```
---
© 2026 Seong-hun Bae.
