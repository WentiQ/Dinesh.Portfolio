# 📚 JSON Editing Examples

Here are practical examples of how to edit your `data.json` file.

---

## 🎯 Example 1: Add a New Project

Want to add a new project to your portfolio?

### Current Structure
```json
{
  "category": "💻 Web & Application Development",
  "projects": [
    {
      "id": 4,
      "badge": "Web Dev",
      "title": "Track-U – Attendance Tracker",
      "keywords": "Web Development, Management System",
      "description": "Built a web-based attendance tracking platform...",
      "tags": ["Web Dev", "Management", "Data Handling"]
    }
    // ... more projects
  ]
}
```

### How to Add a New Project
1. Find the category where you want to add the project (or create new category)
2. Add a new project object with incremented ID:

```json
{
  "id": 12,
  "badge": "Your Badge Here",
  "title": "Your Project Name",
  "keywords": "Keyword1, Keyword2, Keyword3",
  "description": "Your project description goes here. Explain what you built and what it does.",
  "tags": ["Tag1", "Tag2", "Tag3"]
}
```

**Save & Refresh** → Your project appears on the website!

---

## 💻 Example 2: Add a New Skill

Want to add a new programming skill?

### Find the Skills Section
```json
{
  "icon": "💻",
  "heading": "Programming Languages",
  "skills": [
    { "name": "Python", "level": "expert" },
    { "name": "C Programming", "level": "advanced" }
  ]
}
```

### Add Your New Skill
```json
{
  "icon": "💻",
  "heading": "Programming Languages",
  "skills": [
    { "name": "Python", "level": "expert" },
    { "name": "C Programming", "level": "advanced" },
    { "name": "JavaScript", "level": "intermediate" }  ← NEW SKILL
  ]
}
```

**Level options:** `"expert"`, `"advanced"`, `"intermediate"`

---

## 🎓 Example 3: Add a New Certification

Want to add a new certificate or training you completed?

### Current Structure
```json
"certifications": [
  {
    "icon": "📜",
    "title": "Data Structures & Algorithms",
    "issuer": "IIT Kharagpur",
    "description": "Comprehensive study of algorithms..."
  }
]
```

### Add New Certification
```json
"certifications": [
  {
    "icon": "📜",
    "title": "Data Structures & Algorithms",
    "issuer": "IIT Kharagpur",
    "description": "Comprehensive study of algorithms..."
  },
  {
    "icon": "🎓",
    "title": "Advanced Machine Learning",
    "issuer": "Coursera",
    "description": "Deep learning techniques and neural networks"
  }
]
```

**Save & Refresh** → New certification appears!

---

## 🎨 Example 4: Change Your Hero Section

Want to update your landing page headline and subtitle?

### Original
```json
"hero": {
  "badge": "🎓 IIT TIRUPATI | MECHANICAL ENGINEER",
  "title": "Building <span class=\"gradient-text\">Zero to One</span>",
  "subtitle": "Aspiring Entrepreneur combining engineering fundamentals...",
  "image": "images/DINESH2.png"
}
```

### Updated
```json
"hero": {
  "badge": "🎓 MIT | COMPUTER SCIENCE",
  "title": "Creating <span class=\"gradient-text\">Innovative Solutions</span>",
  "subtitle": "Software engineer passionate about AI and building scalable products.",
  "image": "images/your-image.png"
}
```

**Save & Refresh** → Your hero section updates instantly!

---

## 👤 Example 5: Update Personal Information

Want to change your name, email, or social links?

### Site Metadata
```json
"siteMetadata": {
  "name": "Your Full Name",
  "title": "Your Title | Your Tagline",
  "tagline": "Your Tagline",
  "email": "your.email@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://www.linkedin.com/in/yourprofile"
}
```

### Social Links
```json
"socialLinks": [
  {
    "name": "LinkedIn",
    "url": "https://www.linkedin.com/in/your-new-profile",
    "class": "linkedin",
    "icon": "linkedin"
  },
  {
    "name": "GitHub",
    "url": "https://github.com/yournewusername",
    "class": "github",
    "icon": "github"
  },
  {
    "name": "Email",
    "url": "mailto:newemail@example.com",
    "class": "email",
    "icon": "email"
  }
]
```

---

## 📜 Example 6: Update About Section

Want to change your about cards?

### Original
```json
"about": {
  "title": "About <span class=\"gradient-text\">Me</span>",
  "cards": [
    {
      "icon": "🎯",
      "heading": "Who I Am",
      "content": "I'm Dinesh..."
    }
  ]
}
```

