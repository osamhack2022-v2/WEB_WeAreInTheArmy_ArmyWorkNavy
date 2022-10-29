import { createContext, Dispatch, useContext, useReducer } from 'react';
import { AccountTypes, HasChild, User, Board } from 'src/type';

type State = {
  user: User;
};

type Action = { type: 'SET_USER'; user: User };

type UserDispatch = Dispatch<Action>;

const UserStateContext = createContext<State | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      {
        return {
          ...state,
          user: action.user,
        };
      }
      defualt: throw new Error('Unhandled Action');
  }
}

export function UserProvider({ children }: HasChild) {
  const [state, dispatch] = useReducer(reducer, {
    user: {
      idx: 0,
      identifier: 'string',
      password: 'string',
      type: AccountTypes.DEFAULT,
      name: 'string',
      phone: 'string',
      organization: 'string',
      email: 'string',
      address: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
      boards: [],
    },
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error('Cannot find UserProvider');
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('Cannot find UserProvider');
  return dispatch;
}
