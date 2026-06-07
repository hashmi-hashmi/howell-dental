import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json');

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export function getBookings() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

export function addBooking(booking) {
  ensureFile();
  const bookings = getBookings();
  const newBooking = {
    id: Date.now().toString(),
    ...booking,
    read: false,
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
  return newBooking;
}

export function markRead(id) {
  ensureFile();
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].read = true;
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
    return bookings[idx];
  }
  return null;
}
