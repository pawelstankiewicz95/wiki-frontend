import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  public messages: Message[] = [];

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
        this.getMessages();

        this.messageService.messages$.subscribe(messages => {
          this.messages = messages;
        });
      }
    
  public getMessages(): void {
    this.messageService.getMessages().subscribe((response: Message[]) => {
      this.messages = response;
    });
  }

}
