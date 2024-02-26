import presetWeapp from 'unocss-preset-weapp'
import {
  extractorAttributify,
  transformerClass
} from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify()

export default defineConfig({
  presets: [presetWeapp(), presetWeappAttributify()],
  rules: [
    // leading
    [
      /^leading-(\d+|-?\d*)$/,
      ([, d]) => {
        return {
          'line-height': `${d}rpx`
        }
      }
    ],
    // gap
    [
      /^gap-(\d+|-?\d*)$/,
      ([, d]) => {
        return {
          'grid-gap': `${d}rpx`
        }
      }
    ],
    [
      /^gap-(x|y)-(\d+|-?\d*)$/,
      ([, t, d]) => {
        const map = {
          x: 'column',
          y: 'row'
        }
        return {
          [`grid-gap-${map[t]}`]: `${d}rpx`
        }
      }
    ],
    /** m p border to rpx */
    [
      /^(p|m)(t|b|l|r|x|y*)-(\d+|-?\d*)$/,
      ([, f, t, d]) => {
        const mode = {
          m: 'margin',
          p: 'padding'
        }[f] as string
        const map = {
          t: 'top',
          b: 'bottom',
          l: 'left',
          r: 'right'
        }
        if (t === 'x') {
          return {
            [`${mode}-left`]: `${d}rpx`,
            [`${mode}-right`]: `${d}rpx`
          }
        }
        if (t === 'y') {
          return {
            [`${mode}-top`]: `${d}rpx`,
            [`${mode}-bottom`]: `${d}rpx`
          }
        }
        return { [t ? `${mode}-${map[t]}` : mode]: `${d}rpx` }
      }
    ],
    // rounded
    [
      /^rounded-(\d+|-?\d*)$/,
      ([, d]) => {
        return { 'border-radius': `${d}rpx` }
      }
    ],
    [
      /^rounded-(t|b)-(\d+|-?\d*)$/,
      ([, t, d]) => {
        const map = {
          t: 'top',
          b: 'bottom'
        }
        return {
          [`border-${map[t]}-left-radius`]: `${d}rpx`,
          [`border-${map[t]}-right-radius`]: `${d}rpx`
        }
      }
    ],
    // border
    [
      /^border-(\d+|-?\d*)$/,
      ([, d]) => {
        return { 'border-width': `${d}rpx` }
      }
    ]
  ],
  shortcuts: [
    {
      center: 'flex justify-center items-center'
    }
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre'
    }),
    transformerAttributify(),
    transformerClass()
  ],
  theme: {
    colors: {
      g: '#5AA153',
      y: '#FFAA09',
      3: '#333',
      '1d': '#1D2C38',
      67: '#676F7A',
      c5: '#c5c5d1',
      r: '#EA4F3D',
      97: '#979CA4',
      primary: '#0092FF'
    }
  }
})
