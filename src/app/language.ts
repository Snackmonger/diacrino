import { unicodeGreekPrecomposedData, unicodeLatinPrecomposedData } from "./app-data";

/**
 * Take a string in Latin ASCII diacritical shorthand format and return a string in precomposed unicode Latin format
 * 
 * @param text A string in Latin ASCII shorthand format.
 * @returns A string in precomposed unicode Latin formatting.
 */
export function convertShorthandToLatinPrecomposed(text: string): string {
  for (let [from, to] of unicodeLatinPrecomposedData) {
    text = text.replaceAll(from, to);
  }
  return text;

}

/**
 * Take a string in Greek ASCII diacritical shorthand format and return a string in precomposed unicode Greek format.
 *
 * @param text    A text in Greek ASCII shorthand formatting.
 * @returns       A text in precomposed unicode Greek formatting.
 */
export function convertShorthandToGreekPrecomposed(text: string): string {
  // Add trailing whitespace to ensure that sigma is still converted 
  // even if it is the last character in the whole text.
  text = text + ' ';
  for (let [from, to] of unicodeGreekPrecomposedData) {
    text = text.replaceAll(from, to);
  }
  // Remove the trailing whitespace added above.
  return text.trim();
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
      'Typing polytonic Greek is easy with our converter!',
      'Latin letters are simply converted to Greek letters, so "abcdefg" becomes "αβξδεφγ" and "ABCDEFG" becomes "ΑΒΞΔΕΦΓ"',
      'Diacritics can be added after vowels using special characters, so "mh=nin a)/eide qea\\" becomes "μῆνιν ἄειδε θεὰ"',
      'Sometimes a letter can take more than one diacritic and you can enter the diacritics in any order, so that both "a/)" and "a)/" become "ἄ"',
      'The output text uses precomposed Unicode characters, so not all combinations of diacritics are valid characters! For example, a diaeresis cannot apply to an alpha, and a diaeresis cannot coexist with a breathing!',
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
      "Typing Latin text with diacritics is easy with our converter!",
      'Diacritics can be added after certain letters using special characters, so "u+ber" becomes "über", "pense/" becomes "pensé" and so on',
      "Check the demonstration on the main page to see a few examples of characters with diacritics! This is not a complete list and more combinations are possible!",
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
  }
];
