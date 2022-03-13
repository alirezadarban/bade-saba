const globalValues = {
  response: (
    success: boolean = true,
    message: string = '',
    data: any = {},
    stack: any = {},
    status: number,
  ) => {
    return {
      success,
      message,
      data,
      stack,
      status,
    };
  },
  users: [],
  lastId: 0
};

export default globalValues;