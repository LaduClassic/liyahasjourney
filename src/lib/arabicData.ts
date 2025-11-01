export interface ArabicLetter {
  name: string
  forms: {
    isolated: string
    beginning: string
    middle: string
    final: string
  }
  romanization: string
}

export const ARABIC_LETTERS: ArabicLetter[] = [
  {
    name: 'Alif',
    forms: {
      isolated: 'ا',
      beginning: 'اـ',
      middle: 'ـا',
      final: 'ـا'
    },
    romanization: 'aa'
  },
  {
    name: 'Baa',
    forms: {
      isolated: 'ب',
      beginning: 'بـ',
      middle: 'ـبـ',
      final: 'ـب'
    },
    romanization: 'b'
  },
  {
    name: 'Taa',
    forms: {
      isolated: 'ت',
      beginning: 'تـ',
      middle: 'ـتـ',
      final: 'ـت'
    },
    romanization: 't'
  },
  {
    name: 'Thaa',
    forms: {
      isolated: 'ث',
      beginning: 'ثـ',
      middle: 'ـثـ',
      final: 'ـث'
    },
    romanization: 'th'
  },
  {
    name: 'Jeem',
    forms: {
      isolated: 'ج',
      beginning: 'جـ',
      middle: 'ـجـ',
      final: 'ـج'
    },
    romanization: 'j'
  },
  {
    name: 'Haa',
    forms: {
      isolated: 'ح',
      beginning: 'حـ',
      middle: 'ـحـ',
      final: 'ـح'
    },
    romanization: 'h'
  },
  {
    name: 'Khaa',
    forms: {
      isolated: 'خ',
      beginning: 'خـ',
      middle: 'ـخـ',
      final: 'ـخ'
    },
    romanization: 'kh'
  },
  {
    name: 'Daal',
    forms: {
      isolated: 'د',
      beginning: 'دـ',
      middle: 'ـد',
      final: 'ـد'
    },
    romanization: 'd'
  },
  {
    name: 'Dhaal',
    forms: {
      isolated: 'ذ',
      beginning: 'ذـ',
      middle: 'ـذ',
      final: 'ـذ'
    },
    romanization: 'dh'
  },
  {
    name: 'Raa',
    forms: {
      isolated: 'ر',
      beginning: 'رـ',
      middle: 'ـر',
      final: 'ـر'
    },
    romanization: 'r'
  },
  {
    name: 'Zay',
    forms: {
      isolated: 'ز',
      beginning: 'زـ',
      middle: 'ـز',
      final: 'ـز'
    },
    romanization: 'z'
  },
  {
    name: 'Seen',
    forms: {
      isolated: 'س',
      beginning: 'سـ',
      middle: 'ـسـ',
      final: 'ـس'
    },
    romanization: 's'
  },
  {
    name: 'Sheen',
    forms: {
      isolated: 'ش',
      beginning: 'شـ',
      middle: 'ـشـ',
      final: 'ـش'
    },
    romanization: 'sh'
  },
  {
    name: 'Saad',
    forms: {
      isolated: 'ص',
      beginning: 'صـ',
      middle: 'ـصـ',
      final: 'ـص'
    },
    romanization: 's'
  },
  {
    name: 'Daad',
    forms: {
      isolated: 'ض',
      beginning: 'ضـ',
      middle: 'ـضـ',
      final: 'ـض'
    },
    romanization: 'd'
  },
  {
    name: 'Taa',
    forms: {
      isolated: 'ط',
      beginning: 'طـ',
      middle: 'ـطـ',
      final: 'ـط'
    },
    romanization: 't'
  },
  {
    name: 'Zaa',
    forms: {
      isolated: 'ظ',
      beginning: 'ظـ',
      middle: 'ـظـ',
      final: 'ـظ'
    },
    romanization: 'z'
  },
  {
    name: 'Ayn',
    forms: {
      isolated: 'ع',
      beginning: 'عـ',
      middle: 'ـعـ',
      final: 'ـع'
    },
    romanization: '\''
  },
  {
    name: 'Ghayn',
    forms: {
      isolated: 'غ',
      beginning: 'غـ',
      middle: 'ـغـ',
      final: 'ـغ'
    },
    romanization: 'gh'
  },
  {
    name: 'Faa',
    forms: {
      isolated: 'ف',
      beginning: 'فـ',
      middle: 'ـفـ',
      final: 'ـف'
    },
    romanization: 'f'
  },
  {
    name: 'Qaaf',
    forms: {
      isolated: 'ق',
      beginning: 'قـ',
      middle: 'ـقـ',
      final: 'ـق'
    },
    romanization: 'q'
  },
  {
    name: 'Kaaf',
    forms: {
      isolated: 'ك',
      beginning: 'كـ',
      middle: 'ـكـ',
      final: 'ـك'
    },
    romanization: 'k'
  },
  {
    name: 'Laam',
    forms: {
      isolated: 'ل',
      beginning: 'لـ',
      middle: 'ـلـ',
      final: 'ـل'
    },
    romanization: 'l'
  },
  {
    name: 'Meem',
    forms: {
      isolated: 'م',
      beginning: 'مـ',
      middle: 'ـمـ',
      final: 'ـم'
    },
    romanization: 'm'
  },
  {
    name: 'Noon',
    forms: {
      isolated: 'ن',
      beginning: 'نـ',
      middle: 'ـنـ',
      final: 'ـن'
    },
    romanization: 'n'
  },
  {
    name: 'Haa',
    forms: {
      isolated: 'ه',
      beginning: 'هـ',
      middle: 'ـهـ',
      final: 'ـه'
    },
    romanization: 'h'
  },
  {
    name: 'Waaw',
    forms: {
      isolated: 'و',
      beginning: 'وـ',
      middle: 'ـو',
      final: 'ـو'
    },
    romanization: 'w'
  },
  {
    name: 'Yaa',
    forms: {
      isolated: 'ي',
      beginning: 'يـ',
      middle: 'ـيـ',
      final: 'ـي'
    },
    romanization: 'y'
  }
]

