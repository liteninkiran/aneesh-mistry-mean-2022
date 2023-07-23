import { Component, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit {

    public diaryEntries: DiaryEntry[];

    constructor(private diaryDataService: DiaryDataService) {

    }

    public ngOnInit(): void {
        this.updateArray();
    }

    public onDelete(index: number): void {
        this.diaryDataService.onDelete(index);
        this.updateArray();
    }

    public updateArray():void {
        this.diaryEntries = this.diaryDataService.diaryEntries;
    }
}
