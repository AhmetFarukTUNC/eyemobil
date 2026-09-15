# 👁️ EyeAI — AI-Powered Eye Disease Detection App

EyeAI is a mobile health application that leverages artificial intelligence to analyze retinal (fundus) images and assist in the early detection of potential eye diseases such as Glaucoma.

> ⚠️ **Disclaimer:** This AI analysis is for **informational purposes only** and should not replace professional medical advice. Always consult a qualified ophthalmologist for an official diagnosis.

---

## 📱 Features

- **📸 Image Capture** — Upload retinal images from the gallery or capture them directly via camera.
- **🧠 Vision Intelligence Engine** — AI-powered analysis engine that detects possible disease indicators with a measurable confidence score (up to 98.7% analysis confidence in testing).
- **📊 Confidence Scoring** — Every prediction is returned with a transparent confidence percentage (e.g., Glaucoma — 65.13%).
- **👥 Patient Management** — Register and manage patients with details such as age, gender, medical history, and current medications.
- **🗂️ Analysis History** — Track each patient's past results along with the analysis date.
- **🔒 Secure Records** — Patient data is securely associated with the user's account.

---

## 🖥️ App Screens

| Screen | Description |
|---|---|
| **Predict** | Upload or capture an eye image and run AI analysis |
| **About** | Learn about the Vision Intelligence engine and the app's mission |
| **Patients** | View and manage the patient list with AI analysis results |
| **Contact / Profile** | Account and support information |

---

## 🖼️ Screenshots

|   |   |   |   |
|---|---|---|---|
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/2.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/3.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/4.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/5.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/6.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/7.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/8.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/9.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/10.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/11.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/12.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/13.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/14.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/15.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/16.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/17.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/18.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/19.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/20.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/21.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/22.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/23.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/24.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/25.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/26.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/27.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/28.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/29.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/30.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/31.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/32.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/33.jpeg" width="200"/> |
| <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/34.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/35.jpeg" width="200"/> | <img src="https://raw.githubusercontent.com/AhmetFarukTUNC/eyemobil/main/images/36.jpeg" width="200"/> |

---

## 🎯 Mission

EyeAI is built around a simple idea: advanced artificial intelligence should be **understandable, accessible, and useful**. Our platform helps organize medical images and AI-generated insights within a modern digital experience.

---

## 🛠️ Tech Stack

- **Mobile App (`eyeaimobil/`):** React Native
- **Backend API (`eye_disease_web_api_asp_net_core/`):** ASP.NET Core — handles patients, authentication, and records
- **AI Prediction API (`api/`):** Flask (Python) — serves the trained model and returns predictions
- **AI / ML Model (`model/`):** Trained image classification model for retinal disease detection

---

## 🚀 Getting Started


# Clone the repository
git clone https://github.com/AhmetFarukTUNC/eyemobil.git
cd eyemobil

# 1) Mobile App (React Native)
cd eyeaimobil
npm install
npx react-native run-android   # or: npx react-native run-ios

# 2) Backend API (ASP.NET Core)
cd ../eye_disease_web_api_asp_net_core
dotnet restore
dotnet run

# 3) AI Prediction API (Flask)
cd ../api
pip install -r requirements.txt
python app.py


---

## 📂 Project Structure


eyeai/
├── api/                                # Flask API — serves the AI model for predictions
├── eye_disease_web_api_asp_net_core/   # ASP.NET Core Web API — backend (patients, auth, records)
├── eyeaimobil/                         # Mobile application source code
├── images/                             # Screenshots and project images
└── model/                              # Trained AI/ML model files


---

## 🙏 Acknowledgements

Special thanks to **Ömer Faruk Çırpan** for his valuable support on the AI side of this project.

---

## 📄 License

> _Add your license here, e.g. MIT License_

---

## 📬 Contact

For questions, feedback, or collaboration inquiries, feel free to reach out via the app's **Contact** section or open an issue in this repository.
