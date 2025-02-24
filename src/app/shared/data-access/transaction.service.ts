import { computed, inject, Injectable, signal } from '@angular/core';
import { collection, orderBy, query } from 'firebase/firestore';
import { connect } from 'ngxtension/connect';
import { collectionData } from 'rxfire/firestore';
import { map, merge, type Observable } from 'rxjs';
import { FIRESTORE } from '../../app.config';
import type { Transaction } from '../interfaces/transaction';

interface TransactionState {
  transactions: Transaction[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private firestore = inject(FIRESTORE);

  // sources
  transactions$ = this.getTransactions();

  // state
  private state = signal<TransactionState>({
    transactions: [],
    loaded: false,
    error: null,
  });

  // selectors
  transactions = computed(() => this.state().transactions);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    const nextState$ = merge(
      this.transactions$.pipe(
        map((transactions) => ({ transactions, loaded: true })),
      ),
    );

    connect(this.state).with(nextState$);

    // alternative approach
    // this.transactions$.pipe(takeUntilDestroyed()).subscribe((transaction) => {
    //   this.state.update((state) => ({ ...state, transaction, loaded: true }));
    // });
  }

  private getTransactions() {
    const transactionsCollection = query(
      collection(this.firestore, 'transactions'),
      orderBy('date', 'desc'),
    );

    return collectionData(transactionsCollection, {
      idField: 'id',
    }) as Observable<Transaction[]>;
  }
}
