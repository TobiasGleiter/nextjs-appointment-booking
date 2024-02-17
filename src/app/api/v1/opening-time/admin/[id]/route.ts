import { VerifyUserIsEmployeeHandler } from '@/src/lib/handler/appointments-handler';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function POST() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function PATCH(request: Request) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyUserIsEmployeeHandler = new VerifyUserIsEmployeeHandler();

  verifyUserHasRouteAccessHandler.setNext(verifyUserIsEmployeeHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    console.log(json);

    return NextResponse.json('Success', { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
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
