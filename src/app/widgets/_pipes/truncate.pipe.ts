import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if (!value || value.length <= maxLength) {
      return value;
    }

    const truncatedValue = value.substring(0, maxLength);
    return `${truncatedValue}...`;
  }
}
