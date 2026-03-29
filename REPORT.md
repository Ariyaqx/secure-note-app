# SecureNote Application: Conceptual Report

## 1. JS Engine vs. Runtime
**คำถาม:** Explain where your JavaScript code is being executed in the Frontend vs. the Backend. Mention the specific JavaScript Engine and the Runtime Environment. 

**คำตอบ:** ในโปรเจกต์นี้ โค้ด JavaScript ถูกแยกการทำงานออกเป็น 2 สภาพแวดล้อมอย่างชัดเจน ได้แก่
* **Frontend (หน้าบ้าน):** โค้ด (`app.js`) ถูกเอ็กซีคิวต์ (Executed) อยู่บน **Browser Runtime Environment** (เช่น Google Chrome) โดยมี **JavaScript Engine** (เช่น V8 Engine) ทำหน้าที่คอมไพล์และรันโค้ด นอกจากนี้ Browser Runtime ยังเตรียม Web APIs ต่างๆ ไว้ให้ใช้งาน เช่น DOM API (สำหรับจัดการหน้าจอ) และ Fetch API (สำหรับเรียกข้อมูล)
* **Backend (หลังบ้าน):** โค้ด (`server.js`) ถูกเอ็กซีคิวต์อยู่บนเซิร์ฟเวอร์โดยใช้ **Node.js Runtime Environment** ซึ่งมี **V8 Engine** ทำหน้าที่รันโค้ดเช่นเดียวกัน แต่ Node.js Runtime จะไม่มี DOM ให้ใช้งาน ทว่าจะมีชุดเครื่องมือสำหรับจัดการฝั่งเซิร์ฟเวอร์แทน เช่น การจัดการเครือข่าย (HTTP) และระบบไฟล์

---

## 2. DOM (Document Object Model)
**คำถาม:** Explain how your frontend updates the screen. If using Vanilla JS, describe the DOM tree manipulation. 

**คำตอบ:** เนื่องจากโปรเจกต์นี้เลือกใช้ **Vanilla JavaScript** การอัปเดตหน้าจอจึงใช้วิธีการจัดการ DOM Tree โดยตรง (DOM Manipulation):
* เมื่อได้รับข้อมูลจาก Backend (ผ่าน Fetch API) ฟังก์ชัน `renderNotes()` จะทำงานโดยใช้เมธอดอย่าง `document.getElementById('notesContainer')` เพื่อเข้าถึงแท็ก HTML ปลายทางบน DOM Tree
* จากนั้นใช้คุณสมบัติ `.innerHTML` ร่วมกับ Array `.map()` เพื่อสร้างและแทรกชุดโค้ด HTML ใหม่ (Note Cards) ลงไปใน DOM Tree
* ผลลัพธ์คือ Browser จะทำการเรนเดอร์ (Render) เฉพาะส่วนที่ถูกเปลี่ยนแปลงบนหน้าจอใหม่ทันที โดยที่ผู้ใช้ไม่ต้องกดรีเฟรชหน้าเว็บ (Page Reload)

---

## 3. HTTP/HTTPS Protocol
**คำถาม:** Describe the request/response cycle that happens when you click "Submit". What headers are sent? Why is HTTPS important for production? 

**คำตอบ:** **วงจร Request/Response เมื่อกดปุ่ม "Submit" (Save Note):**
* **Request:** ทันทีที่กดปุ่ม Frontend จะใช้ Fetch API ส่ง HTTP Request แบบ `POST` ไปที่ `/api/notes` ของ Backend
* **Headers:** ในการส่งนี้ จะมีการแนบ HTTP Headers ที่สำคัญไป 2 ตัว คือ
  1. `Content-Type: application/json`: บอกเซิร์ฟเวอร์ว่าข้อมูลที่ส่งไป (Body) เป็นรูปแบบ JSON
  2. `Authorization: [SECRET_TOKEN]`: ส่งรหัสความลับไปเพื่อยืนยันสิทธิ์การเข้าถึง
* **Response:** เมื่อ Backend ได้รับข้อมูล จะทำการตรวจสอบ `Authorization` ถ้ารหัสถูกต้อง จะบันทึกข้อมูลและตอบกลับด้วย **HTTP Status 201 Created** พร้อมข้อมูลโน้ตใหม่ แต่ถ้ารหัสผิด จะตอบกลับด้วย **401 Unauthorized**
* **Update UI:** Frontend รับ Response มาประมวลผล หากสำเร็จจะดึงข้อมูลใหม่มาอัปเดต DOM

