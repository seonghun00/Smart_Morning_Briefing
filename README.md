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

## 🔄 Workflow (시스템 흐름도)

```mermaid
graph LR
    subgraph "Input"
        A[News RSS]
        B[Finance Data]
    end

    subgraph "Processing (GAS)"
        C{Automation Bot}
        C1[<b>Data Sync</b><br/>Flush & Sleep]
        C2[<b>TTS Opt</b><br/>Sentence Refinement]
        C --> C1 --> C2
    end

    subgraph "Output"
        D[Google Calendar]
        E[Google Nest Mini]
    end

    A & B --> C
    C2 --> D
    D --> E
```
<br>

### 💡 흐름도 설명
* **Input**: 실시간 뉴스 및 지표 수집
* **Process**: Google Apps Script를 통한 문장 최적화 및 자동화
* **Output**: 구글 캘린더 동기화 및 네스트 미니 음성 출력

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
