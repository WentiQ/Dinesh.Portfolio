# 📊 Portfolio Data Management System

## Overview
Your portfolio website now uses a **JSON file** to store all data. You can edit everything without touching any code!

---

## 🗂️ Files Structure

```
├── data.json              ← 📝 YOUR DATA FILE (Edit this!)
├── index.html            ← HTML template
├── script.js             ← Original animations & functionality
├── dataRenderer.js       ← NEW: Loads JSON and renders content
├── style.css            ← Styling
└── images/              ← Your images
```

---

## 📝 How to Use

### **Step 1: Edit Your Data**
Open `data.json` and modify any content you want:

```json
{
  "siteMetadata": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com"
  },
  "hero": {
    "title": "Your Headline",
    "subtitle": "Your subtitle"
  }
  // ... more sections
}
```

### **Step 2: Refresh Your Browser**
After editing JSON, simply refresh your browser to see changes.

---

## 🎯 What You Can Edit in JSON

### **1. Hero Section**
```json
"hero": {
  "badge": "Your badge text",
  "title": "Your title (supports HTML)",
  "subtitle": "Your subtitle",
  "image": "path/to/image.png",
  "buttons": [
    { "text": "Button Text", "href": "#section", "type": "primary" }
  ]
}
```

### **2. About Section**
```json
"about": {
  "title": "About Me",
  "cards": [
    {
      "icon": "🎯",
      "heading": "Who I Am",
      "content": "Your content here..."
    }
  ]
}
```

### **3. Projects** (Add/Edit/Remove Projects)
```json
"projects": [
  {
    "category": "🤖 AI & Machine Learning",
    "projects": [
      {
        "id": 1,
        "badge": "ML/Healthcare",
        "title": "Project Name",
        "keywords": "Python, ML, Healthcare",
        "description": "Project description",
        "tags": ["Python", "ML", "Healthcare"]
      }
    ]
  }
]
```

### **4. Skills** (Add new skill groups)
```json
"skills": [
  {
    "icon": "💻",
    "heading": "Programming Languages",
    "skills": [
      { "name": "Python", "level": "expert" },
      { "name": "JavaScript", "level": "advanced" }
    ]
  }
]
```

**Skill Levels:** `"expert"`, `"advanced"`, `"intermediate"`

### **5. Academics** (Education)
```json
"academics": [
  {
    "icon": "🎓",
    "degree": "Bachelor of Technology",
    "branch": "Your Field",
    "institution": "Your University",
    "duration": "2024 – 2028",
    "score": "97.2%",
    "description": "Extra details..."
  }
]
```

### **6. Certifications**
```json
"certifications": [
  {
    "icon": "📜",
    "title": "Certification Name",
    "issuer": "Organization",
    "description": "What you learned"
  }
]
```

### **7. Interests** (Passions)
```json
"interests": [
  {
    "icon": "🤖",
    "title": "Interest Title",
    "description": "Interest description"
  }
]
```

### **8. Contact & Social Links**
```json
"socialLinks": [
  {
    "name": "LinkedIn",
    "url": "https://linkedin.com/...",
    "class": "linkedin",
    "icon": "linkedin"
  }
]
```

### **9. Navigation Menu**
```json
"navigation": [
  { "label": "Home", "href": "#hero" },
  { "label": "About", "href": "#about" }
]
```

---

## ✨ Features

✅ **Edit All Data in JSON** - No coding required!  
✅ **Add/Remove Projects** - Just add/remove project objects  
✅ **Add Skills** - Easy to add new skill groups  
✅ **Update Personal Info** - One place for all your data  
✅ **Social Links** - Customize all social media links  
✅ **HTML Support** - Use HTML in fields like title/content  

---

## 🔄 Auto-Refresh During Development

### Option 1: Manual Refresh (Simplest)
After editing JSON, just press `F5` or `Ctrl+R` to refresh.

### Option 2: Auto-Reload with Live Server (Recommended)
Install VS Code extension "Live Server" and right-click `index.html` → "Open with Live Server"

### Option 3: Python Development Server
```bash
# Navigate to your project folder
cd "c:\Users\dines\OneDrive\Documents\04-PERSONAL\Portfolio\ME@-portfolio"

# Run Python server
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Option 4: Node.js Development Server
```bash
# Install if needed
npm install -g http-server

# Run from project folder
http-server

# Opens at http://localhost:8080
```

---

## 📋 JSON Data Structure Overview

The `data.json` file has these main sections:

```
data.json
├── siteMetadata (name, title, email, social links)
├── navigation (menu links)
├── hero (landing section)
├── about (about you)
├── projects (your projects by category)
├── skills (technical skills by category)
├── academics (education history)
├── certifications (certificates & trainings)
├── interests (passions)
├── contact (contact info & form)
└── socialLinks (LinkedIn, GitHub, Email)
```

---

## 🎨 Customization Tips

### Add New Project:
1. Open `data.json`
2. Find the category where you want to add
3. Add new object in the `projects` array:
```json
{
  "id": 14,
  "badge": "New Badge",
  "title": "New Project",
  "description": "Description",
  "tags": ["Tag1", "Tag2"]
}
```
4. Save & Refresh

### Add New Skill:
1. Add new skill group or skill to existing group:
```json
{ "name": "New Skill", "level": "advanced" }
```

### Change Colors/Styling:
- Edit `style.css` as before (for CSS)
- Edit `data.json` for content

---

## ❓ FAQ

**Q: Do I need to refresh the page after editing JSON?**  
A: Yes, refresh the browser to see changes (or use Live Server for auto-refresh)

**Q: Can I use HTML in JSON fields?**  
A: Yes! Fields like `title`, `heading`, and `content` support HTML

**Q: How do I add a new skill group?**  
A: Add a new object to the `skills` array with icon, heading, and skills array

**Q: How do I remove a project?**  
A: Simply delete the project object from the JSON (don't leave empty arrays)

**Q: What if the page doesn't update?**  
A: Hard refresh your browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

---

## 🛠️ Important Notes

- ✅ Keep JSON syntax correct (valid JSON)
- ✅ Use proper Unicode characters/HTML entities for special chars
- ✅ IDs should be unique (for projects)
- ✅ Image paths are relative to the root folder
- ✅ Always maintain the structure - don't delete required fields
- ❌ Don't remove the root object keys, only edit values

---

## 🚀 Next Steps

1. **Edit `data.json`** with your actual information
2. **Refresh the browser** to see changes
3. **Test each section** - Projects, Skills, About, etc.
4. **Customize as needed** - Add more projects, skills, interests

Enjoy your data-driven portfolio! 🎉

---

*Created with ❤️ for easy portfolio management*
