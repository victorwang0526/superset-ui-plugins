import AbstractEncoder from '../encodeable/AbstractEncoder';
import { PartialSpec } from '../encodeable/types/Specification';
import { EncodingFromChannelsAndOutputs } from '../encodeable/types/Channel';

/**
 * Define channel types
 */
const channelTypes = {
  color: 'Color',
  fill: 'Category',
  strokeDasharray: 'Category',
  x: 'X',
  y: 'Y',
} as const;

export type ChannelTypes = typeof channelTypes;

/**
 * Define output type for each channel
 */
export interface Outputs {
  x: number | null;
  y: number | null;
  color: string;
  fill: boolean;
  strokeDasharray: string;
}

/**
 * Derive encoding config
 */
export type Encoding = EncodingFromChannelsAndOutputs<ChannelTypes, Outputs>;

export default class Encoder extends AbstractEncoder<ChannelTypes, Outputs> {
  static readonly DEFAULT_ENCODINGS: Encoding = {
    color: { value: '#222' },
    fill: { value: false },
    strokeDasharray: { value: '' },
    x: { field: 'x', type: 'quantitative' },
    y: { field: 'y', type: 'quantitative' },
  };

  static readonly CHANNEL_OPTIONS = {
    fill: { legend: false },
  };

  constructor(spec: PartialSpec<Encoding>) {
    super(channelTypes, spec, Encoder.DEFAULT_ENCODINGS, Encoder.CHANNEL_OPTIONS);
  }
}
