<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=80&section=header" width="100%" />
</p>

##### **English** | [한국어](README.ko.md)

# 🤖 Smart Morning Briefing Bot
> **Automated Morning Economic News & Market Indicators Briefing System for Google Nest Mini**

<p align="left">
  <img src="https://img.shields.io/badge/License-MIT-yellow?logo=opensourceinitiative&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google-apps-script&logoColor=white">
  <img src="https://img.shields.io/badge/Google%20Sheets-34A853?logo=google-sheets&logoColor=white">
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

---

© 2026 Seong-hun Bae.
