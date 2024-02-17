import { createSeller } from '@/src/lib/database/collection/seller/create-seller';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { VerifyDashboardSellerSchemaHandler } from '@/src/lib/handler/dashboard-handler';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyDashboardSellerSchemaHandler =
    new VerifyDashboardSellerSchemaHandler();

  verifyUserHasRouteAccessHandler.setNext(verifyDashboardSellerSchemaHandler);

  try {
    const json = await request.json();

    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const seller = json;
    const result = await createSeller(seller);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
export async function GET() {
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
