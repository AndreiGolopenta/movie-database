import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-sort-bar',
    templateUrl: './sort-bar.component.html',
    styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {
    options: string[] = [
        'List Order',
        'Alphabetical ascending',
        'Alphabetical descending',
        'Rating ascending',
        'Rating descending'
    ];

    @Input() titles: number;
    @Input() sortByOption: string;

    @ViewChild('inputElement') inputElement: ElementRef;
    @ViewChild('iconElement') iconElement: ElementRef;
    @ViewChild('listElement') listElement: ElementRef;

    @Output() sort = new EventEmitter<string>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    @HostListener('window:click', ['$event'])
    dropdown(event: MouseEvent) {
        const selectInput = this.inputElement.nativeElement as HTMLInputElement;
        const selectIcon = this.iconElement.nativeElement as HTMLSpanElement;
        const selectList = this.listElement.nativeElement as HTMLUListElement;

        switch (event.target) {
            case selectInput:
            case selectIcon: {
                selectList.classList.toggle('container__dropdown__list--show');
                selectInput.classList.toggle(
                    'container__dropdown__input--focus'
                );
                return;
            }
            default: {
                selectList.classList.remove('container__dropdown__list--show');
                selectInput.classList.remove(
                    'container__dropdown__input--focus'
                );
                return;
            }
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            dropdownInput: [this.sortByOption]
        });
    }

    sortBy(option: string) {
        const dropdownInput = this.form.get('dropdownInput') as FormControl;
        dropdownInput.setValue(option);
        this.sort.emit(option);
    }
}
