import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: Date;
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}
interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: () => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}
interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                _sort: 'createAt',
                _order: 'desc',
                q: query,
            },
        });
        setTransactions(response.data);
    }

    async function createTransaction(data: CreateTransactionInput) {
        const response = await api.post('/transactions', {
            description: data.description,
            price: data.price,
            category: data.category,
            type: data.type,
            createAt: new Date(),
        });
        setTransactions((state) => [response.data, ...state]);
    }
    useEffect(() => {
        fetchTransactions();
    }, []);
    return (
        <TransactionsContext.Provider
            value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}
