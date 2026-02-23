# 🌿 GreenNest E-Nursery - Complete Setup Guide

## ✅ All Issues Fixed!

All code errors have been corrected. This guide will help you get GreenNest running on your computer.

---

## 📋 Prerequisites

You need to install these before starting:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - ✅ After download, open command prompt and verify: `node --version`

2. **MySQL** (5.7 or 8.0)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - ✅ After download, verify: `mysql --version`

3. **A Code Editor** (optional)
   - VS Code (recommended): https://code.visualstudio.com/

---

## 🚀 Step-by-Step Instructions

### **Step 1: Open Command Prompt**
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. You should see a command prompt window

### **Step 2: Navigate to Your Project**
```bash
cd "C:\Users\Jilsiya Ali\OneDrive\Desktop\e-nursery"
```

### **Step 3: Setup MySQL Database**

#### Option A: Using Command Prompt (Easiest)
```bash
# Run the schema file to create database and tables
mysql -u root -p < database/schema.sql

# Run the seed file to add sample products
mysql -u root -p < database/seed.sql
```

When prompted for password, type your MySQL root password (set during MySQL installation).

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Open `database/schema.sql` and click ⚡ Execute
3. Open `database/seed.sql` and click ⚡ Execute

**Verify Database Created:**
```bash
mysql -u root -p -e "USE greennest_db; SHOW TABLES;"
```

### **Step 4: Setup Backend Server**

1. Create `.env` file in backend folder:
```bash
cd backend
copy .env.example .env
```

2. Open the `.env` file with a text editor and update with your MySQL password:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=greennest_db
PORT=3000
```

3. Install Node dependencies:
```bash
npm install
```

4. Start the backend server (in the backend folder):
```bash
npm start
```

✅ **You should see:**
```
GreenNest API running on http://localhost:3000
Connected to MySQL database
```

**Keep this terminal window open!**

### **Step 5: Open Frontend (In Another Command Prompt)**

1. Open a **NEW** command prompt window
2. Navigate to the project:
```bash
cd "C:\Users\Jilsiya Ali\OneDrive\Desktop\e-nursery"
```

3. Start a simple server (Python):
```bash
# For Python 3.x
python -m http.server 8000

# OR for Python 2.x
python -m SimpleHTTPServer 8000
```

### **Step 6: Access the Website**

Open your web browser and go to:
```
http://localhost:8000
```

🎉 **You should see the GreenNest home page!**

---

## 🗺️ Navigation Guide

| Page | URL |
|------|-----|
| 🏠 Home | `http://localhost:8000/Home/1st.html` |
| 🛍️ Shop/Browse | `http://localhost:8000/browse/index.html` |
| 📚 Blog | `http://localhost:8000/blog/index.html` |
| 🌱 Plant Care | `http://localhost:8000/plant_%20care_assistent/index.html` |
| 🛒 Cart | `http://localhost:8000/cart/index.html` |
| 📝 Register | `http://localhost:8000/register/index.html` |
| 🔐 Login | `http://localhost:8000/login-page/login.html` |
| 📊 Admin Dashboard | `http://localhost:8000/dashboard/index.html` |

---

## 🧪 Test the Shop Functionality

1. Go to **Browse Plants** page
2. You should see products loaded from the database (12 products)
3. Click on any product to see details
4. Add to cart and go to your cart
5. Verify cart items are saved (stored in browser's localStorage)

---

## 🐛 Troubleshooting

### **"Cannot GET /" Error**
- ✅ Make sure frontend server is running on port 8000
- ✅ Check browser is accessing `http://localhost:8000`

### **Products Not Loading**
- ✅ Make sure backend server is running (`npm start`)
- ✅ Check terminal for "Connected to MySQL database" message
- ✅ Verify MySQL database has products: `mysql -u root -p greennest_db -e "SELECT COUNT(*) FROM products;"`

### **MySQL Connection Error**
- ✅ Check MySQL is running (search "Services" in Windows)
- ✅ Verify username is `root`
- ✅ Verify password is correct in `.env` file
- ✅ Check database `greennest_db` exists: `mysql -u root -p -e "SHOW DATABASES;"`

### **Port Already in Use**
- ✅ For backend (3000): Stop other Node apps or use different port
- ✅ For frontend (8000): Use different port: `python -m http.server 9000`

---

## 📝 Project Structure

```
e-nursery/
├── backend/              # Node.js/Express API server
│   ├── .env.example      # Environment template
│   ├── package.json      # Node dependencies
│   ├── server.js         # Main server file
│   └── routes/
│       └── products.js   # API endpoints for products
├── database/             # Database files
│   ├── schema.sql        # Table structure
│   └── seed.sql          # Sample data
├── Home/                 # Landing page
├── browse/               # Product listing page
├── plant_details/        # Product detail page
├── cart/                 # Shopping cart
├── register/             # User registration
├── login-page/           # User login
├── blog/                 # Blog articles
├── plant _care_assistent/ # Plant care chatbot
├── dashboard/            # Admin dashboard
└── DATABASE_SETUP.md     # Database setup guide
```

---

## 🎯 All Fixed Issues

✅ Navigation links corrected (login page path)
✅ Active nav states fixed (all pages)
✅ Environment file created
✅ JavaScript files completed
✅ API URLs fixed for environment flexibility
✅ Password validation in register (already present)

---

## 💡 Additional Commands

### **View API directly**
```bash
# In browser or command prompt
curl http://localhost:3000/api/products
```

### **Stop servers**
- Backend: Press `Ctrl + C` in backend terminal
- Frontend: Press `Ctrl + C` in frontend terminal

### **Reset database**
```bash
mysql -u root -p
DROP DATABASE greennest_db;
# Then run schema and seed files again
```

### **Check if ports are free**
```bash
# Check port 3000 (backend)
netstat -ano | findstr :3000

# Check port 8000 (frontend)
netstat -ano | findstr :8000
```

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] MySQL installed and running
- [ ] Database created and seeded
- [ ] Backend `.env` file created
- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 8000
- [ ] Can access http://localhost:8000
- [ ] Products load in Browse Plants page
- [ ] Can add items to cart
- [ ] All navigation links work

---

## 📞 Quick Help

If you get stuck:
1. Make sure both terminals are running (one for backend, one for frontend)
2. Check error messages in the terminal windows
3. Verify all URLs are correct in browser
4. Make sure MySQL password in `.env` matches your setup

---

**Good luck with GreenNest! 🌿**
