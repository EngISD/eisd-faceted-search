import {Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

@Pipe({ name: 'highlight' })
export class HighlightSearch implements PipeTransform {

constructor() {
}
transform(data: string,
          highlightText: string,
          option: string = 'Multi-Match',
          caseSensitive: boolean = false): SafeHtml {
    if (highlightText && data && option) {
        let regex: any = '';
        const caseFlag: string = !caseSensitive ? 'i' : '';
        switch (option) {
            case 'Single-Match': {
                regex = new RegExp(highlightText, caseFlag);
                break;
            }
            case 'Single-And-StartsWith-Match': {
                regex = new RegExp('^' + highlightText, caseFlag);
                break;
            }
            case 'Multi-Match': {
                regex = new RegExp(highlightText, 'g' + caseFlag);
                break;
            }
            default: {
                regex = new RegExp(highlightText, 'gi');
            }
        }
        return data.replace(regex, (match) => match.bold());

    } else {
        return data;
    }
}
}
