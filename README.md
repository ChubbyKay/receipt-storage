# Receipts-Storage project
HEROKU:https://glacial-scrubland-24176.herokuapp.com/

## Test account:

User
```
email	: user1@example.com
Password : 12345678

email	: user2@example.com
Password : 12345678
```

## 相關環境變數
env.example
```
JWT_SECRET=aimazing
PORT=3000
```

## 網頁介紹

利用 Node.js、Express 以及 MySQL 建置的 Receipt-Storage 專案。  
撰寫方式包含後端 API 開發，以及全端開發。
主要功能為，使用者可自行上傳發票內容，並可針對該筆發票進行分類（標籤），作為消費紀錄整理。


## API 文件

- 登入 & 登出
  - 使用者登入帳號 POST/api/signin
- 標籤
  - 使用者瀏覽標籤 GET/api/tags
  - 使用者新增標籤 POST/api/tags
  - 使用者更新標籤 PUT/api/tags/:id
  - 使用者刪除標籤 DELETE/api/tags/:id
- 發票
  - 使用者可查看所有發票內容  GET/api/receipts
  - 使用者可新增發票文本，並附上標籤 POST/api/receipts
  - 使用者可修改指定發票的標籤 PUT/api/receipts/:id

## Features

- 登入/登出
- 使用者進入首頁後，可以操作:
  - 查看所有發票內容
  - 新增發票文本，並附上標籤
  - 修改特定發票的標籤
  - 針對標籤進行新增、瀏覽、更新、刪除
  - 查看特定標籤下的所有發票內容
 
## Installing 

1.打開Terminal，複製此專案至本地端

```
git clone https://github.com/ChubbyKay/receipt-storage
```

2.開啟Terminal，進入存放此專案的資料夾

```
cd receipt-storage
```

3.安裝 npm套件

```
npm install  //安裝套件
```

4.安裝 nodemon 套件

```
npm install -g nodemon
```

5.設定資料庫
```
username: root
password: password
database: receipt_storage
```

6.Migrate
```
$ npx sequelize db:migrate
```

7.新增種子資料，運行 seed 腳本

```
npm run seed
```

8.透過 nodemon 啟動伺服器，執行 app.js

```
nodemon app.js
```

9.當 terminal 出現以下字樣，表示伺服器已啟動並成功連結

```
Express is listening on localhost:3000
```

## 開發環境

    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-handlebars": "^5.2.1",
    "express-session": "^1.17.1",
    "faker": "^5.4.0",
    "jsonwebtoken": "^8.5.1",
    "handlebars": "^4.7.6",
    "method-override": "^3.0.0",
    "mysql2": "^2.2.5",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "sequelize": "^6.5.0",
    "sequelize-cli": "^6.2.0"
