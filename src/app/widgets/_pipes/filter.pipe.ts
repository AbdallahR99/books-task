import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe<T> implements PipeTransform {

  transform(
    value: T[], query: string, filterByProp: keyof T, filterByFallBack: string): T[] {

    if (!value || !query) {
      return value; // If the array or query is empty, return the original value
    }

    query = query.toLowerCase();
    if (!filterByProp || typeof value[0] === 'string') {
      return value.filter(item => (item as string).toString()?.toLowerCase()?.includes(query));
    }

    return value.filter(item => {

      const propValue = filterByProp ? item[filterByProp]?.toString().toLowerCase() : null;
      const fallbackValue = filterByFallBack?.toString().toLowerCase();
      return (propValue && propValue.includes(query)) || fallbackValue.includes(query);
    });
  }
}
