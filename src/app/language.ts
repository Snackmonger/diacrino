import { convertWeakBetacodeToGreek } from '../utils';

export interface Language {
  name: string;
  description: string[];
  demoText: string;
  rules: string[];
  convert: (text: string) => string;
}

export const languages = [
  {
    name: 'Greek',
    description: [
      'Type polytonic Greek easily using a relaxed version of ASCII beta code.',
      'Traditional beta code uses all capitals, and has to indicate lowercase letters with awkward asterized forms. We got rid of that, and you can just type Latin capitals for Greek capitals.',
      'Traditional beta code has a specific order for diacritics. We got rid of that, and you can type your diacritics in any order. As long as the total combination is valid, Diacrino will convert it to the corresponding character.',
    ],
    demoText: `mh=nin a)/eide qea\ Phlhi+a/dew A)xilh=os
ou)lome/nhn, h(\ muri/’ A)xaioi=s a)/lge’ e)/qhke,
polla\s d’ i)fqi/mous yuxa\s A)/i+di proi/+ayen
h(rw/wn, au)tou\s de\ e(lw/ria teu=xe ku/nessin
oi)wnoi=si/ te pa=si, Dio\s d’ e)telei/eto boulh/`,
    rules: [
      'a/ becomes ά',
      'a\\ becomes ὰ',
      'a= becomes ᾶ',
      'a_ becomes ᾱ',
      'a- becomes ᾰ',
      'a| becomes ᾳ',
      'a( becomes ἁ',
      'a) becomes ἀ',
      'i+ becomes ϊ',
    ],
    convert: convertWeakBetacodeToGreek,
  },
];