### Updated
```json
"about": {
  "title": "About <span class=\"gradient-text\">Me</span>",
  "cards": [
    {
      "icon": "👨‍💻",
      "heading": "Who I Am",
      "content": "I'm a Full Stack Developer with 5+ years of experience building web applications. I love creating intuitive user experiences and scalable backend systems."
    },
    {
      "icon": "🎯",
      "heading": "What I Love",
      "content": "I'm passionate about open-source contributions, teaching others to code, and solving complex problems with elegant solutions."
    },
    {
      "icon": "🚀",
      "heading": "My Goals",
      "content": "My aim is to build products that positively impact millions of lives and mentor the next generation of developers."
    }
  ]
}
```

---

## 🎓 Example 7: Add New Education Entry

Want to add a new degree or educational achievement?

### Original
```json
"academics": [
  {
    "icon": "🎓",
    "degree": "Bachelor of Technology",
    "branch": "Mechanical Engineering",
    "institution": "Indian Institute of Technology (IIT) Tirupati",
    "duration": "2024 – 2028"
  }
]
```

### Add New Entry
```json
"academics": [
  {
    "icon": "🎓",
    "degree": "Bachelor of Technology",
    "branch": "Mechanical Engineering",
    "institution": "Indian Institute of Technology (IIT) Tirupati",
    "duration": "2024 – 2028",
    "description": "Pursuing interdisciplinary learning in AI and Robotics"
  },
  {
    "icon": "🏆",
    "degree": "Online Specialization",
    "branch": "Machine Learning Engineering",
    "institution": "Andrew Ng's ML Course",
    "duration": "2024",
    "description": "Completed comprehensive machine learning specialization"
  }
]
```

---

## 🎯 Example 8: Add New Skill Group

Want to add an entirely new skill category?

### Original
```json
"skills": [
  {
    "icon": "💻",
    "heading": "Programming Languages",
    "skills": [...]
  },
  // ... more groups
]
```

### Add New Group
```json
"skills": [
  {
    "icon": "💻",
    "heading": "Programming Languages",
    "skills": [...]
  },
  {
    "icon": "☁️",
    "heading": "Cloud & DevOps",
    "skills": [
      { "name": "AWS", "level": "advanced" },
      { "name": "Docker", "level": "advanced" },
      { "name": "Kubernetes", "level": "intermediate" },
      { "name": "CI/CD", "level": "advanced" }
    ]
  }
]
```

---

## 💡 Example 9: Add New Interest

Want to add a passion or interest?

### Original
```json
"interests": [
  {
    "icon": "🤖",
    "title": "AI in Mechanical Engineering",
    "description": "Exploring convergence of AI and mechanical systems..."
  }
]
```

### Add New Interest
```json
"interests": [
  {
    "icon": "🤖",
    "title": "AI in Mechanical Engineering",
    "description": "Exploring convergence of AI and mechanical systems..."
  },
  {
    "icon": "🌍",
    "title": "Open Source",
    "description": "Contributing to open-source projects and helping the developer community"
  },
  {
    "icon": "✍️",
    "title": "Technical Blogging",
    "description": "Writing articles about technology, programming tips, and learning experiences"
  }
]
```

---

## 🔗 Example 10: Change Navigation Menu

Want to add or remove navigation links?

### Current
```json
"navigation": [
  { "label": "Home", "href": "#hero" },
  { "label": "About", "href": "#about" },
  { "label": "Projects", "href": "#projects" },
  { "label": "Skills", "href": "#skills" },
  { "label": "Education", "href": "#academics" },
  { "label": "Contact", "href": "#contact" }
]
```

### Modified
```json
"navigation": [
  { "label": "Home", "href": "#hero" },
  { "label": "About", "href": "#about" },
  { "label": "Work", "href": "#projects" },
  { "label": "Skills", "href": "#skills" },
  { "label": "Blog", "href": "#blog" },
  { "label": "Contact", "href": "#contact" }
]
```

---

## ✅ Common Patterns

### For Sections with Cards/Arrays:
- **Adding**: Copy structure of existing item, increment ID, modify content
- **Removing**: Delete the entire object
- **Editing**: Change values inside the object
- **Reordering**: Move objects up/down in the array

### For Content Fields:
- **HTML Support**: Fields like `title`, `heading`, `content` support HTML
  ```json
  "title": "Building <span class=\"gradient-text\">Zero to One</span>"
  ```
- **Special Characters**: Use HTML entities or Unicode
  ```json
  "description": "Created a &copy; tool with 100% uptime"
  ```

---

## 🚀 Pro Tips

1. **Validate JSON**: Use https://jsonlint.com/ to check syntax
2. **Use an Editor**: VS Code has built-in JSON validation
3. **Backup**: Keep a backup of working data.json
4. **Watch Browser Console**: Check for errors (F12 → Console tab)
5. **Hard Refresh**: Use Ctrl+Shift+R if changes don't appear

---

Good luck! Your portfolio is now data-driven! 🎉
