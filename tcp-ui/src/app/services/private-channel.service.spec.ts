import { TestBed } from '@angular/core/testing';

import { PrivateChannelService } from './private-channel.service';

describe('PrivateChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateChannelService = TestBed.get(PrivateChannelService);
    expect(service).toBeTruthy();
  });
});
