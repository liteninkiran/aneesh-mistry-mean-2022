import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

    diaryEntries: DiaryEntry[] = [
        new DiaryEntry('Jan 1st', 'Entry 1', 'No Action'),
        new DiaryEntry('Jan 2nd', 'Entry 2', 'No Action'),
    ];

}
