import { NextResponse } from 'next/server';
import { markRead } from '@/lib/bookings';

const ADMIN_SECRET = 'howell2026admin';

export async function PATCH(request, { params }) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const updated = markRead(params.id);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, booking: updated });
}
