import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

    public diaryEntries: DiaryEntry[] = [
        new DiaryEntry('Jan 1st 2023', 'Entry 1'),
        new DiaryEntry('Jan 2nd 2023', 'Entry 2'),
        new DiaryEntry('Jan 5th 2023', 'BBQ!'),
    ];

    public diarySubject = new Subject<DiaryEntry[]>();

    public onDelete(index: number): void {
        this.diaryEntries.splice(index, 1);
        this.diarySubject.next(this.diaryEntries);
    }

    public onAddDiaryEntry(diaryEntry: DiaryEntry): void {
        this.diaryEntries.push(diaryEntry);
        this.diarySubject.next(this.diaryEntries);
    }
}