export interface SpellingWord {
  arabic: string
  phonetic: string
  definition: string
}

export const DEFAULT_SPELLING_WORDS: SpellingWord[] = [
  { arabic: 'شَعْرٌ', phonetic: 'sha-r', definition: 'hair' },
  { arabic: 'بُنِّيٌّ', phonetic: 'bun-nii-y', definition: 'brown' },
  { arabic: 'قَصِيرٌ', phonetic: 'qa-sii-r', definition: 'short' },
  { arabic: 'كَلْبٌ', phonetic: 'kalb', definition: 'dog' },
  { arabic: 'مُرَقَّطٌ', phonetic: 'mu-raq-qat', definition: 'spotted' },
  { arabic: 'تُمْسِكُ', phonetic: 'tum-si-ku', definition: 'she holds' },
  { arabic: 'لُعْبَةٌ', phonetic: 'lu-bah', definition: 'toy' },
  { arabic: 'كُرَةٌ', phonetic: 'ku-rah', definition: 'ball' },
  { arabic: 'الْمِضْرَبُ', phonetic: 'al-mid-ra-bu', definition: 'the racket' }
]

export const SPELLING_WORDS: SpellingWord[] = [...DEFAULT_SPELLING_WORDS]

export function parseQuizFile(content: string): SpellingWord[] {
  const lines = content.split('\n').filter(line => line.trim())
  const words: SpellingWord[] = []
  
  for (const line of lines) {
    const parts = line.split('|').map(p => p.trim())
    if (parts.length === 3) {
      words.push({
        arabic: parts[0],
        phonetic: parts[1],
        definition: parts[2]
      })
    }
  }
  
  return words
}

export function updateSpellingWords(newWords: SpellingWord[]) {
  SPELLING_WORDS.length = 0
  SPELLING_WORDS.push(...newWords)
}

const HARAKAT = /[\u064B-\u0652]/g
const TATWEEL = /\u0640/g

export function normalizeArabic(str: string, keepHarakat = false): string {
  let s = str.replace(TATWEEL, '').replace(/\s+/g, '')
  if (!keepHarakat) s = s.replace(HARAKAT, '')
  s = s.replace(/\u0649/g, '\u064A')
  return s
}

export function clusterArabic(str: string): string[] {
  const s = str.replace(TATWEEL, '')
  const out: string[] = []
  let current = ''
  
  for (const ch of s) {
    const isComb = /[\u064B-\u0652]/.test(ch)
    if (!current) {
      if (!/\s/.test(ch)) current = ch
    } else {
      if (isComb) {
        current += ch
      } else if (/\s/.test(ch)) {
        if (current) {
          out.push(current)
          current = ''
        }
      } else {
        out.push(current)
        current = ch
      }
    }
  }
  if (current) out.push(current)
  return out.filter(Boolean)
}
