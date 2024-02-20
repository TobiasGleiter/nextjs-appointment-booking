import { NextResponse } from 'next/server';
import { readCurrentSession, readCurrentUser } from '../auth/read-auth';
import { AbstractHandler } from './handler';

/**
 * Check if there is a session, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyUserHasRouteAccessHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const isCurrentSessionNull = await readCurrentSession();
    if (!isCurrentSessionNull) {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(data);
  }
}

/**
 * Check if user is admin, if not return 'Forbidden'
 * @returns NextResponse | null
 */
export class VerifyUserIsAdminAccessHandler extends AbstractHandler {
  public async handle(data: any): Promise<NextResponse | null> {
    const { role } = await readCurrentUser();
    if (role !== 'admin') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    return super.handle(data);
  }
}
