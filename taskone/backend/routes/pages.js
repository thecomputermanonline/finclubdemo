const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Ensure upload folders exist
['uploads/banners', 'uploads/logos', 'uploads/csv'].forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'logo' ? 'logos' :
      file.fieldname === 'csv' ? 'csv' : 'banners';
    cb(null, `uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// SQLite DB setup
const db = new sqlite3.Database('data/pages.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    description TEXT,
    logo TEXT,
    banners TEXT,
    csvData TEXT
  )`);
});

// POST: Upload page
router.post('/', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banners', maxCount: 10 },
  { name: 'csv', maxCount: 1 }
]), async (req, res) => {

  try {
    const { description } = req.body;
    const slug = description.toLowerCase().replace(/\s+/g, '-').slice(0, 50);
    const logo = req.files.logo?.[0].path;
    const banners = req.files.banners?.map(f => f.path) || [];
    const csvFile = req.files.csv?.[0].path;

    const csvData = [];

    fs.createReadStream(csvFile)
      .pipe(csv())
      .on('data', row => csvData.push(row))
      .on('end', () => {
        db.run(`INSERT OR REPLACE INTO pages (slug, description, logo, banners, csvData)
                VALUES (?, ?, ?, ?, ?)`,
          [
            slug,
            description,
            logo,
            JSON.stringify(banners),
            JSON.stringify(csvData)
          ],
          err => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Page saved', slug });
          });
      });
  } catch (err) {

    res.status(500).json({ error: 'Failed to upload nodeyerror' });
  }
});

//GET: Fetch page by slug
router.get('/:slug', (req, res) => {

  const { slug } = req.params;
  console.error('in-pag' + slug);

  db.get(`SELECT * FROM pages WHERE slug = ?`, [slug], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Page not found' });

    res.json({
      slug: row.slug,
      description: row.description,
      logoUrl: 'http://localhost:8000/' + row.logo,
      bannerUrls: JSON.parse(row.banners).map(p => 'http://localhost:8000/' + p),
      csvData: JSON.parse(row.csvData)
    });
  });
});

