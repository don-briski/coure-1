import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasks = [
        {
            "id": 2,
            "title": "Team meeting",
            "description": "Weekly sync",
            "dueDate": "2025-12-08T09:00:00.000Z",
            "priority": "Medium",
            "status": "In Progress"
          },
          {
            "id": 3,
            "title": "Mogli Jungle Book",
            "description": "A story of a boy that survive a tiger chase in the jungle.",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "Medium",
            "status": "Completed"
          },
          {
            "id": 5,
            "title": "Mogli Jungle Book",
            "description": "A story of a boy that survive a tiger chase in the jungle.",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "High",
            "status": "In Progress"
          },
          {
            "id": 56,
            "title": "Engineering Maths",
            "description": "Engineering maths contains the advance mathematics to start foundation engineering design. it contains fourier series, la places theory and many more",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "Medium",
            "status": "Pending"
          },
          {
            "id": 109,
            "title": "Bible",
            "description": "Religious book for Christians",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "Medium",
            "status": "In Progress"
          },
          {
            "id": 345,
            "title": "Lord of the Rings",
            "description": "Archers, the dwrafs, the elf all fight together to save the earth from a common enemy.",
            "dueDate": "2025-12-09T23:00:00.000Z",
            "priority": "Low",
            "status": "Pending"
          },
          {
            "id": 56,
            "title": "Engineering Maths",
            "description": "Engineering maths contains the advance mathematics to start foundation engineering design. it contains fourier series, la places theory and many more",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "Medium",
            "status": "In Progress"
          },
          {
            "id": 21,
            "title": "Engineering Maths",
            "description": "Engineering maths contains the advance mathematics to start foundation engineering design. it contains fourier series, la places theory and many more",
            "dueDate": "2025-12-05T23:00:00.000Z",
            "priority": "Low",
            "status": "In Progress"
          },
          {
            "id": 453,
            "title": "todo list",
            "description": "happy sundat trial again",
            "dueDate": "2025-12-09T23:00:00.000Z",
            "priority": "Low",
            "status": "Pending"
          },
          {
            "id": 855,
            "title": "new test for crated date",
            "description": "testing created date",
            "dueDate": "2025-12-09T23:00:00.000Z",
            "priority": "High",
            "status": "Pending",
            "createdAt": "2025-12-07T08:11:23.395Z"
          }
    ];

    return { tasks };
  }

  genId(tasks: any[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}
