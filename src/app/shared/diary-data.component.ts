import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

    diaryEntries: DiaryEntry[] = [
        new DiaryEntry('Jan 1st 2023', 'Entry 1'),
        new DiaryEntry('Jan 2nd 2023', 'Entry 2'),
    ];

}
