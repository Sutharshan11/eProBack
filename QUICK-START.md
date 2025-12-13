# Quick Start - Asset Management Setup

## ⚡ Fastest Way to Setup

### Windows Command Prompt (Recommended - No PowerShell Issues)
```cmd
cd d:\eProc\server
setup-reference-data.bat
```

### PowerShell (Bypass Execution Policy)
```powershell
cd d:\eProc\server
powershell -ExecutionPolicy Bypass -File .\setup-reference-data.ps1
```

## ✅ What Gets Installed
- 13 Asset Types
- 16 Centers
- 27 Sections
- 6 Board of Survey Categories
- 4 Board of Survey Years
- **51 Laboratory Equipment Assets**

## 🔍 Verify After Setup
```powershell
npx tsx verify-data.ts
```

## 📚 For Full Documentation
See [SETUP-GUIDE.md](./SETUP-GUIDE.md)
