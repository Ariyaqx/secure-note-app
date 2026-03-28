const express = require('express');
const cors = require('cors'); // 1. นำเข้า CORS
require('dotenv').config();

const app = express();

app.use(cors()); // 2. เปิดใช้งาน CORS เพื่อไม่ให้ Frontend โดนบล็อก
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN; // ดึงคีย์ลับจากไฟล์ .env

// จำลองฐานข้อมูลด้วย Array (ถ้าปิดเซิร์ฟเวอร์ข้อมูลจะหายไป)
let notes = [];

// --- สร้าง API Endpoints ตามโจทย์ ---

// 1. GET /api/notes: ส่งข้อมูลโน้ตทั้งหมดกลับไป (JSON) [cite: 26]
app.get('/api/notes', (req, res) => {
    res.status(200).json(notes); // [cite: 29]
});

// ฟังก์ชันด่านตรวจ (Middleware) สำหรับเช็ค SECRET TOKEN ก่อนให้เพิ่มหรือลบข้อมูล [cite: 24, 27, 28]
const authenticate = (req, res, next) => {
    // ดึงค่า Authorization จาก Header
    const authHeader = req.headers.authorization;
    
    if (authHeader === SECRET_TOKEN) {
        next(); // รหัสผ่านตรงกัน ปล่อยให้ไปทำคำสั่งต่อไป
    } else {
        // รหัสผิด ส่ง HTTP Status 401 Unauthorized กลับไป [cite: 29]
        res.status(401).json({ error: 'Unauthorized: รหัสความลับไม่ถูกต้อง!' }); 
    }
};

// 2. POST /api/notes: สร้างโน้ตใหม่ (ต้องผ่านด่านตรวจ authenticate ก่อน) [cite: 27]
app.post('/api/notes', authenticate, (req, res) => {
    const { title, content } = req.body;
    
    // สร้างออบเจ็กต์โน้ตใหม่
    const newNote = {
        id: Date.now().toString(), // สร้าง ID อัตโนมัติจากเวลา
        title: title || 'Untitled',
        content: content || ''
    };
    
    notes.unshift(newNote); // ดันโน้ตใหม่ไปไว้บนสุดของ Array
    res.status(201).json(newNote); // ส่งสถานะ 201 Created [cite: 29]
});

// 3. DELETE /api/notes/:id: ลบโน้ต (ต้องผ่านด่านตรวจ authenticate) [cite: 28]
app.delete('/api/notes/:id', authenticate, (req, res) => {
    const noteId = req.params.id;
    // กรองโน้ตตัวที่ ID ตรงกันออกไป
    notes = notes.filter(note => note.id !== noteId);
    res.status(200).json({ message: 'ลบโน้ตสำเร็จ' }); // [cite: 29]
});

// Route ทดสอบเริ่มต้น
app.get('/', (req, res) => {
    res.send('SecureNote Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});