**ความสำคัญของ HTTPS:**
แม้ในการพัฒนาบนเครื่องตัวเอง (Local) เราจะใช้ HTTP แต่ในระดับ Production การใช้ **HTTPS (Hypertext Transfer Protocol Secure)** เป็นสิ่งจำเป็นมาก เพราะ HTTPS จะทำการเข้ารหัส (Encrypt) ข้อมูลที่ส่งหากันทั้งหมด ป้องกันไม่ให้แฮ็กเกอร์ดักจับข้อมูลระหว่างทาง (Man-in-the-Middle Attack) ซึ่งถ้าเราใช้แค่ HTTP รหัส `SECRET_TOKEN` และเนื้อหาของโน้ตอาจถูกขโมยได้ง่าย

---

## 4. Environment Variables
**คำถาม:** Why did we store the SECRET_TOKEN in the backend .env file instead of the frontend code? What would happen if we put it in the frontend? 

**คำตอบ:** * **เหตุผลที่เก็บใน Backend `.env`:** เราเก็บ `SECRET_TOKEN` ไว้ในไฟล์ `.env` ที่ฝั่ง Backend และนำไปเพิกเฉย (Ignore) ไว้ในไฟล์ `.gitignore` เพื่อแยกข้อมูลความลับออกจากโค้ดหลัก (Source Code) ทำให้ข้อมูลนี้จะอยู่บนเซิร์ฟเวอร์ที่ปลอดภัยเท่านั้น และจะไม่หลุดรอดไปอยู่ในระบบ Version Control (เช่น GitHub)
* **ถ้าเอาไปไว้ที่ Frontend จะเกิดอะไรขึ้น?:** โค้ดทั้งหมดของ Frontend จะถูกดาวน์โหลดไปรันบนเว็บเบราว์เซอร์ของผู้ใช้งาน หากเราเก็บ `SECRET_TOKEN` ไว้ในโค้ดฝั่งหน้าบ้าน ผู้ใช้ทุกคนสามารถกดดู Source Code หรือเปิดเครื่องมือ Developer Tools (F12) เพื่อขโมยรหัสนั้นไปใช้ยิง API (สร้างหรือลบข้อมูล) ได้อย่างอิสระ ทำให้ระบบรักษาความปลอดภัยไร้ความหมายทันที

## 🌟 Bonus Features Completed

**1. Loading State (+5 Points)**
- เพิ่มแอนิเมชันและข้อความ "กำลังโหลดข้อมูลโน้ตของคุณ..." ระหว่างที่รอข้อมูลจาก API เพื่อประสบการณ์การใช้งาน (UX) ที่ดีขึ้น

**2. Full CRUD (Create, Read, Update, Delete) with PocketHost (+15 Points)**
- เชื่อมต่อ Backend เข้ากับ PocketHost (BaaS) สำเร็จ
- รองรับการทำงานครบทุกเส้นทาง:
  - `GET /api/notes`: ดึงข้อมูลทั้งหมด
  - `GET /api/notes/:id`: ดูข้อมูลรายตัว
  - `POST /api/notes`: สร้างใหม่ (แนบ Token)
  - `PATCH /api/notes/:id`: แก้ไขข้อมูล (แนบ Token)
  - `DELETE /api/notes/:id`: ลบข้อมูล (แนบ Token)

**3. Data Persistence (+10 Points)**
- เพิ่มระบบสำรองข้อมูล (Backup) จาก PocketHost ลงไฟล์ `notes.json` อัตโนมัติ ทุกครั้งที่มีการ POST, PATCH หรือ DELETE ทำให้ข้อมูลปลอดภัยแม้ Server จะถูก Restart

**4. Cloud Deployment (+10 Points)**
- นำ Backend ไป Deploy ไว้บน **Vercel** สำเร็จ (รองรับ HTTPS)
- **ขั้นตอนการทำ (Deployment Process):**
  1. สร้างไฟล์ `vercel.json` เพื่อกำหนด Routing สำหรับ Express.js
  2. เชื่อมต่อ GitHub Repository เข้ากับระบบของ Vercel
  3. ตั้งค่า Environment Variable (`SECRET_TOKEN`) ในหน้า Dashboard เพื่อความปลอดภัย
  4. นำ URL ที่ได้จาก Vercel ไปเชื่อมต่อกับฝั่ง Frontend (`app.js`) 