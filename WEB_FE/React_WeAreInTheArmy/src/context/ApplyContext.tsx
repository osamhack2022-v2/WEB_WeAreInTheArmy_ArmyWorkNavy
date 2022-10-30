import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { RequestTypes } from 'src/type';

type DefaultInfomationState = {
  name: string;
  organization?: string;
  phone: string;
  location?: string;
};

type ApplyDataState = {
  title: string;
  requestTypes: RequestTypes;
  description: string;
};

type DefaultInfomationActions =
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_ORGANIZATION'; organizaion: string }
  | { type: 'SET_PHONE'; phone: string }
  | { type: 'SET_LOCATION'; location: string };

type ApplyDataActions =
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_REQUEST_TYPES'; requestTypes: RequestTypes }
  | { type: 'SET_DESCRIPTION'; description: string };

type DefaultInfomationActionsDispatch = Dispatch<DefaultInfomationActions>;
type ApplyDataActionsDispatch = Dispatch<ApplyDataActions>;

const DefaultInfomationStateContext =
  createContext<DefaultInfomationState | null>(null);
const ApplyDataStateContext = createContext<ApplyDataState | null>(null);

const DefaultInformationDispatchContext =
  createContext<DefaultInfomationActionsDispatch | null>(null);
const ApplyDataDispatchContext = createContext<ApplyDataActionsDispatch | null>(
  null,
);

function DefaultInformationReducer(
  state: DefaultInfomationState,
  action: DefaultInfomationActions,
): DefaultInfomationState {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_ORGANIZATION':
      return {
        ...state,
        organization: action.organizaion,
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.phone,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.location,
      };
    default:
      throw new Error('Unhandled action');
  }
}

function ApplyDataReducer(
  state: ApplyDataState,
  action: ApplyDataActions,
): ApplyDataState {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'SET_REQUEST_TYPES':
      return {
        ...state,
        requestTypes: action.requestTypes,
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function DefaultInformationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(DefaultInformationReducer, {
    name: '',
    organization: '',
    phone: '',
    location: '',
  });

  return (
    <DefaultInfomationStateContext.Provider value={state}>
      <DefaultInformationDispatchContext.Provider value={dispatch}>
        {children}
      </DefaultInformationDispatchContext.Provider>
    </DefaultInfomationStateContext.Provider>
  );
}

export function ApplyDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ApplyDataReducer, {
    title: '',
    requestTypes: RequestTypes.DEFAULT,
    description: '',
  });

  return (
    <ApplyDataStateContext.Provider value={state}>
      <ApplyDataDispatchContext.Provider value={dispatch}>
        {children}
      </ApplyDataDispatchContext.Provider>
    </ApplyDataStateContext.Provider>
  );
}

export function useDefaultInformationState() {
  const state = useContext(DefaultInfomationStateContext);
  if (!state) throw new Error('Cannot find DefaultInfomationProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useDefaultInfomationDispatch() {
  const dispatch = useContext(DefaultInformationDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

export function useApplyDataState() {
  const state = useContext(ApplyDataStateContext);
  if (!state) throw new Error('Cannot find ApplyDataProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useApplyDataDispatch() {
  const dispatch = useContext(ApplyDataDispatchContext);
  if (!dispatch) throw new Error('Cannot find ApplyDataProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

export default function ApplyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultInformationProvider>
      <ApplyDataProvider>{children}</ApplyDataProvider>
    </DefaultInformationProvider>
  );
}
