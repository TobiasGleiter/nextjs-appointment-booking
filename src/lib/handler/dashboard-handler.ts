import { NextResponse } from 'next/server';
import { routeRequestPostDashboardSellerSchema } from '../validation/dashboard/route-dashboard';
import { AbstractHandler } from './handler';

/**
 * Check if the data fits the expected sellers schema, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyDashboardSellerSchemaHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const parsedSellers = routeRequestPostDashboardSellerSchema.parse(data);
    if (!parsedSellers) {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(parsedSellers);
  }
}
