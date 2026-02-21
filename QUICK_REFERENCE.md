# 📋 JSON Quick Reference Card

Keep this handy while editing your `data.json` file!

---

## 🎯 Main Sections (Top-Level Keys)

```
data.json contains:
├── siteMetadata    → Your name, title, email, social links
├── navigation      → Menu items
├── hero            → Landing page
├── about           → About you 
├── projects        → Your projects (organized by category)
├── skills          → Technical skills
├── academics       → Education history
├── certifications  → Certs & training
├── interests       → Passions & hobbies
├── contact         → Contact form config
└── socialLinks     → Social media links
```

---

## 📝 Field Types Quick Guide

| Field | Type | Example | Editable? |
|-------|------|---------|-----------|
| `name` | Text | "Dinesh" | ✅ Yes |
| `title` | Text with HTML | "Building <span...>" | ✅ Yes |
| `description` | Text | "My description" | ✅ Yes |
| `url` | Link | "https://..." | ✅ Yes |
| `icon` | Emoji/Unicode | "🎓" | ✅ Yes |
| `level` | Text (enum) | "expert"/"advanced"/"intermediate" | ✅ Yes |
| `id` | Number | 1, 2, 3... | ⚠️ Keep unique |
| `tags` | Array | ["Python", "ML"] | ✅ Yes |

---

## ⚡ Quick Edits

### Change Your Name
```json
"siteMetadata": {
  "name": "YOUR NAME HERE"
}
```

### Change Hero Title
```json
"hero": {
  "title": "YOUR HEADLINE HERE"
}
```

### Add Project
In `projects[].projects[]` array:
```json
{
  "id": NUMBER,
  "badge": "Badge Name",
  "title": "Project Title",
  "keywords": "Keyword1, Keyword2",
  "description": "Description",
  "tags": ["tag1", "tag2"]
}
```

### Add Skill
In `skills[].skills[]` array:
```json
{ "name": "Skill Name", "level": "intermediate" }
```

### Change Email
```json
"siteMetadata": {
  "email": "newemail@example.com"
}
```

### Change LinkedIn
```json
"socialLinks": {
  "url": "https://www.linkedin.com/in/yourprofile"
}
```

---

## 🔤 Level Options

For skills, use one of:
- `"expert"` - Your strongest skills
- `"advanced"` - Strong proficiency
- `"intermediate"` - Learning/moderate proficiency

---

## 🎨 Icons & Emojis

Common icons to use:
```
🎓 Education          💻 Code/Programming
🤖 AI/Robotics        🌐 Web/Internet
🎯 Goals/Focus        💡 Ideas/Concepts
🚀 Growth/Launch      🔧 Tools/Engineering
📊 Data/Analytics     🏆 Achievement
📱 Mobile             ☁️ Cloud
🎨 Design            🔐 Security
❤️ Passion           🌟 Featured
```

---

## ✅ Common Edits Checklist

- [ ] Update `siteMetadata.name`
- [ ] Update `siteMetadata.email`
- [ ] Update `hero.title` and `hero.subtitle`
- [ ] Update `hero.image` path
- [ ] Add your projects in `projects` section
- [ ] Update `skills` with your real skills
- [ ] Update `academics` with your education
- [ ] Update `certifications` if any
- [ ] Update `interests` with your passions
- [ ] Update `socialLinks` with your profiles

---

## 🚨 Don't Remove These

These are REQUIRED sections - don't delete them:
- ✅ `siteMetadata` - Must exist
- ✅ `navigation` - Must exist  
- ✅ `hero` - Must exist
- ✅ `projects` - Can be empty array `[]`
- ✅ `skills` - Can be empty array `[]`
- ✅ All other sections can be empty but structure should remain

---

## ⚠️ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| Missing commas | Use commas between objects |
| Unmatched quotes | Match opening/closing quotes |
| Single quotes | Use double quotes `"` not `'` |
| Trailing comma | Don't add comma after last item |
| Comments | JSON doesn't support `//` comments |
| Special chars | Use `\"` for quotes in text |

---

## 🔧 JSON Syntax Rules

```json
{
  "string": "Use double quotes",
  "number": 42,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {
    "nested": "value"
  }
}
```

**NO trailing comma after last item!**

---

## 📱 HTML in JSON

Use HTML in these fields:
```json
"title": "Building <span class=\"gradient-text\">Zero to One</span>"
"heading": "Advanced <strong>Skills</strong>"
"content": "Text with <em>emphasis</em>"
```

---

## 🔍 Validation

Before saving, check:
1. **Syntax**: All `{` have matching `}`
2. **Quotes**: All strings in double quotes
3. **Commas**: Between all items
4. **Arrays**: Properly formatted `[]`
5. **IDs**: Unique for projects

Use **https://jsonlint.com/** to validate!

---

## 🔄 After Editing

1. Save `data.json`
2. Go to your website
3. Press `F5` or `Ctrl+R` to refresh
4. Changes appear immediately!

---

## 🎯 Remember

- 📝 Edit content in `data.json` only
- 🔄 Refresh browser (F5) after edits
- ✅ Keep JSON syntax valid
- 💾 Save the file before refreshing
- 🧪 Test each section after changes

---

## 📞 Need Help?

- Check **DATA_GUIDE.md** for full documentation
- Check **USAGE_EXAMPLES.md** for real examples
- Validate JSON at **https://jsonlint.com/**
- Check browser console (F12 → Console) for errors

---

**Happy editing! 🚀**
