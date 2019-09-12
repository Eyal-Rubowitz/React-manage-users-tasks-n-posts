import { observable } from 'mobx';

export enum FormsEnum {
    None,
    NewUser,
    NewTask,
    NewPost
}

let _state: {
    currentUserId: number | null,
    activeForm: FormsEnum, 
    searchText: string,
}
_state = {
    currentUserId: null,
    activeForm: FormsEnum.None,
    searchText: '',
};

export const AppState = observable(_state);

