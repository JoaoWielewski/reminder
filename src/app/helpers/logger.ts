export class Logger {
  private static correlationId: string
  private static functionName: string

  public static setInternalContext(
    functionName: string,
    correlationId: string
  ) {
    this.correlationId = correlationId
    this.functionName = functionName
  }

  private static readonly formatBody = (body: any, type: string): string => {
    return `${JSON.stringify({
      type,
      functionName: this.functionName,
      correlationId: this.correlationId,
      ...body
    })}`
  }

  public static log(body: any) {
    console.log(this.formatBody(body, 'log'))
  }
}
