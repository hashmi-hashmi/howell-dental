import { NextResponse } from 'next/server';
import { getBookings, addBooking } from '@/lib/bookings';

const ADMIN_SECRET = 'howell2026admin';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const bookings = getBookings();
  return NextResponse.json(bookings);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, urgency } = body;
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const booking = addBooking({ name, phone, email, service, message, urgency });
    return NextResponse.json({ success: true, booking });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
