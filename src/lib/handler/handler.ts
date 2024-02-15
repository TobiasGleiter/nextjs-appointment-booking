import { NextResponse } from 'next/server';

// Headline: Chain of responsibility request handler
// Description:
//    - Used in all route.ts with e.g. access-handler.
//    - Read about the pattern: https://refactoring.guru/design-patterns/chain-of-responsibility
// Creator: Tobias Gleiter, 21.01.2024

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
