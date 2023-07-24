import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pipe, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

    public maxId: number;
    private baseUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient,
    ) {

    }

    public diarySubject = new Subject<DiaryEntry[]>();
    private diaryEntries: DiaryEntry[] = [];

    public onDelete(id: number): void {
        const url = this.baseUrl + '/remove-entry/' + id;
        this.http.delete<{ message: string }>(url).subscribe((jsonData) => {
            this.getDiaryEntries();
        });
    }

    public onAddDiaryEntry(diaryEntry: DiaryEntry): void {
        const getUrl = this.baseUrl + '/max-id';
        const postUrl = this.baseUrl + '/add-entry';
        this.http.get<{ maxId: number }>(getUrl).subscribe((jsonData) => {
            diaryEntry.id = jsonData.maxId + 1;
            this.http.post<{ message: string }>(postUrl, diaryEntry).subscribe((jsonData) => {
                this.getDiaryEntries();
            });
        });
    }

    public onUpdateDiaryEntry(id: number, diaryEntry: DiaryEntry): void {
        const url = this.baseUrl + '/update-entry/' + id;
        this.http.put<{ diaryEntries: DiaryEntry[] }>(url, diaryEntry).subscribe((jsonData) => {
            this.getDiaryEntries();
        });
    }

    public getDiaryEntry(id: number): DiaryEntry {
        const index = this.diaryEntries.findIndex(el => el.id == id);
        return this.diaryEntries[index];
    }

    public getDiaryEntries(): void {
        const url = this.baseUrl + '/diary-entries';
        this.http
            .get<{ diaryEntries: DiaryEntry[] }>(url)
            .pipe(map((responseData: any) => {
                return responseData.diaryEntries.map((entry: { date: string; entry: string; _id: string }) => {
                    return {
                        date: entry.date,
                        entry: entry.entry,
                        id: entry._id,
                    };
                });
            }))
            .subscribe((upodateResponse) => {
                this.diaryEntries = upodateResponse;
                this.diarySubject.next(this.diaryEntries);
            });
    }
}
