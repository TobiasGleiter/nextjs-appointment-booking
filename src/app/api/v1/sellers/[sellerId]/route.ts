import { updateSeller } from '@/src/lib/database/collection/seller/update-seller';
import { VerifyUserHasRouteAccessHandler } from '@/src/lib/handler/auth-handler';
import { routeContextDashboardSellerSchema } from '@/src/lib/validation/dashboard/route-dashboard';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextDashboardSellerSchema>
) {
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();

  verifyUserHasRouteAccessHandler;
  // check if admin
  // check if data is valid

  try {
    const json = await request.json();

    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const seller = json;
    const result = await updateSeller(params.sellerId, seller);
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
export async function POST() {
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
