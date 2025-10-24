# QUICK START GUIDE

## ⚡ THE PROBLEM
The automated terminal keeps closing. You need to manually start the server in a terminal that stays open.

## ✅ SOLUTION - Follow These Steps:

### Step 1: Open a Terminal
In VS Code:
- Press `` Ctrl + ` `` (backtick key) to open the integrated terminal
- OR click "Terminal" → "New Terminal" from the menu

### Step 2: Run This Command
Copy and paste this exact command:

```powershell
npm run dev
```

### Step 3: Keep Terminal Open
**IMPORTANT:** Do NOT close the terminal! Keep it open in the background.

You should see:
```
▲ Next.js 15.5.6 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

### Step 4: Open Browser
Go to: **http://localhost:3000**

---

## 🎯 ALTERNATIVE: Use Windows Terminal

1. Press `Win + R`
2. Type: `wt` and press Enter
3. In Windows Terminal, run:
```powershell
cd "c:\Users\ashwa\OneDrive\Pictures\Screenshots\ecommerce app\ecommerce"
npm run dev
```

4. Leave this window open
5. Open browser to http://localhost:3000

---

## 🔧 If Port 3000 is Busy

If you see "Port 3000 is already in use":

```powershell
npx kill-port 3000
```

Then start again with `npm run dev`

---

## ✅ Expected Result

You should see in your browser:
- ✅ Navbar with "E-Shop" logo and cart icon
- ✅ "Best Selling Products" heading  
- ✅ Message: "No products yet. Please add products via Sanity Studio."
- ✅ Footer with social icons

**The site should load!** If it doesn't, check the terminal for error messages.

---

## 📦 To Add Products

Open a SECOND terminal and run:
```powershell
cd "c:\Users\ashwa\OneDrive\Pictures\Screenshots\ecommerce app\ecommerce\sanity_ecommerce"
npm run dev
```

Then go to http://localhost:3333 to access Sanity Studio.
