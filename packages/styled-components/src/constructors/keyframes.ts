import Keyframes from '../models/Keyframes';
import { Interpolation, Styles } from '../types';
import generateComponentId from '../utils/generateComponentId';
import css from './css';

export default function keyframes<Props extends object = object>(
  strings: Styles<Props>,
  ...interpolations: Array<Interpolation<Props>>
): Keyframes {
  /* Warning if you've used keyframes on React Native */
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative'
  ) {
    console.warn(
      '`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.'
    );
  }

  const rules = (css(strings, ...interpolations) as string[]).join('');
  const name = generateComponentId(rules);
  return new Keyframes(name, rules);
}
