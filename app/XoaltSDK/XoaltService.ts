import { XoaltClickEvent } from './types';

export class XoaltService {
  private static instance: XoaltService | null;

  private listener: ((event: XoaltClickEvent) => void) | undefined = undefined;
  private publisherId: string | undefined;
  private discoveryDomain: string | undefined;

  private constructor() {}

  public static getInstance(): XoaltService {
    if (!XoaltService.instance) {
      XoaltService.instance = new XoaltService();
    }

    return XoaltService.instance;
  }

  public static init(
    publisherId: string | undefined,
    discoveryDomain: string | undefined,
    listener: (event: XoaltClickEvent) => void,
  ): void {
    if (!publisherId) {
      throw new Error('Publisher ID must be defined');
    }

    if (!discoveryDomain) {
      throw new Error('Discovery domain must be defined');
    }

    const instance = XoaltService.getInstance();
    instance.publisherId = publisherId;
    instance.discoveryDomain = discoveryDomain;
    instance.listener = listener;
  }

  public static destroy(): void {
    XoaltService.instance = null;
  }

  public static getPublisherId(): string | undefined {
    const instance = XoaltService.getInstance();
    if (!instance.publisherId) {
      throw new Error('Publisher ID must be defined');
    }
    return instance.publisherId;
  }

  public static getDiscoveryDomain(): string {
    const instance = XoaltService.getInstance();
    if (!instance.discoveryDomain) {
      throw new Error('Discovery domain must be defined');
    }

    return instance.discoveryDomain;
  }

  public static onClickBanner(event: XoaltClickEvent): void {
    const instance = XoaltService.getInstance();

    if (!instance.discoveryDomain || !instance.listener) {
      return;
    }

    instance.listener(event);
  }
}
