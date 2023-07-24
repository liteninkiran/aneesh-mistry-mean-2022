import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit, OnDestroy {

    public diaryEntries: DiaryEntry[];
    public diarySubscription = new Subscription();

    constructor(
        private diaryDataService: DiaryDataService,
        private router: Router,
    ) {

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

    public onDelete(id: string): void {
        this.diaryDataService.onDelete(id);
    }

    public onEdit(id: string): void {
        this.router.navigate(['edit', id]);
    }

    public updateArray(): void {
        this.diaryDataService.getDiaryEntries();
    }
}
