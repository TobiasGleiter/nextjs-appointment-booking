import { NextResponse } from 'next/server';
import { routeRequestPatchOpeningTimeSchema } from '../validation/opening-time/route-opening-time';
import { AbstractHandler } from './handler';

/**
 * Check if the data fits the expected sellers schema, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyOpeningTimeSchemaHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const parsedSellers = routeRequestPatchOpeningTimeSchema.parse(data);
    if (!parsedSellers) {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(parsedSellers);
  }
}
