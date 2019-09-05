import { observable } from 'mobx';

let _state: { currentUserId: number | null } = { currentUserId: null };
export const AppState = observable(_state);