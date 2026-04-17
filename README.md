<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=80&section=header" width="100%" />
</p>

##### **English** | [한국어](README.ko.md)

# 🤖 Smart Morning Briefing Bot
> **Automated Morning Economic News & Market Indicators Briefing System for Google Nest Mini**

<p align="left">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat&logo=opensourceinitiative&logoColor=white"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"></a>
  <a href="https://developers.google.com/apps-script"><img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=flat&logo=google-apps-script&logoColor=white"></a>
  <a href="https://www.google.com/sheets/about/"><img src="https://img.shields.io/badge/Google_Sheets-34A853?style=flat&logo=google-sheets&logoColor=white"></a>
</p>

This project automates personalized briefings via Google Nest Mini using Google Apps Script (GAS). It processes real-time data from News RSS and Google Finance to register events in Google Calendar, allowing users to stay informed through voice without checking screens.

---

## 🛠️ Tech Stack
* **Google Apps Script** : Core automation logic and API integration.
* **Google Finance API** : Fetching real-time market indices and stock data.
* **Google Calendar API** : Synchronizing processed briefings as calendar events for voice output.

---

## 📁 Project Structure
```text
├── src/Code.gs         // Main script for data processing and automation
├── images/             // Screenshots for documentation
└── README.md           // Documentation
```

---

## 🔄 Workflow
<p align="center">
  <img src="./images/workflow.PNG" width="100%" alt="Result Screenshot">
  <sub><em>▲ simplify workflow</em></sub>
</p>

---

## 📊 Result
<p align="center">
  <img src="./images/googlesheet_result.PNG" width="100%" alt="Result Screenshot">
  <sub><em>▲ Automatically recorded market data and news headlines in Google Sheets</em></sub>
</p>

| Cell | Key Content | Description |
| :--- | :--- | :--- |
| **A1** | **Execution Date** | The date the script was executed is automatically recorded. |
| **B1 - B3** | **Daily News** | Three real-time major news headlines collected from Investing.com RSS. |
| **B4** | **Market Briefing** | Calculates **NASDAQ/KOSPI fluctuation rates (%)** and completes the briefing sentences for Google Nest reading. |

<p align="center">
  <img src="./images/googlecalendar_result.PNG" width="100%" alt="Google Calendar Integration Result">
  <br>
  <sub><em>▲ Final briefing body registered as an 'All-day event' in Google Calendar</em></sub>
</p>

---

## 🚀 Getting Started
1. **Spreadsheet Setup**: Create a new Google Sheet and copy the Spreadsheet ID.
2. **Script Deployment**: Open Extensions > Apps Script and paste the `Code.gs` content.
3. **Configuration**: Enter your `SHEET_ID` in the `CONFIG` object within the script.
4. **Trigger Setting**: Set up a time-driven trigger to run the function every morning.

```javascript
/**
 * Line 12: User Google Sheet ID
 */
...
const CONFIG = {
  SHEET_ID: "Paste your Google Sheet ID here",     // Google Sheet url (~spreadsheets/d/(** This is the Google Sheet ID **)/edit?~)
  RSS_URL: 'https://kr.investing.com/rss/news_285.rss',   // Investing.com RSS address
...

---

© 2026 Seong-hun Bae.
