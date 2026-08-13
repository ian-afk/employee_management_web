export type State = {
  page: number;
};

export type Action =
  | {
      type: "initialize";
    }
  | {
      type: "prev";
    }
  | {
      type: "next";
    }
  | {
      type: "setPage";
      payload: number;
    };
