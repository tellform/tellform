import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  MongooseHealthIndicator,
  TerminusModuleOptions
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('mail', 'https://google.com'),
        async () => this.mongoose.pingCheck('mongo')
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
