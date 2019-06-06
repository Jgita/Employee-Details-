import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'searchByName'
})
@Injectable()
export class SearchByNamePipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
     return items.filter(function(Product) {
        return Product.employee_name.toLowerCase().includes(value.toLowerCase());
    });
    }
}
