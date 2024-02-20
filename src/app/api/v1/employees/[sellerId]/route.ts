import { deleteSellerById } from '@/src/lib/database/collection/seller/delete-seller';
import { updateSeller } from '@/src/lib/database/collection/seller/update-seller';
import {
  VerifyUserHasRouteAccessHandler,
  VerifyUserIsAdminAccessHandler,
} from '@/src/lib/handler/auth-handler';
import { VerifyDashboardSellerSchemaHandler } from '@/src/lib/handler/dashboard-handler';
import { routeContextDashboardSellerSchema } from '@/src/lib/validation/dashboard/route-dashboard';
import { Seller } from '@/src/types/database/sellers-database';
import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * This routes handles updating a specific seller
 * @param request
 * @param context
 * @returns
 */
export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextDashboardSellerSchema>
) {
  // Init necessary handlers
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyUserIsAdminAccessHandler = new VerifyUserIsAdminAccessHandler();
  const verifyDashboardSellerSchemaHandler =
    new VerifyDashboardSellerSchemaHandler();

  // Setup chain of responsibility
  verifyUserHasRouteAccessHandler
    .setNext(verifyUserIsAdminAccessHandler)
    .setNext(verifyDashboardSellerSchemaHandler);

  try {
    const json = await request.json();
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const seller: Seller = json;
    const result = await updateSeller(params.sellerId, seller);
    if (!result) {
      return NextResponse.json('Failed', { status: 400 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json('Forbidden', { status: 403 });
  }
}
/**
 * This routes handles deleting a specific seller
 * @param request
 * @param context
 * @returns
 */
export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextDashboardSellerSchema>
) {
  // Init necessary handlers
  const verifyUserHasRouteAccessHandler = new VerifyUserHasRouteAccessHandler();
  const verifyUserIsAdminAccessHandler = new VerifyUserIsAdminAccessHandler();

  // Setup chain of responsibility
  verifyUserHasRouteAccessHandler.setNext(verifyUserIsAdminAccessHandler);

  try {
    const json = {};
    const nextResponse = await verifyUserHasRouteAccessHandler.handle(json);

    if (nextResponse !== null) {
      return nextResponse;
    }

    const { params } = context;
    const sellerId = params.sellerId;
    const result = await deleteSellerById(sellerId);
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
export async function PUT() {
  return NextResponse.json('Forbidden', { status: 403 });
}
export async function OPTIONS() {
  return NextResponse.json('Forbidden', { status: 403 });
}
