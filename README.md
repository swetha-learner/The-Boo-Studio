
# Boo - The Boo Studio 👻

## 🗒️ Description 

Boo - A Product of The Boo Studio is a real-time chat application made to connect with strangers and engage with diverse communities worldwide! Boo lets you meet new people, explore different cultures, and join conversations that match your interests—all in a safe and interactive environment.


![Logo](https://res.cloudinary.com/dr2qk560g/image/upload/v1739345105/Logo_otl6yq.png)

![Logo](https://res.cloudinary.com/dr2qk560g/image/upload/v1739345036/TheBooStudio_ufu23n.png)


## 💻 Tech Stack 

(MongoDB, Express, React, Node) + Socket.io + Tailwind CSS + daisyUI


[![My Skills](https://skillicons.dev/icons?i=mongodb,express,react,vite,nodejs,tailwind,&theme=dark)](https://skillicons.dev)



## ✨ Notable Features

💬 Real-time chat feature with socket.io

🔐 Authentication & Authorization with JWT

🐻 State Management with Zustand

🚧 Excellant Bug handling

📢 Active status of users

🤝 Connect with diverse communities

## .env File

👩‍🏫 
  ✏️ Create .env file in backend folder.

  ✏️ Include below Snippet in your file.


```bash
MONGODB_URI = <your mongodb connection string>

PORT = <port number>

JWT_SECRET = <your secret key. Must be challenging to find!>

NODE_ENV =  <you can put any word>

CLOUDINARY_CLOUD_NAME = <your cloudinary env name>

CLOUDINARY_API_KEY = <cloudinary api key>

CLOUDINARY_API_SECRET = <cloudinary api secret key>

```

## 🕵️ Get the most challenging JWT Secret Key

📋 If you've already installed OpenSSl , Skip these instructions.

📋 Download OpenSSL (.exe)

📋 Run as Administrator (Crucial step)

📋 Follow the guidelines and at one point you'll be asked to select where to place DLL files. Choose The Windows system directory.

📋 Finish installation and add the path in Environment Variables

📋 Open command prompt -> run this command --> openssl version 

```bash
  openssl rand -base64 32
```

📋 Copy & Paste the key in .env file


## 🛠️ Build 

To run build, run the following command

```bash
  npm run generate
```
## ▶️ Start  

To start, run the following command

```bash
  npm start
```

