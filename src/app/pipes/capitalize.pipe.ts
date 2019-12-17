import { Pipe, PipeTransform } from '@angular/core';

const toTitleCase = (value) => {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
};

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      if (args === 'all') {
        return value
          .split(' ').map(toTitleCase).join(' ')
          .split('"').map(toTitleCase).join('"')
          .split(' \'').map(toTitleCase).join(' \'')
          .split('-').map(toTitleCase).join('-')
          .split(' -').map(toTitleCase).join(' -')
          .split('- ').map(toTitleCase).join('- ')
          .split(' - ').map(toTitleCase).join(' - ');
      } else {
        return toTitleCase(value);
      }
    }
    return value;
  }
}
