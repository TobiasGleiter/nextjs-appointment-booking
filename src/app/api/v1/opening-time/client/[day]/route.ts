import { readOpeningTimeByDay } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { routeContextClientOpeningTimeSchema } from '@/src/lib/validation/opening-time/route-opening-time';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextClientOpeningTimeSchema>
) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();

  verifyUserHasRouteAccessHandler;

  try {
    const json = {};
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const day = parseInt(params.day);
    const result = await readOpeningTimeByDay(day);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function POST() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PATCH() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function DELETE() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PUT() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
