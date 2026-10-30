declare global {
  namespace Express {
    namespace Pagination {
      interface Params {
        page: string;
        limit: string;
      }

      interface Options {
        min?: {
          /**
           * @default 1
           */
          page?: number;
          /**
           * @default 1
           */
          limit?: number;
        };
        max?: {
          /**
           * @default 99
           */
          page?: number;
          /**
           * @default 99
           */
          limit?: number;
        };
      }

      interface PageInfo {
        page: number;
        limit: number;
        startIndex: number;
        endIndex: number;
      }
    }

    interface Request {
      paginate(): Pagination.PageInfo;
    }
  }
}

export {};
