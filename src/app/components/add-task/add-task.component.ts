import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from "../../Task";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() addTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text || !this.day) return alert('Please add task!');

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    // @todo emit
    this.addTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }

}
