import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

    private baseUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient,
    ) {

    }

    public diarySubject = new Subject<DiaryEntry[]>();
    private diaryEntries: DiaryEntry[] = [];

    public onDelete(index: number): void {
        this.diaryEntries.splice(index, 1);
        this.diarySubject.next(this.diaryEntries);
    }

    public onAddDiaryEntry(diaryEntry: DiaryEntry): void {
        const url = this.baseUrl + '/add-entry';
        this.http.post<{ message: string }>(url, diaryEntry).subscribe((jsonData) => {
            this.getDiaryEntries();
        });
    }

    public onUpdateDiaryEntry(paramId:number, diaryEntry: DiaryEntry): void {
        this.diaryEntries[paramId] = diaryEntry;
        this.diarySubject.next(this.diaryEntries);
    }

    public getDiaryEntry(index: number): DiaryEntry {
        return { ...this.diaryEntries[index] };
    }

    public getDiaryEntries() {
        const url = this.baseUrl + '/diary-entries';
        this.http.get<{ diaryEntries: DiaryEntry[] }>(url).subscribe((jsonData) => {
            this.diaryEntries = jsonData.diaryEntries;
            this.diarySubject.next(this.diaryEntries);
        });
    }
}
