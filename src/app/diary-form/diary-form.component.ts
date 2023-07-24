import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaryDataService } from '../shared/diary-data.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DiaryEntry } from '../shared/diary-entry.model';

@Component({
    selector: 'app-diary-form',
    templateUrl: './diary-form.component.html',
    styleUrls: ['./diary-form.component.css'],
})
export class DiaryFormComponent implements OnInit {

    public diaryForm: FormGroup;
    public editMode = false;
    public diaryEntry: DiaryEntry;
    public paramId: string;

    constructor(
        private diaryDataService: DiaryDataService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.editMode = paramMap.has('id')
            if (this.editMode) {
                this.paramId = paramMap.get('id')!;
                this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);
            }
        });
        this.diaryForm = new FormGroup({
            'date': new FormControl(this.editMode ? this.diaryEntry.date : null, [Validators.required]),
            'entry': new FormControl(this.editMode ? this.diaryEntry.entry : null, [Validators.required]),
        });
    }

    public onSubmit() {
        const newEntry = new DiaryEntry('1', this.diaryForm.value.date, this.diaryForm.value.entry);
        if (this.editMode) {
            newEntry.id = this.paramId;
            this.diaryDataService.onUpdateDiaryEntry(this.paramId, newEntry);
        } else {
            this.diaryDataService.onAddDiaryEntry(newEntry);
        }
        this.router.navigateByUrl('');
    }

}
