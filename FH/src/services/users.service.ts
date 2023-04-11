import { AuthenticationService } from 'src/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collectionData,
  collectionGroup
} from '@angular/fire/firestore';
import { DonationRequest } from 'src/app/models/request.module';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user.module';

@Injectable()
class UsefulService {
}

@Injectable()
class NeedsService {
  constructor(public service: UsefulService) {}
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private AuthenticationService: AuthenticationService) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.AuthenticationService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
   addRequest(request: DonationRequest,userid:string): Observable<void> {
  
        const ref = doc(this.firestore, 'users',userid);
        const requestCollection = collection(ref,'requests');
        const requestdoc = doc(requestCollection,request.id);
    console.log('added successfully')
        return from(setDoc(requestdoc,request));

    ;
  }
  getRequests(): Observable<DonationRequest[]>{

      const coll = collectionGroup(this.firestore,'requests');
      console.log('testing');
      return collectionData(coll) as Observable<DonationRequest[]>;
  }
}
