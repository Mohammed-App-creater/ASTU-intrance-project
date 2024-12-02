

function formatText(input: string | undefined): string {
    if (!input) {
      return ''; 
    }
  
    let x: string = input;
  
    
    const transformations: { pattern: RegExp, replacement: (match: string, content: string) => string }[] = [
      {
        pattern: /^\*\*\*(.*?)\*\*\*$/, 
        replacement: (match, content) => `<strong><i>${content}</i></strong>`,
      },
      {
        pattern: /\*\*(.*?)\*\*/, 
        replacement: (match, content) => `<strong>${content}</strong>`,
      },
      {
        pattern: /^\*(.*?)\*$/, 
        replacement: (match, content) => `<i>${content}</i>`,
      },
      {
        pattern: /^~~(.*?)~~$/, 
        replacement: (match, content) => `<s>${content}</s>`,
      },
      {
        pattern: /^==(.*?)==$/, 
        replacement: (match, content) => `<mark>${content}</mark>`,
      },
      {
        pattern: /`(.*?)`/, 
        replacement: (match, content) => `<code>${content}</code>`,
      },
      {
        pattern: /^<small>(.*?)<\/small>$/, 
        replacement: (match, content) => `<small>${content}</small>`,
      },
      {
        pattern: /^<big>(.*?)<\/big>$/, 
        replacement: (match, content) => `<big>${content}</big>`,
      },
      {
        pattern: /^<sub>(.*?)<\/sub>$/, 
        replacement: (match, content) => `<sub>${content}</sub>`,
      },
      {
        pattern: /^<sup>(.*?)<\/sup>$/, 
        replacement: (match, content) => `<sup>${content}</sup>`,
      },
      {
        pattern: /^<blockquote>(.*?)<\/blockquote>$/, 
        replacement: (match, content) => `<blockquote>${content}</blockquote>`,
      },
      {
        pattern: /<p align="(left|center|right)">(.+)<\/p>/, 
        replacement: (match: string) => {
          const [, align, content] = match.match(/<p align="(left|center|right)">(.+)<\/p>/)!;
          return `<p align="${align}">${content}</p>`;
        },
      },
      {
        pattern: /^---$/, 
        replacement: () => `<hr>`,
      },
      {
        pattern: /<br>/, 
        replacement: () => `<br>`,
      },
      {
        pattern: /&nbsp;/, 
        replacement: () => `&nbsp;`,
      },
      {
        pattern: /©/, 
        replacement: () => `©`,
      },
      {
        pattern: /®/, 
        replacement: () => `®`,
      },
      {
        pattern: /™/, 
        replacement: () => `™`,
      },
    ];
  
   
    let transformed = false;
    for (const { pattern, replacement } of transformations) {
      if (pattern.test(x)) {
        x = x.replace(pattern, replacement);
        transformed = true;
        break;
      }
    }
  
    const unorderedListPattern = /^\*\s+(.+)/;
      if (unorderedListPattern.test(x)) {
        x = x.replace(unorderedListPattern, (match, content) => `<li>${content}</li>`);
      }
      
    if (!transformed) { 
        x = input; 
    }
  
    return x;
  }

  export default formatText;