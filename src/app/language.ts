import {
  unicodeGreekCombiningData,
  unicodeGreekMuiscalNotationInstrumental,
  unicodeGreekMuiscalNotationVocal,
  unicodeGreekPrecomposedData,
  unicodeLatinCombiningData,
  unicodeLatinPrecomposedData,
} from './app-data';

/**
 * Convert text generically using the given conversion data.
 *
 * Conversion data is read in sequence, so you must sort it yourself for
 * maximal munching.
 *
 * @param text            Text to be converted
 * @param conversionData  Conversion data to be applied
 * @returns               Converted text.
 */
export function convertGeneric(
  text: string,
  conversionData: string[][]
): string {
  for (let [from, to] of conversionData) {
    text = text.replaceAll(from, to);
  }
  return text;
}

/**
 * Convert Greek text generically. Essentially the same as the main generic
 * converter, but adds a whitespace buffer to ensure that terminal sigma is
 * converted right.
 *
 * @param text            The text to be converted.
 * @param conversionData  The conversions to apply.
 * @returns               The converted text.
 */
function convertGreekGeneric(text: string, conversionData: string[][]): string {
  return convertGeneric(text + ' ', conversionData).trim();
}

/**
 * Descriptive elements of a language converter, plus a conversion function.
 */
export interface Language {
  name: string;
  demoText: string;
  convert: (text: string) => string;
}

export const LANGUAGES: Language[] = [
  {
    name: 'Greek (Precomposed Diacritics)',
    convert: (text: string) => {
      return convertGreekGeneric(text, unicodeGreekPrecomposedData);
    },
    demoText: `abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
a( a) a/ a\\ a= a| i+ i_ i- a(/ a)/ a(= a)= a(|= a=|)

mh=ni-n a)/eide qea\\ Phlhi+a/dew A)xi-lh=os
ou)lome/nhn, h(\\ mu_ri/’ A)xaioi=s a)/lge’ e)/qhke,
polla\\s d’ i)fqi/mous yu_xa\\s A)/i+di proi/+ayen
h(rw/wn, au)tou\\s de\\ e(lw/ri-a- teu=xe ku/nessi-n
oi)wnoi=si/ te dai=ta-, Dio\\s d’ e)telei/eto boulh/`,
  },

  {
    name: 'Latin (Precomposed Diacritics)',
    convert: (text: string) => {
      return convertGeneric(text, unicodeLatinPrecomposedData);
    },
    demoText: `a/rma- vi-ru/mque- ca-no_/ qui_ pri/mu-s a-b o_/ris
    
a/ a\ a~ a! a@ a% a^ a* a_ a- a+ a/% a| a|/ a|_
e/ e\ e~ e! e@ e^ e* e_ e- e+ e] e^@ 
i/ i\ i~ i@ i^ i_ i- i+ i/+ 
o/ o\ o~ o@ o^ o* o_ o- o+ o| o+~ o@^
u/ u\ u~ u@ u% u^ u_ u- u+
y/ y\ y~ y@ y% y^ y* y_ y+
k/ k$ g] c] s] s$ s@ s* m@ m*
c! s! f! z! z!$ E! S! l!
`,
  },

  {
    name: 'Greek (Combining Diacritics)',
    convert: (text: string) => {
      return convertGreekGeneric(text, unicodeGreekCombiningData);
    },
    demoText: `[le]uka=n mainome/n[oisin e)sa_/lata p]o@s@s@i@n@ a)f' i(/[p]p@w@[n]
  
kai/ soi to\ Qhse/&ws o)/noma qwpteu=sai kalo/n  `,
  },

  {
    name: 'Latin (Combining Diacritics)',
    convert: (text: string) => {
      return convertGeneric(text, unicodeLatinCombiningData);
    },
    demoText: `Eu/rum ad se_/ Zephyru/mque voca/t, de&hinc tā/lia fā/tur

a/ a\ a~ a= a^ a+ a@ a#o a&o a* a( a) a] a- a_ a|

i/ i\ i~ i= i^ i+ i@ i#o i&o i* i( i) i] i- i_ i|

a/) a)/ i-/ i/- a*]

g/ g^ k/ h~ m@ n] t]`,
  },

  {
    name: 'Greek Musical Notation (Vocal)',
    convert: (text: string) => {
      return convertGeneric(text, unicodeGreekMuiscalNotationVocal);
    },
    demoText: `G G+ G++ A A+ A++ B B+ B++ 
c c+ c++ d d+ d++  e e+ e++ f f+ f++ g g+ g++ a a+ a++ b b+ b++ 
c' c'+ c'++ d' d'+ d'++ e' e'+ e'++ f' f'+ f'++ g' g'+ g'++ a' a'+ a'++ b' b'+ b'++ 
c'' c''+ c''++ d'' d''+ d''++ e'' e''+ e''++ f'' f''+ f''++ g''
`,
  },

  {
    name: 'Greek Musical Notation (Instrumental)',
    convert: (text: string) => {
      return convertGeneric(text, unicodeGreekMuiscalNotationInstrumental);
    },
    demoText: `G G+ G++ A A+ A++ B B+ B++ 
c c+ c++ d d+ d++  e e+ e++ f f+ f++ g g+ g++ a a+ a++ b b+ b++ 
c' c'+ c'++ d' d'+ d'++ e' e'+ e'++ f' f'+ f'++ g' g'+ g'++ a' a'+ a'++ b' b'+ b'++ 
c'' c''+ c''++ d'' d''+ d''++ e'' e''+ e''++ f'' f''+ f''++ g''`,
  },
];
