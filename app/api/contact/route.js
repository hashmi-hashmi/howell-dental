import { NextResponse } from 'next/server';
import { addBooking } from '@/lib/bookings';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const booking = addBooking({ name, phone, email, service: 'General Inquiry', message, urgency: 'standard' });
    return NextResponse.json({ success: true, booking });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
