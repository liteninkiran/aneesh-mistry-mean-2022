import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit, OnDestroy {

    public diaryEntries: DiaryEntry[];
    public diarySubscription = new Subscription();

    constructor(private diaryDataService: DiaryDataService) {

    }

    public ngOnInit(): void {
        this.diarySubscription = this.diaryDataService.diarySubject.subscribe(
            diaryEntries => this.diaryEntries = diaryEntries
        );
        this.updateArray();
    }

    public ngOnDestroy(): void {
        this.diarySubscription.unsubscribe();
    }

    public onDelete(index: number): void {
        this.diaryDataService.onDelete(index);
    }

    public updateArray():void {
        this.diaryEntries = this.diaryDataService.diaryEntries;
    }
}
