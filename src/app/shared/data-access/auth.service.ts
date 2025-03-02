import { computed, inject, Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { connect } from 'ngxtension/connect';
import { authState } from 'rxfire/auth';
import { defer, from, map, merge } from 'rxjs';
import { AUTH } from '../../app.config';
import type { Credentials } from '../interfaces/credentials';

export type AuthUser = User | null | undefined;

interface AuthState {
  loggedIn: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);

  // actions
  private loggedIn$ = authState(this.auth);

  // state
  private state = signal<AuthState>({
    loggedIn: undefined,
  });

  // selectors
  loggedIn = computed(() => this.state().loggedIn);

  constructor() {
    const nextState$ = merge(
      this.loggedIn$.pipe(map((loggedIn) => ({ loggedIn }))),
    );

    connect(this.state).with(nextState$);
  }

  login(credentials: Credentials) {
    return from(
      defer(() =>
        signInWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password,
        ),
      ),
    );
  }

  logout() {
    signOut(this.auth);
  }

  register(credentials: Credentials) {
    return from(
      defer(() =>
        createUserWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password,
        ),
      ),
    );
  }
}
