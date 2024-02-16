import { NextResponse } from 'next/server';

/**
 * Declares a method for building the chain of handlers.
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(data: any): Promise<NextResponse | null>;
}

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  /**
   * Add a new handler to the previous handler
   * @param handler
   * @returns handler
   */
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(data: any): Promise<NextResponse | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(data);
    }

    return null;
  }
}
