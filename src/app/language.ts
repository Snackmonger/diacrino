import { unicodeGreekCombiningData, unicodeGreekMuiscalNotationInstrumental, unicodeGreekMuiscalNotationVocal, unicodeGreekPrecomposedData, unicodeLatinCombiningData, unicodeLatinPrecomposedData } from "./app-data";

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
export function convertGeneric(text: string, conversionData: string[][]): string {
  for (let [from, to] of conversionData) {
    text = text.replaceAll(from, to);
  }
  return text
}

/**
 * Take a string in Latin ASCII diacritical shorthand format 
 * and return a string with precomposed diacritics.
 * 
 * @param text  A string in Latin ASCII shorthand format.
 * @returns     A string in unicode precomposed characters.
 */
export function convertShorthandToLatinPrecomposed(text: string): string {
  return convertGeneric(text, unicodeLatinPrecomposedData);
}

/**
 * Take a string in Latin ASCII diacritical shorthand format 
 * and return a string with combining diacritics.
 * 
 * @param text  A string in Latin ASCII shorthand format.
 * @returns     A string with unicode combining characters.
 */
export function convertShorthandToLatinCombining(text: string): string {
  return convertGeneric(text, unicodeLatinCombiningData);
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
 * Take a string in Greek ASCII diacritical shorthand format 
 * and return a string in unicode Greek with precomposed characters.
 *
 * @param text    A text in Greek ASCII shorthand formatting.
 * @returns       A text in unicode Greek with precomposed characters.
 */
export function convertShorthandToGreekPrecomposed(text: string): string {
  return convertGreekGeneric(text, unicodeGreekPrecomposedData);
}

/**
 * Take a string in Greek ASCII diacritical shorthand format 
 * and return a string in unicode Greek format with combining characters.
 * 
 * @param text    A text in Greek ASCII shorthand formatting.
 * @returns       A text in unicode Greek with combining characters.
 */
export function convertShorthandToGreekCombining(text: string): string {
  return convertGreekGeneric(text, unicodeGreekCombiningData);
}

export function convertShorthandToGreekMusicalNotationVocal(text: string): string {
    return convertGeneric(text, unicodeGreekMuiscalNotationVocal)
  }

export function convertShorthandToGreekMusicalNotationInstrumental(text: string): string {
    return convertGeneric(text, unicodeGreekMuiscalNotationInstrumental)
  }

/**
 * Descriptive elements of a language converter, plus a conversion function.
 */
export interface Language {
  name: string;
  description: string[];
  demoText: string;
  convert: (text: string) => string;
}

export const LANGUAGES: Language[] = [
  {
    name: 'Greek (Precomposed)',
    convert: convertShorthandToGreekPrecomposed,
    description: [
      'Typing polytonic Greek with precomposed diacritics is easy with our converter!',
      'Latin letters are simply converted to Greek letters, so "abcdefg" becomes "αβξδεφγ" and "ABCDEFG" becomes "ΑΒΞΔΕΦΓ"',
      'Diacritics can be added after vowels using special characters, so "mh=nin a)/eide qea\\" becomes "μῆνιν ἄειδε θεὰ"',
      'The output text uses precomposed Unicode characters, so not all combinations of diacritics are valid characters! For example, a diaeresis cannot apply to an alpha, and a diaeresis cannot coexist with a breathing!',
      "If you want more combinations, try the COMBINING diacritic converter!",
      'See the demonstration text for a complete range of diacritics available in polytonic Greek'
    ],
    demoText: `abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
a( a) a/ a\\ a= a| i+ i_ i- a(/ a)/ a(= a)= a(|= a=|)

mh=ni-n a)/eide qea\\ Phlhi+a/dew A)xi-lh=os
ou)lome/nhn, h(\\ mu_ri/’ A)xaioi=s a)/lge’ e)/qhke,
polla\\s d’ i)fqi/mous yu_xa\\s A)/i+di proi/+ayen
h(rw/wn, au)tou\\s de\\ e(lw/ri-a- teu=xe ku/nessi-n
oi)wnoi=si/ te dai=ta-, Dio\\s d’ e)telei/eto boulh/`
  },


  {
    name: 'Latin (Precomposed)',
    convert: convertShorthandToLatinPrecomposed,
    description: [
      "Typing Latin text with precomposed diacritics is easy with our converter!",
      'Diacritics can be added after certain letters using special characters, so "u+ber" becomes "über", "pense/" becomes "pensé" and so on',
      "Check the demonstration on the main page to see a few examples of characters with diacritics!",
      "All vowels and some consonants can take diacritics or be modified in our shorthand, and some can even take multiple diacritics.",
      "This version of the converter uses PRECOMPOSED unicode characters, so not all combinations of diacritics are available for all characters",
      "If you want more combinations, try the COMBINING diacritic converter!"
    ],
    demoText: `a/rma- vi-ru/mque- ca-no_/ qui_ pri/mu-s a-b o_/ris
a/ a\ a~ a! a@ a% a^ a* a_ a- a+ a/% a| a|/ a|_
e/ e\ e~ e! e@ e^ e* e_ e- e+ e] e^@ 
i/ i\ i~ i@ i^ i_ i- i+ i/+ 
o/ o\ o~ o@ o^ o* o_ o- o+ o| o+~ o@^
u/ u\ u~ u@ u% u^ u_ u- u+
y/ y\ y~ y@ y% y^ y* y_ y+
k/ k$ g] c] s] s$ s@ s* m@ m*
c! s! f! z! z!$ E! S! l!
`
  },

  {
    name: 'Greek (Combining)',
    convert: convertShorthandToGreekCombining,
    description: [
      "Typing Greek text with combining diacritics has never been this easy!",
      'Latin letters are simply converted to Greek letters, so "abcdefg" becomes "αβξδεφγ" and "ABCDEFG" becomes "ΑΒΞΔΕΦΓ"',
      'Diacritics can be added after vowels using special characters, so "mh=nin a)/eide qea\\" becomes "μῆνιν ἄειδε θεὰ"',
      'The output text uses combining diacritics compose Unicode glyphs, so you can create any combination of diacritic you want!',
      'However, the diacritics render differently depending on the order you put them in, so you might have to rearrange them to get the look you want, e.g. "a/-" and "a-/" represent the same combination, but will be rendered ά̆ and ᾰ́  (which look different in most programs)',
      'See the demonstration text for a complete range of diacritics available in polytonic Greek'
    ],
    demoText: `[le]uka=n mainome/n[oisin e)sa_/lata p]o@s@s@i@n@ a)f' i(/[p]p@w@[n]`
  },

  {
    name: 'Latin (Combining)',
    convert: convertShorthandToLatinCombining,
    description: ["Typing Latin text with combining diacritics has never been this easy!",
      'Diacritics can be added after certain letters using special characters, so "u+ber" becomes "über", "pense/" becomes "pensé" and so on',
      "Check the demonstration on the main page to see a few examples of characters with diacritics!",
      'The output text uses combining diacritics, so you can make any combination of diacritics you want!',
      'However, you might notice that the order causes the diacritics to render differently, so you might have to play around a bit.',
      "Sometimes, combining diacritics don't render correctly. In these situations, try our COMBINING diacritics converter!"
    ],
    demoText: `a/ a\ a~ a= a^ a+ a@ a#o a&o a* a( a) a] a- a_ a|

i/ i\ i~ i= i^ i+ i@ i#o i&o i* i( i) i] i- i_ i|

a/) a)/ i-/ i/- a*]

g/ g^ k/ h~ m@ n] t]`
  },

  {
    name: "Greek Musical Notation (Vocal)",
    convert: convertShorthandToGreekMusicalNotationVocal,
    description: [""],
    demoText: `G G+ G++ A A+ A++ B B+ B++ c c+ c++ d d+ d++ 
e e+ e++ f f+ f++ g g+ g++ a a+ a++ b b+ b++
c' c'+ c'++ d' d'+ d'++ e' e'+ e'++ f' f'+ f'++ g' g'+ g'++
a' a'+ a'++ b' b'+ b'++ c'' c''+ c''++ d'' d''+ d''++ e'' e''+ e''++
f'' f''+ f''++ g''
`
  },

  {
    name: "Greek Musical Notation (Instrumental)",
    convert: convertShorthandToGreekMusicalNotationInstrumental,
    description: [""],
    demoText: `G G+ G++ A A+ A++ B B+ B++ c c+ c++ d d+ d++ 
e e+ e++ f f+ f++ g g+ g++ a a+ a++ b b+ b++
c' c'+ c'++ d' d'+ d'++ e' e'+ e'++ f' f'+ f'++ g' g'+ g'++
a' a'+ a'++ b' b'+ b'++ c'' c''+ c''++ d'' d''+ d''++ e'' e''+ e''++
f'' f''+ f''++ g'' `
  }
];
