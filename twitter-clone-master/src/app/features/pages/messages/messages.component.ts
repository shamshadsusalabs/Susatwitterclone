import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, startWith, map, switchMap, tap, of } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { ProfileUser } from '../../models/Userprofile';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'twitter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  isLoading: boolean = false;

 @ViewChild('endOfChat')
  endOfChat!: ElementRef;
  searchControl = new FormControl('');
  chatListControl = new FormControl();
  messageControl = new FormControl('');

  user$ = this.userSevice.CurrentUserProfile$;
  users$ = combineLatest([
    this.userSevice.allUsers$,
    this.user$,
    this.searchControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(u => u.displayName?.toLowerCase().includes(searchString.toLowerCase()) && u.uid !== user?.uid)
    )
  );

  myChats$ = this.userSevice.myChats$;

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$
  ]).pipe(
    map(([value, chats]) => chats.find(c => c.id === value[0]))
  );

  messages$ = this.chatListControl.valueChanges.pipe(
    map(value => value[0]),
    switchMap(chatId => this.userSevice.getChatMessages$(chatId)),tap(()=>{
      this. scrollToBottom();
    })
  );
  isGroup: boolean | undefined;

  constructor(private userSevice: ChatService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedChat$.subscribe(chat => {
            this.isGroup = chat?.isGroup;

      console.log('Selected Chat:',this.isGroup );
    });

    this.messages$.subscribe(messages => {
      console.log('Messages:', messages);
    });}

  createChat(otherUser: ProfileUser) {
    this.userSevice.isExistingChat(otherUser?.uid).pipe(
      switchMap(chatId =>{
            if(chatId){
            return of (chatId);

            }
            else{
              return this.userSevice.createChat(otherUser);
            }
      })
    ).subscribe(chatId=>{
      this.chatListControl.setValue([chatId]);
    })
  }

  sendMessage() {
    if (!this.messageControl.disabled) {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];
    if (message && selectedChatId) {
      this.userSevice.addChatMessage(selectedChatId, message).subscribe({
        next: () => this.scrollToBottom(),
        error: (err) => console.error('Failed to send message:', err)
      });
      this.messageControl.setValue('');
    } else {
      console.error('No chat selected');
    }
  }}

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 0);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
        const selectedChatId = this.chatListControl.value[0];
        if (selectedChatId) {
            this.isLoading = true; // Start loading
            this.snackBar.open('Please wait, uploading...', 'Close', { duration: 20000 }); // Long duration as a fallback

            this.userSevice.addChatMessage(selectedChatId, '', file).subscribe({
                next: () => {
                    this.isLoading = false; // Stop loading
                    this.snackBar.dismiss(); // Dismiss snackbar when upload completes
                    this.snackBar.open('File uploaded successfully', 'Close', { duration: 3000 });
                },
                error: (err) => {
                    this.isLoading = false; // Stop loading on error
                    this.snackBar.dismiss(); // Ensure snackbar is dismissed on error
                    console.error('Failed to upload file:', err);
                    this.snackBar.open('Failed to upload file', 'Close', { duration: 3000 });
                }
            });
        } else {
            console.error('No chat selected');
            this.snackBar.open('No chat selected', 'Close', { duration: 3000 });
        }
    }
}

  showCreateGroup = false;
  groupName = '';
  selectedUsers: ProfileUser[] = [];

  // Compare function for ngModel binding in mat-selection-list
  compareFn(user1: ProfileUser, user2: ProfileUser) {
    return user1 && user2 ? user1.uid === user2.uid : user1 === user2;
  }
  createGroup() {
    if (!this.groupName.trim() || this.selectedUsers.length < 2) {
      console.error('Provide a group name and select at least two members.');
      return;
    }

    this.userSevice.createGroupChat(this.groupName, this.selectedUsers).subscribe(
      chatId => {
        console.log('Group chat created with ID:', chatId);
        this.showCreateGroup = false;
        this.groupName = '';
        this.selectedUsers = [];
      },
      error => console.error('Failed to create group chat:', error)
    );
  }




}
