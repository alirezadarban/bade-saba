const globalValues = {
    db: {
      address: 'mongodb://localhost:27017/test',
      collections: {
        users: { name: 'USERS' },
      },
    },
  response: (
    path: string,
    success: boolean = true,
    result: any = {},
    status: number,
  ) => {
    return {
      path,
      success,
      result,
      status,
    };
  }
};

export default globalValues;