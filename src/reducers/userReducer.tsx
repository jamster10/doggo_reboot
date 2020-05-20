interface UserState {
  currentUser: null | {};
}

export default function (
  state: UserState,
  { type, payload }: { type: any; payload: any }
) {
  switch (type) {
    default:
      return state;
  }
}
