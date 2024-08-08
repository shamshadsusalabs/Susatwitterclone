import { Injectable } from '@angular/core';
import { Observable, from, of, switchMap, throwError } from 'rxjs';
import { catchError, concatMap, last, map, take } from 'rxjs/operators';

import { ProfileUser } from '../models/Userprofile';
import { AuthService } from './Auth';

import { Firestore, doc, docData, collection, query, collectionData, addDoc, where, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Chat, Message} from '../models/chat';
import { orderBy } from 'firebase/firestore';

import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore, private authService: AuthService,private storage: AngularFireStorage) { }



  get CurrentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.CurrentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'profile', user.uid);
        return docData(ref).pipe(
          map(data => data as ProfileUser)
        );
      })
    );
  }

  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'profile');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;

  }


  // createChat(otherUser:ProfileUser): Observable<string>{
  //   const ref =collection(this.firestore,'chats');
  //   return this.CurrentUserProfile$.pipe(
  //     take(1),
  //     concatMap(user => addDoc(ref,{
  //       userIds:[user?.uid,otherUser?.uid],
  //       users:[
  //         {
  //           displayName:user?. displayName?? '',
  //           photoUrl: user?.photoUrl ?? ''
  //         },

  //           {
  //             displayName:otherUser?. displayName?? '',
  //             photoUrl: otherUser?.photoUrl ?? ''
  //           }
  //       ]


  //     })),map(ref=>ref.id)
  //   )

  // }


  createChat(otherUser: ProfileUser): Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.CurrentUserProfile$.pipe(
      take(1),
      concatMap(user => addDoc(ref, {
        userIds: [user?.uid, otherUser?.uid],
        users: [
          { displayName: user?.displayName ?? '', photoUrl: user?.photoUrl ?? '' },
          { displayName: otherUser?.displayName ?? '', photoUrl: otherUser?.photoUrl ?? '' }
        ],
        isGroup: false  // Important to set this for individual chats
      })),
      map(ref => ref.id)
    );
  }


get myChats$(): Observable<Chat[]>{
  const ref = collection(this.firestore,'chats');
  return this.CurrentUserProfile$.pipe(
    concatMap((user)=>{
      const myQuerry = query(ref,where('userIds','array-contains', user?.uid));
      return collectionData(myQuerry,{idField:'id'}).pipe(
        map(chats=> this.addChatNameAndPic(user?.uid ?? '',chats as Chat[]))
      )
    })
  )

}

addChatNameAndPic(currentUserId:string,chats:Chat[]):Chat[]{
  chats.forEach(chat =>{
    const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 :0;
    const {displayName,photoUrl} = chat.users[otherIndex];
    chat.chatName = displayName;
    chat.chatPic = photoUrl;

  })
  return chats;
}


 addChatMessage(chatId: string, message: string, file?: File): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const today = Timestamp.fromDate(new Date());

    return this.authService.CurrentUser$.pipe(
      take(1), // Take only the first emission to ensure subscription completes
      switchMap(user => {
        if (!user) return throwError(() => new Error('User not logged in'));

        if (file) {
          const filePath = `uploads/${chatId}/${new Date().getTime()}_${file.name}`;
          const fileRef = this.storage.ref(filePath);

          return from(this.storage.upload(filePath, file)).pipe(
            switchMap(() => fileRef.getDownloadURL()),
            switchMap(fileUrl => addDoc(ref, {
              senderId: user.uid,
              sentDate: today,
              fileType: file.type,
              fileUrl: fileUrl,
              senderDisplayName: user.displayName,
              text: message // Optional: include a text description if provided
            })),
            concatMap(() => updateDoc(chatRef, {
              lastMessage: 'File sent',
              lastMessageDate: today
            }))
          );
        } else {
          return addDoc(ref, {
            text: message,
            senderId: user.uid,
            sentDate: today,
            senderDisplayName: user.displayName,
          }).then(() => {
            return updateDoc(chatRef, {
              lastMessage: message,
              lastMessageDate: today
            });
          });
        }
      }),
      catchError(error => throwError(() => new Error(`Failed to send message: ${error.message}`)))
    );
  }

getChatMessages$(chatId: string): Observable<Message[]> {
  const ref = collection(this.firestore, 'chats', chatId, 'messages');

  const queryAll = query(ref, orderBy('sentDate', 'asc'));
  return collectionData(queryAll, { idField: 'id' }) as Observable<Message[]>;
}



// isExistingChat(otherUserId:string):Observable<string | null>{
// return this.myChats$.pipe(
//   take(1),
//   map(chats => {
//     for(let i=0; i < chats.length; i++){
//       if(chats[i].userIds.includes(otherUserId)){
//         return chats[i].id

//       }

//     }
//     return null;
//   })
// )
// }

isExistingChat(otherUserId: string): Observable<string | null> {
  return this.myChats$.pipe(
    take(1),
    map(chats => {
      // Filter to only include chats where there are exactly two users (one-on-one chats)
      const individualChats = chats.filter(chat => chat.userIds.length === 2 && !chat.isGroup);
      const chat = individualChats.find(chat => chat.userIds.includes(otherUserId));
      return chat ? chat.id : null;
    })
  );
}



createGroupChat(groupName: string, members: ProfileUser[]): Observable<string> {
  const ref = collection(this.firestore, 'chats');
  return this.CurrentUserProfile$.pipe(
    take(1),
    concatMap(user => {
      const allMembers = [...members, user].filter(Boolean) as ProfileUser[];
      const userIds = allMembers.map(user => user.uid);
      const users = allMembers.map(user => ({ displayName: user.displayName, photoUrl: user.photoUrl }));

      return addDoc(ref, {
        userIds,
        users,
        groupName,
        isGroup: true,  // Set this property to true for group chats
        lastMessage: 'Group created',
        lastMessageDate: new Date(),
      });
    }),
    map(docRef => docRef.id)
  );
}

}
