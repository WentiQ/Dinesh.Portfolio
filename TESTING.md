# 🧪 Testing Your JSON Data-Driven Portfolio

## ✅ How to Test

### Step 1: Open Your Portfolio
1. Open the portfolio folder in VS Code
2. Right-click `index.html`
3. Select **"Open with Live Server"** (if you have the Live Server extension installed)

**OR**

Use the developer server batch file:
1. Double-click `start-dev-server.bat`
2. Open browser to the URL shown (usually `http://localhost:8000` or `http://localhost:8080`)

### Step 2: Check the Browser Console
1. Open your browser's Developer Tools: **F12**
2. Go to **Console** tab
3. You should see messages like:
   - ✅ `🔄 Starting to load data.json...`
   - ✅ `Successfully loaded data.json`
   - ✅ `Data: { ... }`
   - ✅ `🎨 Rendering website from JSON data...`
   - ✅ `Rendering complete!`

### Step 3: Verify Content
- ✅ Check if your name appears in the navigation or hero section
- ✅ Check if project titles from `data.json` appear
- ✅ Check if skills are rendering

If you see any ❌ errors in the console, share them so we can fix them.

---

## 🔧 Troubleshooting

### ❌ Problem: Still seeing hardcoded HTML
**Solution:** 
1. Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Make sure you're using a web server, not opening the file directly (file://)
3. Check browser console (F12) to verify data is loading

### ❌ Problem: Console shows "Failed to load data.json"
**Possible causes:**
1. **Opening file directly**: Don't use `file://` protocol
   - ✅ Use `http://localhost:8000` instead
   - Use start-dev-server.bat to start a web server

2. **File not in right location**: 
   - ✅ Make sure `data.json` is in the same folder as `index.html`
   - Check folder path: `ME@-portfolio/data.json`

3. **Wrong file name**:
   - ✅ Filename must be exactly `data.json` (case-sensitive on some systems)

### ❌ Problem: Console shows "XMLHttpRequest blocked"
**Solution:** You're likely opening the file with `file://` protocol
- ✅ Use a web server instead (see Step 1 above)
- Use `start-dev-server.bat` for easiest option

### ❌ Problem: Changes to data.json don't appear
**Solution:**
1. **Save the JSON file** (Ctrl+S)
2. **Refresh the browser** (F5)
3. If still not working, do a **hard refresh** (Ctrl+Shift+R)

---

## 📊 Expected Console Output

You should see something like this in your console (F12):

```
🔄 Starting to load data.json...
✅ Successfully loaded data.json
Data: {siteMetadata: {...}, navigation: Array(6), hero: {...}, ...}
🎨 Rendering website from JSON data...
✅ Rendering complete!
```

---

## 🔄 Workflow After Setup

1. **Edit data.json**
   - Open `data.json`
   - Change any content you want
   - Example: Change name, add project, update skills

2. **Save the file**
   - Press `Ctrl+S` to save

3. **Refresh browser**
   - Press `F5` to refresh
   - Changes appear instantly!

---

## 📝 Common Edits to Try (Test These First)

### Test 1: Change Your Name
1. In `data.json`, find `"name": "Polavarapu D"`
2. Change to your name: `"name": "Your Name"`
3. Save & Refresh
4. Check if it appears in browser

### Test 2: Add a New Skill
1. Find the skills section in `data.json`
2. Add a new skill to any group:
```json
{ "name": "JavaScript", "level": "advanced" }
```
3. Save & Refresh
4. Check if new skill appears in the Skills section

### Test 3: Edit a Project
1. Find a project in `data.json`
2. Change its title:
```json
"title": "My Awesome Project"
```
3. Save & Refresh
4. Check if title updated

---

## 🎯 Success Checklist

- [ ] Open portfolio with proper web server (not file://)
- [ ] Console shows "Successfully loaded data.json"
- [ ] No red errors in console (F12)
- [ ] Hero section content on page matches data.json
- [ ] Projects section populated from data.json
- [ ] Skills section shows correct skill groups
- [ ] Can edit data.json and see changes after refresh

---

## 🚀 If Everything Works

Congratulations! Your portfolio is now data-driven! 🎉

Now you can:
- ✅ Edit all content in `data.json`
- ✅ Add new projects by adding objects to projects array
- ✅ Add skills without touching HTML
- ✅ Update any content instantly

**Just remember:**
1. Edit `data.json`
2. Save the file
3. Refresh browser
4. See changes immediately!

---

## 💡 Tips

- **Validate JSON**: Use https://jsonlint.com/ to check for syntax errors
- **Check Console**: Always check F12 console if something doesn't work
- **Browser Cache**: If changes don't appear, try hard refresh (Ctrl+Shift+R)
- **Keep Backup**: Save a backup of working data.json before making big changes

---

Good luck! Your data-driven portfolio is ready! 🚀
