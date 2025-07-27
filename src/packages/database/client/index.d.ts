
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model FocusSession
 * 
 */
export type FocusSession = $Result.DefaultSelection<Prisma.$FocusSessionPayload>
/**
 * Model AppUsage
 * 
 */
export type AppUsage = $Result.DefaultSelection<Prisma.$AppUsagePayload>
/**
 * Model Routine
 * 
 */
export type Routine = $Result.DefaultSelection<Prisma.$RoutinePayload>
/**
 * Model App
 * 
 */
export type App = $Result.DefaultSelection<Prisma.$AppPayload>
/**
 * Model RoutineApp
 * 
 */
export type RoutineApp = $Result.DefaultSelection<Prisma.$RoutineAppPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Commitment
 * 
 */
export type Commitment = $Result.DefaultSelection<Prisma.$CommitmentPayload>
/**
 * Model MarketplaceConfig
 * 
 */
export type MarketplaceConfig = $Result.DefaultSelection<Prisma.$MarketplaceConfigPayload>
/**
 * Model DataSeller
 * 
 */
export type DataSeller = $Result.DefaultSelection<Prisma.$DataSellerPayload>
/**
 * Model DataListing
 * 
 */
export type DataListing = $Result.DefaultSelection<Prisma.$DataListingPayload>
/**
 * Model DataPass
 * 
 */
export type DataPass = $Result.DefaultSelection<Prisma.$DataPassPayload>
/**
 * Model MerkleDistributor
 * 
 */
export type MerkleDistributor = $Result.DefaultSelection<Prisma.$MerkleDistributorPayload>
/**
 * Model SellerProof
 * 
 */
export type SellerProof = $Result.DefaultSelection<Prisma.$SellerProofPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FocusSessionStatus: {
  in_progress: 'in_progress',
  canceled: 'canceled',
  finished: 'finished'
};

export type FocusSessionStatus = (typeof FocusSessionStatus)[keyof typeof FocusSessionStatus]


export const Platform: {
  mobile: 'mobile',
  web: 'web'
};

export type Platform = (typeof Platform)[keyof typeof Platform]


export const TimeMode: {
  blocking: 'blocking',
  limit: 'limit'
};

export type TimeMode = (typeof TimeMode)[keyof typeof TimeMode]


export const RoutineStatus: {
  active: 'active',
  paused: 'paused',
  completed: 'completed',
  canceled: 'canceled'
};

export type RoutineStatus = (typeof RoutineStatus)[keyof typeof RoutineStatus]


export const CommitmentStatus: {
  active: 'active',
  claimed: 'claimed',
  forfeited: 'forfeited'
};

export type CommitmentStatus = (typeof CommitmentStatus)[keyof typeof CommitmentStatus]


export const TaskState: {
  checked: 'checked',
  unchecked: 'unchecked',
  archived: 'archived'
};

export type TaskState = (typeof TaskState)[keyof typeof TaskState]

}

export type FocusSessionStatus = $Enums.FocusSessionStatus

export const FocusSessionStatus: typeof $Enums.FocusSessionStatus

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

export type TimeMode = $Enums.TimeMode

export const TimeMode: typeof $Enums.TimeMode

export type RoutineStatus = $Enums.RoutineStatus

export const RoutineStatus: typeof $Enums.RoutineStatus

export type CommitmentStatus = $Enums.CommitmentStatus

export const CommitmentStatus: typeof $Enums.CommitmentStatus

export type TaskState = $Enums.TaskState

export const TaskState: typeof $Enums.TaskState

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.focusSession`: Exposes CRUD operations for the **FocusSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FocusSessions
    * const focusSessions = await prisma.focusSession.findMany()
    * ```
    */
  get focusSession(): Prisma.FocusSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appUsage`: Exposes CRUD operations for the **AppUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppUsages
    * const appUsages = await prisma.appUsage.findMany()
    * ```
    */
  get appUsage(): Prisma.AppUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.routine`: Exposes CRUD operations for the **Routine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routines
    * const routines = await prisma.routine.findMany()
    * ```
    */
  get routine(): Prisma.RoutineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.app`: Exposes CRUD operations for the **App** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Apps
    * const apps = await prisma.app.findMany()
    * ```
    */
  get app(): Prisma.AppDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.routineApp`: Exposes CRUD operations for the **RoutineApp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoutineApps
    * const routineApps = await prisma.routineApp.findMany()
    * ```
    */
  get routineApp(): Prisma.RoutineAppDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commitment`: Exposes CRUD operations for the **Commitment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commitments
    * const commitments = await prisma.commitment.findMany()
    * ```
    */
  get commitment(): Prisma.CommitmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketplaceConfig`: Exposes CRUD operations for the **MarketplaceConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketplaceConfigs
    * const marketplaceConfigs = await prisma.marketplaceConfig.findMany()
    * ```
    */
  get marketplaceConfig(): Prisma.MarketplaceConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataSeller`: Exposes CRUD operations for the **DataSeller** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataSellers
    * const dataSellers = await prisma.dataSeller.findMany()
    * ```
    */
  get dataSeller(): Prisma.DataSellerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataListing`: Exposes CRUD operations for the **DataListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataListings
    * const dataListings = await prisma.dataListing.findMany()
    * ```
    */
  get dataListing(): Prisma.DataListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataPass`: Exposes CRUD operations for the **DataPass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataPasses
    * const dataPasses = await prisma.dataPass.findMany()
    * ```
    */
  get dataPass(): Prisma.DataPassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.merkleDistributor`: Exposes CRUD operations for the **MerkleDistributor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerkleDistributors
    * const merkleDistributors = await prisma.merkleDistributor.findMany()
    * ```
    */
  get merkleDistributor(): Prisma.MerkleDistributorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sellerProof`: Exposes CRUD operations for the **SellerProof** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SellerProofs
    * const sellerProofs = await prisma.sellerProof.findMany()
    * ```
    */
  get sellerProof(): Prisma.SellerProofDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    FocusSession: 'FocusSession',
    AppUsage: 'AppUsage',
    Routine: 'Routine',
    App: 'App',
    RoutineApp: 'RoutineApp',
    Task: 'Task',
    Commitment: 'Commitment',
    MarketplaceConfig: 'MarketplaceConfig',
    DataSeller: 'DataSeller',
    DataListing: 'DataListing',
    DataPass: 'DataPass',
    MerkleDistributor: 'MerkleDistributor',
    SellerProof: 'SellerProof'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "focusSession" | "appUsage" | "routine" | "app" | "routineApp" | "task" | "commitment" | "marketplaceConfig" | "dataSeller" | "dataListing" | "dataPass" | "merkleDistributor" | "sellerProof"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      FocusSession: {
        payload: Prisma.$FocusSessionPayload<ExtArgs>
        fields: Prisma.FocusSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FocusSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FocusSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          findFirst: {
            args: Prisma.FocusSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FocusSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          findMany: {
            args: Prisma.FocusSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>[]
          }
          create: {
            args: Prisma.FocusSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          createMany: {
            args: Prisma.FocusSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FocusSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>[]
          }
          delete: {
            args: Prisma.FocusSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          update: {
            args: Prisma.FocusSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          deleteMany: {
            args: Prisma.FocusSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FocusSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FocusSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>[]
          }
          upsert: {
            args: Prisma.FocusSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FocusSessionPayload>
          }
          aggregate: {
            args: Prisma.FocusSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFocusSession>
          }
          groupBy: {
            args: Prisma.FocusSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FocusSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FocusSessionCountArgs<ExtArgs>
            result: $Utils.Optional<FocusSessionCountAggregateOutputType> | number
          }
        }
      }
      AppUsage: {
        payload: Prisma.$AppUsagePayload<ExtArgs>
        fields: Prisma.AppUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          findFirst: {
            args: Prisma.AppUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          findMany: {
            args: Prisma.AppUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>[]
          }
          create: {
            args: Prisma.AppUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          createMany: {
            args: Prisma.AppUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>[]
          }
          delete: {
            args: Prisma.AppUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          update: {
            args: Prisma.AppUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          deleteMany: {
            args: Prisma.AppUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>[]
          }
          upsert: {
            args: Prisma.AppUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUsagePayload>
          }
          aggregate: {
            args: Prisma.AppUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppUsage>
          }
          groupBy: {
            args: Prisma.AppUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppUsageCountArgs<ExtArgs>
            result: $Utils.Optional<AppUsageCountAggregateOutputType> | number
          }
        }
      }
      Routine: {
        payload: Prisma.$RoutinePayload<ExtArgs>
        fields: Prisma.RoutineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoutineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoutineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          findFirst: {
            args: Prisma.RoutineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoutineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          findMany: {
            args: Prisma.RoutineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>[]
          }
          create: {
            args: Prisma.RoutineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          createMany: {
            args: Prisma.RoutineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoutineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>[]
          }
          delete: {
            args: Prisma.RoutineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          update: {
            args: Prisma.RoutineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          deleteMany: {
            args: Prisma.RoutineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoutineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoutineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>[]
          }
          upsert: {
            args: Prisma.RoutineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutinePayload>
          }
          aggregate: {
            args: Prisma.RoutineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutine>
          }
          groupBy: {
            args: Prisma.RoutineGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoutineGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoutineCountArgs<ExtArgs>
            result: $Utils.Optional<RoutineCountAggregateOutputType> | number
          }
        }
      }
      App: {
        payload: Prisma.$AppPayload<ExtArgs>
        fields: Prisma.AppFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findFirst: {
            args: Prisma.AppFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findMany: {
            args: Prisma.AppFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          create: {
            args: Prisma.AppCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          createMany: {
            args: Prisma.AppCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          delete: {
            args: Prisma.AppDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          update: {
            args: Prisma.AppUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          deleteMany: {
            args: Prisma.AppDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          upsert: {
            args: Prisma.AppUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          aggregate: {
            args: Prisma.AppAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApp>
          }
          groupBy: {
            args: Prisma.AppGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppCountArgs<ExtArgs>
            result: $Utils.Optional<AppCountAggregateOutputType> | number
          }
        }
      }
      RoutineApp: {
        payload: Prisma.$RoutineAppPayload<ExtArgs>
        fields: Prisma.RoutineAppFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoutineAppFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoutineAppFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          findFirst: {
            args: Prisma.RoutineAppFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoutineAppFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          findMany: {
            args: Prisma.RoutineAppFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>[]
          }
          create: {
            args: Prisma.RoutineAppCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          createMany: {
            args: Prisma.RoutineAppCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoutineAppCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>[]
          }
          delete: {
            args: Prisma.RoutineAppDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          update: {
            args: Prisma.RoutineAppUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          deleteMany: {
            args: Prisma.RoutineAppDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoutineAppUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoutineAppUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>[]
          }
          upsert: {
            args: Prisma.RoutineAppUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutineAppPayload>
          }
          aggregate: {
            args: Prisma.RoutineAppAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutineApp>
          }
          groupBy: {
            args: Prisma.RoutineAppGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoutineAppGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoutineAppCountArgs<ExtArgs>
            result: $Utils.Optional<RoutineAppCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Commitment: {
        payload: Prisma.$CommitmentPayload<ExtArgs>
        fields: Prisma.CommitmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommitmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommitmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          findFirst: {
            args: Prisma.CommitmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommitmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          findMany: {
            args: Prisma.CommitmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>[]
          }
          create: {
            args: Prisma.CommitmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          createMany: {
            args: Prisma.CommitmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommitmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>[]
          }
          delete: {
            args: Prisma.CommitmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          update: {
            args: Prisma.CommitmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          deleteMany: {
            args: Prisma.CommitmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommitmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommitmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>[]
          }
          upsert: {
            args: Prisma.CommitmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitmentPayload>
          }
          aggregate: {
            args: Prisma.CommitmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommitment>
          }
          groupBy: {
            args: Prisma.CommitmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommitmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommitmentCountArgs<ExtArgs>
            result: $Utils.Optional<CommitmentCountAggregateOutputType> | number
          }
        }
      }
      MarketplaceConfig: {
        payload: Prisma.$MarketplaceConfigPayload<ExtArgs>
        fields: Prisma.MarketplaceConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketplaceConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketplaceConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          findFirst: {
            args: Prisma.MarketplaceConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketplaceConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          findMany: {
            args: Prisma.MarketplaceConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>[]
          }
          create: {
            args: Prisma.MarketplaceConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          createMany: {
            args: Prisma.MarketplaceConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketplaceConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>[]
          }
          delete: {
            args: Prisma.MarketplaceConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          update: {
            args: Prisma.MarketplaceConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          deleteMany: {
            args: Prisma.MarketplaceConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketplaceConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketplaceConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>[]
          }
          upsert: {
            args: Prisma.MarketplaceConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketplaceConfigPayload>
          }
          aggregate: {
            args: Prisma.MarketplaceConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketplaceConfig>
          }
          groupBy: {
            args: Prisma.MarketplaceConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketplaceConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketplaceConfigCountArgs<ExtArgs>
            result: $Utils.Optional<MarketplaceConfigCountAggregateOutputType> | number
          }
        }
      }
      DataSeller: {
        payload: Prisma.$DataSellerPayload<ExtArgs>
        fields: Prisma.DataSellerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataSellerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataSellerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          findFirst: {
            args: Prisma.DataSellerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataSellerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          findMany: {
            args: Prisma.DataSellerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>[]
          }
          create: {
            args: Prisma.DataSellerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          createMany: {
            args: Prisma.DataSellerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataSellerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>[]
          }
          delete: {
            args: Prisma.DataSellerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          update: {
            args: Prisma.DataSellerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          deleteMany: {
            args: Prisma.DataSellerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataSellerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataSellerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>[]
          }
          upsert: {
            args: Prisma.DataSellerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataSellerPayload>
          }
          aggregate: {
            args: Prisma.DataSellerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataSeller>
          }
          groupBy: {
            args: Prisma.DataSellerGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataSellerGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataSellerCountArgs<ExtArgs>
            result: $Utils.Optional<DataSellerCountAggregateOutputType> | number
          }
        }
      }
      DataListing: {
        payload: Prisma.$DataListingPayload<ExtArgs>
        fields: Prisma.DataListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          findFirst: {
            args: Prisma.DataListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          findMany: {
            args: Prisma.DataListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>[]
          }
          create: {
            args: Prisma.DataListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          createMany: {
            args: Prisma.DataListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>[]
          }
          delete: {
            args: Prisma.DataListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          update: {
            args: Prisma.DataListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          deleteMany: {
            args: Prisma.DataListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>[]
          }
          upsert: {
            args: Prisma.DataListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataListingPayload>
          }
          aggregate: {
            args: Prisma.DataListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataListing>
          }
          groupBy: {
            args: Prisma.DataListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataListingCountArgs<ExtArgs>
            result: $Utils.Optional<DataListingCountAggregateOutputType> | number
          }
        }
      }
      DataPass: {
        payload: Prisma.$DataPassPayload<ExtArgs>
        fields: Prisma.DataPassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataPassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataPassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          findFirst: {
            args: Prisma.DataPassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataPassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          findMany: {
            args: Prisma.DataPassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>[]
          }
          create: {
            args: Prisma.DataPassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          createMany: {
            args: Prisma.DataPassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataPassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>[]
          }
          delete: {
            args: Prisma.DataPassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          update: {
            args: Prisma.DataPassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          deleteMany: {
            args: Prisma.DataPassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataPassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataPassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>[]
          }
          upsert: {
            args: Prisma.DataPassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataPassPayload>
          }
          aggregate: {
            args: Prisma.DataPassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataPass>
          }
          groupBy: {
            args: Prisma.DataPassGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataPassGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataPassCountArgs<ExtArgs>
            result: $Utils.Optional<DataPassCountAggregateOutputType> | number
          }
        }
      }
      MerkleDistributor: {
        payload: Prisma.$MerkleDistributorPayload<ExtArgs>
        fields: Prisma.MerkleDistributorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerkleDistributorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerkleDistributorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          findFirst: {
            args: Prisma.MerkleDistributorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerkleDistributorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          findMany: {
            args: Prisma.MerkleDistributorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>[]
          }
          create: {
            args: Prisma.MerkleDistributorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          createMany: {
            args: Prisma.MerkleDistributorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerkleDistributorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>[]
          }
          delete: {
            args: Prisma.MerkleDistributorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          update: {
            args: Prisma.MerkleDistributorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          deleteMany: {
            args: Prisma.MerkleDistributorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerkleDistributorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerkleDistributorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>[]
          }
          upsert: {
            args: Prisma.MerkleDistributorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleDistributorPayload>
          }
          aggregate: {
            args: Prisma.MerkleDistributorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerkleDistributor>
          }
          groupBy: {
            args: Prisma.MerkleDistributorGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerkleDistributorGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerkleDistributorCountArgs<ExtArgs>
            result: $Utils.Optional<MerkleDistributorCountAggregateOutputType> | number
          }
        }
      }
      SellerProof: {
        payload: Prisma.$SellerProofPayload<ExtArgs>
        fields: Prisma.SellerProofFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SellerProofFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SellerProofFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          findFirst: {
            args: Prisma.SellerProofFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SellerProofFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          findMany: {
            args: Prisma.SellerProofFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>[]
          }
          create: {
            args: Prisma.SellerProofCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          createMany: {
            args: Prisma.SellerProofCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SellerProofCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>[]
          }
          delete: {
            args: Prisma.SellerProofDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          update: {
            args: Prisma.SellerProofUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          deleteMany: {
            args: Prisma.SellerProofDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SellerProofUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SellerProofUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>[]
          }
          upsert: {
            args: Prisma.SellerProofUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerProofPayload>
          }
          aggregate: {
            args: Prisma.SellerProofAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSellerProof>
          }
          groupBy: {
            args: Prisma.SellerProofGroupByArgs<ExtArgs>
            result: $Utils.Optional<SellerProofGroupByOutputType>[]
          }
          count: {
            args: Prisma.SellerProofCountArgs<ExtArgs>
            result: $Utils.Optional<SellerProofCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    focusSession?: FocusSessionOmit
    appUsage?: AppUsageOmit
    routine?: RoutineOmit
    app?: AppOmit
    routineApp?: RoutineAppOmit
    task?: TaskOmit
    commitment?: CommitmentOmit
    marketplaceConfig?: MarketplaceConfigOmit
    dataSeller?: DataSellerOmit
    dataListing?: DataListingOmit
    dataPass?: DataPassOmit
    merkleDistributor?: MerkleDistributorOmit
    sellerProof?: SellerProofOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    focusSessions: number
    appUsage: number
    routines: number
    task: number
    commitments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    focusSessions?: boolean | UserCountOutputTypeCountFocusSessionsArgs
    appUsage?: boolean | UserCountOutputTypeCountAppUsageArgs
    routines?: boolean | UserCountOutputTypeCountRoutinesArgs
    task?: boolean | UserCountOutputTypeCountTaskArgs
    commitments?: boolean | UserCountOutputTypeCountCommitmentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFocusSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FocusSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppUsageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutineWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitmentWhereInput
  }


  /**
   * Count Type FocusSessionCountOutputType
   */

  export type FocusSessionCountOutputType = {
    commitments: number
  }

  export type FocusSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commitments?: boolean | FocusSessionCountOutputTypeCountCommitmentsArgs
  }

  // Custom InputTypes
  /**
   * FocusSessionCountOutputType without action
   */
  export type FocusSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSessionCountOutputType
     */
    select?: FocusSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FocusSessionCountOutputType without action
   */
  export type FocusSessionCountOutputTypeCountCommitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitmentWhereInput
  }


  /**
   * Count Type RoutineCountOutputType
   */

  export type RoutineCountOutputType = {
    blockedApps: number
    commitments: number
  }

  export type RoutineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blockedApps?: boolean | RoutineCountOutputTypeCountBlockedAppsArgs
    commitments?: boolean | RoutineCountOutputTypeCountCommitmentsArgs
  }

  // Custom InputTypes
  /**
   * RoutineCountOutputType without action
   */
  export type RoutineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineCountOutputType
     */
    select?: RoutineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoutineCountOutputType without action
   */
  export type RoutineCountOutputTypeCountBlockedAppsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutineAppWhereInput
  }

  /**
   * RoutineCountOutputType without action
   */
  export type RoutineCountOutputTypeCountCommitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitmentWhereInput
  }


  /**
   * Count Type AppCountOutputType
   */

  export type AppCountOutputType = {
    routines: number
  }

  export type AppCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routines?: boolean | AppCountOutputTypeCountRoutinesArgs
  }

  // Custom InputTypes
  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppCountOutputType
     */
    select?: AppCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutineAppWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    theme: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    theme: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    walletAddress: number
    theme: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    walletAddress?: true
    theme?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    theme?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    walletAddress?: true
    theme?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    walletAddress: string
    theme: string
    timezone: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    theme?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    focusSessions?: boolean | User$focusSessionsArgs<ExtArgs>
    appUsage?: boolean | User$appUsageArgs<ExtArgs>
    routines?: boolean | User$routinesArgs<ExtArgs>
    task?: boolean | User$taskArgs<ExtArgs>
    commitments?: boolean | User$commitmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    theme?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    theme?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    theme?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "theme" | "timezone" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    focusSessions?: boolean | User$focusSessionsArgs<ExtArgs>
    appUsage?: boolean | User$appUsageArgs<ExtArgs>
    routines?: boolean | User$routinesArgs<ExtArgs>
    task?: boolean | User$taskArgs<ExtArgs>
    commitments?: boolean | User$commitmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      focusSessions: Prisma.$FocusSessionPayload<ExtArgs>[]
      appUsage: Prisma.$AppUsagePayload<ExtArgs>[]
      routines: Prisma.$RoutinePayload<ExtArgs>[]
      task: Prisma.$TaskPayload<ExtArgs>[]
      commitments: Prisma.$CommitmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      theme: string
      timezone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    focusSessions<T extends User$focusSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$focusSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appUsage<T extends User$appUsageArgs<ExtArgs> = {}>(args?: Subset<T, User$appUsageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routines<T extends User$routinesArgs<ExtArgs> = {}>(args?: Subset<T, User$routinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    task<T extends User$taskArgs<ExtArgs> = {}>(args?: Subset<T, User$taskArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commitments<T extends User$commitmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commitmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly theme: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.focusSessions
   */
  export type User$focusSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    where?: FocusSessionWhereInput
    orderBy?: FocusSessionOrderByWithRelationInput | FocusSessionOrderByWithRelationInput[]
    cursor?: FocusSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FocusSessionScalarFieldEnum | FocusSessionScalarFieldEnum[]
  }

  /**
   * User.appUsage
   */
  export type User$appUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    where?: AppUsageWhereInput
    orderBy?: AppUsageOrderByWithRelationInput | AppUsageOrderByWithRelationInput[]
    cursor?: AppUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppUsageScalarFieldEnum | AppUsageScalarFieldEnum[]
  }

  /**
   * User.routines
   */
  export type User$routinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    where?: RoutineWhereInput
    orderBy?: RoutineOrderByWithRelationInput | RoutineOrderByWithRelationInput[]
    cursor?: RoutineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutineScalarFieldEnum | RoutineScalarFieldEnum[]
  }

  /**
   * User.task
   */
  export type User$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.commitments
   */
  export type User$commitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    where?: CommitmentWhereInput
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    cursor?: CommitmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model FocusSession
   */

  export type AggregateFocusSession = {
    _count: FocusSessionCountAggregateOutputType | null
    _avg: FocusSessionAvgAggregateOutputType | null
    _sum: FocusSessionSumAggregateOutputType | null
    _min: FocusSessionMinAggregateOutputType | null
    _max: FocusSessionMaxAggregateOutputType | null
  }

  export type FocusSessionAvgAggregateOutputType = {
    duration: number | null
  }

  export type FocusSessionSumAggregateOutputType = {
    duration: number | null
  }

  export type FocusSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    startTime: Date | null
    duration: number | null
    status: $Enums.FocusSessionStatus | null
  }

  export type FocusSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    startTime: Date | null
    duration: number | null
    status: $Enums.FocusSessionStatus | null
  }

  export type FocusSessionCountAggregateOutputType = {
    id: number
    userId: number
    startTime: number
    duration: number
    status: number
    _all: number
  }


  export type FocusSessionAvgAggregateInputType = {
    duration?: true
  }

  export type FocusSessionSumAggregateInputType = {
    duration?: true
  }

  export type FocusSessionMinAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    duration?: true
    status?: true
  }

  export type FocusSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    duration?: true
    status?: true
  }

  export type FocusSessionCountAggregateInputType = {
    id?: true
    userId?: true
    startTime?: true
    duration?: true
    status?: true
    _all?: true
  }

  export type FocusSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FocusSession to aggregate.
     */
    where?: FocusSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusSessions to fetch.
     */
    orderBy?: FocusSessionOrderByWithRelationInput | FocusSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FocusSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FocusSessions
    **/
    _count?: true | FocusSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FocusSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FocusSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FocusSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FocusSessionMaxAggregateInputType
  }

  export type GetFocusSessionAggregateType<T extends FocusSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateFocusSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFocusSession[P]>
      : GetScalarType<T[P], AggregateFocusSession[P]>
  }




  export type FocusSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FocusSessionWhereInput
    orderBy?: FocusSessionOrderByWithAggregationInput | FocusSessionOrderByWithAggregationInput[]
    by: FocusSessionScalarFieldEnum[] | FocusSessionScalarFieldEnum
    having?: FocusSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FocusSessionCountAggregateInputType | true
    _avg?: FocusSessionAvgAggregateInputType
    _sum?: FocusSessionSumAggregateInputType
    _min?: FocusSessionMinAggregateInputType
    _max?: FocusSessionMaxAggregateInputType
  }

  export type FocusSessionGroupByOutputType = {
    id: string
    userId: string
    startTime: Date
    duration: number
    status: $Enums.FocusSessionStatus
    _count: FocusSessionCountAggregateOutputType | null
    _avg: FocusSessionAvgAggregateOutputType | null
    _sum: FocusSessionSumAggregateOutputType | null
    _min: FocusSessionMinAggregateOutputType | null
    _max: FocusSessionMaxAggregateOutputType | null
  }

  type GetFocusSessionGroupByPayload<T extends FocusSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FocusSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FocusSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FocusSessionGroupByOutputType[P]>
            : GetScalarType<T[P], FocusSessionGroupByOutputType[P]>
        }
      >
    >


  export type FocusSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    duration?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    commitments?: boolean | FocusSession$commitmentsArgs<ExtArgs>
    _count?: boolean | FocusSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["focusSession"]>

  export type FocusSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    duration?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["focusSession"]>

  export type FocusSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startTime?: boolean
    duration?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["focusSession"]>

  export type FocusSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    startTime?: boolean
    duration?: boolean
    status?: boolean
  }

  export type FocusSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "startTime" | "duration" | "status", ExtArgs["result"]["focusSession"]>
  export type FocusSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    commitments?: boolean | FocusSession$commitmentsArgs<ExtArgs>
    _count?: boolean | FocusSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FocusSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FocusSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FocusSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FocusSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      commitments: Prisma.$CommitmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      startTime: Date
      duration: number
      status: $Enums.FocusSessionStatus
    }, ExtArgs["result"]["focusSession"]>
    composites: {}
  }

  type FocusSessionGetPayload<S extends boolean | null | undefined | FocusSessionDefaultArgs> = $Result.GetResult<Prisma.$FocusSessionPayload, S>

  type FocusSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FocusSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FocusSessionCountAggregateInputType | true
    }

  export interface FocusSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FocusSession'], meta: { name: 'FocusSession' } }
    /**
     * Find zero or one FocusSession that matches the filter.
     * @param {FocusSessionFindUniqueArgs} args - Arguments to find a FocusSession
     * @example
     * // Get one FocusSession
     * const focusSession = await prisma.focusSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FocusSessionFindUniqueArgs>(args: SelectSubset<T, FocusSessionFindUniqueArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FocusSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FocusSessionFindUniqueOrThrowArgs} args - Arguments to find a FocusSession
     * @example
     * // Get one FocusSession
     * const focusSession = await prisma.focusSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FocusSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, FocusSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FocusSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionFindFirstArgs} args - Arguments to find a FocusSession
     * @example
     * // Get one FocusSession
     * const focusSession = await prisma.focusSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FocusSessionFindFirstArgs>(args?: SelectSubset<T, FocusSessionFindFirstArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FocusSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionFindFirstOrThrowArgs} args - Arguments to find a FocusSession
     * @example
     * // Get one FocusSession
     * const focusSession = await prisma.focusSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FocusSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, FocusSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FocusSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FocusSessions
     * const focusSessions = await prisma.focusSession.findMany()
     * 
     * // Get first 10 FocusSessions
     * const focusSessions = await prisma.focusSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const focusSessionWithIdOnly = await prisma.focusSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FocusSessionFindManyArgs>(args?: SelectSubset<T, FocusSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FocusSession.
     * @param {FocusSessionCreateArgs} args - Arguments to create a FocusSession.
     * @example
     * // Create one FocusSession
     * const FocusSession = await prisma.focusSession.create({
     *   data: {
     *     // ... data to create a FocusSession
     *   }
     * })
     * 
     */
    create<T extends FocusSessionCreateArgs>(args: SelectSubset<T, FocusSessionCreateArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FocusSessions.
     * @param {FocusSessionCreateManyArgs} args - Arguments to create many FocusSessions.
     * @example
     * // Create many FocusSessions
     * const focusSession = await prisma.focusSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FocusSessionCreateManyArgs>(args?: SelectSubset<T, FocusSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FocusSessions and returns the data saved in the database.
     * @param {FocusSessionCreateManyAndReturnArgs} args - Arguments to create many FocusSessions.
     * @example
     * // Create many FocusSessions
     * const focusSession = await prisma.focusSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FocusSessions and only return the `id`
     * const focusSessionWithIdOnly = await prisma.focusSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FocusSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, FocusSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FocusSession.
     * @param {FocusSessionDeleteArgs} args - Arguments to delete one FocusSession.
     * @example
     * // Delete one FocusSession
     * const FocusSession = await prisma.focusSession.delete({
     *   where: {
     *     // ... filter to delete one FocusSession
     *   }
     * })
     * 
     */
    delete<T extends FocusSessionDeleteArgs>(args: SelectSubset<T, FocusSessionDeleteArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FocusSession.
     * @param {FocusSessionUpdateArgs} args - Arguments to update one FocusSession.
     * @example
     * // Update one FocusSession
     * const focusSession = await prisma.focusSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FocusSessionUpdateArgs>(args: SelectSubset<T, FocusSessionUpdateArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FocusSessions.
     * @param {FocusSessionDeleteManyArgs} args - Arguments to filter FocusSessions to delete.
     * @example
     * // Delete a few FocusSessions
     * const { count } = await prisma.focusSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FocusSessionDeleteManyArgs>(args?: SelectSubset<T, FocusSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FocusSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FocusSessions
     * const focusSession = await prisma.focusSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FocusSessionUpdateManyArgs>(args: SelectSubset<T, FocusSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FocusSessions and returns the data updated in the database.
     * @param {FocusSessionUpdateManyAndReturnArgs} args - Arguments to update many FocusSessions.
     * @example
     * // Update many FocusSessions
     * const focusSession = await prisma.focusSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FocusSessions and only return the `id`
     * const focusSessionWithIdOnly = await prisma.focusSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FocusSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, FocusSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FocusSession.
     * @param {FocusSessionUpsertArgs} args - Arguments to update or create a FocusSession.
     * @example
     * // Update or create a FocusSession
     * const focusSession = await prisma.focusSession.upsert({
     *   create: {
     *     // ... data to create a FocusSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FocusSession we want to update
     *   }
     * })
     */
    upsert<T extends FocusSessionUpsertArgs>(args: SelectSubset<T, FocusSessionUpsertArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FocusSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionCountArgs} args - Arguments to filter FocusSessions to count.
     * @example
     * // Count the number of FocusSessions
     * const count = await prisma.focusSession.count({
     *   where: {
     *     // ... the filter for the FocusSessions we want to count
     *   }
     * })
    **/
    count<T extends FocusSessionCountArgs>(
      args?: Subset<T, FocusSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FocusSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FocusSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FocusSessionAggregateArgs>(args: Subset<T, FocusSessionAggregateArgs>): Prisma.PrismaPromise<GetFocusSessionAggregateType<T>>

    /**
     * Group by FocusSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FocusSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FocusSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FocusSessionGroupByArgs['orderBy'] }
        : { orderBy?: FocusSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FocusSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFocusSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FocusSession model
   */
  readonly fields: FocusSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FocusSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FocusSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    commitments<T extends FocusSession$commitmentsArgs<ExtArgs> = {}>(args?: Subset<T, FocusSession$commitmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FocusSession model
   */
  interface FocusSessionFieldRefs {
    readonly id: FieldRef<"FocusSession", 'String'>
    readonly userId: FieldRef<"FocusSession", 'String'>
    readonly startTime: FieldRef<"FocusSession", 'DateTime'>
    readonly duration: FieldRef<"FocusSession", 'Int'>
    readonly status: FieldRef<"FocusSession", 'FocusSessionStatus'>
  }
    

  // Custom InputTypes
  /**
   * FocusSession findUnique
   */
  export type FocusSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter, which FocusSession to fetch.
     */
    where: FocusSessionWhereUniqueInput
  }

  /**
   * FocusSession findUniqueOrThrow
   */
  export type FocusSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter, which FocusSession to fetch.
     */
    where: FocusSessionWhereUniqueInput
  }

  /**
   * FocusSession findFirst
   */
  export type FocusSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter, which FocusSession to fetch.
     */
    where?: FocusSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusSessions to fetch.
     */
    orderBy?: FocusSessionOrderByWithRelationInput | FocusSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FocusSessions.
     */
    cursor?: FocusSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FocusSessions.
     */
    distinct?: FocusSessionScalarFieldEnum | FocusSessionScalarFieldEnum[]
  }

  /**
   * FocusSession findFirstOrThrow
   */
  export type FocusSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter, which FocusSession to fetch.
     */
    where?: FocusSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusSessions to fetch.
     */
    orderBy?: FocusSessionOrderByWithRelationInput | FocusSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FocusSessions.
     */
    cursor?: FocusSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FocusSessions.
     */
    distinct?: FocusSessionScalarFieldEnum | FocusSessionScalarFieldEnum[]
  }

  /**
   * FocusSession findMany
   */
  export type FocusSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter, which FocusSessions to fetch.
     */
    where?: FocusSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FocusSessions to fetch.
     */
    orderBy?: FocusSessionOrderByWithRelationInput | FocusSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FocusSessions.
     */
    cursor?: FocusSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FocusSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FocusSessions.
     */
    skip?: number
    distinct?: FocusSessionScalarFieldEnum | FocusSessionScalarFieldEnum[]
  }

  /**
   * FocusSession create
   */
  export type FocusSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a FocusSession.
     */
    data: XOR<FocusSessionCreateInput, FocusSessionUncheckedCreateInput>
  }

  /**
   * FocusSession createMany
   */
  export type FocusSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FocusSessions.
     */
    data: FocusSessionCreateManyInput | FocusSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FocusSession createManyAndReturn
   */
  export type FocusSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * The data used to create many FocusSessions.
     */
    data: FocusSessionCreateManyInput | FocusSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FocusSession update
   */
  export type FocusSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a FocusSession.
     */
    data: XOR<FocusSessionUpdateInput, FocusSessionUncheckedUpdateInput>
    /**
     * Choose, which FocusSession to update.
     */
    where: FocusSessionWhereUniqueInput
  }

  /**
   * FocusSession updateMany
   */
  export type FocusSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FocusSessions.
     */
    data: XOR<FocusSessionUpdateManyMutationInput, FocusSessionUncheckedUpdateManyInput>
    /**
     * Filter which FocusSessions to update
     */
    where?: FocusSessionWhereInput
    /**
     * Limit how many FocusSessions to update.
     */
    limit?: number
  }

  /**
   * FocusSession updateManyAndReturn
   */
  export type FocusSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * The data used to update FocusSessions.
     */
    data: XOR<FocusSessionUpdateManyMutationInput, FocusSessionUncheckedUpdateManyInput>
    /**
     * Filter which FocusSessions to update
     */
    where?: FocusSessionWhereInput
    /**
     * Limit how many FocusSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FocusSession upsert
   */
  export type FocusSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the FocusSession to update in case it exists.
     */
    where: FocusSessionWhereUniqueInput
    /**
     * In case the FocusSession found by the `where` argument doesn't exist, create a new FocusSession with this data.
     */
    create: XOR<FocusSessionCreateInput, FocusSessionUncheckedCreateInput>
    /**
     * In case the FocusSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FocusSessionUpdateInput, FocusSessionUncheckedUpdateInput>
  }

  /**
   * FocusSession delete
   */
  export type FocusSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    /**
     * Filter which FocusSession to delete.
     */
    where: FocusSessionWhereUniqueInput
  }

  /**
   * FocusSession deleteMany
   */
  export type FocusSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FocusSessions to delete
     */
    where?: FocusSessionWhereInput
    /**
     * Limit how many FocusSessions to delete.
     */
    limit?: number
  }

  /**
   * FocusSession.commitments
   */
  export type FocusSession$commitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    where?: CommitmentWhereInput
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    cursor?: CommitmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * FocusSession without action
   */
  export type FocusSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
  }


  /**
   * Model AppUsage
   */

  export type AggregateAppUsage = {
    _count: AppUsageCountAggregateOutputType | null
    _avg: AppUsageAvgAggregateOutputType | null
    _sum: AppUsageSumAggregateOutputType | null
    _min: AppUsageMinAggregateOutputType | null
    _max: AppUsageMaxAggregateOutputType | null
  }

  export type AppUsageAvgAggregateOutputType = {
    timeSpent: number | null
  }

  export type AppUsageSumAggregateOutputType = {
    timeSpent: number | null
  }

  export type AppUsageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    appName: string | null
    timeSpent: number | null
    platform: $Enums.Platform | null
    hourStart: Date | null
  }

  export type AppUsageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    appName: string | null
    timeSpent: number | null
    platform: $Enums.Platform | null
    hourStart: Date | null
  }

  export type AppUsageCountAggregateOutputType = {
    id: number
    userId: number
    appName: number
    timeSpent: number
    platform: number
    hourStart: number
    _all: number
  }


  export type AppUsageAvgAggregateInputType = {
    timeSpent?: true
  }

  export type AppUsageSumAggregateInputType = {
    timeSpent?: true
  }

  export type AppUsageMinAggregateInputType = {
    id?: true
    userId?: true
    appName?: true
    timeSpent?: true
    platform?: true
    hourStart?: true
  }

  export type AppUsageMaxAggregateInputType = {
    id?: true
    userId?: true
    appName?: true
    timeSpent?: true
    platform?: true
    hourStart?: true
  }

  export type AppUsageCountAggregateInputType = {
    id?: true
    userId?: true
    appName?: true
    timeSpent?: true
    platform?: true
    hourStart?: true
    _all?: true
  }

  export type AppUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUsage to aggregate.
     */
    where?: AppUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsages to fetch.
     */
    orderBy?: AppUsageOrderByWithRelationInput | AppUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppUsages
    **/
    _count?: true | AppUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppUsageMaxAggregateInputType
  }

  export type GetAppUsageAggregateType<T extends AppUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateAppUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppUsage[P]>
      : GetScalarType<T[P], AggregateAppUsage[P]>
  }




  export type AppUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppUsageWhereInput
    orderBy?: AppUsageOrderByWithAggregationInput | AppUsageOrderByWithAggregationInput[]
    by: AppUsageScalarFieldEnum[] | AppUsageScalarFieldEnum
    having?: AppUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppUsageCountAggregateInputType | true
    _avg?: AppUsageAvgAggregateInputType
    _sum?: AppUsageSumAggregateInputType
    _min?: AppUsageMinAggregateInputType
    _max?: AppUsageMaxAggregateInputType
  }

  export type AppUsageGroupByOutputType = {
    id: string
    userId: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date
    _count: AppUsageCountAggregateOutputType | null
    _avg: AppUsageAvgAggregateOutputType | null
    _sum: AppUsageSumAggregateOutputType | null
    _min: AppUsageMinAggregateOutputType | null
    _max: AppUsageMaxAggregateOutputType | null
  }

  type GetAppUsageGroupByPayload<T extends AppUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppUsageGroupByOutputType[P]>
            : GetScalarType<T[P], AppUsageGroupByOutputType[P]>
        }
      >
    >


  export type AppUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    appName?: boolean
    timeSpent?: boolean
    platform?: boolean
    hourStart?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appUsage"]>

  export type AppUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    appName?: boolean
    timeSpent?: boolean
    platform?: boolean
    hourStart?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appUsage"]>

  export type AppUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    appName?: boolean
    timeSpent?: boolean
    platform?: boolean
    hourStart?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appUsage"]>

  export type AppUsageSelectScalar = {
    id?: boolean
    userId?: boolean
    appName?: boolean
    timeSpent?: boolean
    platform?: boolean
    hourStart?: boolean
  }

  export type AppUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "appName" | "timeSpent" | "platform" | "hourStart", ExtArgs["result"]["appUsage"]>
  export type AppUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AppUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppUsage"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      appName: string
      timeSpent: number
      platform: $Enums.Platform
      hourStart: Date
    }, ExtArgs["result"]["appUsage"]>
    composites: {}
  }

  type AppUsageGetPayload<S extends boolean | null | undefined | AppUsageDefaultArgs> = $Result.GetResult<Prisma.$AppUsagePayload, S>

  type AppUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppUsageCountAggregateInputType | true
    }

  export interface AppUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppUsage'], meta: { name: 'AppUsage' } }
    /**
     * Find zero or one AppUsage that matches the filter.
     * @param {AppUsageFindUniqueArgs} args - Arguments to find a AppUsage
     * @example
     * // Get one AppUsage
     * const appUsage = await prisma.appUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppUsageFindUniqueArgs>(args: SelectSubset<T, AppUsageFindUniqueArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppUsageFindUniqueOrThrowArgs} args - Arguments to find a AppUsage
     * @example
     * // Get one AppUsage
     * const appUsage = await prisma.appUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, AppUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageFindFirstArgs} args - Arguments to find a AppUsage
     * @example
     * // Get one AppUsage
     * const appUsage = await prisma.appUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppUsageFindFirstArgs>(args?: SelectSubset<T, AppUsageFindFirstArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageFindFirstOrThrowArgs} args - Arguments to find a AppUsage
     * @example
     * // Get one AppUsage
     * const appUsage = await prisma.appUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, AppUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppUsages
     * const appUsages = await prisma.appUsage.findMany()
     * 
     * // Get first 10 AppUsages
     * const appUsages = await prisma.appUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appUsageWithIdOnly = await prisma.appUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppUsageFindManyArgs>(args?: SelectSubset<T, AppUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppUsage.
     * @param {AppUsageCreateArgs} args - Arguments to create a AppUsage.
     * @example
     * // Create one AppUsage
     * const AppUsage = await prisma.appUsage.create({
     *   data: {
     *     // ... data to create a AppUsage
     *   }
     * })
     * 
     */
    create<T extends AppUsageCreateArgs>(args: SelectSubset<T, AppUsageCreateArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppUsages.
     * @param {AppUsageCreateManyArgs} args - Arguments to create many AppUsages.
     * @example
     * // Create many AppUsages
     * const appUsage = await prisma.appUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppUsageCreateManyArgs>(args?: SelectSubset<T, AppUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppUsages and returns the data saved in the database.
     * @param {AppUsageCreateManyAndReturnArgs} args - Arguments to create many AppUsages.
     * @example
     * // Create many AppUsages
     * const appUsage = await prisma.appUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppUsages and only return the `id`
     * const appUsageWithIdOnly = await prisma.appUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, AppUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppUsage.
     * @param {AppUsageDeleteArgs} args - Arguments to delete one AppUsage.
     * @example
     * // Delete one AppUsage
     * const AppUsage = await prisma.appUsage.delete({
     *   where: {
     *     // ... filter to delete one AppUsage
     *   }
     * })
     * 
     */
    delete<T extends AppUsageDeleteArgs>(args: SelectSubset<T, AppUsageDeleteArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppUsage.
     * @param {AppUsageUpdateArgs} args - Arguments to update one AppUsage.
     * @example
     * // Update one AppUsage
     * const appUsage = await prisma.appUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUsageUpdateArgs>(args: SelectSubset<T, AppUsageUpdateArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppUsages.
     * @param {AppUsageDeleteManyArgs} args - Arguments to filter AppUsages to delete.
     * @example
     * // Delete a few AppUsages
     * const { count } = await prisma.appUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppUsageDeleteManyArgs>(args?: SelectSubset<T, AppUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppUsages
     * const appUsage = await prisma.appUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUsageUpdateManyArgs>(args: SelectSubset<T, AppUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppUsages and returns the data updated in the database.
     * @param {AppUsageUpdateManyAndReturnArgs} args - Arguments to update many AppUsages.
     * @example
     * // Update many AppUsages
     * const appUsage = await prisma.appUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppUsages and only return the `id`
     * const appUsageWithIdOnly = await prisma.appUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, AppUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppUsage.
     * @param {AppUsageUpsertArgs} args - Arguments to update or create a AppUsage.
     * @example
     * // Update or create a AppUsage
     * const appUsage = await prisma.appUsage.upsert({
     *   create: {
     *     // ... data to create a AppUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppUsage we want to update
     *   }
     * })
     */
    upsert<T extends AppUsageUpsertArgs>(args: SelectSubset<T, AppUsageUpsertArgs<ExtArgs>>): Prisma__AppUsageClient<$Result.GetResult<Prisma.$AppUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageCountArgs} args - Arguments to filter AppUsages to count.
     * @example
     * // Count the number of AppUsages
     * const count = await prisma.appUsage.count({
     *   where: {
     *     // ... the filter for the AppUsages we want to count
     *   }
     * })
    **/
    count<T extends AppUsageCountArgs>(
      args?: Subset<T, AppUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppUsageAggregateArgs>(args: Subset<T, AppUsageAggregateArgs>): Prisma.PrismaPromise<GetAppUsageAggregateType<T>>

    /**
     * Group by AppUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppUsageGroupByArgs['orderBy'] }
        : { orderBy?: AppUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppUsage model
   */
  readonly fields: AppUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppUsage model
   */
  interface AppUsageFieldRefs {
    readonly id: FieldRef<"AppUsage", 'String'>
    readonly userId: FieldRef<"AppUsage", 'String'>
    readonly appName: FieldRef<"AppUsage", 'String'>
    readonly timeSpent: FieldRef<"AppUsage", 'Int'>
    readonly platform: FieldRef<"AppUsage", 'Platform'>
    readonly hourStart: FieldRef<"AppUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppUsage findUnique
   */
  export type AppUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter, which AppUsage to fetch.
     */
    where: AppUsageWhereUniqueInput
  }

  /**
   * AppUsage findUniqueOrThrow
   */
  export type AppUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter, which AppUsage to fetch.
     */
    where: AppUsageWhereUniqueInput
  }

  /**
   * AppUsage findFirst
   */
  export type AppUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter, which AppUsage to fetch.
     */
    where?: AppUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsages to fetch.
     */
    orderBy?: AppUsageOrderByWithRelationInput | AppUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsages.
     */
    cursor?: AppUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsages.
     */
    distinct?: AppUsageScalarFieldEnum | AppUsageScalarFieldEnum[]
  }

  /**
   * AppUsage findFirstOrThrow
   */
  export type AppUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter, which AppUsage to fetch.
     */
    where?: AppUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsages to fetch.
     */
    orderBy?: AppUsageOrderByWithRelationInput | AppUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsages.
     */
    cursor?: AppUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsages.
     */
    distinct?: AppUsageScalarFieldEnum | AppUsageScalarFieldEnum[]
  }

  /**
   * AppUsage findMany
   */
  export type AppUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter, which AppUsages to fetch.
     */
    where?: AppUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsages to fetch.
     */
    orderBy?: AppUsageOrderByWithRelationInput | AppUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppUsages.
     */
    cursor?: AppUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsages.
     */
    skip?: number
    distinct?: AppUsageScalarFieldEnum | AppUsageScalarFieldEnum[]
  }

  /**
   * AppUsage create
   */
  export type AppUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a AppUsage.
     */
    data: XOR<AppUsageCreateInput, AppUsageUncheckedCreateInput>
  }

  /**
   * AppUsage createMany
   */
  export type AppUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppUsages.
     */
    data: AppUsageCreateManyInput | AppUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppUsage createManyAndReturn
   */
  export type AppUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * The data used to create many AppUsages.
     */
    data: AppUsageCreateManyInput | AppUsageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppUsage update
   */
  export type AppUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a AppUsage.
     */
    data: XOR<AppUsageUpdateInput, AppUsageUncheckedUpdateInput>
    /**
     * Choose, which AppUsage to update.
     */
    where: AppUsageWhereUniqueInput
  }

  /**
   * AppUsage updateMany
   */
  export type AppUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppUsages.
     */
    data: XOR<AppUsageUpdateManyMutationInput, AppUsageUncheckedUpdateManyInput>
    /**
     * Filter which AppUsages to update
     */
    where?: AppUsageWhereInput
    /**
     * Limit how many AppUsages to update.
     */
    limit?: number
  }

  /**
   * AppUsage updateManyAndReturn
   */
  export type AppUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * The data used to update AppUsages.
     */
    data: XOR<AppUsageUpdateManyMutationInput, AppUsageUncheckedUpdateManyInput>
    /**
     * Filter which AppUsages to update
     */
    where?: AppUsageWhereInput
    /**
     * Limit how many AppUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AppUsage upsert
   */
  export type AppUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the AppUsage to update in case it exists.
     */
    where: AppUsageWhereUniqueInput
    /**
     * In case the AppUsage found by the `where` argument doesn't exist, create a new AppUsage with this data.
     */
    create: XOR<AppUsageCreateInput, AppUsageUncheckedCreateInput>
    /**
     * In case the AppUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUsageUpdateInput, AppUsageUncheckedUpdateInput>
  }

  /**
   * AppUsage delete
   */
  export type AppUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
    /**
     * Filter which AppUsage to delete.
     */
    where: AppUsageWhereUniqueInput
  }

  /**
   * AppUsage deleteMany
   */
  export type AppUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUsages to delete
     */
    where?: AppUsageWhereInput
    /**
     * Limit how many AppUsages to delete.
     */
    limit?: number
  }

  /**
   * AppUsage without action
   */
  export type AppUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUsage
     */
    select?: AppUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUsage
     */
    omit?: AppUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUsageInclude<ExtArgs> | null
  }


  /**
   * Model Routine
   */

  export type AggregateRoutine = {
    _count: RoutineCountAggregateOutputType | null
    _avg: RoutineAvgAggregateOutputType | null
    _sum: RoutineSumAggregateOutputType | null
    _min: RoutineMinAggregateOutputType | null
    _max: RoutineMaxAggregateOutputType | null
  }

  export type RoutineAvgAggregateOutputType = {
    dailyLimit: number | null
    stakeAmount: number | null
  }

  export type RoutineSumAggregateOutputType = {
    dailyLimit: number | null
    stakeAmount: number | null
  }

  export type RoutineMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    emoji: string | null
    timeMode: $Enums.TimeMode | null
    startTime: string | null
    endTime: string | null
    dailyLimit: number | null
    endDate: Date | null
    stakeAmount: number | null
    status: $Enums.RoutineStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoutineMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    emoji: string | null
    timeMode: $Enums.TimeMode | null
    startTime: string | null
    endTime: string | null
    dailyLimit: number | null
    endDate: Date | null
    stakeAmount: number | null
    status: $Enums.RoutineStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoutineCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    emoji: number
    timeMode: number
    selectedDays: number
    startTime: number
    endTime: number
    dailyLimit: number
    endDate: number
    stakeAmount: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoutineAvgAggregateInputType = {
    dailyLimit?: true
    stakeAmount?: true
  }

  export type RoutineSumAggregateInputType = {
    dailyLimit?: true
    stakeAmount?: true
  }

  export type RoutineMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    emoji?: true
    timeMode?: true
    startTime?: true
    endTime?: true
    dailyLimit?: true
    endDate?: true
    stakeAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoutineMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    emoji?: true
    timeMode?: true
    startTime?: true
    endTime?: true
    dailyLimit?: true
    endDate?: true
    stakeAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoutineCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    emoji?: true
    timeMode?: true
    selectedDays?: true
    startTime?: true
    endTime?: true
    dailyLimit?: true
    endDate?: true
    stakeAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoutineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routine to aggregate.
     */
    where?: RoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routines to fetch.
     */
    orderBy?: RoutineOrderByWithRelationInput | RoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routines
    **/
    _count?: true | RoutineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoutineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoutineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoutineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoutineMaxAggregateInputType
  }

  export type GetRoutineAggregateType<T extends RoutineAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutine[P]>
      : GetScalarType<T[P], AggregateRoutine[P]>
  }




  export type RoutineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutineWhereInput
    orderBy?: RoutineOrderByWithAggregationInput | RoutineOrderByWithAggregationInput[]
    by: RoutineScalarFieldEnum[] | RoutineScalarFieldEnum
    having?: RoutineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoutineCountAggregateInputType | true
    _avg?: RoutineAvgAggregateInputType
    _sum?: RoutineSumAggregateInputType
    _min?: RoutineMinAggregateInputType
    _max?: RoutineMaxAggregateInputType
  }

  export type RoutineGroupByOutputType = {
    id: string
    userId: string
    name: string
    emoji: string
    timeMode: $Enums.TimeMode
    selectedDays: string[]
    startTime: string | null
    endTime: string | null
    dailyLimit: number | null
    endDate: Date | null
    stakeAmount: number
    status: $Enums.RoutineStatus
    createdAt: Date
    updatedAt: Date
    _count: RoutineCountAggregateOutputType | null
    _avg: RoutineAvgAggregateOutputType | null
    _sum: RoutineSumAggregateOutputType | null
    _min: RoutineMinAggregateOutputType | null
    _max: RoutineMaxAggregateOutputType | null
  }

  type GetRoutineGroupByPayload<T extends RoutineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoutineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoutineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoutineGroupByOutputType[P]>
            : GetScalarType<T[P], RoutineGroupByOutputType[P]>
        }
      >
    >


  export type RoutineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    emoji?: boolean
    timeMode?: boolean
    selectedDays?: boolean
    startTime?: boolean
    endTime?: boolean
    dailyLimit?: boolean
    endDate?: boolean
    stakeAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    blockedApps?: boolean | Routine$blockedAppsArgs<ExtArgs>
    commitments?: boolean | Routine$commitmentsArgs<ExtArgs>
    _count?: boolean | RoutineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routine"]>

  export type RoutineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    emoji?: boolean
    timeMode?: boolean
    selectedDays?: boolean
    startTime?: boolean
    endTime?: boolean
    dailyLimit?: boolean
    endDate?: boolean
    stakeAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routine"]>

  export type RoutineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    emoji?: boolean
    timeMode?: boolean
    selectedDays?: boolean
    startTime?: boolean
    endTime?: boolean
    dailyLimit?: boolean
    endDate?: boolean
    stakeAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routine"]>

  export type RoutineSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    emoji?: boolean
    timeMode?: boolean
    selectedDays?: boolean
    startTime?: boolean
    endTime?: boolean
    dailyLimit?: boolean
    endDate?: boolean
    stakeAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoutineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "emoji" | "timeMode" | "selectedDays" | "startTime" | "endTime" | "dailyLimit" | "endDate" | "stakeAmount" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["routine"]>
  export type RoutineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    blockedApps?: boolean | Routine$blockedAppsArgs<ExtArgs>
    commitments?: boolean | Routine$commitmentsArgs<ExtArgs>
    _count?: boolean | RoutineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoutineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoutineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoutinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Routine"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      blockedApps: Prisma.$RoutineAppPayload<ExtArgs>[]
      commitments: Prisma.$CommitmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      emoji: string
      timeMode: $Enums.TimeMode
      selectedDays: string[]
      startTime: string | null
      endTime: string | null
      dailyLimit: number | null
      endDate: Date | null
      stakeAmount: number
      status: $Enums.RoutineStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["routine"]>
    composites: {}
  }

  type RoutineGetPayload<S extends boolean | null | undefined | RoutineDefaultArgs> = $Result.GetResult<Prisma.$RoutinePayload, S>

  type RoutineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoutineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoutineCountAggregateInputType | true
    }

  export interface RoutineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Routine'], meta: { name: 'Routine' } }
    /**
     * Find zero or one Routine that matches the filter.
     * @param {RoutineFindUniqueArgs} args - Arguments to find a Routine
     * @example
     * // Get one Routine
     * const routine = await prisma.routine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoutineFindUniqueArgs>(args: SelectSubset<T, RoutineFindUniqueArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Routine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoutineFindUniqueOrThrowArgs} args - Arguments to find a Routine
     * @example
     * // Get one Routine
     * const routine = await prisma.routine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoutineFindUniqueOrThrowArgs>(args: SelectSubset<T, RoutineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Routine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineFindFirstArgs} args - Arguments to find a Routine
     * @example
     * // Get one Routine
     * const routine = await prisma.routine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoutineFindFirstArgs>(args?: SelectSubset<T, RoutineFindFirstArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Routine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineFindFirstOrThrowArgs} args - Arguments to find a Routine
     * @example
     * // Get one Routine
     * const routine = await prisma.routine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoutineFindFirstOrThrowArgs>(args?: SelectSubset<T, RoutineFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routines
     * const routines = await prisma.routine.findMany()
     * 
     * // Get first 10 Routines
     * const routines = await prisma.routine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routineWithIdOnly = await prisma.routine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoutineFindManyArgs>(args?: SelectSubset<T, RoutineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Routine.
     * @param {RoutineCreateArgs} args - Arguments to create a Routine.
     * @example
     * // Create one Routine
     * const Routine = await prisma.routine.create({
     *   data: {
     *     // ... data to create a Routine
     *   }
     * })
     * 
     */
    create<T extends RoutineCreateArgs>(args: SelectSubset<T, RoutineCreateArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routines.
     * @param {RoutineCreateManyArgs} args - Arguments to create many Routines.
     * @example
     * // Create many Routines
     * const routine = await prisma.routine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoutineCreateManyArgs>(args?: SelectSubset<T, RoutineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routines and returns the data saved in the database.
     * @param {RoutineCreateManyAndReturnArgs} args - Arguments to create many Routines.
     * @example
     * // Create many Routines
     * const routine = await prisma.routine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routines and only return the `id`
     * const routineWithIdOnly = await prisma.routine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoutineCreateManyAndReturnArgs>(args?: SelectSubset<T, RoutineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Routine.
     * @param {RoutineDeleteArgs} args - Arguments to delete one Routine.
     * @example
     * // Delete one Routine
     * const Routine = await prisma.routine.delete({
     *   where: {
     *     // ... filter to delete one Routine
     *   }
     * })
     * 
     */
    delete<T extends RoutineDeleteArgs>(args: SelectSubset<T, RoutineDeleteArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Routine.
     * @param {RoutineUpdateArgs} args - Arguments to update one Routine.
     * @example
     * // Update one Routine
     * const routine = await prisma.routine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoutineUpdateArgs>(args: SelectSubset<T, RoutineUpdateArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routines.
     * @param {RoutineDeleteManyArgs} args - Arguments to filter Routines to delete.
     * @example
     * // Delete a few Routines
     * const { count } = await prisma.routine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoutineDeleteManyArgs>(args?: SelectSubset<T, RoutineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routines
     * const routine = await prisma.routine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoutineUpdateManyArgs>(args: SelectSubset<T, RoutineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routines and returns the data updated in the database.
     * @param {RoutineUpdateManyAndReturnArgs} args - Arguments to update many Routines.
     * @example
     * // Update many Routines
     * const routine = await prisma.routine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routines and only return the `id`
     * const routineWithIdOnly = await prisma.routine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoutineUpdateManyAndReturnArgs>(args: SelectSubset<T, RoutineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Routine.
     * @param {RoutineUpsertArgs} args - Arguments to update or create a Routine.
     * @example
     * // Update or create a Routine
     * const routine = await prisma.routine.upsert({
     *   create: {
     *     // ... data to create a Routine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Routine we want to update
     *   }
     * })
     */
    upsert<T extends RoutineUpsertArgs>(args: SelectSubset<T, RoutineUpsertArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineCountArgs} args - Arguments to filter Routines to count.
     * @example
     * // Count the number of Routines
     * const count = await prisma.routine.count({
     *   where: {
     *     // ... the filter for the Routines we want to count
     *   }
     * })
    **/
    count<T extends RoutineCountArgs>(
      args?: Subset<T, RoutineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoutineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Routine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoutineAggregateArgs>(args: Subset<T, RoutineAggregateArgs>): Prisma.PrismaPromise<GetRoutineAggregateType<T>>

    /**
     * Group by Routine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoutineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoutineGroupByArgs['orderBy'] }
        : { orderBy?: RoutineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoutineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Routine model
   */
  readonly fields: RoutineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Routine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoutineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    blockedApps<T extends Routine$blockedAppsArgs<ExtArgs> = {}>(args?: Subset<T, Routine$blockedAppsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commitments<T extends Routine$commitmentsArgs<ExtArgs> = {}>(args?: Subset<T, Routine$commitmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Routine model
   */
  interface RoutineFieldRefs {
    readonly id: FieldRef<"Routine", 'String'>
    readonly userId: FieldRef<"Routine", 'String'>
    readonly name: FieldRef<"Routine", 'String'>
    readonly emoji: FieldRef<"Routine", 'String'>
    readonly timeMode: FieldRef<"Routine", 'TimeMode'>
    readonly selectedDays: FieldRef<"Routine", 'String[]'>
    readonly startTime: FieldRef<"Routine", 'String'>
    readonly endTime: FieldRef<"Routine", 'String'>
    readonly dailyLimit: FieldRef<"Routine", 'Int'>
    readonly endDate: FieldRef<"Routine", 'DateTime'>
    readonly stakeAmount: FieldRef<"Routine", 'Float'>
    readonly status: FieldRef<"Routine", 'RoutineStatus'>
    readonly createdAt: FieldRef<"Routine", 'DateTime'>
    readonly updatedAt: FieldRef<"Routine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Routine findUnique
   */
  export type RoutineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter, which Routine to fetch.
     */
    where: RoutineWhereUniqueInput
  }

  /**
   * Routine findUniqueOrThrow
   */
  export type RoutineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter, which Routine to fetch.
     */
    where: RoutineWhereUniqueInput
  }

  /**
   * Routine findFirst
   */
  export type RoutineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter, which Routine to fetch.
     */
    where?: RoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routines to fetch.
     */
    orderBy?: RoutineOrderByWithRelationInput | RoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routines.
     */
    cursor?: RoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routines.
     */
    distinct?: RoutineScalarFieldEnum | RoutineScalarFieldEnum[]
  }

  /**
   * Routine findFirstOrThrow
   */
  export type RoutineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter, which Routine to fetch.
     */
    where?: RoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routines to fetch.
     */
    orderBy?: RoutineOrderByWithRelationInput | RoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routines.
     */
    cursor?: RoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routines.
     */
    distinct?: RoutineScalarFieldEnum | RoutineScalarFieldEnum[]
  }

  /**
   * Routine findMany
   */
  export type RoutineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter, which Routines to fetch.
     */
    where?: RoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routines to fetch.
     */
    orderBy?: RoutineOrderByWithRelationInput | RoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routines.
     */
    cursor?: RoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routines.
     */
    skip?: number
    distinct?: RoutineScalarFieldEnum | RoutineScalarFieldEnum[]
  }

  /**
   * Routine create
   */
  export type RoutineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * The data needed to create a Routine.
     */
    data: XOR<RoutineCreateInput, RoutineUncheckedCreateInput>
  }

  /**
   * Routine createMany
   */
  export type RoutineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routines.
     */
    data: RoutineCreateManyInput | RoutineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Routine createManyAndReturn
   */
  export type RoutineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * The data used to create many Routines.
     */
    data: RoutineCreateManyInput | RoutineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Routine update
   */
  export type RoutineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * The data needed to update a Routine.
     */
    data: XOR<RoutineUpdateInput, RoutineUncheckedUpdateInput>
    /**
     * Choose, which Routine to update.
     */
    where: RoutineWhereUniqueInput
  }

  /**
   * Routine updateMany
   */
  export type RoutineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routines.
     */
    data: XOR<RoutineUpdateManyMutationInput, RoutineUncheckedUpdateManyInput>
    /**
     * Filter which Routines to update
     */
    where?: RoutineWhereInput
    /**
     * Limit how many Routines to update.
     */
    limit?: number
  }

  /**
   * Routine updateManyAndReturn
   */
  export type RoutineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * The data used to update Routines.
     */
    data: XOR<RoutineUpdateManyMutationInput, RoutineUncheckedUpdateManyInput>
    /**
     * Filter which Routines to update
     */
    where?: RoutineWhereInput
    /**
     * Limit how many Routines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Routine upsert
   */
  export type RoutineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * The filter to search for the Routine to update in case it exists.
     */
    where: RoutineWhereUniqueInput
    /**
     * In case the Routine found by the `where` argument doesn't exist, create a new Routine with this data.
     */
    create: XOR<RoutineCreateInput, RoutineUncheckedCreateInput>
    /**
     * In case the Routine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoutineUpdateInput, RoutineUncheckedUpdateInput>
  }

  /**
   * Routine delete
   */
  export type RoutineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    /**
     * Filter which Routine to delete.
     */
    where: RoutineWhereUniqueInput
  }

  /**
   * Routine deleteMany
   */
  export type RoutineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routines to delete
     */
    where?: RoutineWhereInput
    /**
     * Limit how many Routines to delete.
     */
    limit?: number
  }

  /**
   * Routine.blockedApps
   */
  export type Routine$blockedAppsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    where?: RoutineAppWhereInput
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    cursor?: RoutineAppWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutineAppScalarFieldEnum | RoutineAppScalarFieldEnum[]
  }

  /**
   * Routine.commitments
   */
  export type Routine$commitmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    where?: CommitmentWhereInput
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    cursor?: CommitmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * Routine without action
   */
  export type RoutineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
  }


  /**
   * Model App
   */

  export type AggregateApp = {
    _count: AppCountAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  export type AppMinAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    androidPackageName: string | null
    iosBundleId: string | null
    category: string | null
    isUserSubmitted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppMaxAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    androidPackageName: string | null
    iosBundleId: string | null
    category: string | null
    isUserSubmitted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppCountAggregateOutputType = {
    id: number
    name: number
    icon: number
    domains: number
    androidPackageName: number
    iosBundleId: number
    category: number
    isUserSubmitted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    androidPackageName?: true
    iosBundleId?: true
    category?: true
    isUserSubmitted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    androidPackageName?: true
    iosBundleId?: true
    category?: true
    isUserSubmitted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    domains?: true
    androidPackageName?: true
    iosBundleId?: true
    category?: true
    isUserSubmitted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which App to aggregate.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Apps
    **/
    _count?: true | AppCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppMaxAggregateInputType
  }

  export type GetAppAggregateType<T extends AppAggregateArgs> = {
        [P in keyof T & keyof AggregateApp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApp[P]>
      : GetScalarType<T[P], AggregateApp[P]>
  }




  export type AppGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppWhereInput
    orderBy?: AppOrderByWithAggregationInput | AppOrderByWithAggregationInput[]
    by: AppScalarFieldEnum[] | AppScalarFieldEnum
    having?: AppScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppCountAggregateInputType | true
    _min?: AppMinAggregateInputType
    _max?: AppMaxAggregateInputType
  }

  export type AppGroupByOutputType = {
    id: string
    name: string
    icon: string | null
    domains: string[]
    androidPackageName: string | null
    iosBundleId: string | null
    category: string | null
    isUserSubmitted: boolean
    createdAt: Date
    updatedAt: Date
    _count: AppCountAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  type GetAppGroupByPayload<T extends AppGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppGroupByOutputType[P]>
            : GetScalarType<T[P], AppGroupByOutputType[P]>
        }
      >
    >


  export type AppSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    domains?: boolean
    androidPackageName?: boolean
    iosBundleId?: boolean
    category?: boolean
    isUserSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routines?: boolean | App$routinesArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["app"]>

  export type AppSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    domains?: boolean
    androidPackageName?: boolean
    iosBundleId?: boolean
    category?: boolean
    isUserSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["app"]>

  export type AppSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    domains?: boolean
    androidPackageName?: boolean
    iosBundleId?: boolean
    category?: boolean
    isUserSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["app"]>

  export type AppSelectScalar = {
    id?: boolean
    name?: boolean
    icon?: boolean
    domains?: boolean
    androidPackageName?: boolean
    iosBundleId?: boolean
    category?: boolean
    isUserSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "icon" | "domains" | "androidPackageName" | "iosBundleId" | "category" | "isUserSubmitted" | "createdAt" | "updatedAt", ExtArgs["result"]["app"]>
  export type AppInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routines?: boolean | App$routinesArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AppIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AppPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "App"
    objects: {
      routines: Prisma.$RoutineAppPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      icon: string | null
      domains: string[]
      androidPackageName: string | null
      iosBundleId: string | null
      category: string | null
      isUserSubmitted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["app"]>
    composites: {}
  }

  type AppGetPayload<S extends boolean | null | undefined | AppDefaultArgs> = $Result.GetResult<Prisma.$AppPayload, S>

  type AppCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppCountAggregateInputType | true
    }

  export interface AppDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['App'], meta: { name: 'App' } }
    /**
     * Find zero or one App that matches the filter.
     * @param {AppFindUniqueArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppFindUniqueArgs>(args: SelectSubset<T, AppFindUniqueArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one App that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppFindUniqueOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppFindUniqueOrThrowArgs>(args: SelectSubset<T, AppFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppFindFirstArgs>(args?: SelectSubset<T, AppFindFirstArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppFindFirstOrThrowArgs>(args?: SelectSubset<T, AppFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Apps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Apps
     * const apps = await prisma.app.findMany()
     * 
     * // Get first 10 Apps
     * const apps = await prisma.app.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appWithIdOnly = await prisma.app.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppFindManyArgs>(args?: SelectSubset<T, AppFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a App.
     * @param {AppCreateArgs} args - Arguments to create a App.
     * @example
     * // Create one App
     * const App = await prisma.app.create({
     *   data: {
     *     // ... data to create a App
     *   }
     * })
     * 
     */
    create<T extends AppCreateArgs>(args: SelectSubset<T, AppCreateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Apps.
     * @param {AppCreateManyArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppCreateManyArgs>(args?: SelectSubset<T, AppCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Apps and returns the data saved in the database.
     * @param {AppCreateManyAndReturnArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppCreateManyAndReturnArgs>(args?: SelectSubset<T, AppCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a App.
     * @param {AppDeleteArgs} args - Arguments to delete one App.
     * @example
     * // Delete one App
     * const App = await prisma.app.delete({
     *   where: {
     *     // ... filter to delete one App
     *   }
     * })
     * 
     */
    delete<T extends AppDeleteArgs>(args: SelectSubset<T, AppDeleteArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one App.
     * @param {AppUpdateArgs} args - Arguments to update one App.
     * @example
     * // Update one App
     * const app = await prisma.app.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUpdateArgs>(args: SelectSubset<T, AppUpdateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Apps.
     * @param {AppDeleteManyArgs} args - Arguments to filter Apps to delete.
     * @example
     * // Delete a few Apps
     * const { count } = await prisma.app.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppDeleteManyArgs>(args?: SelectSubset<T, AppDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUpdateManyArgs>(args: SelectSubset<T, AppUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps and returns the data updated in the database.
     * @param {AppUpdateManyAndReturnArgs} args - Arguments to update many Apps.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppUpdateManyAndReturnArgs>(args: SelectSubset<T, AppUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one App.
     * @param {AppUpsertArgs} args - Arguments to update or create a App.
     * @example
     * // Update or create a App
     * const app = await prisma.app.upsert({
     *   create: {
     *     // ... data to create a App
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the App we want to update
     *   }
     * })
     */
    upsert<T extends AppUpsertArgs>(args: SelectSubset<T, AppUpsertArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppCountArgs} args - Arguments to filter Apps to count.
     * @example
     * // Count the number of Apps
     * const count = await prisma.app.count({
     *   where: {
     *     // ... the filter for the Apps we want to count
     *   }
     * })
    **/
    count<T extends AppCountArgs>(
      args?: Subset<T, AppCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppAggregateArgs>(args: Subset<T, AppAggregateArgs>): Prisma.PrismaPromise<GetAppAggregateType<T>>

    /**
     * Group by App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppGroupByArgs['orderBy'] }
        : { orderBy?: AppGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the App model
   */
  readonly fields: AppFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for App.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routines<T extends App$routinesArgs<ExtArgs> = {}>(args?: Subset<T, App$routinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the App model
   */
  interface AppFieldRefs {
    readonly id: FieldRef<"App", 'String'>
    readonly name: FieldRef<"App", 'String'>
    readonly icon: FieldRef<"App", 'String'>
    readonly domains: FieldRef<"App", 'String[]'>
    readonly androidPackageName: FieldRef<"App", 'String'>
    readonly iosBundleId: FieldRef<"App", 'String'>
    readonly category: FieldRef<"App", 'String'>
    readonly isUserSubmitted: FieldRef<"App", 'Boolean'>
    readonly createdAt: FieldRef<"App", 'DateTime'>
    readonly updatedAt: FieldRef<"App", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * App findUnique
   */
  export type AppFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findUniqueOrThrow
   */
  export type AppFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findFirst
   */
  export type AppFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findFirstOrThrow
   */
  export type AppFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findMany
   */
  export type AppFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which Apps to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App create
   */
  export type AppCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to create a App.
     */
    data: XOR<AppCreateInput, AppUncheckedCreateInput>
  }

  /**
   * App createMany
   */
  export type AppCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * App createManyAndReturn
   */
  export type AppCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * App update
   */
  export type AppUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to update a App.
     */
    data: XOR<AppUpdateInput, AppUncheckedUpdateInput>
    /**
     * Choose, which App to update.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App updateMany
   */
  export type AppUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
  }

  /**
   * App updateManyAndReturn
   */
  export type AppUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
  }

  /**
   * App upsert
   */
  export type AppUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The filter to search for the App to update in case it exists.
     */
    where: AppWhereUniqueInput
    /**
     * In case the App found by the `where` argument doesn't exist, create a new App with this data.
     */
    create: XOR<AppCreateInput, AppUncheckedCreateInput>
    /**
     * In case the App was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUpdateInput, AppUncheckedUpdateInput>
  }

  /**
   * App delete
   */
  export type AppDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter which App to delete.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App deleteMany
   */
  export type AppDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Apps to delete
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to delete.
     */
    limit?: number
  }

  /**
   * App.routines
   */
  export type App$routinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    where?: RoutineAppWhereInput
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    cursor?: RoutineAppWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutineAppScalarFieldEnum | RoutineAppScalarFieldEnum[]
  }

  /**
   * App without action
   */
  export type AppDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
  }


  /**
   * Model RoutineApp
   */

  export type AggregateRoutineApp = {
    _count: RoutineAppCountAggregateOutputType | null
    _min: RoutineAppMinAggregateOutputType | null
    _max: RoutineAppMaxAggregateOutputType | null
  }

  export type RoutineAppMinAggregateOutputType = {
    routineId: string | null
    appId: string | null
  }

  export type RoutineAppMaxAggregateOutputType = {
    routineId: string | null
    appId: string | null
  }

  export type RoutineAppCountAggregateOutputType = {
    routineId: number
    appId: number
    _all: number
  }


  export type RoutineAppMinAggregateInputType = {
    routineId?: true
    appId?: true
  }

  export type RoutineAppMaxAggregateInputType = {
    routineId?: true
    appId?: true
  }

  export type RoutineAppCountAggregateInputType = {
    routineId?: true
    appId?: true
    _all?: true
  }

  export type RoutineAppAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutineApp to aggregate.
     */
    where?: RoutineAppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutineApps to fetch.
     */
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoutineAppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutineApps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutineApps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoutineApps
    **/
    _count?: true | RoutineAppCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoutineAppMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoutineAppMaxAggregateInputType
  }

  export type GetRoutineAppAggregateType<T extends RoutineAppAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutineApp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutineApp[P]>
      : GetScalarType<T[P], AggregateRoutineApp[P]>
  }




  export type RoutineAppGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutineAppWhereInput
    orderBy?: RoutineAppOrderByWithAggregationInput | RoutineAppOrderByWithAggregationInput[]
    by: RoutineAppScalarFieldEnum[] | RoutineAppScalarFieldEnum
    having?: RoutineAppScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoutineAppCountAggregateInputType | true
    _min?: RoutineAppMinAggregateInputType
    _max?: RoutineAppMaxAggregateInputType
  }

  export type RoutineAppGroupByOutputType = {
    routineId: string
    appId: string
    _count: RoutineAppCountAggregateOutputType | null
    _min: RoutineAppMinAggregateOutputType | null
    _max: RoutineAppMaxAggregateOutputType | null
  }

  type GetRoutineAppGroupByPayload<T extends RoutineAppGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoutineAppGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoutineAppGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoutineAppGroupByOutputType[P]>
            : GetScalarType<T[P], RoutineAppGroupByOutputType[P]>
        }
      >
    >


  export type RoutineAppSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    routineId?: boolean
    appId?: boolean
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routineApp"]>

  export type RoutineAppSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    routineId?: boolean
    appId?: boolean
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routineApp"]>

  export type RoutineAppSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    routineId?: boolean
    appId?: boolean
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["routineApp"]>

  export type RoutineAppSelectScalar = {
    routineId?: boolean
    appId?: boolean
  }

  export type RoutineAppOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"routineId" | "appId", ExtArgs["result"]["routineApp"]>
  export type RoutineAppInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type RoutineAppIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type RoutineAppIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routine?: boolean | RoutineDefaultArgs<ExtArgs>
    app?: boolean | AppDefaultArgs<ExtArgs>
  }

  export type $RoutineAppPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoutineApp"
    objects: {
      routine: Prisma.$RoutinePayload<ExtArgs>
      app: Prisma.$AppPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      routineId: string
      appId: string
    }, ExtArgs["result"]["routineApp"]>
    composites: {}
  }

  type RoutineAppGetPayload<S extends boolean | null | undefined | RoutineAppDefaultArgs> = $Result.GetResult<Prisma.$RoutineAppPayload, S>

  type RoutineAppCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoutineAppFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoutineAppCountAggregateInputType | true
    }

  export interface RoutineAppDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoutineApp'], meta: { name: 'RoutineApp' } }
    /**
     * Find zero or one RoutineApp that matches the filter.
     * @param {RoutineAppFindUniqueArgs} args - Arguments to find a RoutineApp
     * @example
     * // Get one RoutineApp
     * const routineApp = await prisma.routineApp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoutineAppFindUniqueArgs>(args: SelectSubset<T, RoutineAppFindUniqueArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoutineApp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoutineAppFindUniqueOrThrowArgs} args - Arguments to find a RoutineApp
     * @example
     * // Get one RoutineApp
     * const routineApp = await prisma.routineApp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoutineAppFindUniqueOrThrowArgs>(args: SelectSubset<T, RoutineAppFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoutineApp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppFindFirstArgs} args - Arguments to find a RoutineApp
     * @example
     * // Get one RoutineApp
     * const routineApp = await prisma.routineApp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoutineAppFindFirstArgs>(args?: SelectSubset<T, RoutineAppFindFirstArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoutineApp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppFindFirstOrThrowArgs} args - Arguments to find a RoutineApp
     * @example
     * // Get one RoutineApp
     * const routineApp = await prisma.routineApp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoutineAppFindFirstOrThrowArgs>(args?: SelectSubset<T, RoutineAppFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoutineApps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoutineApps
     * const routineApps = await prisma.routineApp.findMany()
     * 
     * // Get first 10 RoutineApps
     * const routineApps = await prisma.routineApp.findMany({ take: 10 })
     * 
     * // Only select the `routineId`
     * const routineAppWithRoutineIdOnly = await prisma.routineApp.findMany({ select: { routineId: true } })
     * 
     */
    findMany<T extends RoutineAppFindManyArgs>(args?: SelectSubset<T, RoutineAppFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoutineApp.
     * @param {RoutineAppCreateArgs} args - Arguments to create a RoutineApp.
     * @example
     * // Create one RoutineApp
     * const RoutineApp = await prisma.routineApp.create({
     *   data: {
     *     // ... data to create a RoutineApp
     *   }
     * })
     * 
     */
    create<T extends RoutineAppCreateArgs>(args: SelectSubset<T, RoutineAppCreateArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoutineApps.
     * @param {RoutineAppCreateManyArgs} args - Arguments to create many RoutineApps.
     * @example
     * // Create many RoutineApps
     * const routineApp = await prisma.routineApp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoutineAppCreateManyArgs>(args?: SelectSubset<T, RoutineAppCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoutineApps and returns the data saved in the database.
     * @param {RoutineAppCreateManyAndReturnArgs} args - Arguments to create many RoutineApps.
     * @example
     * // Create many RoutineApps
     * const routineApp = await prisma.routineApp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoutineApps and only return the `routineId`
     * const routineAppWithRoutineIdOnly = await prisma.routineApp.createManyAndReturn({
     *   select: { routineId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoutineAppCreateManyAndReturnArgs>(args?: SelectSubset<T, RoutineAppCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoutineApp.
     * @param {RoutineAppDeleteArgs} args - Arguments to delete one RoutineApp.
     * @example
     * // Delete one RoutineApp
     * const RoutineApp = await prisma.routineApp.delete({
     *   where: {
     *     // ... filter to delete one RoutineApp
     *   }
     * })
     * 
     */
    delete<T extends RoutineAppDeleteArgs>(args: SelectSubset<T, RoutineAppDeleteArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoutineApp.
     * @param {RoutineAppUpdateArgs} args - Arguments to update one RoutineApp.
     * @example
     * // Update one RoutineApp
     * const routineApp = await prisma.routineApp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoutineAppUpdateArgs>(args: SelectSubset<T, RoutineAppUpdateArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoutineApps.
     * @param {RoutineAppDeleteManyArgs} args - Arguments to filter RoutineApps to delete.
     * @example
     * // Delete a few RoutineApps
     * const { count } = await prisma.routineApp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoutineAppDeleteManyArgs>(args?: SelectSubset<T, RoutineAppDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutineApps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoutineApps
     * const routineApp = await prisma.routineApp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoutineAppUpdateManyArgs>(args: SelectSubset<T, RoutineAppUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutineApps and returns the data updated in the database.
     * @param {RoutineAppUpdateManyAndReturnArgs} args - Arguments to update many RoutineApps.
     * @example
     * // Update many RoutineApps
     * const routineApp = await prisma.routineApp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoutineApps and only return the `routineId`
     * const routineAppWithRoutineIdOnly = await prisma.routineApp.updateManyAndReturn({
     *   select: { routineId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoutineAppUpdateManyAndReturnArgs>(args: SelectSubset<T, RoutineAppUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoutineApp.
     * @param {RoutineAppUpsertArgs} args - Arguments to update or create a RoutineApp.
     * @example
     * // Update or create a RoutineApp
     * const routineApp = await prisma.routineApp.upsert({
     *   create: {
     *     // ... data to create a RoutineApp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoutineApp we want to update
     *   }
     * })
     */
    upsert<T extends RoutineAppUpsertArgs>(args: SelectSubset<T, RoutineAppUpsertArgs<ExtArgs>>): Prisma__RoutineAppClient<$Result.GetResult<Prisma.$RoutineAppPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoutineApps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppCountArgs} args - Arguments to filter RoutineApps to count.
     * @example
     * // Count the number of RoutineApps
     * const count = await prisma.routineApp.count({
     *   where: {
     *     // ... the filter for the RoutineApps we want to count
     *   }
     * })
    **/
    count<T extends RoutineAppCountArgs>(
      args?: Subset<T, RoutineAppCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoutineAppCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoutineApp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoutineAppAggregateArgs>(args: Subset<T, RoutineAppAggregateArgs>): Prisma.PrismaPromise<GetRoutineAppAggregateType<T>>

    /**
     * Group by RoutineApp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutineAppGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoutineAppGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoutineAppGroupByArgs['orderBy'] }
        : { orderBy?: RoutineAppGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoutineAppGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutineAppGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoutineApp model
   */
  readonly fields: RoutineAppFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoutineApp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoutineAppClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routine<T extends RoutineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoutineDefaultArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoutineApp model
   */
  interface RoutineAppFieldRefs {
    readonly routineId: FieldRef<"RoutineApp", 'String'>
    readonly appId: FieldRef<"RoutineApp", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoutineApp findUnique
   */
  export type RoutineAppFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter, which RoutineApp to fetch.
     */
    where: RoutineAppWhereUniqueInput
  }

  /**
   * RoutineApp findUniqueOrThrow
   */
  export type RoutineAppFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter, which RoutineApp to fetch.
     */
    where: RoutineAppWhereUniqueInput
  }

  /**
   * RoutineApp findFirst
   */
  export type RoutineAppFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter, which RoutineApp to fetch.
     */
    where?: RoutineAppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutineApps to fetch.
     */
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutineApps.
     */
    cursor?: RoutineAppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutineApps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutineApps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutineApps.
     */
    distinct?: RoutineAppScalarFieldEnum | RoutineAppScalarFieldEnum[]
  }

  /**
   * RoutineApp findFirstOrThrow
   */
  export type RoutineAppFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter, which RoutineApp to fetch.
     */
    where?: RoutineAppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutineApps to fetch.
     */
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutineApps.
     */
    cursor?: RoutineAppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutineApps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutineApps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutineApps.
     */
    distinct?: RoutineAppScalarFieldEnum | RoutineAppScalarFieldEnum[]
  }

  /**
   * RoutineApp findMany
   */
  export type RoutineAppFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter, which RoutineApps to fetch.
     */
    where?: RoutineAppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutineApps to fetch.
     */
    orderBy?: RoutineAppOrderByWithRelationInput | RoutineAppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoutineApps.
     */
    cursor?: RoutineAppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutineApps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutineApps.
     */
    skip?: number
    distinct?: RoutineAppScalarFieldEnum | RoutineAppScalarFieldEnum[]
  }

  /**
   * RoutineApp create
   */
  export type RoutineAppCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * The data needed to create a RoutineApp.
     */
    data: XOR<RoutineAppCreateInput, RoutineAppUncheckedCreateInput>
  }

  /**
   * RoutineApp createMany
   */
  export type RoutineAppCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoutineApps.
     */
    data: RoutineAppCreateManyInput | RoutineAppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoutineApp createManyAndReturn
   */
  export type RoutineAppCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * The data used to create many RoutineApps.
     */
    data: RoutineAppCreateManyInput | RoutineAppCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoutineApp update
   */
  export type RoutineAppUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * The data needed to update a RoutineApp.
     */
    data: XOR<RoutineAppUpdateInput, RoutineAppUncheckedUpdateInput>
    /**
     * Choose, which RoutineApp to update.
     */
    where: RoutineAppWhereUniqueInput
  }

  /**
   * RoutineApp updateMany
   */
  export type RoutineAppUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoutineApps.
     */
    data: XOR<RoutineAppUpdateManyMutationInput, RoutineAppUncheckedUpdateManyInput>
    /**
     * Filter which RoutineApps to update
     */
    where?: RoutineAppWhereInput
    /**
     * Limit how many RoutineApps to update.
     */
    limit?: number
  }

  /**
   * RoutineApp updateManyAndReturn
   */
  export type RoutineAppUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * The data used to update RoutineApps.
     */
    data: XOR<RoutineAppUpdateManyMutationInput, RoutineAppUncheckedUpdateManyInput>
    /**
     * Filter which RoutineApps to update
     */
    where?: RoutineAppWhereInput
    /**
     * Limit how many RoutineApps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoutineApp upsert
   */
  export type RoutineAppUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * The filter to search for the RoutineApp to update in case it exists.
     */
    where: RoutineAppWhereUniqueInput
    /**
     * In case the RoutineApp found by the `where` argument doesn't exist, create a new RoutineApp with this data.
     */
    create: XOR<RoutineAppCreateInput, RoutineAppUncheckedCreateInput>
    /**
     * In case the RoutineApp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoutineAppUpdateInput, RoutineAppUncheckedUpdateInput>
  }

  /**
   * RoutineApp delete
   */
  export type RoutineAppDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
    /**
     * Filter which RoutineApp to delete.
     */
    where: RoutineAppWhereUniqueInput
  }

  /**
   * RoutineApp deleteMany
   */
  export type RoutineAppDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutineApps to delete
     */
    where?: RoutineAppWhereInput
    /**
     * Limit how many RoutineApps to delete.
     */
    limit?: number
  }

  /**
   * RoutineApp without action
   */
  export type RoutineAppDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutineApp
     */
    select?: RoutineAppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoutineApp
     */
    omit?: RoutineAppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineAppInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    index: number | null
  }

  export type TaskSumAggregateOutputType = {
    index: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    userId: string | null
    task: string | null
    state: $Enums.TaskState | null
    createdAt: Date | null
    index: number | null
    scheduledDate: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    task: string | null
    state: $Enums.TaskState | null
    createdAt: Date | null
    index: number | null
    scheduledDate: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    userId: number
    task: number
    state: number
    createdAt: number
    index: number
    tags: number
    scheduledDate: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    index?: true
  }

  export type TaskSumAggregateInputType = {
    index?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    userId?: true
    task?: true
    state?: true
    createdAt?: true
    index?: true
    scheduledDate?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    userId?: true
    task?: true
    state?: true
    createdAt?: true
    index?: true
    scheduledDate?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    userId?: true
    task?: true
    state?: true
    createdAt?: true
    index?: true
    tags?: true
    scheduledDate?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    userId: string
    task: string
    state: $Enums.TaskState
    createdAt: Date
    index: number | null
    tags: string[]
    scheduledDate: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    task?: boolean
    state?: boolean
    createdAt?: boolean
    index?: boolean
    tags?: boolean
    scheduledDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    task?: boolean
    state?: boolean
    createdAt?: boolean
    index?: boolean
    tags?: boolean
    scheduledDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    task?: boolean
    state?: boolean
    createdAt?: boolean
    index?: boolean
    tags?: boolean
    scheduledDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    userId?: boolean
    task?: boolean
    state?: boolean
    createdAt?: boolean
    index?: boolean
    tags?: boolean
    scheduledDate?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "task" | "state" | "createdAt" | "index" | "tags" | "scheduledDate", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      task: string
      state: $Enums.TaskState
      createdAt: Date
      index: number | null
      tags: string[]
      scheduledDate: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly task: FieldRef<"Task", 'String'>
    readonly state: FieldRef<"Task", 'TaskState'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly index: FieldRef<"Task", 'Int'>
    readonly tags: FieldRef<"Task", 'String[]'>
    readonly scheduledDate: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Commitment
   */

  export type AggregateCommitment = {
    _count: CommitmentCountAggregateOutputType | null
    _avg: CommitmentAvgAggregateOutputType | null
    _sum: CommitmentSumAggregateOutputType | null
    _min: CommitmentMinAggregateOutputType | null
    _max: CommitmentMaxAggregateOutputType | null
  }

  export type CommitmentAvgAggregateOutputType = {
    amount: number | null
  }

  export type CommitmentSumAggregateOutputType = {
    amount: bigint | null
  }

  export type CommitmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    userPubkey: string | null
    amount: bigint | null
    unlockTime: Date | null
    createdAt: Date | null
    authorityPubkey: string | null
    status: $Enums.CommitmentStatus | null
    claimedAt: Date | null
    forfeitedAt: Date | null
    txSignature: string | null
    routineId: string | null
    focusSessionId: string | null
  }

  export type CommitmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    userPubkey: string | null
    amount: bigint | null
    unlockTime: Date | null
    createdAt: Date | null
    authorityPubkey: string | null
    status: $Enums.CommitmentStatus | null
    claimedAt: Date | null
    forfeitedAt: Date | null
    txSignature: string | null
    routineId: string | null
    focusSessionId: string | null
  }

  export type CommitmentCountAggregateOutputType = {
    id: number
    userId: number
    userPubkey: number
    amount: number
    unlockTime: number
    createdAt: number
    authorityPubkey: number
    status: number
    claimedAt: number
    forfeitedAt: number
    txSignature: number
    routineId: number
    focusSessionId: number
    _all: number
  }


  export type CommitmentAvgAggregateInputType = {
    amount?: true
  }

  export type CommitmentSumAggregateInputType = {
    amount?: true
  }

  export type CommitmentMinAggregateInputType = {
    id?: true
    userId?: true
    userPubkey?: true
    amount?: true
    unlockTime?: true
    createdAt?: true
    authorityPubkey?: true
    status?: true
    claimedAt?: true
    forfeitedAt?: true
    txSignature?: true
    routineId?: true
    focusSessionId?: true
  }

  export type CommitmentMaxAggregateInputType = {
    id?: true
    userId?: true
    userPubkey?: true
    amount?: true
    unlockTime?: true
    createdAt?: true
    authorityPubkey?: true
    status?: true
    claimedAt?: true
    forfeitedAt?: true
    txSignature?: true
    routineId?: true
    focusSessionId?: true
  }

  export type CommitmentCountAggregateInputType = {
    id?: true
    userId?: true
    userPubkey?: true
    amount?: true
    unlockTime?: true
    createdAt?: true
    authorityPubkey?: true
    status?: true
    claimedAt?: true
    forfeitedAt?: true
    txSignature?: true
    routineId?: true
    focusSessionId?: true
    _all?: true
  }

  export type CommitmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commitment to aggregate.
     */
    where?: CommitmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commitments to fetch.
     */
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommitmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commitments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commitments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commitments
    **/
    _count?: true | CommitmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommitmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommitmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommitmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommitmentMaxAggregateInputType
  }

  export type GetCommitmentAggregateType<T extends CommitmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCommitment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommitment[P]>
      : GetScalarType<T[P], AggregateCommitment[P]>
  }




  export type CommitmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitmentWhereInput
    orderBy?: CommitmentOrderByWithAggregationInput | CommitmentOrderByWithAggregationInput[]
    by: CommitmentScalarFieldEnum[] | CommitmentScalarFieldEnum
    having?: CommitmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommitmentCountAggregateInputType | true
    _avg?: CommitmentAvgAggregateInputType
    _sum?: CommitmentSumAggregateInputType
    _min?: CommitmentMinAggregateInputType
    _max?: CommitmentMaxAggregateInputType
  }

  export type CommitmentGroupByOutputType = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint
    unlockTime: Date
    createdAt: Date
    authorityPubkey: string
    status: $Enums.CommitmentStatus
    claimedAt: Date | null
    forfeitedAt: Date | null
    txSignature: string | null
    routineId: string | null
    focusSessionId: string | null
    _count: CommitmentCountAggregateOutputType | null
    _avg: CommitmentAvgAggregateOutputType | null
    _sum: CommitmentSumAggregateOutputType | null
    _min: CommitmentMinAggregateOutputType | null
    _max: CommitmentMaxAggregateOutputType | null
  }

  type GetCommitmentGroupByPayload<T extends CommitmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommitmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommitmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommitmentGroupByOutputType[P]>
            : GetScalarType<T[P], CommitmentGroupByOutputType[P]>
        }
      >
    >


  export type CommitmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userPubkey?: boolean
    amount?: boolean
    unlockTime?: boolean
    createdAt?: boolean
    authorityPubkey?: boolean
    status?: boolean
    claimedAt?: boolean
    forfeitedAt?: boolean
    txSignature?: boolean
    routineId?: boolean
    focusSessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }, ExtArgs["result"]["commitment"]>

  export type CommitmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userPubkey?: boolean
    amount?: boolean
    unlockTime?: boolean
    createdAt?: boolean
    authorityPubkey?: boolean
    status?: boolean
    claimedAt?: boolean
    forfeitedAt?: boolean
    txSignature?: boolean
    routineId?: boolean
    focusSessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }, ExtArgs["result"]["commitment"]>

  export type CommitmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userPubkey?: boolean
    amount?: boolean
    unlockTime?: boolean
    createdAt?: boolean
    authorityPubkey?: boolean
    status?: boolean
    claimedAt?: boolean
    forfeitedAt?: boolean
    txSignature?: boolean
    routineId?: boolean
    focusSessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }, ExtArgs["result"]["commitment"]>

  export type CommitmentSelectScalar = {
    id?: boolean
    userId?: boolean
    userPubkey?: boolean
    amount?: boolean
    unlockTime?: boolean
    createdAt?: boolean
    authorityPubkey?: boolean
    status?: boolean
    claimedAt?: boolean
    forfeitedAt?: boolean
    txSignature?: boolean
    routineId?: boolean
    focusSessionId?: boolean
  }

  export type CommitmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userPubkey" | "amount" | "unlockTime" | "createdAt" | "authorityPubkey" | "status" | "claimedAt" | "forfeitedAt" | "txSignature" | "routineId" | "focusSessionId", ExtArgs["result"]["commitment"]>
  export type CommitmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }
  export type CommitmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }
  export type CommitmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    routine?: boolean | Commitment$routineArgs<ExtArgs>
    focusSession?: boolean | Commitment$focusSessionArgs<ExtArgs>
  }

  export type $CommitmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commitment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      routine: Prisma.$RoutinePayload<ExtArgs> | null
      focusSession: Prisma.$FocusSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      userPubkey: string
      amount: bigint
      unlockTime: Date
      createdAt: Date
      authorityPubkey: string
      status: $Enums.CommitmentStatus
      claimedAt: Date | null
      forfeitedAt: Date | null
      txSignature: string | null
      routineId: string | null
      focusSessionId: string | null
    }, ExtArgs["result"]["commitment"]>
    composites: {}
  }

  type CommitmentGetPayload<S extends boolean | null | undefined | CommitmentDefaultArgs> = $Result.GetResult<Prisma.$CommitmentPayload, S>

  type CommitmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommitmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommitmentCountAggregateInputType | true
    }

  export interface CommitmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commitment'], meta: { name: 'Commitment' } }
    /**
     * Find zero or one Commitment that matches the filter.
     * @param {CommitmentFindUniqueArgs} args - Arguments to find a Commitment
     * @example
     * // Get one Commitment
     * const commitment = await prisma.commitment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommitmentFindUniqueArgs>(args: SelectSubset<T, CommitmentFindUniqueArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commitment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommitmentFindUniqueOrThrowArgs} args - Arguments to find a Commitment
     * @example
     * // Get one Commitment
     * const commitment = await prisma.commitment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommitmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommitmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commitment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentFindFirstArgs} args - Arguments to find a Commitment
     * @example
     * // Get one Commitment
     * const commitment = await prisma.commitment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommitmentFindFirstArgs>(args?: SelectSubset<T, CommitmentFindFirstArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commitment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentFindFirstOrThrowArgs} args - Arguments to find a Commitment
     * @example
     * // Get one Commitment
     * const commitment = await prisma.commitment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommitmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommitmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commitments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commitments
     * const commitments = await prisma.commitment.findMany()
     * 
     * // Get first 10 Commitments
     * const commitments = await prisma.commitment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commitmentWithIdOnly = await prisma.commitment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommitmentFindManyArgs>(args?: SelectSubset<T, CommitmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commitment.
     * @param {CommitmentCreateArgs} args - Arguments to create a Commitment.
     * @example
     * // Create one Commitment
     * const Commitment = await prisma.commitment.create({
     *   data: {
     *     // ... data to create a Commitment
     *   }
     * })
     * 
     */
    create<T extends CommitmentCreateArgs>(args: SelectSubset<T, CommitmentCreateArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commitments.
     * @param {CommitmentCreateManyArgs} args - Arguments to create many Commitments.
     * @example
     * // Create many Commitments
     * const commitment = await prisma.commitment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommitmentCreateManyArgs>(args?: SelectSubset<T, CommitmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commitments and returns the data saved in the database.
     * @param {CommitmentCreateManyAndReturnArgs} args - Arguments to create many Commitments.
     * @example
     * // Create many Commitments
     * const commitment = await prisma.commitment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commitments and only return the `id`
     * const commitmentWithIdOnly = await prisma.commitment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommitmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommitmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commitment.
     * @param {CommitmentDeleteArgs} args - Arguments to delete one Commitment.
     * @example
     * // Delete one Commitment
     * const Commitment = await prisma.commitment.delete({
     *   where: {
     *     // ... filter to delete one Commitment
     *   }
     * })
     * 
     */
    delete<T extends CommitmentDeleteArgs>(args: SelectSubset<T, CommitmentDeleteArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commitment.
     * @param {CommitmentUpdateArgs} args - Arguments to update one Commitment.
     * @example
     * // Update one Commitment
     * const commitment = await prisma.commitment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommitmentUpdateArgs>(args: SelectSubset<T, CommitmentUpdateArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commitments.
     * @param {CommitmentDeleteManyArgs} args - Arguments to filter Commitments to delete.
     * @example
     * // Delete a few Commitments
     * const { count } = await prisma.commitment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommitmentDeleteManyArgs>(args?: SelectSubset<T, CommitmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commitments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commitments
     * const commitment = await prisma.commitment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommitmentUpdateManyArgs>(args: SelectSubset<T, CommitmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commitments and returns the data updated in the database.
     * @param {CommitmentUpdateManyAndReturnArgs} args - Arguments to update many Commitments.
     * @example
     * // Update many Commitments
     * const commitment = await prisma.commitment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commitments and only return the `id`
     * const commitmentWithIdOnly = await prisma.commitment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommitmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommitmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commitment.
     * @param {CommitmentUpsertArgs} args - Arguments to update or create a Commitment.
     * @example
     * // Update or create a Commitment
     * const commitment = await prisma.commitment.upsert({
     *   create: {
     *     // ... data to create a Commitment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commitment we want to update
     *   }
     * })
     */
    upsert<T extends CommitmentUpsertArgs>(args: SelectSubset<T, CommitmentUpsertArgs<ExtArgs>>): Prisma__CommitmentClient<$Result.GetResult<Prisma.$CommitmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commitments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentCountArgs} args - Arguments to filter Commitments to count.
     * @example
     * // Count the number of Commitments
     * const count = await prisma.commitment.count({
     *   where: {
     *     // ... the filter for the Commitments we want to count
     *   }
     * })
    **/
    count<T extends CommitmentCountArgs>(
      args?: Subset<T, CommitmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommitmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commitment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommitmentAggregateArgs>(args: Subset<T, CommitmentAggregateArgs>): Prisma.PrismaPromise<GetCommitmentAggregateType<T>>

    /**
     * Group by Commitment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommitmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommitmentGroupByArgs['orderBy'] }
        : { orderBy?: CommitmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommitmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommitmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commitment model
   */
  readonly fields: CommitmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commitment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommitmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    routine<T extends Commitment$routineArgs<ExtArgs> = {}>(args?: Subset<T, Commitment$routineArgs<ExtArgs>>): Prisma__RoutineClient<$Result.GetResult<Prisma.$RoutinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    focusSession<T extends Commitment$focusSessionArgs<ExtArgs> = {}>(args?: Subset<T, Commitment$focusSessionArgs<ExtArgs>>): Prisma__FocusSessionClient<$Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commitment model
   */
  interface CommitmentFieldRefs {
    readonly id: FieldRef<"Commitment", 'String'>
    readonly userId: FieldRef<"Commitment", 'String'>
    readonly userPubkey: FieldRef<"Commitment", 'String'>
    readonly amount: FieldRef<"Commitment", 'BigInt'>
    readonly unlockTime: FieldRef<"Commitment", 'DateTime'>
    readonly createdAt: FieldRef<"Commitment", 'DateTime'>
    readonly authorityPubkey: FieldRef<"Commitment", 'String'>
    readonly status: FieldRef<"Commitment", 'CommitmentStatus'>
    readonly claimedAt: FieldRef<"Commitment", 'DateTime'>
    readonly forfeitedAt: FieldRef<"Commitment", 'DateTime'>
    readonly txSignature: FieldRef<"Commitment", 'String'>
    readonly routineId: FieldRef<"Commitment", 'String'>
    readonly focusSessionId: FieldRef<"Commitment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Commitment findUnique
   */
  export type CommitmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter, which Commitment to fetch.
     */
    where: CommitmentWhereUniqueInput
  }

  /**
   * Commitment findUniqueOrThrow
   */
  export type CommitmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter, which Commitment to fetch.
     */
    where: CommitmentWhereUniqueInput
  }

  /**
   * Commitment findFirst
   */
  export type CommitmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter, which Commitment to fetch.
     */
    where?: CommitmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commitments to fetch.
     */
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commitments.
     */
    cursor?: CommitmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commitments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commitments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commitments.
     */
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * Commitment findFirstOrThrow
   */
  export type CommitmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter, which Commitment to fetch.
     */
    where?: CommitmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commitments to fetch.
     */
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commitments.
     */
    cursor?: CommitmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commitments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commitments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commitments.
     */
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * Commitment findMany
   */
  export type CommitmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter, which Commitments to fetch.
     */
    where?: CommitmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commitments to fetch.
     */
    orderBy?: CommitmentOrderByWithRelationInput | CommitmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commitments.
     */
    cursor?: CommitmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commitments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commitments.
     */
    skip?: number
    distinct?: CommitmentScalarFieldEnum | CommitmentScalarFieldEnum[]
  }

  /**
   * Commitment create
   */
  export type CommitmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Commitment.
     */
    data: XOR<CommitmentCreateInput, CommitmentUncheckedCreateInput>
  }

  /**
   * Commitment createMany
   */
  export type CommitmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commitments.
     */
    data: CommitmentCreateManyInput | CommitmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commitment createManyAndReturn
   */
  export type CommitmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * The data used to create many Commitments.
     */
    data: CommitmentCreateManyInput | CommitmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commitment update
   */
  export type CommitmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Commitment.
     */
    data: XOR<CommitmentUpdateInput, CommitmentUncheckedUpdateInput>
    /**
     * Choose, which Commitment to update.
     */
    where: CommitmentWhereUniqueInput
  }

  /**
   * Commitment updateMany
   */
  export type CommitmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commitments.
     */
    data: XOR<CommitmentUpdateManyMutationInput, CommitmentUncheckedUpdateManyInput>
    /**
     * Filter which Commitments to update
     */
    where?: CommitmentWhereInput
    /**
     * Limit how many Commitments to update.
     */
    limit?: number
  }

  /**
   * Commitment updateManyAndReturn
   */
  export type CommitmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * The data used to update Commitments.
     */
    data: XOR<CommitmentUpdateManyMutationInput, CommitmentUncheckedUpdateManyInput>
    /**
     * Filter which Commitments to update
     */
    where?: CommitmentWhereInput
    /**
     * Limit how many Commitments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commitment upsert
   */
  export type CommitmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Commitment to update in case it exists.
     */
    where: CommitmentWhereUniqueInput
    /**
     * In case the Commitment found by the `where` argument doesn't exist, create a new Commitment with this data.
     */
    create: XOR<CommitmentCreateInput, CommitmentUncheckedCreateInput>
    /**
     * In case the Commitment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommitmentUpdateInput, CommitmentUncheckedUpdateInput>
  }

  /**
   * Commitment delete
   */
  export type CommitmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
    /**
     * Filter which Commitment to delete.
     */
    where: CommitmentWhereUniqueInput
  }

  /**
   * Commitment deleteMany
   */
  export type CommitmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commitments to delete
     */
    where?: CommitmentWhereInput
    /**
     * Limit how many Commitments to delete.
     */
    limit?: number
  }

  /**
   * Commitment.routine
   */
  export type Commitment$routineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Routine
     */
    select?: RoutineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Routine
     */
    omit?: RoutineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutineInclude<ExtArgs> | null
    where?: RoutineWhereInput
  }

  /**
   * Commitment.focusSession
   */
  export type Commitment$focusSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: FocusSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: FocusSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FocusSessionInclude<ExtArgs> | null
    where?: FocusSessionWhereInput
  }

  /**
   * Commitment without action
   */
  export type CommitmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commitment
     */
    select?: CommitmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commitment
     */
    omit?: CommitmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitmentInclude<ExtArgs> | null
  }


  /**
   * Model MarketplaceConfig
   */

  export type AggregateMarketplaceConfig = {
    _count: MarketplaceConfigCountAggregateOutputType | null
    _min: MarketplaceConfigMinAggregateOutputType | null
    _max: MarketplaceConfigMaxAggregateOutputType | null
  }

  export type MarketplaceConfigMinAggregateOutputType = {
    accountAddress: string | null
    authority: string | null
    currentPeriodRevenue: string | null
    totalLifetimeRevenue: string | null
    listingCounter: string | null
    passCounter: string | null
    snapshotPeriod: string | null
    updatedAt: Date | null
  }

  export type MarketplaceConfigMaxAggregateOutputType = {
    accountAddress: string | null
    authority: string | null
    currentPeriodRevenue: string | null
    totalLifetimeRevenue: string | null
    listingCounter: string | null
    passCounter: string | null
    snapshotPeriod: string | null
    updatedAt: Date | null
  }

  export type MarketplaceConfigCountAggregateOutputType = {
    accountAddress: number
    authority: number
    currentPeriodRevenue: number
    totalLifetimeRevenue: number
    listingCounter: number
    passCounter: number
    snapshotPeriod: number
    updatedAt: number
    _all: number
  }


  export type MarketplaceConfigMinAggregateInputType = {
    accountAddress?: true
    authority?: true
    currentPeriodRevenue?: true
    totalLifetimeRevenue?: true
    listingCounter?: true
    passCounter?: true
    snapshotPeriod?: true
    updatedAt?: true
  }

  export type MarketplaceConfigMaxAggregateInputType = {
    accountAddress?: true
    authority?: true
    currentPeriodRevenue?: true
    totalLifetimeRevenue?: true
    listingCounter?: true
    passCounter?: true
    snapshotPeriod?: true
    updatedAt?: true
  }

  export type MarketplaceConfigCountAggregateInputType = {
    accountAddress?: true
    authority?: true
    currentPeriodRevenue?: true
    totalLifetimeRevenue?: true
    listingCounter?: true
    passCounter?: true
    snapshotPeriod?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketplaceConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketplaceConfig to aggregate.
     */
    where?: MarketplaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketplaceConfigs to fetch.
     */
    orderBy?: MarketplaceConfigOrderByWithRelationInput | MarketplaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketplaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketplaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketplaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketplaceConfigs
    **/
    _count?: true | MarketplaceConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketplaceConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketplaceConfigMaxAggregateInputType
  }

  export type GetMarketplaceConfigAggregateType<T extends MarketplaceConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketplaceConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketplaceConfig[P]>
      : GetScalarType<T[P], AggregateMarketplaceConfig[P]>
  }




  export type MarketplaceConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketplaceConfigWhereInput
    orderBy?: MarketplaceConfigOrderByWithAggregationInput | MarketplaceConfigOrderByWithAggregationInput[]
    by: MarketplaceConfigScalarFieldEnum[] | MarketplaceConfigScalarFieldEnum
    having?: MarketplaceConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketplaceConfigCountAggregateInputType | true
    _min?: MarketplaceConfigMinAggregateInputType
    _max?: MarketplaceConfigMaxAggregateInputType
  }

  export type MarketplaceConfigGroupByOutputType = {
    accountAddress: string
    authority: string
    currentPeriodRevenue: string
    totalLifetimeRevenue: string
    listingCounter: string
    passCounter: string
    snapshotPeriod: string
    updatedAt: Date
    _count: MarketplaceConfigCountAggregateOutputType | null
    _min: MarketplaceConfigMinAggregateOutputType | null
    _max: MarketplaceConfigMaxAggregateOutputType | null
  }

  type GetMarketplaceConfigGroupByPayload<T extends MarketplaceConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketplaceConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketplaceConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketplaceConfigGroupByOutputType[P]>
            : GetScalarType<T[P], MarketplaceConfigGroupByOutputType[P]>
        }
      >
    >


  export type MarketplaceConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accountAddress?: boolean
    authority?: boolean
    currentPeriodRevenue?: boolean
    totalLifetimeRevenue?: boolean
    listingCounter?: boolean
    passCounter?: boolean
    snapshotPeriod?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["marketplaceConfig"]>

  export type MarketplaceConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accountAddress?: boolean
    authority?: boolean
    currentPeriodRevenue?: boolean
    totalLifetimeRevenue?: boolean
    listingCounter?: boolean
    passCounter?: boolean
    snapshotPeriod?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["marketplaceConfig"]>

  export type MarketplaceConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accountAddress?: boolean
    authority?: boolean
    currentPeriodRevenue?: boolean
    totalLifetimeRevenue?: boolean
    listingCounter?: boolean
    passCounter?: boolean
    snapshotPeriod?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["marketplaceConfig"]>

  export type MarketplaceConfigSelectScalar = {
    accountAddress?: boolean
    authority?: boolean
    currentPeriodRevenue?: boolean
    totalLifetimeRevenue?: boolean
    listingCounter?: boolean
    passCounter?: boolean
    snapshotPeriod?: boolean
    updatedAt?: boolean
  }

  export type MarketplaceConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"accountAddress" | "authority" | "currentPeriodRevenue" | "totalLifetimeRevenue" | "listingCounter" | "passCounter" | "snapshotPeriod" | "updatedAt", ExtArgs["result"]["marketplaceConfig"]>

  export type $MarketplaceConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketplaceConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      accountAddress: string
      authority: string
      currentPeriodRevenue: string
      totalLifetimeRevenue: string
      listingCounter: string
      passCounter: string
      snapshotPeriod: string
      updatedAt: Date
    }, ExtArgs["result"]["marketplaceConfig"]>
    composites: {}
  }

  type MarketplaceConfigGetPayload<S extends boolean | null | undefined | MarketplaceConfigDefaultArgs> = $Result.GetResult<Prisma.$MarketplaceConfigPayload, S>

  type MarketplaceConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketplaceConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketplaceConfigCountAggregateInputType | true
    }

  export interface MarketplaceConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketplaceConfig'], meta: { name: 'MarketplaceConfig' } }
    /**
     * Find zero or one MarketplaceConfig that matches the filter.
     * @param {MarketplaceConfigFindUniqueArgs} args - Arguments to find a MarketplaceConfig
     * @example
     * // Get one MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketplaceConfigFindUniqueArgs>(args: SelectSubset<T, MarketplaceConfigFindUniqueArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketplaceConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketplaceConfigFindUniqueOrThrowArgs} args - Arguments to find a MarketplaceConfig
     * @example
     * // Get one MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketplaceConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketplaceConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketplaceConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigFindFirstArgs} args - Arguments to find a MarketplaceConfig
     * @example
     * // Get one MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketplaceConfigFindFirstArgs>(args?: SelectSubset<T, MarketplaceConfigFindFirstArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketplaceConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigFindFirstOrThrowArgs} args - Arguments to find a MarketplaceConfig
     * @example
     * // Get one MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketplaceConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketplaceConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketplaceConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketplaceConfigs
     * const marketplaceConfigs = await prisma.marketplaceConfig.findMany()
     * 
     * // Get first 10 MarketplaceConfigs
     * const marketplaceConfigs = await prisma.marketplaceConfig.findMany({ take: 10 })
     * 
     * // Only select the `accountAddress`
     * const marketplaceConfigWithAccountAddressOnly = await prisma.marketplaceConfig.findMany({ select: { accountAddress: true } })
     * 
     */
    findMany<T extends MarketplaceConfigFindManyArgs>(args?: SelectSubset<T, MarketplaceConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketplaceConfig.
     * @param {MarketplaceConfigCreateArgs} args - Arguments to create a MarketplaceConfig.
     * @example
     * // Create one MarketplaceConfig
     * const MarketplaceConfig = await prisma.marketplaceConfig.create({
     *   data: {
     *     // ... data to create a MarketplaceConfig
     *   }
     * })
     * 
     */
    create<T extends MarketplaceConfigCreateArgs>(args: SelectSubset<T, MarketplaceConfigCreateArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketplaceConfigs.
     * @param {MarketplaceConfigCreateManyArgs} args - Arguments to create many MarketplaceConfigs.
     * @example
     * // Create many MarketplaceConfigs
     * const marketplaceConfig = await prisma.marketplaceConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketplaceConfigCreateManyArgs>(args?: SelectSubset<T, MarketplaceConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarketplaceConfigs and returns the data saved in the database.
     * @param {MarketplaceConfigCreateManyAndReturnArgs} args - Arguments to create many MarketplaceConfigs.
     * @example
     * // Create many MarketplaceConfigs
     * const marketplaceConfig = await prisma.marketplaceConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarketplaceConfigs and only return the `accountAddress`
     * const marketplaceConfigWithAccountAddressOnly = await prisma.marketplaceConfig.createManyAndReturn({
     *   select: { accountAddress: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketplaceConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketplaceConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MarketplaceConfig.
     * @param {MarketplaceConfigDeleteArgs} args - Arguments to delete one MarketplaceConfig.
     * @example
     * // Delete one MarketplaceConfig
     * const MarketplaceConfig = await prisma.marketplaceConfig.delete({
     *   where: {
     *     // ... filter to delete one MarketplaceConfig
     *   }
     * })
     * 
     */
    delete<T extends MarketplaceConfigDeleteArgs>(args: SelectSubset<T, MarketplaceConfigDeleteArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketplaceConfig.
     * @param {MarketplaceConfigUpdateArgs} args - Arguments to update one MarketplaceConfig.
     * @example
     * // Update one MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketplaceConfigUpdateArgs>(args: SelectSubset<T, MarketplaceConfigUpdateArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketplaceConfigs.
     * @param {MarketplaceConfigDeleteManyArgs} args - Arguments to filter MarketplaceConfigs to delete.
     * @example
     * // Delete a few MarketplaceConfigs
     * const { count } = await prisma.marketplaceConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketplaceConfigDeleteManyArgs>(args?: SelectSubset<T, MarketplaceConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketplaceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketplaceConfigs
     * const marketplaceConfig = await prisma.marketplaceConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketplaceConfigUpdateManyArgs>(args: SelectSubset<T, MarketplaceConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketplaceConfigs and returns the data updated in the database.
     * @param {MarketplaceConfigUpdateManyAndReturnArgs} args - Arguments to update many MarketplaceConfigs.
     * @example
     * // Update many MarketplaceConfigs
     * const marketplaceConfig = await prisma.marketplaceConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MarketplaceConfigs and only return the `accountAddress`
     * const marketplaceConfigWithAccountAddressOnly = await prisma.marketplaceConfig.updateManyAndReturn({
     *   select: { accountAddress: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketplaceConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketplaceConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MarketplaceConfig.
     * @param {MarketplaceConfigUpsertArgs} args - Arguments to update or create a MarketplaceConfig.
     * @example
     * // Update or create a MarketplaceConfig
     * const marketplaceConfig = await prisma.marketplaceConfig.upsert({
     *   create: {
     *     // ... data to create a MarketplaceConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketplaceConfig we want to update
     *   }
     * })
     */
    upsert<T extends MarketplaceConfigUpsertArgs>(args: SelectSubset<T, MarketplaceConfigUpsertArgs<ExtArgs>>): Prisma__MarketplaceConfigClient<$Result.GetResult<Prisma.$MarketplaceConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketplaceConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigCountArgs} args - Arguments to filter MarketplaceConfigs to count.
     * @example
     * // Count the number of MarketplaceConfigs
     * const count = await prisma.marketplaceConfig.count({
     *   where: {
     *     // ... the filter for the MarketplaceConfigs we want to count
     *   }
     * })
    **/
    count<T extends MarketplaceConfigCountArgs>(
      args?: Subset<T, MarketplaceConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketplaceConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketplaceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketplaceConfigAggregateArgs>(args: Subset<T, MarketplaceConfigAggregateArgs>): Prisma.PrismaPromise<GetMarketplaceConfigAggregateType<T>>

    /**
     * Group by MarketplaceConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketplaceConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketplaceConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketplaceConfigGroupByArgs['orderBy'] }
        : { orderBy?: MarketplaceConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketplaceConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketplaceConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketplaceConfig model
   */
  readonly fields: MarketplaceConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketplaceConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketplaceConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarketplaceConfig model
   */
  interface MarketplaceConfigFieldRefs {
    readonly accountAddress: FieldRef<"MarketplaceConfig", 'String'>
    readonly authority: FieldRef<"MarketplaceConfig", 'String'>
    readonly currentPeriodRevenue: FieldRef<"MarketplaceConfig", 'String'>
    readonly totalLifetimeRevenue: FieldRef<"MarketplaceConfig", 'String'>
    readonly listingCounter: FieldRef<"MarketplaceConfig", 'String'>
    readonly passCounter: FieldRef<"MarketplaceConfig", 'String'>
    readonly snapshotPeriod: FieldRef<"MarketplaceConfig", 'String'>
    readonly updatedAt: FieldRef<"MarketplaceConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MarketplaceConfig findUnique
   */
  export type MarketplaceConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter, which MarketplaceConfig to fetch.
     */
    where: MarketplaceConfigWhereUniqueInput
  }

  /**
   * MarketplaceConfig findUniqueOrThrow
   */
  export type MarketplaceConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter, which MarketplaceConfig to fetch.
     */
    where: MarketplaceConfigWhereUniqueInput
  }

  /**
   * MarketplaceConfig findFirst
   */
  export type MarketplaceConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter, which MarketplaceConfig to fetch.
     */
    where?: MarketplaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketplaceConfigs to fetch.
     */
    orderBy?: MarketplaceConfigOrderByWithRelationInput | MarketplaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketplaceConfigs.
     */
    cursor?: MarketplaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketplaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketplaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketplaceConfigs.
     */
    distinct?: MarketplaceConfigScalarFieldEnum | MarketplaceConfigScalarFieldEnum[]
  }

  /**
   * MarketplaceConfig findFirstOrThrow
   */
  export type MarketplaceConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter, which MarketplaceConfig to fetch.
     */
    where?: MarketplaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketplaceConfigs to fetch.
     */
    orderBy?: MarketplaceConfigOrderByWithRelationInput | MarketplaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketplaceConfigs.
     */
    cursor?: MarketplaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketplaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketplaceConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketplaceConfigs.
     */
    distinct?: MarketplaceConfigScalarFieldEnum | MarketplaceConfigScalarFieldEnum[]
  }

  /**
   * MarketplaceConfig findMany
   */
  export type MarketplaceConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter, which MarketplaceConfigs to fetch.
     */
    where?: MarketplaceConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketplaceConfigs to fetch.
     */
    orderBy?: MarketplaceConfigOrderByWithRelationInput | MarketplaceConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketplaceConfigs.
     */
    cursor?: MarketplaceConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketplaceConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketplaceConfigs.
     */
    skip?: number
    distinct?: MarketplaceConfigScalarFieldEnum | MarketplaceConfigScalarFieldEnum[]
  }

  /**
   * MarketplaceConfig create
   */
  export type MarketplaceConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a MarketplaceConfig.
     */
    data: XOR<MarketplaceConfigCreateInput, MarketplaceConfigUncheckedCreateInput>
  }

  /**
   * MarketplaceConfig createMany
   */
  export type MarketplaceConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketplaceConfigs.
     */
    data: MarketplaceConfigCreateManyInput | MarketplaceConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketplaceConfig createManyAndReturn
   */
  export type MarketplaceConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * The data used to create many MarketplaceConfigs.
     */
    data: MarketplaceConfigCreateManyInput | MarketplaceConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketplaceConfig update
   */
  export type MarketplaceConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a MarketplaceConfig.
     */
    data: XOR<MarketplaceConfigUpdateInput, MarketplaceConfigUncheckedUpdateInput>
    /**
     * Choose, which MarketplaceConfig to update.
     */
    where: MarketplaceConfigWhereUniqueInput
  }

  /**
   * MarketplaceConfig updateMany
   */
  export type MarketplaceConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketplaceConfigs.
     */
    data: XOR<MarketplaceConfigUpdateManyMutationInput, MarketplaceConfigUncheckedUpdateManyInput>
    /**
     * Filter which MarketplaceConfigs to update
     */
    where?: MarketplaceConfigWhereInput
    /**
     * Limit how many MarketplaceConfigs to update.
     */
    limit?: number
  }

  /**
   * MarketplaceConfig updateManyAndReturn
   */
  export type MarketplaceConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * The data used to update MarketplaceConfigs.
     */
    data: XOR<MarketplaceConfigUpdateManyMutationInput, MarketplaceConfigUncheckedUpdateManyInput>
    /**
     * Filter which MarketplaceConfigs to update
     */
    where?: MarketplaceConfigWhereInput
    /**
     * Limit how many MarketplaceConfigs to update.
     */
    limit?: number
  }

  /**
   * MarketplaceConfig upsert
   */
  export type MarketplaceConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the MarketplaceConfig to update in case it exists.
     */
    where: MarketplaceConfigWhereUniqueInput
    /**
     * In case the MarketplaceConfig found by the `where` argument doesn't exist, create a new MarketplaceConfig with this data.
     */
    create: XOR<MarketplaceConfigCreateInput, MarketplaceConfigUncheckedCreateInput>
    /**
     * In case the MarketplaceConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketplaceConfigUpdateInput, MarketplaceConfigUncheckedUpdateInput>
  }

  /**
   * MarketplaceConfig delete
   */
  export type MarketplaceConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
    /**
     * Filter which MarketplaceConfig to delete.
     */
    where: MarketplaceConfigWhereUniqueInput
  }

  /**
   * MarketplaceConfig deleteMany
   */
  export type MarketplaceConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketplaceConfigs to delete
     */
    where?: MarketplaceConfigWhereInput
    /**
     * Limit how many MarketplaceConfigs to delete.
     */
    limit?: number
  }

  /**
   * MarketplaceConfig without action
   */
  export type MarketplaceConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketplaceConfig
     */
    select?: MarketplaceConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketplaceConfig
     */
    omit?: MarketplaceConfigOmit<ExtArgs> | null
  }


  /**
   * Model DataSeller
   */

  export type AggregateDataSeller = {
    _count: DataSellerCountAggregateOutputType | null
    _min: DataSellerMinAggregateOutputType | null
    _max: DataSellerMaxAggregateOutputType | null
  }

  export type DataSellerMinAggregateOutputType = {
    sellerAddress: string | null
    listingId: string | null
    totalRevenue: string | null
    unclaimedRevenue: string | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type DataSellerMaxAggregateOutputType = {
    sellerAddress: string | null
    listingId: string | null
    totalRevenue: string | null
    unclaimedRevenue: string | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type DataSellerCountAggregateOutputType = {
    sellerAddress: number
    listingId: number
    totalRevenue: number
    unclaimedRevenue: number
    accountAddress: number
    updatedAt: number
    _all: number
  }


  export type DataSellerMinAggregateInputType = {
    sellerAddress?: true
    listingId?: true
    totalRevenue?: true
    unclaimedRevenue?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type DataSellerMaxAggregateInputType = {
    sellerAddress?: true
    listingId?: true
    totalRevenue?: true
    unclaimedRevenue?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type DataSellerCountAggregateInputType = {
    sellerAddress?: true
    listingId?: true
    totalRevenue?: true
    unclaimedRevenue?: true
    accountAddress?: true
    updatedAt?: true
    _all?: true
  }

  export type DataSellerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataSeller to aggregate.
     */
    where?: DataSellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataSellers to fetch.
     */
    orderBy?: DataSellerOrderByWithRelationInput | DataSellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataSellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataSellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataSellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataSellers
    **/
    _count?: true | DataSellerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataSellerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataSellerMaxAggregateInputType
  }

  export type GetDataSellerAggregateType<T extends DataSellerAggregateArgs> = {
        [P in keyof T & keyof AggregateDataSeller]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataSeller[P]>
      : GetScalarType<T[P], AggregateDataSeller[P]>
  }




  export type DataSellerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataSellerWhereInput
    orderBy?: DataSellerOrderByWithAggregationInput | DataSellerOrderByWithAggregationInput[]
    by: DataSellerScalarFieldEnum[] | DataSellerScalarFieldEnum
    having?: DataSellerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataSellerCountAggregateInputType | true
    _min?: DataSellerMinAggregateInputType
    _max?: DataSellerMaxAggregateInputType
  }

  export type DataSellerGroupByOutputType = {
    sellerAddress: string
    listingId: string | null
    totalRevenue: string
    unclaimedRevenue: string
    accountAddress: string
    updatedAt: Date
    _count: DataSellerCountAggregateOutputType | null
    _min: DataSellerMinAggregateOutputType | null
    _max: DataSellerMaxAggregateOutputType | null
  }

  type GetDataSellerGroupByPayload<T extends DataSellerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataSellerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataSellerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataSellerGroupByOutputType[P]>
            : GetScalarType<T[P], DataSellerGroupByOutputType[P]>
        }
      >
    >


  export type DataSellerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    listingId?: boolean
    totalRevenue?: boolean
    unclaimedRevenue?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataSeller"]>

  export type DataSellerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    listingId?: boolean
    totalRevenue?: boolean
    unclaimedRevenue?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataSeller"]>

  export type DataSellerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    listingId?: boolean
    totalRevenue?: boolean
    unclaimedRevenue?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataSeller"]>

  export type DataSellerSelectScalar = {
    sellerAddress?: boolean
    listingId?: boolean
    totalRevenue?: boolean
    unclaimedRevenue?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }

  export type DataSellerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sellerAddress" | "listingId" | "totalRevenue" | "unclaimedRevenue" | "accountAddress" | "updatedAt", ExtArgs["result"]["dataSeller"]>

  export type $DataSellerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataSeller"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      sellerAddress: string
      listingId: string | null
      totalRevenue: string
      unclaimedRevenue: string
      accountAddress: string
      updatedAt: Date
    }, ExtArgs["result"]["dataSeller"]>
    composites: {}
  }

  type DataSellerGetPayload<S extends boolean | null | undefined | DataSellerDefaultArgs> = $Result.GetResult<Prisma.$DataSellerPayload, S>

  type DataSellerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataSellerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataSellerCountAggregateInputType | true
    }

  export interface DataSellerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataSeller'], meta: { name: 'DataSeller' } }
    /**
     * Find zero or one DataSeller that matches the filter.
     * @param {DataSellerFindUniqueArgs} args - Arguments to find a DataSeller
     * @example
     * // Get one DataSeller
     * const dataSeller = await prisma.dataSeller.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataSellerFindUniqueArgs>(args: SelectSubset<T, DataSellerFindUniqueArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataSeller that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataSellerFindUniqueOrThrowArgs} args - Arguments to find a DataSeller
     * @example
     * // Get one DataSeller
     * const dataSeller = await prisma.dataSeller.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataSellerFindUniqueOrThrowArgs>(args: SelectSubset<T, DataSellerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataSeller that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerFindFirstArgs} args - Arguments to find a DataSeller
     * @example
     * // Get one DataSeller
     * const dataSeller = await prisma.dataSeller.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataSellerFindFirstArgs>(args?: SelectSubset<T, DataSellerFindFirstArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataSeller that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerFindFirstOrThrowArgs} args - Arguments to find a DataSeller
     * @example
     * // Get one DataSeller
     * const dataSeller = await prisma.dataSeller.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataSellerFindFirstOrThrowArgs>(args?: SelectSubset<T, DataSellerFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataSellers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataSellers
     * const dataSellers = await prisma.dataSeller.findMany()
     * 
     * // Get first 10 DataSellers
     * const dataSellers = await prisma.dataSeller.findMany({ take: 10 })
     * 
     * // Only select the `sellerAddress`
     * const dataSellerWithSellerAddressOnly = await prisma.dataSeller.findMany({ select: { sellerAddress: true } })
     * 
     */
    findMany<T extends DataSellerFindManyArgs>(args?: SelectSubset<T, DataSellerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataSeller.
     * @param {DataSellerCreateArgs} args - Arguments to create a DataSeller.
     * @example
     * // Create one DataSeller
     * const DataSeller = await prisma.dataSeller.create({
     *   data: {
     *     // ... data to create a DataSeller
     *   }
     * })
     * 
     */
    create<T extends DataSellerCreateArgs>(args: SelectSubset<T, DataSellerCreateArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataSellers.
     * @param {DataSellerCreateManyArgs} args - Arguments to create many DataSellers.
     * @example
     * // Create many DataSellers
     * const dataSeller = await prisma.dataSeller.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataSellerCreateManyArgs>(args?: SelectSubset<T, DataSellerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataSellers and returns the data saved in the database.
     * @param {DataSellerCreateManyAndReturnArgs} args - Arguments to create many DataSellers.
     * @example
     * // Create many DataSellers
     * const dataSeller = await prisma.dataSeller.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataSellers and only return the `sellerAddress`
     * const dataSellerWithSellerAddressOnly = await prisma.dataSeller.createManyAndReturn({
     *   select: { sellerAddress: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataSellerCreateManyAndReturnArgs>(args?: SelectSubset<T, DataSellerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataSeller.
     * @param {DataSellerDeleteArgs} args - Arguments to delete one DataSeller.
     * @example
     * // Delete one DataSeller
     * const DataSeller = await prisma.dataSeller.delete({
     *   where: {
     *     // ... filter to delete one DataSeller
     *   }
     * })
     * 
     */
    delete<T extends DataSellerDeleteArgs>(args: SelectSubset<T, DataSellerDeleteArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataSeller.
     * @param {DataSellerUpdateArgs} args - Arguments to update one DataSeller.
     * @example
     * // Update one DataSeller
     * const dataSeller = await prisma.dataSeller.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataSellerUpdateArgs>(args: SelectSubset<T, DataSellerUpdateArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataSellers.
     * @param {DataSellerDeleteManyArgs} args - Arguments to filter DataSellers to delete.
     * @example
     * // Delete a few DataSellers
     * const { count } = await prisma.dataSeller.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataSellerDeleteManyArgs>(args?: SelectSubset<T, DataSellerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataSellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataSellers
     * const dataSeller = await prisma.dataSeller.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataSellerUpdateManyArgs>(args: SelectSubset<T, DataSellerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataSellers and returns the data updated in the database.
     * @param {DataSellerUpdateManyAndReturnArgs} args - Arguments to update many DataSellers.
     * @example
     * // Update many DataSellers
     * const dataSeller = await prisma.dataSeller.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataSellers and only return the `sellerAddress`
     * const dataSellerWithSellerAddressOnly = await prisma.dataSeller.updateManyAndReturn({
     *   select: { sellerAddress: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataSellerUpdateManyAndReturnArgs>(args: SelectSubset<T, DataSellerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataSeller.
     * @param {DataSellerUpsertArgs} args - Arguments to update or create a DataSeller.
     * @example
     * // Update or create a DataSeller
     * const dataSeller = await prisma.dataSeller.upsert({
     *   create: {
     *     // ... data to create a DataSeller
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataSeller we want to update
     *   }
     * })
     */
    upsert<T extends DataSellerUpsertArgs>(args: SelectSubset<T, DataSellerUpsertArgs<ExtArgs>>): Prisma__DataSellerClient<$Result.GetResult<Prisma.$DataSellerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataSellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerCountArgs} args - Arguments to filter DataSellers to count.
     * @example
     * // Count the number of DataSellers
     * const count = await prisma.dataSeller.count({
     *   where: {
     *     // ... the filter for the DataSellers we want to count
     *   }
     * })
    **/
    count<T extends DataSellerCountArgs>(
      args?: Subset<T, DataSellerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataSellerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataSeller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataSellerAggregateArgs>(args: Subset<T, DataSellerAggregateArgs>): Prisma.PrismaPromise<GetDataSellerAggregateType<T>>

    /**
     * Group by DataSeller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataSellerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataSellerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataSellerGroupByArgs['orderBy'] }
        : { orderBy?: DataSellerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataSellerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataSellerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataSeller model
   */
  readonly fields: DataSellerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataSeller.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataSellerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DataSeller model
   */
  interface DataSellerFieldRefs {
    readonly sellerAddress: FieldRef<"DataSeller", 'String'>
    readonly listingId: FieldRef<"DataSeller", 'String'>
    readonly totalRevenue: FieldRef<"DataSeller", 'String'>
    readonly unclaimedRevenue: FieldRef<"DataSeller", 'String'>
    readonly accountAddress: FieldRef<"DataSeller", 'String'>
    readonly updatedAt: FieldRef<"DataSeller", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DataSeller findUnique
   */
  export type DataSellerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter, which DataSeller to fetch.
     */
    where: DataSellerWhereUniqueInput
  }

  /**
   * DataSeller findUniqueOrThrow
   */
  export type DataSellerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter, which DataSeller to fetch.
     */
    where: DataSellerWhereUniqueInput
  }

  /**
   * DataSeller findFirst
   */
  export type DataSellerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter, which DataSeller to fetch.
     */
    where?: DataSellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataSellers to fetch.
     */
    orderBy?: DataSellerOrderByWithRelationInput | DataSellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataSellers.
     */
    cursor?: DataSellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataSellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataSellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataSellers.
     */
    distinct?: DataSellerScalarFieldEnum | DataSellerScalarFieldEnum[]
  }

  /**
   * DataSeller findFirstOrThrow
   */
  export type DataSellerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter, which DataSeller to fetch.
     */
    where?: DataSellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataSellers to fetch.
     */
    orderBy?: DataSellerOrderByWithRelationInput | DataSellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataSellers.
     */
    cursor?: DataSellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataSellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataSellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataSellers.
     */
    distinct?: DataSellerScalarFieldEnum | DataSellerScalarFieldEnum[]
  }

  /**
   * DataSeller findMany
   */
  export type DataSellerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter, which DataSellers to fetch.
     */
    where?: DataSellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataSellers to fetch.
     */
    orderBy?: DataSellerOrderByWithRelationInput | DataSellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataSellers.
     */
    cursor?: DataSellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataSellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataSellers.
     */
    skip?: number
    distinct?: DataSellerScalarFieldEnum | DataSellerScalarFieldEnum[]
  }

  /**
   * DataSeller create
   */
  export type DataSellerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * The data needed to create a DataSeller.
     */
    data: XOR<DataSellerCreateInput, DataSellerUncheckedCreateInput>
  }

  /**
   * DataSeller createMany
   */
  export type DataSellerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataSellers.
     */
    data: DataSellerCreateManyInput | DataSellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataSeller createManyAndReturn
   */
  export type DataSellerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * The data used to create many DataSellers.
     */
    data: DataSellerCreateManyInput | DataSellerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataSeller update
   */
  export type DataSellerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * The data needed to update a DataSeller.
     */
    data: XOR<DataSellerUpdateInput, DataSellerUncheckedUpdateInput>
    /**
     * Choose, which DataSeller to update.
     */
    where: DataSellerWhereUniqueInput
  }

  /**
   * DataSeller updateMany
   */
  export type DataSellerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataSellers.
     */
    data: XOR<DataSellerUpdateManyMutationInput, DataSellerUncheckedUpdateManyInput>
    /**
     * Filter which DataSellers to update
     */
    where?: DataSellerWhereInput
    /**
     * Limit how many DataSellers to update.
     */
    limit?: number
  }

  /**
   * DataSeller updateManyAndReturn
   */
  export type DataSellerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * The data used to update DataSellers.
     */
    data: XOR<DataSellerUpdateManyMutationInput, DataSellerUncheckedUpdateManyInput>
    /**
     * Filter which DataSellers to update
     */
    where?: DataSellerWhereInput
    /**
     * Limit how many DataSellers to update.
     */
    limit?: number
  }

  /**
   * DataSeller upsert
   */
  export type DataSellerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * The filter to search for the DataSeller to update in case it exists.
     */
    where: DataSellerWhereUniqueInput
    /**
     * In case the DataSeller found by the `where` argument doesn't exist, create a new DataSeller with this data.
     */
    create: XOR<DataSellerCreateInput, DataSellerUncheckedCreateInput>
    /**
     * In case the DataSeller was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataSellerUpdateInput, DataSellerUncheckedUpdateInput>
  }

  /**
   * DataSeller delete
   */
  export type DataSellerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
    /**
     * Filter which DataSeller to delete.
     */
    where: DataSellerWhereUniqueInput
  }

  /**
   * DataSeller deleteMany
   */
  export type DataSellerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataSellers to delete
     */
    where?: DataSellerWhereInput
    /**
     * Limit how many DataSellers to delete.
     */
    limit?: number
  }

  /**
   * DataSeller without action
   */
  export type DataSellerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataSeller
     */
    select?: DataSellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataSeller
     */
    omit?: DataSellerOmit<ExtArgs> | null
  }


  /**
   * Model DataListing
   */

  export type AggregateDataListing = {
    _count: DataListingCountAggregateOutputType | null
    _min: DataListingMinAggregateOutputType | null
    _max: DataListingMaxAggregateOutputType | null
  }

  export type DataListingMinAggregateOutputType = {
    listingId: string | null
    sellerAddress: string | null
    startDate: Date | null
    endDate: Date | null
    pricePerDay: string | null
    accountAddress: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type DataListingMaxAggregateOutputType = {
    listingId: string | null
    sellerAddress: string | null
    startDate: Date | null
    endDate: Date | null
    pricePerDay: string | null
    accountAddress: string | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type DataListingCountAggregateOutputType = {
    listingId: number
    sellerAddress: number
    startDate: number
    endDate: number
    pricePerDay: number
    accountAddress: number
    isActive: number
    updatedAt: number
    _all: number
  }


  export type DataListingMinAggregateInputType = {
    listingId?: true
    sellerAddress?: true
    startDate?: true
    endDate?: true
    pricePerDay?: true
    accountAddress?: true
    isActive?: true
    updatedAt?: true
  }

  export type DataListingMaxAggregateInputType = {
    listingId?: true
    sellerAddress?: true
    startDate?: true
    endDate?: true
    pricePerDay?: true
    accountAddress?: true
    isActive?: true
    updatedAt?: true
  }

  export type DataListingCountAggregateInputType = {
    listingId?: true
    sellerAddress?: true
    startDate?: true
    endDate?: true
    pricePerDay?: true
    accountAddress?: true
    isActive?: true
    updatedAt?: true
    _all?: true
  }

  export type DataListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataListing to aggregate.
     */
    where?: DataListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataListings to fetch.
     */
    orderBy?: DataListingOrderByWithRelationInput | DataListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataListings
    **/
    _count?: true | DataListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataListingMaxAggregateInputType
  }

  export type GetDataListingAggregateType<T extends DataListingAggregateArgs> = {
        [P in keyof T & keyof AggregateDataListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataListing[P]>
      : GetScalarType<T[P], AggregateDataListing[P]>
  }




  export type DataListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataListingWhereInput
    orderBy?: DataListingOrderByWithAggregationInput | DataListingOrderByWithAggregationInput[]
    by: DataListingScalarFieldEnum[] | DataListingScalarFieldEnum
    having?: DataListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataListingCountAggregateInputType | true
    _min?: DataListingMinAggregateInputType
    _max?: DataListingMaxAggregateInputType
  }

  export type DataListingGroupByOutputType = {
    listingId: string
    sellerAddress: string
    startDate: Date
    endDate: Date
    pricePerDay: string
    accountAddress: string
    isActive: boolean
    updatedAt: Date
    _count: DataListingCountAggregateOutputType | null
    _min: DataListingMinAggregateOutputType | null
    _max: DataListingMaxAggregateOutputType | null
  }

  type GetDataListingGroupByPayload<T extends DataListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataListingGroupByOutputType[P]>
            : GetScalarType<T[P], DataListingGroupByOutputType[P]>
        }
      >
    >


  export type DataListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listingId?: boolean
    sellerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerDay?: boolean
    accountAddress?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataListing"]>

  export type DataListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listingId?: boolean
    sellerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerDay?: boolean
    accountAddress?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataListing"]>

  export type DataListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listingId?: boolean
    sellerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerDay?: boolean
    accountAddress?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataListing"]>

  export type DataListingSelectScalar = {
    listingId?: boolean
    sellerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerDay?: boolean
    accountAddress?: boolean
    isActive?: boolean
    updatedAt?: boolean
  }

  export type DataListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"listingId" | "sellerAddress" | "startDate" | "endDate" | "pricePerDay" | "accountAddress" | "isActive" | "updatedAt", ExtArgs["result"]["dataListing"]>

  export type $DataListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataListing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      listingId: string
      sellerAddress: string
      startDate: Date
      endDate: Date
      pricePerDay: string
      accountAddress: string
      isActive: boolean
      updatedAt: Date
    }, ExtArgs["result"]["dataListing"]>
    composites: {}
  }

  type DataListingGetPayload<S extends boolean | null | undefined | DataListingDefaultArgs> = $Result.GetResult<Prisma.$DataListingPayload, S>

  type DataListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataListingCountAggregateInputType | true
    }

  export interface DataListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataListing'], meta: { name: 'DataListing' } }
    /**
     * Find zero or one DataListing that matches the filter.
     * @param {DataListingFindUniqueArgs} args - Arguments to find a DataListing
     * @example
     * // Get one DataListing
     * const dataListing = await prisma.dataListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataListingFindUniqueArgs>(args: SelectSubset<T, DataListingFindUniqueArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataListingFindUniqueOrThrowArgs} args - Arguments to find a DataListing
     * @example
     * // Get one DataListing
     * const dataListing = await prisma.dataListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataListingFindUniqueOrThrowArgs>(args: SelectSubset<T, DataListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingFindFirstArgs} args - Arguments to find a DataListing
     * @example
     * // Get one DataListing
     * const dataListing = await prisma.dataListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataListingFindFirstArgs>(args?: SelectSubset<T, DataListingFindFirstArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingFindFirstOrThrowArgs} args - Arguments to find a DataListing
     * @example
     * // Get one DataListing
     * const dataListing = await prisma.dataListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataListingFindFirstOrThrowArgs>(args?: SelectSubset<T, DataListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataListings
     * const dataListings = await prisma.dataListing.findMany()
     * 
     * // Get first 10 DataListings
     * const dataListings = await prisma.dataListing.findMany({ take: 10 })
     * 
     * // Only select the `listingId`
     * const dataListingWithListingIdOnly = await prisma.dataListing.findMany({ select: { listingId: true } })
     * 
     */
    findMany<T extends DataListingFindManyArgs>(args?: SelectSubset<T, DataListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataListing.
     * @param {DataListingCreateArgs} args - Arguments to create a DataListing.
     * @example
     * // Create one DataListing
     * const DataListing = await prisma.dataListing.create({
     *   data: {
     *     // ... data to create a DataListing
     *   }
     * })
     * 
     */
    create<T extends DataListingCreateArgs>(args: SelectSubset<T, DataListingCreateArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataListings.
     * @param {DataListingCreateManyArgs} args - Arguments to create many DataListings.
     * @example
     * // Create many DataListings
     * const dataListing = await prisma.dataListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataListingCreateManyArgs>(args?: SelectSubset<T, DataListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataListings and returns the data saved in the database.
     * @param {DataListingCreateManyAndReturnArgs} args - Arguments to create many DataListings.
     * @example
     * // Create many DataListings
     * const dataListing = await prisma.dataListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataListings and only return the `listingId`
     * const dataListingWithListingIdOnly = await prisma.dataListing.createManyAndReturn({
     *   select: { listingId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataListingCreateManyAndReturnArgs>(args?: SelectSubset<T, DataListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataListing.
     * @param {DataListingDeleteArgs} args - Arguments to delete one DataListing.
     * @example
     * // Delete one DataListing
     * const DataListing = await prisma.dataListing.delete({
     *   where: {
     *     // ... filter to delete one DataListing
     *   }
     * })
     * 
     */
    delete<T extends DataListingDeleteArgs>(args: SelectSubset<T, DataListingDeleteArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataListing.
     * @param {DataListingUpdateArgs} args - Arguments to update one DataListing.
     * @example
     * // Update one DataListing
     * const dataListing = await prisma.dataListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataListingUpdateArgs>(args: SelectSubset<T, DataListingUpdateArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataListings.
     * @param {DataListingDeleteManyArgs} args - Arguments to filter DataListings to delete.
     * @example
     * // Delete a few DataListings
     * const { count } = await prisma.dataListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataListingDeleteManyArgs>(args?: SelectSubset<T, DataListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataListings
     * const dataListing = await prisma.dataListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataListingUpdateManyArgs>(args: SelectSubset<T, DataListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataListings and returns the data updated in the database.
     * @param {DataListingUpdateManyAndReturnArgs} args - Arguments to update many DataListings.
     * @example
     * // Update many DataListings
     * const dataListing = await prisma.dataListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataListings and only return the `listingId`
     * const dataListingWithListingIdOnly = await prisma.dataListing.updateManyAndReturn({
     *   select: { listingId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataListingUpdateManyAndReturnArgs>(args: SelectSubset<T, DataListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataListing.
     * @param {DataListingUpsertArgs} args - Arguments to update or create a DataListing.
     * @example
     * // Update or create a DataListing
     * const dataListing = await prisma.dataListing.upsert({
     *   create: {
     *     // ... data to create a DataListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataListing we want to update
     *   }
     * })
     */
    upsert<T extends DataListingUpsertArgs>(args: SelectSubset<T, DataListingUpsertArgs<ExtArgs>>): Prisma__DataListingClient<$Result.GetResult<Prisma.$DataListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingCountArgs} args - Arguments to filter DataListings to count.
     * @example
     * // Count the number of DataListings
     * const count = await prisma.dataListing.count({
     *   where: {
     *     // ... the filter for the DataListings we want to count
     *   }
     * })
    **/
    count<T extends DataListingCountArgs>(
      args?: Subset<T, DataListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataListingAggregateArgs>(args: Subset<T, DataListingAggregateArgs>): Prisma.PrismaPromise<GetDataListingAggregateType<T>>

    /**
     * Group by DataListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataListingGroupByArgs['orderBy'] }
        : { orderBy?: DataListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataListing model
   */
  readonly fields: DataListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DataListing model
   */
  interface DataListingFieldRefs {
    readonly listingId: FieldRef<"DataListing", 'String'>
    readonly sellerAddress: FieldRef<"DataListing", 'String'>
    readonly startDate: FieldRef<"DataListing", 'DateTime'>
    readonly endDate: FieldRef<"DataListing", 'DateTime'>
    readonly pricePerDay: FieldRef<"DataListing", 'String'>
    readonly accountAddress: FieldRef<"DataListing", 'String'>
    readonly isActive: FieldRef<"DataListing", 'Boolean'>
    readonly updatedAt: FieldRef<"DataListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DataListing findUnique
   */
  export type DataListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter, which DataListing to fetch.
     */
    where: DataListingWhereUniqueInput
  }

  /**
   * DataListing findUniqueOrThrow
   */
  export type DataListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter, which DataListing to fetch.
     */
    where: DataListingWhereUniqueInput
  }

  /**
   * DataListing findFirst
   */
  export type DataListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter, which DataListing to fetch.
     */
    where?: DataListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataListings to fetch.
     */
    orderBy?: DataListingOrderByWithRelationInput | DataListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataListings.
     */
    cursor?: DataListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataListings.
     */
    distinct?: DataListingScalarFieldEnum | DataListingScalarFieldEnum[]
  }

  /**
   * DataListing findFirstOrThrow
   */
  export type DataListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter, which DataListing to fetch.
     */
    where?: DataListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataListings to fetch.
     */
    orderBy?: DataListingOrderByWithRelationInput | DataListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataListings.
     */
    cursor?: DataListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataListings.
     */
    distinct?: DataListingScalarFieldEnum | DataListingScalarFieldEnum[]
  }

  /**
   * DataListing findMany
   */
  export type DataListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter, which DataListings to fetch.
     */
    where?: DataListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataListings to fetch.
     */
    orderBy?: DataListingOrderByWithRelationInput | DataListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataListings.
     */
    cursor?: DataListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataListings.
     */
    skip?: number
    distinct?: DataListingScalarFieldEnum | DataListingScalarFieldEnum[]
  }

  /**
   * DataListing create
   */
  export type DataListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * The data needed to create a DataListing.
     */
    data: XOR<DataListingCreateInput, DataListingUncheckedCreateInput>
  }

  /**
   * DataListing createMany
   */
  export type DataListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataListings.
     */
    data: DataListingCreateManyInput | DataListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataListing createManyAndReturn
   */
  export type DataListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * The data used to create many DataListings.
     */
    data: DataListingCreateManyInput | DataListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataListing update
   */
  export type DataListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * The data needed to update a DataListing.
     */
    data: XOR<DataListingUpdateInput, DataListingUncheckedUpdateInput>
    /**
     * Choose, which DataListing to update.
     */
    where: DataListingWhereUniqueInput
  }

  /**
   * DataListing updateMany
   */
  export type DataListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataListings.
     */
    data: XOR<DataListingUpdateManyMutationInput, DataListingUncheckedUpdateManyInput>
    /**
     * Filter which DataListings to update
     */
    where?: DataListingWhereInput
    /**
     * Limit how many DataListings to update.
     */
    limit?: number
  }

  /**
   * DataListing updateManyAndReturn
   */
  export type DataListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * The data used to update DataListings.
     */
    data: XOR<DataListingUpdateManyMutationInput, DataListingUncheckedUpdateManyInput>
    /**
     * Filter which DataListings to update
     */
    where?: DataListingWhereInput
    /**
     * Limit how many DataListings to update.
     */
    limit?: number
  }

  /**
   * DataListing upsert
   */
  export type DataListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * The filter to search for the DataListing to update in case it exists.
     */
    where: DataListingWhereUniqueInput
    /**
     * In case the DataListing found by the `where` argument doesn't exist, create a new DataListing with this data.
     */
    create: XOR<DataListingCreateInput, DataListingUncheckedCreateInput>
    /**
     * In case the DataListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataListingUpdateInput, DataListingUncheckedUpdateInput>
  }

  /**
   * DataListing delete
   */
  export type DataListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
    /**
     * Filter which DataListing to delete.
     */
    where: DataListingWhereUniqueInput
  }

  /**
   * DataListing deleteMany
   */
  export type DataListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataListings to delete
     */
    where?: DataListingWhereInput
    /**
     * Limit how many DataListings to delete.
     */
    limit?: number
  }

  /**
   * DataListing without action
   */
  export type DataListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataListing
     */
    select?: DataListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataListing
     */
    omit?: DataListingOmit<ExtArgs> | null
  }


  /**
   * Model DataPass
   */

  export type AggregateDataPass = {
    _count: DataPassCountAggregateOutputType | null
    _avg: DataPassAvgAggregateOutputType | null
    _sum: DataPassSumAggregateOutputType | null
    _min: DataPassMinAggregateOutputType | null
    _max: DataPassMaxAggregateOutputType | null
  }

  export type DataPassAvgAggregateOutputType = {
    eligibleSellerCount: number | null
  }

  export type DataPassSumAggregateOutputType = {
    eligibleSellerCount: number | null
  }

  export type DataPassMinAggregateOutputType = {
    passId: string | null
    buyerAddress: string | null
    startDate: Date | null
    endDate: Date | null
    maxPricePerDay: string | null
    totalPaid: string | null
    dataNftMint: string | null
    purchasedAt: Date | null
    eligibleSellerCount: number | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type DataPassMaxAggregateOutputType = {
    passId: string | null
    buyerAddress: string | null
    startDate: Date | null
    endDate: Date | null
    maxPricePerDay: string | null
    totalPaid: string | null
    dataNftMint: string | null
    purchasedAt: Date | null
    eligibleSellerCount: number | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type DataPassCountAggregateOutputType = {
    passId: number
    buyerAddress: number
    startDate: number
    endDate: number
    maxPricePerDay: number
    totalPaid: number
    dataNftMint: number
    purchasedAt: number
    eligibleSellerCount: number
    accountAddress: number
    updatedAt: number
    _all: number
  }


  export type DataPassAvgAggregateInputType = {
    eligibleSellerCount?: true
  }

  export type DataPassSumAggregateInputType = {
    eligibleSellerCount?: true
  }

  export type DataPassMinAggregateInputType = {
    passId?: true
    buyerAddress?: true
    startDate?: true
    endDate?: true
    maxPricePerDay?: true
    totalPaid?: true
    dataNftMint?: true
    purchasedAt?: true
    eligibleSellerCount?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type DataPassMaxAggregateInputType = {
    passId?: true
    buyerAddress?: true
    startDate?: true
    endDate?: true
    maxPricePerDay?: true
    totalPaid?: true
    dataNftMint?: true
    purchasedAt?: true
    eligibleSellerCount?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type DataPassCountAggregateInputType = {
    passId?: true
    buyerAddress?: true
    startDate?: true
    endDate?: true
    maxPricePerDay?: true
    totalPaid?: true
    dataNftMint?: true
    purchasedAt?: true
    eligibleSellerCount?: true
    accountAddress?: true
    updatedAt?: true
    _all?: true
  }

  export type DataPassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataPass to aggregate.
     */
    where?: DataPassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataPasses to fetch.
     */
    orderBy?: DataPassOrderByWithRelationInput | DataPassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataPassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataPasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataPasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataPasses
    **/
    _count?: true | DataPassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataPassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataPassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataPassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataPassMaxAggregateInputType
  }

  export type GetDataPassAggregateType<T extends DataPassAggregateArgs> = {
        [P in keyof T & keyof AggregateDataPass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataPass[P]>
      : GetScalarType<T[P], AggregateDataPass[P]>
  }




  export type DataPassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataPassWhereInput
    orderBy?: DataPassOrderByWithAggregationInput | DataPassOrderByWithAggregationInput[]
    by: DataPassScalarFieldEnum[] | DataPassScalarFieldEnum
    having?: DataPassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataPassCountAggregateInputType | true
    _avg?: DataPassAvgAggregateInputType
    _sum?: DataPassSumAggregateInputType
    _min?: DataPassMinAggregateInputType
    _max?: DataPassMaxAggregateInputType
  }

  export type DataPassGroupByOutputType = {
    passId: string
    buyerAddress: string
    startDate: Date
    endDate: Date
    maxPricePerDay: string
    totalPaid: string
    dataNftMint: string
    purchasedAt: Date
    eligibleSellerCount: number
    accountAddress: string
    updatedAt: Date
    _count: DataPassCountAggregateOutputType | null
    _avg: DataPassAvgAggregateOutputType | null
    _sum: DataPassSumAggregateOutputType | null
    _min: DataPassMinAggregateOutputType | null
    _max: DataPassMaxAggregateOutputType | null
  }

  type GetDataPassGroupByPayload<T extends DataPassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataPassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataPassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataPassGroupByOutputType[P]>
            : GetScalarType<T[P], DataPassGroupByOutputType[P]>
        }
      >
    >


  export type DataPassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    passId?: boolean
    buyerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    maxPricePerDay?: boolean
    totalPaid?: boolean
    dataNftMint?: boolean
    purchasedAt?: boolean
    eligibleSellerCount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataPass"]>

  export type DataPassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    passId?: boolean
    buyerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    maxPricePerDay?: boolean
    totalPaid?: boolean
    dataNftMint?: boolean
    purchasedAt?: boolean
    eligibleSellerCount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataPass"]>

  export type DataPassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    passId?: boolean
    buyerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    maxPricePerDay?: boolean
    totalPaid?: boolean
    dataNftMint?: boolean
    purchasedAt?: boolean
    eligibleSellerCount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dataPass"]>

  export type DataPassSelectScalar = {
    passId?: boolean
    buyerAddress?: boolean
    startDate?: boolean
    endDate?: boolean
    maxPricePerDay?: boolean
    totalPaid?: boolean
    dataNftMint?: boolean
    purchasedAt?: boolean
    eligibleSellerCount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }

  export type DataPassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"passId" | "buyerAddress" | "startDate" | "endDate" | "maxPricePerDay" | "totalPaid" | "dataNftMint" | "purchasedAt" | "eligibleSellerCount" | "accountAddress" | "updatedAt", ExtArgs["result"]["dataPass"]>

  export type $DataPassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataPass"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      passId: string
      buyerAddress: string
      startDate: Date
      endDate: Date
      maxPricePerDay: string
      totalPaid: string
      dataNftMint: string
      purchasedAt: Date
      eligibleSellerCount: number
      accountAddress: string
      updatedAt: Date
    }, ExtArgs["result"]["dataPass"]>
    composites: {}
  }

  type DataPassGetPayload<S extends boolean | null | undefined | DataPassDefaultArgs> = $Result.GetResult<Prisma.$DataPassPayload, S>

  type DataPassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataPassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataPassCountAggregateInputType | true
    }

  export interface DataPassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataPass'], meta: { name: 'DataPass' } }
    /**
     * Find zero or one DataPass that matches the filter.
     * @param {DataPassFindUniqueArgs} args - Arguments to find a DataPass
     * @example
     * // Get one DataPass
     * const dataPass = await prisma.dataPass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataPassFindUniqueArgs>(args: SelectSubset<T, DataPassFindUniqueArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataPass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataPassFindUniqueOrThrowArgs} args - Arguments to find a DataPass
     * @example
     * // Get one DataPass
     * const dataPass = await prisma.dataPass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataPassFindUniqueOrThrowArgs>(args: SelectSubset<T, DataPassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataPass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassFindFirstArgs} args - Arguments to find a DataPass
     * @example
     * // Get one DataPass
     * const dataPass = await prisma.dataPass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataPassFindFirstArgs>(args?: SelectSubset<T, DataPassFindFirstArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataPass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassFindFirstOrThrowArgs} args - Arguments to find a DataPass
     * @example
     * // Get one DataPass
     * const dataPass = await prisma.dataPass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataPassFindFirstOrThrowArgs>(args?: SelectSubset<T, DataPassFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataPasses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataPasses
     * const dataPasses = await prisma.dataPass.findMany()
     * 
     * // Get first 10 DataPasses
     * const dataPasses = await prisma.dataPass.findMany({ take: 10 })
     * 
     * // Only select the `passId`
     * const dataPassWithPassIdOnly = await prisma.dataPass.findMany({ select: { passId: true } })
     * 
     */
    findMany<T extends DataPassFindManyArgs>(args?: SelectSubset<T, DataPassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataPass.
     * @param {DataPassCreateArgs} args - Arguments to create a DataPass.
     * @example
     * // Create one DataPass
     * const DataPass = await prisma.dataPass.create({
     *   data: {
     *     // ... data to create a DataPass
     *   }
     * })
     * 
     */
    create<T extends DataPassCreateArgs>(args: SelectSubset<T, DataPassCreateArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataPasses.
     * @param {DataPassCreateManyArgs} args - Arguments to create many DataPasses.
     * @example
     * // Create many DataPasses
     * const dataPass = await prisma.dataPass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataPassCreateManyArgs>(args?: SelectSubset<T, DataPassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataPasses and returns the data saved in the database.
     * @param {DataPassCreateManyAndReturnArgs} args - Arguments to create many DataPasses.
     * @example
     * // Create many DataPasses
     * const dataPass = await prisma.dataPass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataPasses and only return the `passId`
     * const dataPassWithPassIdOnly = await prisma.dataPass.createManyAndReturn({
     *   select: { passId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataPassCreateManyAndReturnArgs>(args?: SelectSubset<T, DataPassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataPass.
     * @param {DataPassDeleteArgs} args - Arguments to delete one DataPass.
     * @example
     * // Delete one DataPass
     * const DataPass = await prisma.dataPass.delete({
     *   where: {
     *     // ... filter to delete one DataPass
     *   }
     * })
     * 
     */
    delete<T extends DataPassDeleteArgs>(args: SelectSubset<T, DataPassDeleteArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataPass.
     * @param {DataPassUpdateArgs} args - Arguments to update one DataPass.
     * @example
     * // Update one DataPass
     * const dataPass = await prisma.dataPass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataPassUpdateArgs>(args: SelectSubset<T, DataPassUpdateArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataPasses.
     * @param {DataPassDeleteManyArgs} args - Arguments to filter DataPasses to delete.
     * @example
     * // Delete a few DataPasses
     * const { count } = await prisma.dataPass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataPassDeleteManyArgs>(args?: SelectSubset<T, DataPassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataPasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataPasses
     * const dataPass = await prisma.dataPass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataPassUpdateManyArgs>(args: SelectSubset<T, DataPassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataPasses and returns the data updated in the database.
     * @param {DataPassUpdateManyAndReturnArgs} args - Arguments to update many DataPasses.
     * @example
     * // Update many DataPasses
     * const dataPass = await prisma.dataPass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataPasses and only return the `passId`
     * const dataPassWithPassIdOnly = await prisma.dataPass.updateManyAndReturn({
     *   select: { passId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataPassUpdateManyAndReturnArgs>(args: SelectSubset<T, DataPassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataPass.
     * @param {DataPassUpsertArgs} args - Arguments to update or create a DataPass.
     * @example
     * // Update or create a DataPass
     * const dataPass = await prisma.dataPass.upsert({
     *   create: {
     *     // ... data to create a DataPass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataPass we want to update
     *   }
     * })
     */
    upsert<T extends DataPassUpsertArgs>(args: SelectSubset<T, DataPassUpsertArgs<ExtArgs>>): Prisma__DataPassClient<$Result.GetResult<Prisma.$DataPassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataPasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassCountArgs} args - Arguments to filter DataPasses to count.
     * @example
     * // Count the number of DataPasses
     * const count = await prisma.dataPass.count({
     *   where: {
     *     // ... the filter for the DataPasses we want to count
     *   }
     * })
    **/
    count<T extends DataPassCountArgs>(
      args?: Subset<T, DataPassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataPassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataPass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataPassAggregateArgs>(args: Subset<T, DataPassAggregateArgs>): Prisma.PrismaPromise<GetDataPassAggregateType<T>>

    /**
     * Group by DataPass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataPassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataPassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataPassGroupByArgs['orderBy'] }
        : { orderBy?: DataPassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataPassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataPassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataPass model
   */
  readonly fields: DataPassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataPass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataPassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DataPass model
   */
  interface DataPassFieldRefs {
    readonly passId: FieldRef<"DataPass", 'String'>
    readonly buyerAddress: FieldRef<"DataPass", 'String'>
    readonly startDate: FieldRef<"DataPass", 'DateTime'>
    readonly endDate: FieldRef<"DataPass", 'DateTime'>
    readonly maxPricePerDay: FieldRef<"DataPass", 'String'>
    readonly totalPaid: FieldRef<"DataPass", 'String'>
    readonly dataNftMint: FieldRef<"DataPass", 'String'>
    readonly purchasedAt: FieldRef<"DataPass", 'DateTime'>
    readonly eligibleSellerCount: FieldRef<"DataPass", 'Int'>
    readonly accountAddress: FieldRef<"DataPass", 'String'>
    readonly updatedAt: FieldRef<"DataPass", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DataPass findUnique
   */
  export type DataPassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter, which DataPass to fetch.
     */
    where: DataPassWhereUniqueInput
  }

  /**
   * DataPass findUniqueOrThrow
   */
  export type DataPassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter, which DataPass to fetch.
     */
    where: DataPassWhereUniqueInput
  }

  /**
   * DataPass findFirst
   */
  export type DataPassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter, which DataPass to fetch.
     */
    where?: DataPassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataPasses to fetch.
     */
    orderBy?: DataPassOrderByWithRelationInput | DataPassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataPasses.
     */
    cursor?: DataPassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataPasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataPasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataPasses.
     */
    distinct?: DataPassScalarFieldEnum | DataPassScalarFieldEnum[]
  }

  /**
   * DataPass findFirstOrThrow
   */
  export type DataPassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter, which DataPass to fetch.
     */
    where?: DataPassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataPasses to fetch.
     */
    orderBy?: DataPassOrderByWithRelationInput | DataPassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataPasses.
     */
    cursor?: DataPassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataPasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataPasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataPasses.
     */
    distinct?: DataPassScalarFieldEnum | DataPassScalarFieldEnum[]
  }

  /**
   * DataPass findMany
   */
  export type DataPassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter, which DataPasses to fetch.
     */
    where?: DataPassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataPasses to fetch.
     */
    orderBy?: DataPassOrderByWithRelationInput | DataPassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataPasses.
     */
    cursor?: DataPassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataPasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataPasses.
     */
    skip?: number
    distinct?: DataPassScalarFieldEnum | DataPassScalarFieldEnum[]
  }

  /**
   * DataPass create
   */
  export type DataPassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * The data needed to create a DataPass.
     */
    data: XOR<DataPassCreateInput, DataPassUncheckedCreateInput>
  }

  /**
   * DataPass createMany
   */
  export type DataPassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataPasses.
     */
    data: DataPassCreateManyInput | DataPassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataPass createManyAndReturn
   */
  export type DataPassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * The data used to create many DataPasses.
     */
    data: DataPassCreateManyInput | DataPassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataPass update
   */
  export type DataPassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * The data needed to update a DataPass.
     */
    data: XOR<DataPassUpdateInput, DataPassUncheckedUpdateInput>
    /**
     * Choose, which DataPass to update.
     */
    where: DataPassWhereUniqueInput
  }

  /**
   * DataPass updateMany
   */
  export type DataPassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataPasses.
     */
    data: XOR<DataPassUpdateManyMutationInput, DataPassUncheckedUpdateManyInput>
    /**
     * Filter which DataPasses to update
     */
    where?: DataPassWhereInput
    /**
     * Limit how many DataPasses to update.
     */
    limit?: number
  }

  /**
   * DataPass updateManyAndReturn
   */
  export type DataPassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * The data used to update DataPasses.
     */
    data: XOR<DataPassUpdateManyMutationInput, DataPassUncheckedUpdateManyInput>
    /**
     * Filter which DataPasses to update
     */
    where?: DataPassWhereInput
    /**
     * Limit how many DataPasses to update.
     */
    limit?: number
  }

  /**
   * DataPass upsert
   */
  export type DataPassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * The filter to search for the DataPass to update in case it exists.
     */
    where: DataPassWhereUniqueInput
    /**
     * In case the DataPass found by the `where` argument doesn't exist, create a new DataPass with this data.
     */
    create: XOR<DataPassCreateInput, DataPassUncheckedCreateInput>
    /**
     * In case the DataPass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataPassUpdateInput, DataPassUncheckedUpdateInput>
  }

  /**
   * DataPass delete
   */
  export type DataPassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
    /**
     * Filter which DataPass to delete.
     */
    where: DataPassWhereUniqueInput
  }

  /**
   * DataPass deleteMany
   */
  export type DataPassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataPasses to delete
     */
    where?: DataPassWhereInput
    /**
     * Limit how many DataPasses to delete.
     */
    limit?: number
  }

  /**
   * DataPass without action
   */
  export type DataPassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataPass
     */
    select?: DataPassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataPass
     */
    omit?: DataPassOmit<ExtArgs> | null
  }


  /**
   * Model MerkleDistributor
   */

  export type AggregateMerkleDistributor = {
    _count: MerkleDistributorCountAggregateOutputType | null
    _avg: MerkleDistributorAvgAggregateOutputType | null
    _sum: MerkleDistributorSumAggregateOutputType | null
    _min: MerkleDistributorMinAggregateOutputType | null
    _max: MerkleDistributorMaxAggregateOutputType | null
  }

  export type MerkleDistributorAvgAggregateOutputType = {
    periodId: number | null
  }

  export type MerkleDistributorSumAggregateOutputType = {
    periodId: bigint | null
  }

  export type MerkleDistributorMinAggregateOutputType = {
    periodId: bigint | null
    merkleRoot: string | null
    totalPoolBalance: string | null
    snapshotTimestamp: Date | null
    totalClaims: string | null
    claimedAmount: string | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type MerkleDistributorMaxAggregateOutputType = {
    periodId: bigint | null
    merkleRoot: string | null
    totalPoolBalance: string | null
    snapshotTimestamp: Date | null
    totalClaims: string | null
    claimedAmount: string | null
    accountAddress: string | null
    updatedAt: Date | null
  }

  export type MerkleDistributorCountAggregateOutputType = {
    periodId: number
    merkleRoot: number
    totalPoolBalance: number
    snapshotTimestamp: number
    totalClaims: number
    claimedAmount: number
    accountAddress: number
    updatedAt: number
    _all: number
  }


  export type MerkleDistributorAvgAggregateInputType = {
    periodId?: true
  }

  export type MerkleDistributorSumAggregateInputType = {
    periodId?: true
  }

  export type MerkleDistributorMinAggregateInputType = {
    periodId?: true
    merkleRoot?: true
    totalPoolBalance?: true
    snapshotTimestamp?: true
    totalClaims?: true
    claimedAmount?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type MerkleDistributorMaxAggregateInputType = {
    periodId?: true
    merkleRoot?: true
    totalPoolBalance?: true
    snapshotTimestamp?: true
    totalClaims?: true
    claimedAmount?: true
    accountAddress?: true
    updatedAt?: true
  }

  export type MerkleDistributorCountAggregateInputType = {
    periodId?: true
    merkleRoot?: true
    totalPoolBalance?: true
    snapshotTimestamp?: true
    totalClaims?: true
    claimedAmount?: true
    accountAddress?: true
    updatedAt?: true
    _all?: true
  }

  export type MerkleDistributorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerkleDistributor to aggregate.
     */
    where?: MerkleDistributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleDistributors to fetch.
     */
    orderBy?: MerkleDistributorOrderByWithRelationInput | MerkleDistributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerkleDistributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleDistributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleDistributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerkleDistributors
    **/
    _count?: true | MerkleDistributorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MerkleDistributorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MerkleDistributorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerkleDistributorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerkleDistributorMaxAggregateInputType
  }

  export type GetMerkleDistributorAggregateType<T extends MerkleDistributorAggregateArgs> = {
        [P in keyof T & keyof AggregateMerkleDistributor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerkleDistributor[P]>
      : GetScalarType<T[P], AggregateMerkleDistributor[P]>
  }




  export type MerkleDistributorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerkleDistributorWhereInput
    orderBy?: MerkleDistributorOrderByWithAggregationInput | MerkleDistributorOrderByWithAggregationInput[]
    by: MerkleDistributorScalarFieldEnum[] | MerkleDistributorScalarFieldEnum
    having?: MerkleDistributorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerkleDistributorCountAggregateInputType | true
    _avg?: MerkleDistributorAvgAggregateInputType
    _sum?: MerkleDistributorSumAggregateInputType
    _min?: MerkleDistributorMinAggregateInputType
    _max?: MerkleDistributorMaxAggregateInputType
  }

  export type MerkleDistributorGroupByOutputType = {
    periodId: bigint
    merkleRoot: string
    totalPoolBalance: string
    snapshotTimestamp: Date
    totalClaims: string
    claimedAmount: string
    accountAddress: string
    updatedAt: Date
    _count: MerkleDistributorCountAggregateOutputType | null
    _avg: MerkleDistributorAvgAggregateOutputType | null
    _sum: MerkleDistributorSumAggregateOutputType | null
    _min: MerkleDistributorMinAggregateOutputType | null
    _max: MerkleDistributorMaxAggregateOutputType | null
  }

  type GetMerkleDistributorGroupByPayload<T extends MerkleDistributorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerkleDistributorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerkleDistributorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerkleDistributorGroupByOutputType[P]>
            : GetScalarType<T[P], MerkleDistributorGroupByOutputType[P]>
        }
      >
    >


  export type MerkleDistributorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    periodId?: boolean
    merkleRoot?: boolean
    totalPoolBalance?: boolean
    snapshotTimestamp?: boolean
    totalClaims?: boolean
    claimedAmount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merkleDistributor"]>

  export type MerkleDistributorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    periodId?: boolean
    merkleRoot?: boolean
    totalPoolBalance?: boolean
    snapshotTimestamp?: boolean
    totalClaims?: boolean
    claimedAmount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merkleDistributor"]>

  export type MerkleDistributorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    periodId?: boolean
    merkleRoot?: boolean
    totalPoolBalance?: boolean
    snapshotTimestamp?: boolean
    totalClaims?: boolean
    claimedAmount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merkleDistributor"]>

  export type MerkleDistributorSelectScalar = {
    periodId?: boolean
    merkleRoot?: boolean
    totalPoolBalance?: boolean
    snapshotTimestamp?: boolean
    totalClaims?: boolean
    claimedAmount?: boolean
    accountAddress?: boolean
    updatedAt?: boolean
  }

  export type MerkleDistributorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"periodId" | "merkleRoot" | "totalPoolBalance" | "snapshotTimestamp" | "totalClaims" | "claimedAmount" | "accountAddress" | "updatedAt", ExtArgs["result"]["merkleDistributor"]>

  export type $MerkleDistributorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerkleDistributor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      periodId: bigint
      merkleRoot: string
      totalPoolBalance: string
      snapshotTimestamp: Date
      totalClaims: string
      claimedAmount: string
      accountAddress: string
      updatedAt: Date
    }, ExtArgs["result"]["merkleDistributor"]>
    composites: {}
  }

  type MerkleDistributorGetPayload<S extends boolean | null | undefined | MerkleDistributorDefaultArgs> = $Result.GetResult<Prisma.$MerkleDistributorPayload, S>

  type MerkleDistributorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerkleDistributorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerkleDistributorCountAggregateInputType | true
    }

  export interface MerkleDistributorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerkleDistributor'], meta: { name: 'MerkleDistributor' } }
    /**
     * Find zero or one MerkleDistributor that matches the filter.
     * @param {MerkleDistributorFindUniqueArgs} args - Arguments to find a MerkleDistributor
     * @example
     * // Get one MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerkleDistributorFindUniqueArgs>(args: SelectSubset<T, MerkleDistributorFindUniqueArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerkleDistributor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerkleDistributorFindUniqueOrThrowArgs} args - Arguments to find a MerkleDistributor
     * @example
     * // Get one MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerkleDistributorFindUniqueOrThrowArgs>(args: SelectSubset<T, MerkleDistributorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerkleDistributor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorFindFirstArgs} args - Arguments to find a MerkleDistributor
     * @example
     * // Get one MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerkleDistributorFindFirstArgs>(args?: SelectSubset<T, MerkleDistributorFindFirstArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerkleDistributor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorFindFirstOrThrowArgs} args - Arguments to find a MerkleDistributor
     * @example
     * // Get one MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerkleDistributorFindFirstOrThrowArgs>(args?: SelectSubset<T, MerkleDistributorFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerkleDistributors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerkleDistributors
     * const merkleDistributors = await prisma.merkleDistributor.findMany()
     * 
     * // Get first 10 MerkleDistributors
     * const merkleDistributors = await prisma.merkleDistributor.findMany({ take: 10 })
     * 
     * // Only select the `periodId`
     * const merkleDistributorWithPeriodIdOnly = await prisma.merkleDistributor.findMany({ select: { periodId: true } })
     * 
     */
    findMany<T extends MerkleDistributorFindManyArgs>(args?: SelectSubset<T, MerkleDistributorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerkleDistributor.
     * @param {MerkleDistributorCreateArgs} args - Arguments to create a MerkleDistributor.
     * @example
     * // Create one MerkleDistributor
     * const MerkleDistributor = await prisma.merkleDistributor.create({
     *   data: {
     *     // ... data to create a MerkleDistributor
     *   }
     * })
     * 
     */
    create<T extends MerkleDistributorCreateArgs>(args: SelectSubset<T, MerkleDistributorCreateArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerkleDistributors.
     * @param {MerkleDistributorCreateManyArgs} args - Arguments to create many MerkleDistributors.
     * @example
     * // Create many MerkleDistributors
     * const merkleDistributor = await prisma.merkleDistributor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerkleDistributorCreateManyArgs>(args?: SelectSubset<T, MerkleDistributorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerkleDistributors and returns the data saved in the database.
     * @param {MerkleDistributorCreateManyAndReturnArgs} args - Arguments to create many MerkleDistributors.
     * @example
     * // Create many MerkleDistributors
     * const merkleDistributor = await prisma.merkleDistributor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerkleDistributors and only return the `periodId`
     * const merkleDistributorWithPeriodIdOnly = await prisma.merkleDistributor.createManyAndReturn({
     *   select: { periodId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerkleDistributorCreateManyAndReturnArgs>(args?: SelectSubset<T, MerkleDistributorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerkleDistributor.
     * @param {MerkleDistributorDeleteArgs} args - Arguments to delete one MerkleDistributor.
     * @example
     * // Delete one MerkleDistributor
     * const MerkleDistributor = await prisma.merkleDistributor.delete({
     *   where: {
     *     // ... filter to delete one MerkleDistributor
     *   }
     * })
     * 
     */
    delete<T extends MerkleDistributorDeleteArgs>(args: SelectSubset<T, MerkleDistributorDeleteArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerkleDistributor.
     * @param {MerkleDistributorUpdateArgs} args - Arguments to update one MerkleDistributor.
     * @example
     * // Update one MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerkleDistributorUpdateArgs>(args: SelectSubset<T, MerkleDistributorUpdateArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerkleDistributors.
     * @param {MerkleDistributorDeleteManyArgs} args - Arguments to filter MerkleDistributors to delete.
     * @example
     * // Delete a few MerkleDistributors
     * const { count } = await prisma.merkleDistributor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerkleDistributorDeleteManyArgs>(args?: SelectSubset<T, MerkleDistributorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerkleDistributors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerkleDistributors
     * const merkleDistributor = await prisma.merkleDistributor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerkleDistributorUpdateManyArgs>(args: SelectSubset<T, MerkleDistributorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerkleDistributors and returns the data updated in the database.
     * @param {MerkleDistributorUpdateManyAndReturnArgs} args - Arguments to update many MerkleDistributors.
     * @example
     * // Update many MerkleDistributors
     * const merkleDistributor = await prisma.merkleDistributor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerkleDistributors and only return the `periodId`
     * const merkleDistributorWithPeriodIdOnly = await prisma.merkleDistributor.updateManyAndReturn({
     *   select: { periodId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerkleDistributorUpdateManyAndReturnArgs>(args: SelectSubset<T, MerkleDistributorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerkleDistributor.
     * @param {MerkleDistributorUpsertArgs} args - Arguments to update or create a MerkleDistributor.
     * @example
     * // Update or create a MerkleDistributor
     * const merkleDistributor = await prisma.merkleDistributor.upsert({
     *   create: {
     *     // ... data to create a MerkleDistributor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerkleDistributor we want to update
     *   }
     * })
     */
    upsert<T extends MerkleDistributorUpsertArgs>(args: SelectSubset<T, MerkleDistributorUpsertArgs<ExtArgs>>): Prisma__MerkleDistributorClient<$Result.GetResult<Prisma.$MerkleDistributorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerkleDistributors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorCountArgs} args - Arguments to filter MerkleDistributors to count.
     * @example
     * // Count the number of MerkleDistributors
     * const count = await prisma.merkleDistributor.count({
     *   where: {
     *     // ... the filter for the MerkleDistributors we want to count
     *   }
     * })
    **/
    count<T extends MerkleDistributorCountArgs>(
      args?: Subset<T, MerkleDistributorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerkleDistributorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerkleDistributor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerkleDistributorAggregateArgs>(args: Subset<T, MerkleDistributorAggregateArgs>): Prisma.PrismaPromise<GetMerkleDistributorAggregateType<T>>

    /**
     * Group by MerkleDistributor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleDistributorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerkleDistributorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerkleDistributorGroupByArgs['orderBy'] }
        : { orderBy?: MerkleDistributorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerkleDistributorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerkleDistributorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerkleDistributor model
   */
  readonly fields: MerkleDistributorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerkleDistributor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerkleDistributorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerkleDistributor model
   */
  interface MerkleDistributorFieldRefs {
    readonly periodId: FieldRef<"MerkleDistributor", 'BigInt'>
    readonly merkleRoot: FieldRef<"MerkleDistributor", 'String'>
    readonly totalPoolBalance: FieldRef<"MerkleDistributor", 'String'>
    readonly snapshotTimestamp: FieldRef<"MerkleDistributor", 'DateTime'>
    readonly totalClaims: FieldRef<"MerkleDistributor", 'String'>
    readonly claimedAmount: FieldRef<"MerkleDistributor", 'String'>
    readonly accountAddress: FieldRef<"MerkleDistributor", 'String'>
    readonly updatedAt: FieldRef<"MerkleDistributor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MerkleDistributor findUnique
   */
  export type MerkleDistributorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter, which MerkleDistributor to fetch.
     */
    where: MerkleDistributorWhereUniqueInput
  }

  /**
   * MerkleDistributor findUniqueOrThrow
   */
  export type MerkleDistributorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter, which MerkleDistributor to fetch.
     */
    where: MerkleDistributorWhereUniqueInput
  }

  /**
   * MerkleDistributor findFirst
   */
  export type MerkleDistributorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter, which MerkleDistributor to fetch.
     */
    where?: MerkleDistributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleDistributors to fetch.
     */
    orderBy?: MerkleDistributorOrderByWithRelationInput | MerkleDistributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerkleDistributors.
     */
    cursor?: MerkleDistributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleDistributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleDistributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerkleDistributors.
     */
    distinct?: MerkleDistributorScalarFieldEnum | MerkleDistributorScalarFieldEnum[]
  }

  /**
   * MerkleDistributor findFirstOrThrow
   */
  export type MerkleDistributorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter, which MerkleDistributor to fetch.
     */
    where?: MerkleDistributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleDistributors to fetch.
     */
    orderBy?: MerkleDistributorOrderByWithRelationInput | MerkleDistributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerkleDistributors.
     */
    cursor?: MerkleDistributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleDistributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleDistributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerkleDistributors.
     */
    distinct?: MerkleDistributorScalarFieldEnum | MerkleDistributorScalarFieldEnum[]
  }

  /**
   * MerkleDistributor findMany
   */
  export type MerkleDistributorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter, which MerkleDistributors to fetch.
     */
    where?: MerkleDistributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleDistributors to fetch.
     */
    orderBy?: MerkleDistributorOrderByWithRelationInput | MerkleDistributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerkleDistributors.
     */
    cursor?: MerkleDistributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleDistributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleDistributors.
     */
    skip?: number
    distinct?: MerkleDistributorScalarFieldEnum | MerkleDistributorScalarFieldEnum[]
  }

  /**
   * MerkleDistributor create
   */
  export type MerkleDistributorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * The data needed to create a MerkleDistributor.
     */
    data: XOR<MerkleDistributorCreateInput, MerkleDistributorUncheckedCreateInput>
  }

  /**
   * MerkleDistributor createMany
   */
  export type MerkleDistributorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerkleDistributors.
     */
    data: MerkleDistributorCreateManyInput | MerkleDistributorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerkleDistributor createManyAndReturn
   */
  export type MerkleDistributorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * The data used to create many MerkleDistributors.
     */
    data: MerkleDistributorCreateManyInput | MerkleDistributorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerkleDistributor update
   */
  export type MerkleDistributorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * The data needed to update a MerkleDistributor.
     */
    data: XOR<MerkleDistributorUpdateInput, MerkleDistributorUncheckedUpdateInput>
    /**
     * Choose, which MerkleDistributor to update.
     */
    where: MerkleDistributorWhereUniqueInput
  }

  /**
   * MerkleDistributor updateMany
   */
  export type MerkleDistributorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerkleDistributors.
     */
    data: XOR<MerkleDistributorUpdateManyMutationInput, MerkleDistributorUncheckedUpdateManyInput>
    /**
     * Filter which MerkleDistributors to update
     */
    where?: MerkleDistributorWhereInput
    /**
     * Limit how many MerkleDistributors to update.
     */
    limit?: number
  }

  /**
   * MerkleDistributor updateManyAndReturn
   */
  export type MerkleDistributorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * The data used to update MerkleDistributors.
     */
    data: XOR<MerkleDistributorUpdateManyMutationInput, MerkleDistributorUncheckedUpdateManyInput>
    /**
     * Filter which MerkleDistributors to update
     */
    where?: MerkleDistributorWhereInput
    /**
     * Limit how many MerkleDistributors to update.
     */
    limit?: number
  }

  /**
   * MerkleDistributor upsert
   */
  export type MerkleDistributorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * The filter to search for the MerkleDistributor to update in case it exists.
     */
    where: MerkleDistributorWhereUniqueInput
    /**
     * In case the MerkleDistributor found by the `where` argument doesn't exist, create a new MerkleDistributor with this data.
     */
    create: XOR<MerkleDistributorCreateInput, MerkleDistributorUncheckedCreateInput>
    /**
     * In case the MerkleDistributor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerkleDistributorUpdateInput, MerkleDistributorUncheckedUpdateInput>
  }

  /**
   * MerkleDistributor delete
   */
  export type MerkleDistributorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
    /**
     * Filter which MerkleDistributor to delete.
     */
    where: MerkleDistributorWhereUniqueInput
  }

  /**
   * MerkleDistributor deleteMany
   */
  export type MerkleDistributorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerkleDistributors to delete
     */
    where?: MerkleDistributorWhereInput
    /**
     * Limit how many MerkleDistributors to delete.
     */
    limit?: number
  }

  /**
   * MerkleDistributor without action
   */
  export type MerkleDistributorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleDistributor
     */
    select?: MerkleDistributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleDistributor
     */
    omit?: MerkleDistributorOmit<ExtArgs> | null
  }


  /**
   * Model SellerProof
   */

  export type AggregateSellerProof = {
    _count: SellerProofCountAggregateOutputType | null
    _avg: SellerProofAvgAggregateOutputType | null
    _sum: SellerProofSumAggregateOutputType | null
    _min: SellerProofMinAggregateOutputType | null
    _max: SellerProofMaxAggregateOutputType | null
  }

  export type SellerProofAvgAggregateOutputType = {
    periodId: number | null
    amount: number | null
  }

  export type SellerProofSumAggregateOutputType = {
    periodId: bigint | null
    amount: bigint | null
  }

  export type SellerProofMinAggregateOutputType = {
    sellerAddress: string | null
    periodId: bigint | null
    amount: bigint | null
    claimed: boolean | null
    claimedAt: Date | null
    createdAt: Date | null
  }

  export type SellerProofMaxAggregateOutputType = {
    sellerAddress: string | null
    periodId: bigint | null
    amount: bigint | null
    claimed: boolean | null
    claimedAt: Date | null
    createdAt: Date | null
  }

  export type SellerProofCountAggregateOutputType = {
    sellerAddress: number
    periodId: number
    amount: number
    proof: number
    claimed: number
    claimedAt: number
    createdAt: number
    _all: number
  }


  export type SellerProofAvgAggregateInputType = {
    periodId?: true
    amount?: true
  }

  export type SellerProofSumAggregateInputType = {
    periodId?: true
    amount?: true
  }

  export type SellerProofMinAggregateInputType = {
    sellerAddress?: true
    periodId?: true
    amount?: true
    claimed?: true
    claimedAt?: true
    createdAt?: true
  }

  export type SellerProofMaxAggregateInputType = {
    sellerAddress?: true
    periodId?: true
    amount?: true
    claimed?: true
    claimedAt?: true
    createdAt?: true
  }

  export type SellerProofCountAggregateInputType = {
    sellerAddress?: true
    periodId?: true
    amount?: true
    proof?: true
    claimed?: true
    claimedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SellerProofAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SellerProof to aggregate.
     */
    where?: SellerProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerProofs to fetch.
     */
    orderBy?: SellerProofOrderByWithRelationInput | SellerProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SellerProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SellerProofs
    **/
    _count?: true | SellerProofCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SellerProofAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SellerProofSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SellerProofMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SellerProofMaxAggregateInputType
  }

  export type GetSellerProofAggregateType<T extends SellerProofAggregateArgs> = {
        [P in keyof T & keyof AggregateSellerProof]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSellerProof[P]>
      : GetScalarType<T[P], AggregateSellerProof[P]>
  }




  export type SellerProofGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerProofWhereInput
    orderBy?: SellerProofOrderByWithAggregationInput | SellerProofOrderByWithAggregationInput[]
    by: SellerProofScalarFieldEnum[] | SellerProofScalarFieldEnum
    having?: SellerProofScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SellerProofCountAggregateInputType | true
    _avg?: SellerProofAvgAggregateInputType
    _sum?: SellerProofSumAggregateInputType
    _min?: SellerProofMinAggregateInputType
    _max?: SellerProofMaxAggregateInputType
  }

  export type SellerProofGroupByOutputType = {
    sellerAddress: string
    periodId: bigint
    amount: bigint
    proof: JsonValue
    claimed: boolean
    claimedAt: Date | null
    createdAt: Date
    _count: SellerProofCountAggregateOutputType | null
    _avg: SellerProofAvgAggregateOutputType | null
    _sum: SellerProofSumAggregateOutputType | null
    _min: SellerProofMinAggregateOutputType | null
    _max: SellerProofMaxAggregateOutputType | null
  }

  type GetSellerProofGroupByPayload<T extends SellerProofGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SellerProofGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SellerProofGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SellerProofGroupByOutputType[P]>
            : GetScalarType<T[P], SellerProofGroupByOutputType[P]>
        }
      >
    >


  export type SellerProofSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    periodId?: boolean
    amount?: boolean
    proof?: boolean
    claimed?: boolean
    claimedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sellerProof"]>

  export type SellerProofSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    periodId?: boolean
    amount?: boolean
    proof?: boolean
    claimed?: boolean
    claimedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sellerProof"]>

  export type SellerProofSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sellerAddress?: boolean
    periodId?: boolean
    amount?: boolean
    proof?: boolean
    claimed?: boolean
    claimedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sellerProof"]>

  export type SellerProofSelectScalar = {
    sellerAddress?: boolean
    periodId?: boolean
    amount?: boolean
    proof?: boolean
    claimed?: boolean
    claimedAt?: boolean
    createdAt?: boolean
  }

  export type SellerProofOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sellerAddress" | "periodId" | "amount" | "proof" | "claimed" | "claimedAt" | "createdAt", ExtArgs["result"]["sellerProof"]>

  export type $SellerProofPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SellerProof"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      sellerAddress: string
      periodId: bigint
      amount: bigint
      proof: Prisma.JsonValue
      claimed: boolean
      claimedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["sellerProof"]>
    composites: {}
  }

  type SellerProofGetPayload<S extends boolean | null | undefined | SellerProofDefaultArgs> = $Result.GetResult<Prisma.$SellerProofPayload, S>

  type SellerProofCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SellerProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SellerProofCountAggregateInputType | true
    }

  export interface SellerProofDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SellerProof'], meta: { name: 'SellerProof' } }
    /**
     * Find zero or one SellerProof that matches the filter.
     * @param {SellerProofFindUniqueArgs} args - Arguments to find a SellerProof
     * @example
     * // Get one SellerProof
     * const sellerProof = await prisma.sellerProof.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SellerProofFindUniqueArgs>(args: SelectSubset<T, SellerProofFindUniqueArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SellerProof that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SellerProofFindUniqueOrThrowArgs} args - Arguments to find a SellerProof
     * @example
     * // Get one SellerProof
     * const sellerProof = await prisma.sellerProof.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SellerProofFindUniqueOrThrowArgs>(args: SelectSubset<T, SellerProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SellerProof that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofFindFirstArgs} args - Arguments to find a SellerProof
     * @example
     * // Get one SellerProof
     * const sellerProof = await prisma.sellerProof.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SellerProofFindFirstArgs>(args?: SelectSubset<T, SellerProofFindFirstArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SellerProof that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofFindFirstOrThrowArgs} args - Arguments to find a SellerProof
     * @example
     * // Get one SellerProof
     * const sellerProof = await prisma.sellerProof.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SellerProofFindFirstOrThrowArgs>(args?: SelectSubset<T, SellerProofFindFirstOrThrowArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SellerProofs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SellerProofs
     * const sellerProofs = await prisma.sellerProof.findMany()
     * 
     * // Get first 10 SellerProofs
     * const sellerProofs = await prisma.sellerProof.findMany({ take: 10 })
     * 
     * // Only select the `sellerAddress`
     * const sellerProofWithSellerAddressOnly = await prisma.sellerProof.findMany({ select: { sellerAddress: true } })
     * 
     */
    findMany<T extends SellerProofFindManyArgs>(args?: SelectSubset<T, SellerProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SellerProof.
     * @param {SellerProofCreateArgs} args - Arguments to create a SellerProof.
     * @example
     * // Create one SellerProof
     * const SellerProof = await prisma.sellerProof.create({
     *   data: {
     *     // ... data to create a SellerProof
     *   }
     * })
     * 
     */
    create<T extends SellerProofCreateArgs>(args: SelectSubset<T, SellerProofCreateArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SellerProofs.
     * @param {SellerProofCreateManyArgs} args - Arguments to create many SellerProofs.
     * @example
     * // Create many SellerProofs
     * const sellerProof = await prisma.sellerProof.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SellerProofCreateManyArgs>(args?: SelectSubset<T, SellerProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SellerProofs and returns the data saved in the database.
     * @param {SellerProofCreateManyAndReturnArgs} args - Arguments to create many SellerProofs.
     * @example
     * // Create many SellerProofs
     * const sellerProof = await prisma.sellerProof.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SellerProofs and only return the `sellerAddress`
     * const sellerProofWithSellerAddressOnly = await prisma.sellerProof.createManyAndReturn({
     *   select: { sellerAddress: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SellerProofCreateManyAndReturnArgs>(args?: SelectSubset<T, SellerProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SellerProof.
     * @param {SellerProofDeleteArgs} args - Arguments to delete one SellerProof.
     * @example
     * // Delete one SellerProof
     * const SellerProof = await prisma.sellerProof.delete({
     *   where: {
     *     // ... filter to delete one SellerProof
     *   }
     * })
     * 
     */
    delete<T extends SellerProofDeleteArgs>(args: SelectSubset<T, SellerProofDeleteArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SellerProof.
     * @param {SellerProofUpdateArgs} args - Arguments to update one SellerProof.
     * @example
     * // Update one SellerProof
     * const sellerProof = await prisma.sellerProof.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SellerProofUpdateArgs>(args: SelectSubset<T, SellerProofUpdateArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SellerProofs.
     * @param {SellerProofDeleteManyArgs} args - Arguments to filter SellerProofs to delete.
     * @example
     * // Delete a few SellerProofs
     * const { count } = await prisma.sellerProof.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SellerProofDeleteManyArgs>(args?: SelectSubset<T, SellerProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SellerProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SellerProofs
     * const sellerProof = await prisma.sellerProof.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SellerProofUpdateManyArgs>(args: SelectSubset<T, SellerProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SellerProofs and returns the data updated in the database.
     * @param {SellerProofUpdateManyAndReturnArgs} args - Arguments to update many SellerProofs.
     * @example
     * // Update many SellerProofs
     * const sellerProof = await prisma.sellerProof.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SellerProofs and only return the `sellerAddress`
     * const sellerProofWithSellerAddressOnly = await prisma.sellerProof.updateManyAndReturn({
     *   select: { sellerAddress: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SellerProofUpdateManyAndReturnArgs>(args: SelectSubset<T, SellerProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SellerProof.
     * @param {SellerProofUpsertArgs} args - Arguments to update or create a SellerProof.
     * @example
     * // Update or create a SellerProof
     * const sellerProof = await prisma.sellerProof.upsert({
     *   create: {
     *     // ... data to create a SellerProof
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SellerProof we want to update
     *   }
     * })
     */
    upsert<T extends SellerProofUpsertArgs>(args: SelectSubset<T, SellerProofUpsertArgs<ExtArgs>>): Prisma__SellerProofClient<$Result.GetResult<Prisma.$SellerProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SellerProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofCountArgs} args - Arguments to filter SellerProofs to count.
     * @example
     * // Count the number of SellerProofs
     * const count = await prisma.sellerProof.count({
     *   where: {
     *     // ... the filter for the SellerProofs we want to count
     *   }
     * })
    **/
    count<T extends SellerProofCountArgs>(
      args?: Subset<T, SellerProofCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SellerProofCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SellerProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SellerProofAggregateArgs>(args: Subset<T, SellerProofAggregateArgs>): Prisma.PrismaPromise<GetSellerProofAggregateType<T>>

    /**
     * Group by SellerProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerProofGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SellerProofGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SellerProofGroupByArgs['orderBy'] }
        : { orderBy?: SellerProofGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SellerProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSellerProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SellerProof model
   */
  readonly fields: SellerProofFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SellerProof.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SellerProofClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SellerProof model
   */
  interface SellerProofFieldRefs {
    readonly sellerAddress: FieldRef<"SellerProof", 'String'>
    readonly periodId: FieldRef<"SellerProof", 'BigInt'>
    readonly amount: FieldRef<"SellerProof", 'BigInt'>
    readonly proof: FieldRef<"SellerProof", 'Json'>
    readonly claimed: FieldRef<"SellerProof", 'Boolean'>
    readonly claimedAt: FieldRef<"SellerProof", 'DateTime'>
    readonly createdAt: FieldRef<"SellerProof", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SellerProof findUnique
   */
  export type SellerProofFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter, which SellerProof to fetch.
     */
    where: SellerProofWhereUniqueInput
  }

  /**
   * SellerProof findUniqueOrThrow
   */
  export type SellerProofFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter, which SellerProof to fetch.
     */
    where: SellerProofWhereUniqueInput
  }

  /**
   * SellerProof findFirst
   */
  export type SellerProofFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter, which SellerProof to fetch.
     */
    where?: SellerProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerProofs to fetch.
     */
    orderBy?: SellerProofOrderByWithRelationInput | SellerProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SellerProofs.
     */
    cursor?: SellerProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SellerProofs.
     */
    distinct?: SellerProofScalarFieldEnum | SellerProofScalarFieldEnum[]
  }

  /**
   * SellerProof findFirstOrThrow
   */
  export type SellerProofFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter, which SellerProof to fetch.
     */
    where?: SellerProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerProofs to fetch.
     */
    orderBy?: SellerProofOrderByWithRelationInput | SellerProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SellerProofs.
     */
    cursor?: SellerProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SellerProofs.
     */
    distinct?: SellerProofScalarFieldEnum | SellerProofScalarFieldEnum[]
  }

  /**
   * SellerProof findMany
   */
  export type SellerProofFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter, which SellerProofs to fetch.
     */
    where?: SellerProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerProofs to fetch.
     */
    orderBy?: SellerProofOrderByWithRelationInput | SellerProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SellerProofs.
     */
    cursor?: SellerProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerProofs.
     */
    skip?: number
    distinct?: SellerProofScalarFieldEnum | SellerProofScalarFieldEnum[]
  }

  /**
   * SellerProof create
   */
  export type SellerProofCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * The data needed to create a SellerProof.
     */
    data: XOR<SellerProofCreateInput, SellerProofUncheckedCreateInput>
  }

  /**
   * SellerProof createMany
   */
  export type SellerProofCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SellerProofs.
     */
    data: SellerProofCreateManyInput | SellerProofCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SellerProof createManyAndReturn
   */
  export type SellerProofCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * The data used to create many SellerProofs.
     */
    data: SellerProofCreateManyInput | SellerProofCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SellerProof update
   */
  export type SellerProofUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * The data needed to update a SellerProof.
     */
    data: XOR<SellerProofUpdateInput, SellerProofUncheckedUpdateInput>
    /**
     * Choose, which SellerProof to update.
     */
    where: SellerProofWhereUniqueInput
  }

  /**
   * SellerProof updateMany
   */
  export type SellerProofUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SellerProofs.
     */
    data: XOR<SellerProofUpdateManyMutationInput, SellerProofUncheckedUpdateManyInput>
    /**
     * Filter which SellerProofs to update
     */
    where?: SellerProofWhereInput
    /**
     * Limit how many SellerProofs to update.
     */
    limit?: number
  }

  /**
   * SellerProof updateManyAndReturn
   */
  export type SellerProofUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * The data used to update SellerProofs.
     */
    data: XOR<SellerProofUpdateManyMutationInput, SellerProofUncheckedUpdateManyInput>
    /**
     * Filter which SellerProofs to update
     */
    where?: SellerProofWhereInput
    /**
     * Limit how many SellerProofs to update.
     */
    limit?: number
  }

  /**
   * SellerProof upsert
   */
  export type SellerProofUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * The filter to search for the SellerProof to update in case it exists.
     */
    where: SellerProofWhereUniqueInput
    /**
     * In case the SellerProof found by the `where` argument doesn't exist, create a new SellerProof with this data.
     */
    create: XOR<SellerProofCreateInput, SellerProofUncheckedCreateInput>
    /**
     * In case the SellerProof was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SellerProofUpdateInput, SellerProofUncheckedUpdateInput>
  }

  /**
   * SellerProof delete
   */
  export type SellerProofDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
    /**
     * Filter which SellerProof to delete.
     */
    where: SellerProofWhereUniqueInput
  }

  /**
   * SellerProof deleteMany
   */
  export type SellerProofDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SellerProofs to delete
     */
    where?: SellerProofWhereInput
    /**
     * Limit how many SellerProofs to delete.
     */
    limit?: number
  }

  /**
   * SellerProof without action
   */
  export type SellerProofDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerProof
     */
    select?: SellerProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerProof
     */
    omit?: SellerProofOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    theme: 'theme',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FocusSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    startTime: 'startTime',
    duration: 'duration',
    status: 'status'
  };

  export type FocusSessionScalarFieldEnum = (typeof FocusSessionScalarFieldEnum)[keyof typeof FocusSessionScalarFieldEnum]


  export const AppUsageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    appName: 'appName',
    timeSpent: 'timeSpent',
    platform: 'platform',
    hourStart: 'hourStart'
  };

  export type AppUsageScalarFieldEnum = (typeof AppUsageScalarFieldEnum)[keyof typeof AppUsageScalarFieldEnum]


  export const RoutineScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    emoji: 'emoji',
    timeMode: 'timeMode',
    selectedDays: 'selectedDays',
    startTime: 'startTime',
    endTime: 'endTime',
    dailyLimit: 'dailyLimit',
    endDate: 'endDate',
    stakeAmount: 'stakeAmount',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoutineScalarFieldEnum = (typeof RoutineScalarFieldEnum)[keyof typeof RoutineScalarFieldEnum]


  export const AppScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    domains: 'domains',
    androidPackageName: 'androidPackageName',
    iosBundleId: 'iosBundleId',
    category: 'category',
    isUserSubmitted: 'isUserSubmitted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppScalarFieldEnum = (typeof AppScalarFieldEnum)[keyof typeof AppScalarFieldEnum]


  export const RoutineAppScalarFieldEnum: {
    routineId: 'routineId',
    appId: 'appId'
  };

  export type RoutineAppScalarFieldEnum = (typeof RoutineAppScalarFieldEnum)[keyof typeof RoutineAppScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    task: 'task',
    state: 'state',
    createdAt: 'createdAt',
    index: 'index',
    tags: 'tags',
    scheduledDate: 'scheduledDate'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const CommitmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userPubkey: 'userPubkey',
    amount: 'amount',
    unlockTime: 'unlockTime',
    createdAt: 'createdAt',
    authorityPubkey: 'authorityPubkey',
    status: 'status',
    claimedAt: 'claimedAt',
    forfeitedAt: 'forfeitedAt',
    txSignature: 'txSignature',
    routineId: 'routineId',
    focusSessionId: 'focusSessionId'
  };

  export type CommitmentScalarFieldEnum = (typeof CommitmentScalarFieldEnum)[keyof typeof CommitmentScalarFieldEnum]


  export const MarketplaceConfigScalarFieldEnum: {
    accountAddress: 'accountAddress',
    authority: 'authority',
    currentPeriodRevenue: 'currentPeriodRevenue',
    totalLifetimeRevenue: 'totalLifetimeRevenue',
    listingCounter: 'listingCounter',
    passCounter: 'passCounter',
    snapshotPeriod: 'snapshotPeriod',
    updatedAt: 'updatedAt'
  };

  export type MarketplaceConfigScalarFieldEnum = (typeof MarketplaceConfigScalarFieldEnum)[keyof typeof MarketplaceConfigScalarFieldEnum]


  export const DataSellerScalarFieldEnum: {
    sellerAddress: 'sellerAddress',
    listingId: 'listingId',
    totalRevenue: 'totalRevenue',
    unclaimedRevenue: 'unclaimedRevenue',
    accountAddress: 'accountAddress',
    updatedAt: 'updatedAt'
  };

  export type DataSellerScalarFieldEnum = (typeof DataSellerScalarFieldEnum)[keyof typeof DataSellerScalarFieldEnum]


  export const DataListingScalarFieldEnum: {
    listingId: 'listingId',
    sellerAddress: 'sellerAddress',
    startDate: 'startDate',
    endDate: 'endDate',
    pricePerDay: 'pricePerDay',
    accountAddress: 'accountAddress',
    isActive: 'isActive',
    updatedAt: 'updatedAt'
  };

  export type DataListingScalarFieldEnum = (typeof DataListingScalarFieldEnum)[keyof typeof DataListingScalarFieldEnum]


  export const DataPassScalarFieldEnum: {
    passId: 'passId',
    buyerAddress: 'buyerAddress',
    startDate: 'startDate',
    endDate: 'endDate',
    maxPricePerDay: 'maxPricePerDay',
    totalPaid: 'totalPaid',
    dataNftMint: 'dataNftMint',
    purchasedAt: 'purchasedAt',
    eligibleSellerCount: 'eligibleSellerCount',
    accountAddress: 'accountAddress',
    updatedAt: 'updatedAt'
  };

  export type DataPassScalarFieldEnum = (typeof DataPassScalarFieldEnum)[keyof typeof DataPassScalarFieldEnum]


  export const MerkleDistributorScalarFieldEnum: {
    periodId: 'periodId',
    merkleRoot: 'merkleRoot',
    totalPoolBalance: 'totalPoolBalance',
    snapshotTimestamp: 'snapshotTimestamp',
    totalClaims: 'totalClaims',
    claimedAmount: 'claimedAmount',
    accountAddress: 'accountAddress',
    updatedAt: 'updatedAt'
  };

  export type MerkleDistributorScalarFieldEnum = (typeof MerkleDistributorScalarFieldEnum)[keyof typeof MerkleDistributorScalarFieldEnum]


  export const SellerProofScalarFieldEnum: {
    sellerAddress: 'sellerAddress',
    periodId: 'periodId',
    amount: 'amount',
    proof: 'proof',
    claimed: 'claimed',
    claimedAt: 'claimedAt',
    createdAt: 'createdAt'
  };

  export type SellerProofScalarFieldEnum = (typeof SellerProofScalarFieldEnum)[keyof typeof SellerProofScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'FocusSessionStatus'
   */
  export type EnumFocusSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FocusSessionStatus'>
    


  /**
   * Reference to a field of type 'FocusSessionStatus[]'
   */
  export type ListEnumFocusSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FocusSessionStatus[]'>
    


  /**
   * Reference to a field of type 'Platform'
   */
  export type EnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform'>
    


  /**
   * Reference to a field of type 'Platform[]'
   */
  export type ListEnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform[]'>
    


  /**
   * Reference to a field of type 'TimeMode'
   */
  export type EnumTimeModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeMode'>
    


  /**
   * Reference to a field of type 'TimeMode[]'
   */
  export type ListEnumTimeModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeMode[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RoutineStatus'
   */
  export type EnumRoutineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoutineStatus'>
    


  /**
   * Reference to a field of type 'RoutineStatus[]'
   */
  export type ListEnumRoutineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoutineStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TaskState'
   */
  export type EnumTaskStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskState'>
    


  /**
   * Reference to a field of type 'TaskState[]'
   */
  export type ListEnumTaskStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskState[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'CommitmentStatus'
   */
  export type EnumCommitmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommitmentStatus'>
    


  /**
   * Reference to a field of type 'CommitmentStatus[]'
   */
  export type ListEnumCommitmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommitmentStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    walletAddress?: StringFilter<"User"> | string
    theme?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    focusSessions?: FocusSessionListRelationFilter
    appUsage?: AppUsageListRelationFilter
    routines?: RoutineListRelationFilter
    task?: TaskListRelationFilter
    commitments?: CommitmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    focusSessions?: FocusSessionOrderByRelationAggregateInput
    appUsage?: AppUsageOrderByRelationAggregateInput
    routines?: RoutineOrderByRelationAggregateInput
    task?: TaskOrderByRelationAggregateInput
    commitments?: CommitmentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    theme?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    focusSessions?: FocusSessionListRelationFilter
    appUsage?: AppUsageListRelationFilter
    routines?: RoutineListRelationFilter
    task?: TaskListRelationFilter
    commitments?: CommitmentListRelationFilter
  }, "id" | "walletAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    theme?: StringWithAggregatesFilter<"User"> | string
    timezone?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FocusSessionWhereInput = {
    AND?: FocusSessionWhereInput | FocusSessionWhereInput[]
    OR?: FocusSessionWhereInput[]
    NOT?: FocusSessionWhereInput | FocusSessionWhereInput[]
    id?: StringFilter<"FocusSession"> | string
    userId?: StringFilter<"FocusSession"> | string
    startTime?: DateTimeFilter<"FocusSession"> | Date | string
    duration?: IntFilter<"FocusSession"> | number
    status?: EnumFocusSessionStatusFilter<"FocusSession"> | $Enums.FocusSessionStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    commitments?: CommitmentListRelationFilter
  }

  export type FocusSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    user?: UserOrderByWithRelationInput
    commitments?: CommitmentOrderByRelationAggregateInput
  }

  export type FocusSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FocusSessionWhereInput | FocusSessionWhereInput[]
    OR?: FocusSessionWhereInput[]
    NOT?: FocusSessionWhereInput | FocusSessionWhereInput[]
    userId?: StringFilter<"FocusSession"> | string
    startTime?: DateTimeFilter<"FocusSession"> | Date | string
    duration?: IntFilter<"FocusSession"> | number
    status?: EnumFocusSessionStatusFilter<"FocusSession"> | $Enums.FocusSessionStatus
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    commitments?: CommitmentListRelationFilter
  }, "id">

  export type FocusSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    _count?: FocusSessionCountOrderByAggregateInput
    _avg?: FocusSessionAvgOrderByAggregateInput
    _max?: FocusSessionMaxOrderByAggregateInput
    _min?: FocusSessionMinOrderByAggregateInput
    _sum?: FocusSessionSumOrderByAggregateInput
  }

  export type FocusSessionScalarWhereWithAggregatesInput = {
    AND?: FocusSessionScalarWhereWithAggregatesInput | FocusSessionScalarWhereWithAggregatesInput[]
    OR?: FocusSessionScalarWhereWithAggregatesInput[]
    NOT?: FocusSessionScalarWhereWithAggregatesInput | FocusSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FocusSession"> | string
    userId?: StringWithAggregatesFilter<"FocusSession"> | string
    startTime?: DateTimeWithAggregatesFilter<"FocusSession"> | Date | string
    duration?: IntWithAggregatesFilter<"FocusSession"> | number
    status?: EnumFocusSessionStatusWithAggregatesFilter<"FocusSession"> | $Enums.FocusSessionStatus
  }

  export type AppUsageWhereInput = {
    AND?: AppUsageWhereInput | AppUsageWhereInput[]
    OR?: AppUsageWhereInput[]
    NOT?: AppUsageWhereInput | AppUsageWhereInput[]
    id?: StringFilter<"AppUsage"> | string
    userId?: StringFilter<"AppUsage"> | string
    appName?: StringFilter<"AppUsage"> | string
    timeSpent?: IntFilter<"AppUsage"> | number
    platform?: EnumPlatformFilter<"AppUsage"> | $Enums.Platform
    hourStart?: DateTimeFilter<"AppUsage"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AppUsageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    appName?: SortOrder
    timeSpent?: SortOrder
    platform?: SortOrder
    hourStart?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AppUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_appName_platform_hourStart?: AppUsageUserIdAppNamePlatformHourStartCompoundUniqueInput
    AND?: AppUsageWhereInput | AppUsageWhereInput[]
    OR?: AppUsageWhereInput[]
    NOT?: AppUsageWhereInput | AppUsageWhereInput[]
    userId?: StringFilter<"AppUsage"> | string
    appName?: StringFilter<"AppUsage"> | string
    timeSpent?: IntFilter<"AppUsage"> | number
    platform?: EnumPlatformFilter<"AppUsage"> | $Enums.Platform
    hourStart?: DateTimeFilter<"AppUsage"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_appName_platform_hourStart">

  export type AppUsageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    appName?: SortOrder
    timeSpent?: SortOrder
    platform?: SortOrder
    hourStart?: SortOrder
    _count?: AppUsageCountOrderByAggregateInput
    _avg?: AppUsageAvgOrderByAggregateInput
    _max?: AppUsageMaxOrderByAggregateInput
    _min?: AppUsageMinOrderByAggregateInput
    _sum?: AppUsageSumOrderByAggregateInput
  }

  export type AppUsageScalarWhereWithAggregatesInput = {
    AND?: AppUsageScalarWhereWithAggregatesInput | AppUsageScalarWhereWithAggregatesInput[]
    OR?: AppUsageScalarWhereWithAggregatesInput[]
    NOT?: AppUsageScalarWhereWithAggregatesInput | AppUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppUsage"> | string
    userId?: StringWithAggregatesFilter<"AppUsage"> | string
    appName?: StringWithAggregatesFilter<"AppUsage"> | string
    timeSpent?: IntWithAggregatesFilter<"AppUsage"> | number
    platform?: EnumPlatformWithAggregatesFilter<"AppUsage"> | $Enums.Platform
    hourStart?: DateTimeWithAggregatesFilter<"AppUsage"> | Date | string
  }

  export type RoutineWhereInput = {
    AND?: RoutineWhereInput | RoutineWhereInput[]
    OR?: RoutineWhereInput[]
    NOT?: RoutineWhereInput | RoutineWhereInput[]
    id?: StringFilter<"Routine"> | string
    userId?: StringFilter<"Routine"> | string
    name?: StringFilter<"Routine"> | string
    emoji?: StringFilter<"Routine"> | string
    timeMode?: EnumTimeModeFilter<"Routine"> | $Enums.TimeMode
    selectedDays?: StringNullableListFilter<"Routine">
    startTime?: StringNullableFilter<"Routine"> | string | null
    endTime?: StringNullableFilter<"Routine"> | string | null
    dailyLimit?: IntNullableFilter<"Routine"> | number | null
    endDate?: DateTimeNullableFilter<"Routine"> | Date | string | null
    stakeAmount?: FloatFilter<"Routine"> | number
    status?: EnumRoutineStatusFilter<"Routine"> | $Enums.RoutineStatus
    createdAt?: DateTimeFilter<"Routine"> | Date | string
    updatedAt?: DateTimeFilter<"Routine"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    blockedApps?: RoutineAppListRelationFilter
    commitments?: CommitmentListRelationFilter
  }

  export type RoutineOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    emoji?: SortOrder
    timeMode?: SortOrder
    selectedDays?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    dailyLimit?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    stakeAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    blockedApps?: RoutineAppOrderByRelationAggregateInput
    commitments?: CommitmentOrderByRelationAggregateInput
  }

  export type RoutineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoutineWhereInput | RoutineWhereInput[]
    OR?: RoutineWhereInput[]
    NOT?: RoutineWhereInput | RoutineWhereInput[]
    userId?: StringFilter<"Routine"> | string
    name?: StringFilter<"Routine"> | string
    emoji?: StringFilter<"Routine"> | string
    timeMode?: EnumTimeModeFilter<"Routine"> | $Enums.TimeMode
    selectedDays?: StringNullableListFilter<"Routine">
    startTime?: StringNullableFilter<"Routine"> | string | null
    endTime?: StringNullableFilter<"Routine"> | string | null
    dailyLimit?: IntNullableFilter<"Routine"> | number | null
    endDate?: DateTimeNullableFilter<"Routine"> | Date | string | null
    stakeAmount?: FloatFilter<"Routine"> | number
    status?: EnumRoutineStatusFilter<"Routine"> | $Enums.RoutineStatus
    createdAt?: DateTimeFilter<"Routine"> | Date | string
    updatedAt?: DateTimeFilter<"Routine"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    blockedApps?: RoutineAppListRelationFilter
    commitments?: CommitmentListRelationFilter
  }, "id">

  export type RoutineOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    emoji?: SortOrder
    timeMode?: SortOrder
    selectedDays?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    dailyLimit?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    stakeAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoutineCountOrderByAggregateInput
    _avg?: RoutineAvgOrderByAggregateInput
    _max?: RoutineMaxOrderByAggregateInput
    _min?: RoutineMinOrderByAggregateInput
    _sum?: RoutineSumOrderByAggregateInput
  }

  export type RoutineScalarWhereWithAggregatesInput = {
    AND?: RoutineScalarWhereWithAggregatesInput | RoutineScalarWhereWithAggregatesInput[]
    OR?: RoutineScalarWhereWithAggregatesInput[]
    NOT?: RoutineScalarWhereWithAggregatesInput | RoutineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Routine"> | string
    userId?: StringWithAggregatesFilter<"Routine"> | string
    name?: StringWithAggregatesFilter<"Routine"> | string
    emoji?: StringWithAggregatesFilter<"Routine"> | string
    timeMode?: EnumTimeModeWithAggregatesFilter<"Routine"> | $Enums.TimeMode
    selectedDays?: StringNullableListFilter<"Routine">
    startTime?: StringNullableWithAggregatesFilter<"Routine"> | string | null
    endTime?: StringNullableWithAggregatesFilter<"Routine"> | string | null
    dailyLimit?: IntNullableWithAggregatesFilter<"Routine"> | number | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Routine"> | Date | string | null
    stakeAmount?: FloatWithAggregatesFilter<"Routine"> | number
    status?: EnumRoutineStatusWithAggregatesFilter<"Routine"> | $Enums.RoutineStatus
    createdAt?: DateTimeWithAggregatesFilter<"Routine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Routine"> | Date | string
  }

  export type AppWhereInput = {
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    id?: StringFilter<"App"> | string
    name?: StringFilter<"App"> | string
    icon?: StringNullableFilter<"App"> | string | null
    domains?: StringNullableListFilter<"App">
    androidPackageName?: StringNullableFilter<"App"> | string | null
    iosBundleId?: StringNullableFilter<"App"> | string | null
    category?: StringNullableFilter<"App"> | string | null
    isUserSubmitted?: BoolFilter<"App"> | boolean
    createdAt?: DateTimeFilter<"App"> | Date | string
    updatedAt?: DateTimeFilter<"App"> | Date | string
    routines?: RoutineAppListRelationFilter
  }

  export type AppOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    domains?: SortOrder
    androidPackageName?: SortOrderInput | SortOrder
    iosBundleId?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isUserSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    routines?: RoutineAppOrderByRelationAggregateInput
  }

  export type AppWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    androidPackageName?: string
    iosBundleId?: string
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    name?: StringFilter<"App"> | string
    icon?: StringNullableFilter<"App"> | string | null
    domains?: StringNullableListFilter<"App">
    category?: StringNullableFilter<"App"> | string | null
    isUserSubmitted?: BoolFilter<"App"> | boolean
    createdAt?: DateTimeFilter<"App"> | Date | string
    updatedAt?: DateTimeFilter<"App"> | Date | string
    routines?: RoutineAppListRelationFilter
  }, "id" | "androidPackageName" | "iosBundleId">

  export type AppOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    domains?: SortOrder
    androidPackageName?: SortOrderInput | SortOrder
    iosBundleId?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isUserSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppCountOrderByAggregateInput
    _max?: AppMaxOrderByAggregateInput
    _min?: AppMinOrderByAggregateInput
  }

  export type AppScalarWhereWithAggregatesInput = {
    AND?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    OR?: AppScalarWhereWithAggregatesInput[]
    NOT?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"App"> | string
    name?: StringWithAggregatesFilter<"App"> | string
    icon?: StringNullableWithAggregatesFilter<"App"> | string | null
    domains?: StringNullableListFilter<"App">
    androidPackageName?: StringNullableWithAggregatesFilter<"App"> | string | null
    iosBundleId?: StringNullableWithAggregatesFilter<"App"> | string | null
    category?: StringNullableWithAggregatesFilter<"App"> | string | null
    isUserSubmitted?: BoolWithAggregatesFilter<"App"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"App"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"App"> | Date | string
  }

  export type RoutineAppWhereInput = {
    AND?: RoutineAppWhereInput | RoutineAppWhereInput[]
    OR?: RoutineAppWhereInput[]
    NOT?: RoutineAppWhereInput | RoutineAppWhereInput[]
    routineId?: StringFilter<"RoutineApp"> | string
    appId?: StringFilter<"RoutineApp"> | string
    routine?: XOR<RoutineScalarRelationFilter, RoutineWhereInput>
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
  }

  export type RoutineAppOrderByWithRelationInput = {
    routineId?: SortOrder
    appId?: SortOrder
    routine?: RoutineOrderByWithRelationInput
    app?: AppOrderByWithRelationInput
  }

  export type RoutineAppWhereUniqueInput = Prisma.AtLeast<{
    routineId_appId?: RoutineAppRoutineIdAppIdCompoundUniqueInput
    AND?: RoutineAppWhereInput | RoutineAppWhereInput[]
    OR?: RoutineAppWhereInput[]
    NOT?: RoutineAppWhereInput | RoutineAppWhereInput[]
    routineId?: StringFilter<"RoutineApp"> | string
    appId?: StringFilter<"RoutineApp"> | string
    routine?: XOR<RoutineScalarRelationFilter, RoutineWhereInput>
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
  }, "routineId_appId">

  export type RoutineAppOrderByWithAggregationInput = {
    routineId?: SortOrder
    appId?: SortOrder
    _count?: RoutineAppCountOrderByAggregateInput
    _max?: RoutineAppMaxOrderByAggregateInput
    _min?: RoutineAppMinOrderByAggregateInput
  }

  export type RoutineAppScalarWhereWithAggregatesInput = {
    AND?: RoutineAppScalarWhereWithAggregatesInput | RoutineAppScalarWhereWithAggregatesInput[]
    OR?: RoutineAppScalarWhereWithAggregatesInput[]
    NOT?: RoutineAppScalarWhereWithAggregatesInput | RoutineAppScalarWhereWithAggregatesInput[]
    routineId?: StringWithAggregatesFilter<"RoutineApp"> | string
    appId?: StringWithAggregatesFilter<"RoutineApp"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    task?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    createdAt?: DateTimeFilter<"Task"> | Date | string
    index?: IntNullableFilter<"Task"> | number | null
    tags?: StringNullableListFilter<"Task">
    scheduledDate?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    task?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    index?: SortOrderInput | SortOrder
    tags?: SortOrder
    scheduledDate?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    userId?: StringFilter<"Task"> | string
    task?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    createdAt?: DateTimeFilter<"Task"> | Date | string
    index?: IntNullableFilter<"Task"> | number | null
    tags?: StringNullableListFilter<"Task">
    scheduledDate?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    task?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    index?: SortOrderInput | SortOrder
    tags?: SortOrder
    scheduledDate?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    userId?: StringWithAggregatesFilter<"Task"> | string
    task?: StringWithAggregatesFilter<"Task"> | string
    state?: EnumTaskStateWithAggregatesFilter<"Task"> | $Enums.TaskState
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    index?: IntNullableWithAggregatesFilter<"Task"> | number | null
    tags?: StringNullableListFilter<"Task">
    scheduledDate?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type CommitmentWhereInput = {
    AND?: CommitmentWhereInput | CommitmentWhereInput[]
    OR?: CommitmentWhereInput[]
    NOT?: CommitmentWhereInput | CommitmentWhereInput[]
    id?: StringFilter<"Commitment"> | string
    userId?: StringFilter<"Commitment"> | string
    userPubkey?: StringFilter<"Commitment"> | string
    amount?: BigIntFilter<"Commitment"> | bigint | number
    unlockTime?: DateTimeFilter<"Commitment"> | Date | string
    createdAt?: DateTimeFilter<"Commitment"> | Date | string
    authorityPubkey?: StringFilter<"Commitment"> | string
    status?: EnumCommitmentStatusFilter<"Commitment"> | $Enums.CommitmentStatus
    claimedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    forfeitedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    txSignature?: StringNullableFilter<"Commitment"> | string | null
    routineId?: StringNullableFilter<"Commitment"> | string | null
    focusSessionId?: StringNullableFilter<"Commitment"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    routine?: XOR<RoutineNullableScalarRelationFilter, RoutineWhereInput> | null
    focusSession?: XOR<FocusSessionNullableScalarRelationFilter, FocusSessionWhereInput> | null
  }

  export type CommitmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    userPubkey?: SortOrder
    amount?: SortOrder
    unlockTime?: SortOrder
    createdAt?: SortOrder
    authorityPubkey?: SortOrder
    status?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    forfeitedAt?: SortOrderInput | SortOrder
    txSignature?: SortOrderInput | SortOrder
    routineId?: SortOrderInput | SortOrder
    focusSessionId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    routine?: RoutineOrderByWithRelationInput
    focusSession?: FocusSessionOrderByWithRelationInput
  }

  export type CommitmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommitmentWhereInput | CommitmentWhereInput[]
    OR?: CommitmentWhereInput[]
    NOT?: CommitmentWhereInput | CommitmentWhereInput[]
    userId?: StringFilter<"Commitment"> | string
    userPubkey?: StringFilter<"Commitment"> | string
    amount?: BigIntFilter<"Commitment"> | bigint | number
    unlockTime?: DateTimeFilter<"Commitment"> | Date | string
    createdAt?: DateTimeFilter<"Commitment"> | Date | string
    authorityPubkey?: StringFilter<"Commitment"> | string
    status?: EnumCommitmentStatusFilter<"Commitment"> | $Enums.CommitmentStatus
    claimedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    forfeitedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    txSignature?: StringNullableFilter<"Commitment"> | string | null
    routineId?: StringNullableFilter<"Commitment"> | string | null
    focusSessionId?: StringNullableFilter<"Commitment"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    routine?: XOR<RoutineNullableScalarRelationFilter, RoutineWhereInput> | null
    focusSession?: XOR<FocusSessionNullableScalarRelationFilter, FocusSessionWhereInput> | null
  }, "id">

  export type CommitmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    userPubkey?: SortOrder
    amount?: SortOrder
    unlockTime?: SortOrder
    createdAt?: SortOrder
    authorityPubkey?: SortOrder
    status?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    forfeitedAt?: SortOrderInput | SortOrder
    txSignature?: SortOrderInput | SortOrder
    routineId?: SortOrderInput | SortOrder
    focusSessionId?: SortOrderInput | SortOrder
    _count?: CommitmentCountOrderByAggregateInput
    _avg?: CommitmentAvgOrderByAggregateInput
    _max?: CommitmentMaxOrderByAggregateInput
    _min?: CommitmentMinOrderByAggregateInput
    _sum?: CommitmentSumOrderByAggregateInput
  }

  export type CommitmentScalarWhereWithAggregatesInput = {
    AND?: CommitmentScalarWhereWithAggregatesInput | CommitmentScalarWhereWithAggregatesInput[]
    OR?: CommitmentScalarWhereWithAggregatesInput[]
    NOT?: CommitmentScalarWhereWithAggregatesInput | CommitmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commitment"> | string
    userId?: StringWithAggregatesFilter<"Commitment"> | string
    userPubkey?: StringWithAggregatesFilter<"Commitment"> | string
    amount?: BigIntWithAggregatesFilter<"Commitment"> | bigint | number
    unlockTime?: DateTimeWithAggregatesFilter<"Commitment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Commitment"> | Date | string
    authorityPubkey?: StringWithAggregatesFilter<"Commitment"> | string
    status?: EnumCommitmentStatusWithAggregatesFilter<"Commitment"> | $Enums.CommitmentStatus
    claimedAt?: DateTimeNullableWithAggregatesFilter<"Commitment"> | Date | string | null
    forfeitedAt?: DateTimeNullableWithAggregatesFilter<"Commitment"> | Date | string | null
    txSignature?: StringNullableWithAggregatesFilter<"Commitment"> | string | null
    routineId?: StringNullableWithAggregatesFilter<"Commitment"> | string | null
    focusSessionId?: StringNullableWithAggregatesFilter<"Commitment"> | string | null
  }

  export type MarketplaceConfigWhereInput = {
    AND?: MarketplaceConfigWhereInput | MarketplaceConfigWhereInput[]
    OR?: MarketplaceConfigWhereInput[]
    NOT?: MarketplaceConfigWhereInput | MarketplaceConfigWhereInput[]
    accountAddress?: StringFilter<"MarketplaceConfig"> | string
    authority?: StringFilter<"MarketplaceConfig"> | string
    currentPeriodRevenue?: StringFilter<"MarketplaceConfig"> | string
    totalLifetimeRevenue?: StringFilter<"MarketplaceConfig"> | string
    listingCounter?: StringFilter<"MarketplaceConfig"> | string
    passCounter?: StringFilter<"MarketplaceConfig"> | string
    snapshotPeriod?: StringFilter<"MarketplaceConfig"> | string
    updatedAt?: DateTimeFilter<"MarketplaceConfig"> | Date | string
  }

  export type MarketplaceConfigOrderByWithRelationInput = {
    accountAddress?: SortOrder
    authority?: SortOrder
    currentPeriodRevenue?: SortOrder
    totalLifetimeRevenue?: SortOrder
    listingCounter?: SortOrder
    passCounter?: SortOrder
    snapshotPeriod?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketplaceConfigWhereUniqueInput = Prisma.AtLeast<{
    accountAddress?: string
    AND?: MarketplaceConfigWhereInput | MarketplaceConfigWhereInput[]
    OR?: MarketplaceConfigWhereInput[]
    NOT?: MarketplaceConfigWhereInput | MarketplaceConfigWhereInput[]
    authority?: StringFilter<"MarketplaceConfig"> | string
    currentPeriodRevenue?: StringFilter<"MarketplaceConfig"> | string
    totalLifetimeRevenue?: StringFilter<"MarketplaceConfig"> | string
    listingCounter?: StringFilter<"MarketplaceConfig"> | string
    passCounter?: StringFilter<"MarketplaceConfig"> | string
    snapshotPeriod?: StringFilter<"MarketplaceConfig"> | string
    updatedAt?: DateTimeFilter<"MarketplaceConfig"> | Date | string
  }, "accountAddress">

  export type MarketplaceConfigOrderByWithAggregationInput = {
    accountAddress?: SortOrder
    authority?: SortOrder
    currentPeriodRevenue?: SortOrder
    totalLifetimeRevenue?: SortOrder
    listingCounter?: SortOrder
    passCounter?: SortOrder
    snapshotPeriod?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketplaceConfigCountOrderByAggregateInput
    _max?: MarketplaceConfigMaxOrderByAggregateInput
    _min?: MarketplaceConfigMinOrderByAggregateInput
  }

  export type MarketplaceConfigScalarWhereWithAggregatesInput = {
    AND?: MarketplaceConfigScalarWhereWithAggregatesInput | MarketplaceConfigScalarWhereWithAggregatesInput[]
    OR?: MarketplaceConfigScalarWhereWithAggregatesInput[]
    NOT?: MarketplaceConfigScalarWhereWithAggregatesInput | MarketplaceConfigScalarWhereWithAggregatesInput[]
    accountAddress?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    authority?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    currentPeriodRevenue?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    totalLifetimeRevenue?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    listingCounter?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    passCounter?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    snapshotPeriod?: StringWithAggregatesFilter<"MarketplaceConfig"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"MarketplaceConfig"> | Date | string
  }

  export type DataSellerWhereInput = {
    AND?: DataSellerWhereInput | DataSellerWhereInput[]
    OR?: DataSellerWhereInput[]
    NOT?: DataSellerWhereInput | DataSellerWhereInput[]
    sellerAddress?: StringFilter<"DataSeller"> | string
    listingId?: StringNullableFilter<"DataSeller"> | string | null
    totalRevenue?: StringFilter<"DataSeller"> | string
    unclaimedRevenue?: StringFilter<"DataSeller"> | string
    accountAddress?: StringFilter<"DataSeller"> | string
    updatedAt?: DateTimeFilter<"DataSeller"> | Date | string
  }

  export type DataSellerOrderByWithRelationInput = {
    sellerAddress?: SortOrder
    listingId?: SortOrderInput | SortOrder
    totalRevenue?: SortOrder
    unclaimedRevenue?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataSellerWhereUniqueInput = Prisma.AtLeast<{
    sellerAddress?: string
    accountAddress?: string
    AND?: DataSellerWhereInput | DataSellerWhereInput[]
    OR?: DataSellerWhereInput[]
    NOT?: DataSellerWhereInput | DataSellerWhereInput[]
    listingId?: StringNullableFilter<"DataSeller"> | string | null
    totalRevenue?: StringFilter<"DataSeller"> | string
    unclaimedRevenue?: StringFilter<"DataSeller"> | string
    updatedAt?: DateTimeFilter<"DataSeller"> | Date | string
  }, "sellerAddress" | "accountAddress">

  export type DataSellerOrderByWithAggregationInput = {
    sellerAddress?: SortOrder
    listingId?: SortOrderInput | SortOrder
    totalRevenue?: SortOrder
    unclaimedRevenue?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
    _count?: DataSellerCountOrderByAggregateInput
    _max?: DataSellerMaxOrderByAggregateInput
    _min?: DataSellerMinOrderByAggregateInput
  }

  export type DataSellerScalarWhereWithAggregatesInput = {
    AND?: DataSellerScalarWhereWithAggregatesInput | DataSellerScalarWhereWithAggregatesInput[]
    OR?: DataSellerScalarWhereWithAggregatesInput[]
    NOT?: DataSellerScalarWhereWithAggregatesInput | DataSellerScalarWhereWithAggregatesInput[]
    sellerAddress?: StringWithAggregatesFilter<"DataSeller"> | string
    listingId?: StringNullableWithAggregatesFilter<"DataSeller"> | string | null
    totalRevenue?: StringWithAggregatesFilter<"DataSeller"> | string
    unclaimedRevenue?: StringWithAggregatesFilter<"DataSeller"> | string
    accountAddress?: StringWithAggregatesFilter<"DataSeller"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"DataSeller"> | Date | string
  }

  export type DataListingWhereInput = {
    AND?: DataListingWhereInput | DataListingWhereInput[]
    OR?: DataListingWhereInput[]
    NOT?: DataListingWhereInput | DataListingWhereInput[]
    listingId?: StringFilter<"DataListing"> | string
    sellerAddress?: StringFilter<"DataListing"> | string
    startDate?: DateTimeFilter<"DataListing"> | Date | string
    endDate?: DateTimeFilter<"DataListing"> | Date | string
    pricePerDay?: StringFilter<"DataListing"> | string
    accountAddress?: StringFilter<"DataListing"> | string
    isActive?: BoolFilter<"DataListing"> | boolean
    updatedAt?: DateTimeFilter<"DataListing"> | Date | string
  }

  export type DataListingOrderByWithRelationInput = {
    listingId?: SortOrder
    sellerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerDay?: SortOrder
    accountAddress?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataListingWhereUniqueInput = Prisma.AtLeast<{
    listingId?: string
    accountAddress?: string
    AND?: DataListingWhereInput | DataListingWhereInput[]
    OR?: DataListingWhereInput[]
    NOT?: DataListingWhereInput | DataListingWhereInput[]
    sellerAddress?: StringFilter<"DataListing"> | string
    startDate?: DateTimeFilter<"DataListing"> | Date | string
    endDate?: DateTimeFilter<"DataListing"> | Date | string
    pricePerDay?: StringFilter<"DataListing"> | string
    isActive?: BoolFilter<"DataListing"> | boolean
    updatedAt?: DateTimeFilter<"DataListing"> | Date | string
  }, "listingId" | "accountAddress">

  export type DataListingOrderByWithAggregationInput = {
    listingId?: SortOrder
    sellerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerDay?: SortOrder
    accountAddress?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    _count?: DataListingCountOrderByAggregateInput
    _max?: DataListingMaxOrderByAggregateInput
    _min?: DataListingMinOrderByAggregateInput
  }

  export type DataListingScalarWhereWithAggregatesInput = {
    AND?: DataListingScalarWhereWithAggregatesInput | DataListingScalarWhereWithAggregatesInput[]
    OR?: DataListingScalarWhereWithAggregatesInput[]
    NOT?: DataListingScalarWhereWithAggregatesInput | DataListingScalarWhereWithAggregatesInput[]
    listingId?: StringWithAggregatesFilter<"DataListing"> | string
    sellerAddress?: StringWithAggregatesFilter<"DataListing"> | string
    startDate?: DateTimeWithAggregatesFilter<"DataListing"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"DataListing"> | Date | string
    pricePerDay?: StringWithAggregatesFilter<"DataListing"> | string
    accountAddress?: StringWithAggregatesFilter<"DataListing"> | string
    isActive?: BoolWithAggregatesFilter<"DataListing"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"DataListing"> | Date | string
  }

  export type DataPassWhereInput = {
    AND?: DataPassWhereInput | DataPassWhereInput[]
    OR?: DataPassWhereInput[]
    NOT?: DataPassWhereInput | DataPassWhereInput[]
    passId?: StringFilter<"DataPass"> | string
    buyerAddress?: StringFilter<"DataPass"> | string
    startDate?: DateTimeFilter<"DataPass"> | Date | string
    endDate?: DateTimeFilter<"DataPass"> | Date | string
    maxPricePerDay?: StringFilter<"DataPass"> | string
    totalPaid?: StringFilter<"DataPass"> | string
    dataNftMint?: StringFilter<"DataPass"> | string
    purchasedAt?: DateTimeFilter<"DataPass"> | Date | string
    eligibleSellerCount?: IntFilter<"DataPass"> | number
    accountAddress?: StringFilter<"DataPass"> | string
    updatedAt?: DateTimeFilter<"DataPass"> | Date | string
  }

  export type DataPassOrderByWithRelationInput = {
    passId?: SortOrder
    buyerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    maxPricePerDay?: SortOrder
    totalPaid?: SortOrder
    dataNftMint?: SortOrder
    purchasedAt?: SortOrder
    eligibleSellerCount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataPassWhereUniqueInput = Prisma.AtLeast<{
    passId?: string
    accountAddress?: string
    AND?: DataPassWhereInput | DataPassWhereInput[]
    OR?: DataPassWhereInput[]
    NOT?: DataPassWhereInput | DataPassWhereInput[]
    buyerAddress?: StringFilter<"DataPass"> | string
    startDate?: DateTimeFilter<"DataPass"> | Date | string
    endDate?: DateTimeFilter<"DataPass"> | Date | string
    maxPricePerDay?: StringFilter<"DataPass"> | string
    totalPaid?: StringFilter<"DataPass"> | string
    dataNftMint?: StringFilter<"DataPass"> | string
    purchasedAt?: DateTimeFilter<"DataPass"> | Date | string
    eligibleSellerCount?: IntFilter<"DataPass"> | number
    updatedAt?: DateTimeFilter<"DataPass"> | Date | string
  }, "passId" | "accountAddress">

  export type DataPassOrderByWithAggregationInput = {
    passId?: SortOrder
    buyerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    maxPricePerDay?: SortOrder
    totalPaid?: SortOrder
    dataNftMint?: SortOrder
    purchasedAt?: SortOrder
    eligibleSellerCount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
    _count?: DataPassCountOrderByAggregateInput
    _avg?: DataPassAvgOrderByAggregateInput
    _max?: DataPassMaxOrderByAggregateInput
    _min?: DataPassMinOrderByAggregateInput
    _sum?: DataPassSumOrderByAggregateInput
  }

  export type DataPassScalarWhereWithAggregatesInput = {
    AND?: DataPassScalarWhereWithAggregatesInput | DataPassScalarWhereWithAggregatesInput[]
    OR?: DataPassScalarWhereWithAggregatesInput[]
    NOT?: DataPassScalarWhereWithAggregatesInput | DataPassScalarWhereWithAggregatesInput[]
    passId?: StringWithAggregatesFilter<"DataPass"> | string
    buyerAddress?: StringWithAggregatesFilter<"DataPass"> | string
    startDate?: DateTimeWithAggregatesFilter<"DataPass"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"DataPass"> | Date | string
    maxPricePerDay?: StringWithAggregatesFilter<"DataPass"> | string
    totalPaid?: StringWithAggregatesFilter<"DataPass"> | string
    dataNftMint?: StringWithAggregatesFilter<"DataPass"> | string
    purchasedAt?: DateTimeWithAggregatesFilter<"DataPass"> | Date | string
    eligibleSellerCount?: IntWithAggregatesFilter<"DataPass"> | number
    accountAddress?: StringWithAggregatesFilter<"DataPass"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"DataPass"> | Date | string
  }

  export type MerkleDistributorWhereInput = {
    AND?: MerkleDistributorWhereInput | MerkleDistributorWhereInput[]
    OR?: MerkleDistributorWhereInput[]
    NOT?: MerkleDistributorWhereInput | MerkleDistributorWhereInput[]
    periodId?: BigIntFilter<"MerkleDistributor"> | bigint | number
    merkleRoot?: StringFilter<"MerkleDistributor"> | string
    totalPoolBalance?: StringFilter<"MerkleDistributor"> | string
    snapshotTimestamp?: DateTimeFilter<"MerkleDistributor"> | Date | string
    totalClaims?: StringFilter<"MerkleDistributor"> | string
    claimedAmount?: StringFilter<"MerkleDistributor"> | string
    accountAddress?: StringFilter<"MerkleDistributor"> | string
    updatedAt?: DateTimeFilter<"MerkleDistributor"> | Date | string
  }

  export type MerkleDistributorOrderByWithRelationInput = {
    periodId?: SortOrder
    merkleRoot?: SortOrder
    totalPoolBalance?: SortOrder
    snapshotTimestamp?: SortOrder
    totalClaims?: SortOrder
    claimedAmount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerkleDistributorWhereUniqueInput = Prisma.AtLeast<{
    periodId?: bigint | number
    accountAddress?: string
    AND?: MerkleDistributorWhereInput | MerkleDistributorWhereInput[]
    OR?: MerkleDistributorWhereInput[]
    NOT?: MerkleDistributorWhereInput | MerkleDistributorWhereInput[]
    merkleRoot?: StringFilter<"MerkleDistributor"> | string
    totalPoolBalance?: StringFilter<"MerkleDistributor"> | string
    snapshotTimestamp?: DateTimeFilter<"MerkleDistributor"> | Date | string
    totalClaims?: StringFilter<"MerkleDistributor"> | string
    claimedAmount?: StringFilter<"MerkleDistributor"> | string
    updatedAt?: DateTimeFilter<"MerkleDistributor"> | Date | string
  }, "periodId" | "accountAddress">

  export type MerkleDistributorOrderByWithAggregationInput = {
    periodId?: SortOrder
    merkleRoot?: SortOrder
    totalPoolBalance?: SortOrder
    snapshotTimestamp?: SortOrder
    totalClaims?: SortOrder
    claimedAmount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
    _count?: MerkleDistributorCountOrderByAggregateInput
    _avg?: MerkleDistributorAvgOrderByAggregateInput
    _max?: MerkleDistributorMaxOrderByAggregateInput
    _min?: MerkleDistributorMinOrderByAggregateInput
    _sum?: MerkleDistributorSumOrderByAggregateInput
  }

  export type MerkleDistributorScalarWhereWithAggregatesInput = {
    AND?: MerkleDistributorScalarWhereWithAggregatesInput | MerkleDistributorScalarWhereWithAggregatesInput[]
    OR?: MerkleDistributorScalarWhereWithAggregatesInput[]
    NOT?: MerkleDistributorScalarWhereWithAggregatesInput | MerkleDistributorScalarWhereWithAggregatesInput[]
    periodId?: BigIntWithAggregatesFilter<"MerkleDistributor"> | bigint | number
    merkleRoot?: StringWithAggregatesFilter<"MerkleDistributor"> | string
    totalPoolBalance?: StringWithAggregatesFilter<"MerkleDistributor"> | string
    snapshotTimestamp?: DateTimeWithAggregatesFilter<"MerkleDistributor"> | Date | string
    totalClaims?: StringWithAggregatesFilter<"MerkleDistributor"> | string
    claimedAmount?: StringWithAggregatesFilter<"MerkleDistributor"> | string
    accountAddress?: StringWithAggregatesFilter<"MerkleDistributor"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"MerkleDistributor"> | Date | string
  }

  export type SellerProofWhereInput = {
    AND?: SellerProofWhereInput | SellerProofWhereInput[]
    OR?: SellerProofWhereInput[]
    NOT?: SellerProofWhereInput | SellerProofWhereInput[]
    sellerAddress?: StringFilter<"SellerProof"> | string
    periodId?: BigIntFilter<"SellerProof"> | bigint | number
    amount?: BigIntFilter<"SellerProof"> | bigint | number
    proof?: JsonFilter<"SellerProof">
    claimed?: BoolFilter<"SellerProof"> | boolean
    claimedAt?: DateTimeNullableFilter<"SellerProof"> | Date | string | null
    createdAt?: DateTimeFilter<"SellerProof"> | Date | string
  }

  export type SellerProofOrderByWithRelationInput = {
    sellerAddress?: SortOrder
    periodId?: SortOrder
    amount?: SortOrder
    proof?: SortOrder
    claimed?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SellerProofWhereUniqueInput = Prisma.AtLeast<{
    sellerAddress_periodId?: SellerProofSellerAddressPeriodIdCompoundUniqueInput
    AND?: SellerProofWhereInput | SellerProofWhereInput[]
    OR?: SellerProofWhereInput[]
    NOT?: SellerProofWhereInput | SellerProofWhereInput[]
    sellerAddress?: StringFilter<"SellerProof"> | string
    periodId?: BigIntFilter<"SellerProof"> | bigint | number
    amount?: BigIntFilter<"SellerProof"> | bigint | number
    proof?: JsonFilter<"SellerProof">
    claimed?: BoolFilter<"SellerProof"> | boolean
    claimedAt?: DateTimeNullableFilter<"SellerProof"> | Date | string | null
    createdAt?: DateTimeFilter<"SellerProof"> | Date | string
  }, "sellerAddress_periodId">

  export type SellerProofOrderByWithAggregationInput = {
    sellerAddress?: SortOrder
    periodId?: SortOrder
    amount?: SortOrder
    proof?: SortOrder
    claimed?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SellerProofCountOrderByAggregateInput
    _avg?: SellerProofAvgOrderByAggregateInput
    _max?: SellerProofMaxOrderByAggregateInput
    _min?: SellerProofMinOrderByAggregateInput
    _sum?: SellerProofSumOrderByAggregateInput
  }

  export type SellerProofScalarWhereWithAggregatesInput = {
    AND?: SellerProofScalarWhereWithAggregatesInput | SellerProofScalarWhereWithAggregatesInput[]
    OR?: SellerProofScalarWhereWithAggregatesInput[]
    NOT?: SellerProofScalarWhereWithAggregatesInput | SellerProofScalarWhereWithAggregatesInput[]
    sellerAddress?: StringWithAggregatesFilter<"SellerProof"> | string
    periodId?: BigIntWithAggregatesFilter<"SellerProof"> | bigint | number
    amount?: BigIntWithAggregatesFilter<"SellerProof"> | bigint | number
    proof?: JsonWithAggregatesFilter<"SellerProof">
    claimed?: BoolWithAggregatesFilter<"SellerProof"> | boolean
    claimedAt?: DateTimeNullableWithAggregatesFilter<"SellerProof"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SellerProof"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionCreateNestedManyWithoutUserInput
    appUsage?: AppUsageCreateNestedManyWithoutUserInput
    routines?: RoutineCreateNestedManyWithoutUserInput
    task?: TaskCreateNestedManyWithoutUserInput
    commitments?: CommitmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionUncheckedCreateNestedManyWithoutUserInput
    appUsage?: AppUsageUncheckedCreateNestedManyWithoutUserInput
    routines?: RoutineUncheckedCreateNestedManyWithoutUserInput
    task?: TaskUncheckedCreateNestedManyWithoutUserInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUpdateManyWithoutUserNestedInput
    routines?: RoutineUpdateManyWithoutUserNestedInput
    task?: TaskUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUncheckedUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUncheckedUpdateManyWithoutUserNestedInput
    routines?: RoutineUncheckedUpdateManyWithoutUserNestedInput
    task?: TaskUncheckedUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FocusSessionCreateInput = {
    id?: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
    user: UserCreateNestedOneWithoutFocusSessionsInput
    commitments?: CommitmentCreateNestedManyWithoutFocusSessionInput
  }

  export type FocusSessionUncheckedCreateInput = {
    id?: string
    userId: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
    commitments?: CommitmentUncheckedCreateNestedManyWithoutFocusSessionInput
  }

  export type FocusSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
    user?: UserUpdateOneRequiredWithoutFocusSessionsNestedInput
    commitments?: CommitmentUpdateManyWithoutFocusSessionNestedInput
  }

  export type FocusSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
    commitments?: CommitmentUncheckedUpdateManyWithoutFocusSessionNestedInput
  }

  export type FocusSessionCreateManyInput = {
    id?: string
    userId: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
  }

  export type FocusSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
  }

  export type FocusSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
  }

  export type AppUsageCreateInput = {
    id?: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
    user: UserCreateNestedOneWithoutAppUsageInput
  }

  export type AppUsageUncheckedCreateInput = {
    id?: string
    userId: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type AppUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAppUsageNestedInput
  }

  export type AppUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUsageCreateManyInput = {
    id?: string
    userId: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type AppUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutineCreateInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRoutinesInput
    blockedApps?: RoutineAppCreateNestedManyWithoutRoutineInput
    commitments?: CommitmentCreateNestedManyWithoutRoutineInput
  }

  export type RoutineUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    blockedApps?: RoutineAppUncheckedCreateNestedManyWithoutRoutineInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutRoutineInput
  }

  export type RoutineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoutinesNestedInput
    blockedApps?: RoutineAppUpdateManyWithoutRoutineNestedInput
    commitments?: CommitmentUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blockedApps?: RoutineAppUncheckedUpdateManyWithoutRoutineNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineCreateManyInput = {
    id?: string
    userId: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoutineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppCreateInput = {
    id?: string
    name: string
    icon?: string | null
    domains?: AppCreatedomainsInput | string[]
    androidPackageName?: string | null
    iosBundleId?: string | null
    category?: string | null
    isUserSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routines?: RoutineAppCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateInput = {
    id?: string
    name: string
    icon?: string | null
    domains?: AppCreatedomainsInput | string[]
    androidPackageName?: string | null
    iosBundleId?: string | null
    category?: string | null
    isUserSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    routines?: RoutineAppUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routines?: RoutineAppUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    routines?: RoutineAppUncheckedUpdateManyWithoutAppNestedInput
  }

  export type AppCreateManyInput = {
    id?: string
    name: string
    icon?: string | null
    domains?: AppCreatedomainsInput | string[]
    androidPackageName?: string | null
    iosBundleId?: string | null
    category?: string | null
    isUserSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutineAppCreateInput = {
    routine: RoutineCreateNestedOneWithoutBlockedAppsInput
    app: AppCreateNestedOneWithoutRoutinesInput
  }

  export type RoutineAppUncheckedCreateInput = {
    routineId: string
    appId: string
  }

  export type RoutineAppUpdateInput = {
    routine?: RoutineUpdateOneRequiredWithoutBlockedAppsNestedInput
    app?: AppUpdateOneRequiredWithoutRoutinesNestedInput
  }

  export type RoutineAppUncheckedUpdateInput = {
    routineId?: StringFieldUpdateOperationsInput | string
    appId?: StringFieldUpdateOperationsInput | string
  }

  export type RoutineAppCreateManyInput = {
    routineId: string
    appId: string
  }

  export type RoutineAppUpdateManyMutationInput = {

  }

  export type RoutineAppUncheckedUpdateManyInput = {
    routineId?: StringFieldUpdateOperationsInput | string
    appId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
    user: UserCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    userId: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: string
    userId: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitmentCreateInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    user: UserCreateNestedOneWithoutCommitmentsInput
    routine?: RoutineCreateNestedOneWithoutCommitmentsInput
    focusSession?: FocusSessionCreateNestedOneWithoutCommitmentsInput
  }

  export type CommitmentUncheckedCreateInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
    focusSessionId?: string | null
  }

  export type CommitmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCommitmentsNestedInput
    routine?: RoutineUpdateOneWithoutCommitmentsNestedInput
    focusSession?: FocusSessionUpdateOneWithoutCommitmentsNestedInput
  }

  export type CommitmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentCreateManyInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
    focusSessionId?: string | null
  }

  export type CommitmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketplaceConfigCreateInput = {
    accountAddress: string
    authority: string
    currentPeriodRevenue: string
    totalLifetimeRevenue: string
    listingCounter: string
    passCounter: string
    snapshotPeriod: string
    updatedAt?: Date | string
  }

  export type MarketplaceConfigUncheckedCreateInput = {
    accountAddress: string
    authority: string
    currentPeriodRevenue: string
    totalLifetimeRevenue: string
    listingCounter: string
    passCounter: string
    snapshotPeriod: string
    updatedAt?: Date | string
  }

  export type MarketplaceConfigUpdateInput = {
    accountAddress?: StringFieldUpdateOperationsInput | string
    authority?: StringFieldUpdateOperationsInput | string
    currentPeriodRevenue?: StringFieldUpdateOperationsInput | string
    totalLifetimeRevenue?: StringFieldUpdateOperationsInput | string
    listingCounter?: StringFieldUpdateOperationsInput | string
    passCounter?: StringFieldUpdateOperationsInput | string
    snapshotPeriod?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketplaceConfigUncheckedUpdateInput = {
    accountAddress?: StringFieldUpdateOperationsInput | string
    authority?: StringFieldUpdateOperationsInput | string
    currentPeriodRevenue?: StringFieldUpdateOperationsInput | string
    totalLifetimeRevenue?: StringFieldUpdateOperationsInput | string
    listingCounter?: StringFieldUpdateOperationsInput | string
    passCounter?: StringFieldUpdateOperationsInput | string
    snapshotPeriod?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketplaceConfigCreateManyInput = {
    accountAddress: string
    authority: string
    currentPeriodRevenue: string
    totalLifetimeRevenue: string
    listingCounter: string
    passCounter: string
    snapshotPeriod: string
    updatedAt?: Date | string
  }

  export type MarketplaceConfigUpdateManyMutationInput = {
    accountAddress?: StringFieldUpdateOperationsInput | string
    authority?: StringFieldUpdateOperationsInput | string
    currentPeriodRevenue?: StringFieldUpdateOperationsInput | string
    totalLifetimeRevenue?: StringFieldUpdateOperationsInput | string
    listingCounter?: StringFieldUpdateOperationsInput | string
    passCounter?: StringFieldUpdateOperationsInput | string
    snapshotPeriod?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketplaceConfigUncheckedUpdateManyInput = {
    accountAddress?: StringFieldUpdateOperationsInput | string
    authority?: StringFieldUpdateOperationsInput | string
    currentPeriodRevenue?: StringFieldUpdateOperationsInput | string
    totalLifetimeRevenue?: StringFieldUpdateOperationsInput | string
    listingCounter?: StringFieldUpdateOperationsInput | string
    passCounter?: StringFieldUpdateOperationsInput | string
    snapshotPeriod?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataSellerCreateInput = {
    sellerAddress: string
    listingId?: string | null
    totalRevenue: string
    unclaimedRevenue: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataSellerUncheckedCreateInput = {
    sellerAddress: string
    listingId?: string | null
    totalRevenue: string
    unclaimedRevenue: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataSellerUpdateInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    totalRevenue?: StringFieldUpdateOperationsInput | string
    unclaimedRevenue?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataSellerUncheckedUpdateInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    totalRevenue?: StringFieldUpdateOperationsInput | string
    unclaimedRevenue?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataSellerCreateManyInput = {
    sellerAddress: string
    listingId?: string | null
    totalRevenue: string
    unclaimedRevenue: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataSellerUpdateManyMutationInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    totalRevenue?: StringFieldUpdateOperationsInput | string
    unclaimedRevenue?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataSellerUncheckedUpdateManyInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    totalRevenue?: StringFieldUpdateOperationsInput | string
    unclaimedRevenue?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataListingCreateInput = {
    listingId: string
    sellerAddress: string
    startDate: Date | string
    endDate: Date | string
    pricePerDay: string
    accountAddress: string
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type DataListingUncheckedCreateInput = {
    listingId: string
    sellerAddress: string
    startDate: Date | string
    endDate: Date | string
    pricePerDay: string
    accountAddress: string
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type DataListingUpdateInput = {
    listingId?: StringFieldUpdateOperationsInput | string
    sellerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerDay?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataListingUncheckedUpdateInput = {
    listingId?: StringFieldUpdateOperationsInput | string
    sellerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerDay?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataListingCreateManyInput = {
    listingId: string
    sellerAddress: string
    startDate: Date | string
    endDate: Date | string
    pricePerDay: string
    accountAddress: string
    isActive?: boolean
    updatedAt?: Date | string
  }

  export type DataListingUpdateManyMutationInput = {
    listingId?: StringFieldUpdateOperationsInput | string
    sellerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerDay?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataListingUncheckedUpdateManyInput = {
    listingId?: StringFieldUpdateOperationsInput | string
    sellerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerDay?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataPassCreateInput = {
    passId: string
    buyerAddress: string
    startDate: Date | string
    endDate: Date | string
    maxPricePerDay: string
    totalPaid: string
    dataNftMint: string
    purchasedAt: Date | string
    eligibleSellerCount: number
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataPassUncheckedCreateInput = {
    passId: string
    buyerAddress: string
    startDate: Date | string
    endDate: Date | string
    maxPricePerDay: string
    totalPaid: string
    dataNftMint: string
    purchasedAt: Date | string
    eligibleSellerCount: number
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataPassUpdateInput = {
    passId?: StringFieldUpdateOperationsInput | string
    buyerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxPricePerDay?: StringFieldUpdateOperationsInput | string
    totalPaid?: StringFieldUpdateOperationsInput | string
    dataNftMint?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibleSellerCount?: IntFieldUpdateOperationsInput | number
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataPassUncheckedUpdateInput = {
    passId?: StringFieldUpdateOperationsInput | string
    buyerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxPricePerDay?: StringFieldUpdateOperationsInput | string
    totalPaid?: StringFieldUpdateOperationsInput | string
    dataNftMint?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibleSellerCount?: IntFieldUpdateOperationsInput | number
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataPassCreateManyInput = {
    passId: string
    buyerAddress: string
    startDate: Date | string
    endDate: Date | string
    maxPricePerDay: string
    totalPaid: string
    dataNftMint: string
    purchasedAt: Date | string
    eligibleSellerCount: number
    accountAddress: string
    updatedAt?: Date | string
  }

  export type DataPassUpdateManyMutationInput = {
    passId?: StringFieldUpdateOperationsInput | string
    buyerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxPricePerDay?: StringFieldUpdateOperationsInput | string
    totalPaid?: StringFieldUpdateOperationsInput | string
    dataNftMint?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibleSellerCount?: IntFieldUpdateOperationsInput | number
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataPassUncheckedUpdateManyInput = {
    passId?: StringFieldUpdateOperationsInput | string
    buyerAddress?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maxPricePerDay?: StringFieldUpdateOperationsInput | string
    totalPaid?: StringFieldUpdateOperationsInput | string
    dataNftMint?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibleSellerCount?: IntFieldUpdateOperationsInput | number
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleDistributorCreateInput = {
    periodId: bigint | number
    merkleRoot: string
    totalPoolBalance: string
    snapshotTimestamp: Date | string
    totalClaims: string
    claimedAmount: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type MerkleDistributorUncheckedCreateInput = {
    periodId: bigint | number
    merkleRoot: string
    totalPoolBalance: string
    snapshotTimestamp: Date | string
    totalClaims: string
    claimedAmount: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type MerkleDistributorUpdateInput = {
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    merkleRoot?: StringFieldUpdateOperationsInput | string
    totalPoolBalance?: StringFieldUpdateOperationsInput | string
    snapshotTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    totalClaims?: StringFieldUpdateOperationsInput | string
    claimedAmount?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleDistributorUncheckedUpdateInput = {
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    merkleRoot?: StringFieldUpdateOperationsInput | string
    totalPoolBalance?: StringFieldUpdateOperationsInput | string
    snapshotTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    totalClaims?: StringFieldUpdateOperationsInput | string
    claimedAmount?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleDistributorCreateManyInput = {
    periodId: bigint | number
    merkleRoot: string
    totalPoolBalance: string
    snapshotTimestamp: Date | string
    totalClaims: string
    claimedAmount: string
    accountAddress: string
    updatedAt?: Date | string
  }

  export type MerkleDistributorUpdateManyMutationInput = {
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    merkleRoot?: StringFieldUpdateOperationsInput | string
    totalPoolBalance?: StringFieldUpdateOperationsInput | string
    snapshotTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    totalClaims?: StringFieldUpdateOperationsInput | string
    claimedAmount?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleDistributorUncheckedUpdateManyInput = {
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    merkleRoot?: StringFieldUpdateOperationsInput | string
    totalPoolBalance?: StringFieldUpdateOperationsInput | string
    snapshotTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    totalClaims?: StringFieldUpdateOperationsInput | string
    claimedAmount?: StringFieldUpdateOperationsInput | string
    accountAddress?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerProofCreateInput = {
    sellerAddress: string
    periodId: bigint | number
    amount: bigint | number
    proof: JsonNullValueInput | InputJsonValue
    claimed?: boolean
    claimedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SellerProofUncheckedCreateInput = {
    sellerAddress: string
    periodId: bigint | number
    amount: bigint | number
    proof: JsonNullValueInput | InputJsonValue
    claimed?: boolean
    claimedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SellerProofUpdateInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    proof?: JsonNullValueInput | InputJsonValue
    claimed?: BoolFieldUpdateOperationsInput | boolean
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerProofUncheckedUpdateInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    proof?: JsonNullValueInput | InputJsonValue
    claimed?: BoolFieldUpdateOperationsInput | boolean
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerProofCreateManyInput = {
    sellerAddress: string
    periodId: bigint | number
    amount: bigint | number
    proof: JsonNullValueInput | InputJsonValue
    claimed?: boolean
    claimedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SellerProofUpdateManyMutationInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    proof?: JsonNullValueInput | InputJsonValue
    claimed?: BoolFieldUpdateOperationsInput | boolean
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerProofUncheckedUpdateManyInput = {
    sellerAddress?: StringFieldUpdateOperationsInput | string
    periodId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    proof?: JsonNullValueInput | InputJsonValue
    claimed?: BoolFieldUpdateOperationsInput | boolean
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FocusSessionListRelationFilter = {
    every?: FocusSessionWhereInput
    some?: FocusSessionWhereInput
    none?: FocusSessionWhereInput
  }

  export type AppUsageListRelationFilter = {
    every?: AppUsageWhereInput
    some?: AppUsageWhereInput
    none?: AppUsageWhereInput
  }

  export type RoutineListRelationFilter = {
    every?: RoutineWhereInput
    some?: RoutineWhereInput
    none?: RoutineWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type CommitmentListRelationFilter = {
    every?: CommitmentWhereInput
    some?: CommitmentWhereInput
    none?: CommitmentWhereInput
  }

  export type FocusSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoutineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommitmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    theme?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumFocusSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FocusSessionStatus | EnumFocusSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFocusSessionStatusFilter<$PrismaModel> | $Enums.FocusSessionStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FocusSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    status?: SortOrder
  }

  export type FocusSessionAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type FocusSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    status?: SortOrder
  }

  export type FocusSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    status?: SortOrder
  }

  export type FocusSessionSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumFocusSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FocusSessionStatus | EnumFocusSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFocusSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.FocusSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFocusSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumFocusSessionStatusFilter<$PrismaModel>
  }

  export type EnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type AppUsageUserIdAppNamePlatformHourStartCompoundUniqueInput = {
    userId: string
    appName: string
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type AppUsageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    appName?: SortOrder
    timeSpent?: SortOrder
    platform?: SortOrder
    hourStart?: SortOrder
  }

  export type AppUsageAvgOrderByAggregateInput = {
    timeSpent?: SortOrder
  }

  export type AppUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    appName?: SortOrder
    timeSpent?: SortOrder
    platform?: SortOrder
    hourStart?: SortOrder
  }

  export type AppUsageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    appName?: SortOrder
    timeSpent?: SortOrder
    platform?: SortOrder
    hourStart?: SortOrder
  }

  export type AppUsageSumOrderByAggregateInput = {
    timeSpent?: SortOrder
  }

  export type EnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type EnumTimeModeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeMode | EnumTimeModeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeModeFilter<$PrismaModel> | $Enums.TimeMode
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumRoutineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoutineStatus | EnumRoutineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoutineStatusFilter<$PrismaModel> | $Enums.RoutineStatus
  }

  export type RoutineAppListRelationFilter = {
    every?: RoutineAppWhereInput
    some?: RoutineAppWhereInput
    none?: RoutineAppWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoutineAppOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoutineCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    emoji?: SortOrder
    timeMode?: SortOrder
    selectedDays?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dailyLimit?: SortOrder
    endDate?: SortOrder
    stakeAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutineAvgOrderByAggregateInput = {
    dailyLimit?: SortOrder
    stakeAmount?: SortOrder
  }

  export type RoutineMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    emoji?: SortOrder
    timeMode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dailyLimit?: SortOrder
    endDate?: SortOrder
    stakeAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutineMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    emoji?: SortOrder
    timeMode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dailyLimit?: SortOrder
    endDate?: SortOrder
    stakeAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoutineSumOrderByAggregateInput = {
    dailyLimit?: SortOrder
    stakeAmount?: SortOrder
  }

  export type EnumTimeModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeMode | EnumTimeModeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeModeWithAggregatesFilter<$PrismaModel> | $Enums.TimeMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeModeFilter<$PrismaModel>
    _max?: NestedEnumTimeModeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumRoutineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoutineStatus | EnumRoutineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoutineStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoutineStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoutineStatusFilter<$PrismaModel>
    _max?: NestedEnumRoutineStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AppCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    domains?: SortOrder
    androidPackageName?: SortOrder
    iosBundleId?: SortOrder
    category?: SortOrder
    isUserSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    androidPackageName?: SortOrder
    iosBundleId?: SortOrder
    category?: SortOrder
    isUserSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    androidPackageName?: SortOrder
    iosBundleId?: SortOrder
    category?: SortOrder
    isUserSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RoutineScalarRelationFilter = {
    is?: RoutineWhereInput
    isNot?: RoutineWhereInput
  }

  export type AppScalarRelationFilter = {
    is?: AppWhereInput
    isNot?: AppWhereInput
  }

  export type RoutineAppRoutineIdAppIdCompoundUniqueInput = {
    routineId: string
    appId: string
  }

  export type RoutineAppCountOrderByAggregateInput = {
    routineId?: SortOrder
    appId?: SortOrder
  }

  export type RoutineAppMaxOrderByAggregateInput = {
    routineId?: SortOrder
    appId?: SortOrder
  }

  export type RoutineAppMinOrderByAggregateInput = {
    routineId?: SortOrder
    appId?: SortOrder
  }

  export type EnumTaskStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateFilter<$PrismaModel> | $Enums.TaskState
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    task?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    index?: SortOrder
    tags?: SortOrder
    scheduledDate?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    task?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    index?: SortOrder
    scheduledDate?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    task?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    index?: SortOrder
    scheduledDate?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type EnumTaskStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateWithAggregatesFilter<$PrismaModel> | $Enums.TaskState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStateFilter<$PrismaModel>
    _max?: NestedEnumTaskStateFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumCommitmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommitmentStatus | EnumCommitmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommitmentStatusFilter<$PrismaModel> | $Enums.CommitmentStatus
  }

  export type RoutineNullableScalarRelationFilter = {
    is?: RoutineWhereInput | null
    isNot?: RoutineWhereInput | null
  }

  export type FocusSessionNullableScalarRelationFilter = {
    is?: FocusSessionWhereInput | null
    isNot?: FocusSessionWhereInput | null
  }

  export type CommitmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userPubkey?: SortOrder
    amount?: SortOrder
    unlockTime?: SortOrder
    createdAt?: SortOrder
    authorityPubkey?: SortOrder
    status?: SortOrder
    claimedAt?: SortOrder
    forfeitedAt?: SortOrder
    txSignature?: SortOrder
    routineId?: SortOrder
    focusSessionId?: SortOrder
  }

  export type CommitmentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CommitmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userPubkey?: SortOrder
    amount?: SortOrder
    unlockTime?: SortOrder
    createdAt?: SortOrder
    authorityPubkey?: SortOrder
    status?: SortOrder
    claimedAt?: SortOrder
    forfeitedAt?: SortOrder
    txSignature?: SortOrder
    routineId?: SortOrder
    focusSessionId?: SortOrder
  }

  export type CommitmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userPubkey?: SortOrder
    amount?: SortOrder
    unlockTime?: SortOrder
    createdAt?: SortOrder
    authorityPubkey?: SortOrder
    status?: SortOrder
    claimedAt?: SortOrder
    forfeitedAt?: SortOrder
    txSignature?: SortOrder
    routineId?: SortOrder
    focusSessionId?: SortOrder
  }

  export type CommitmentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumCommitmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommitmentStatus | EnumCommitmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommitmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommitmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommitmentStatusFilter<$PrismaModel>
    _max?: NestedEnumCommitmentStatusFilter<$PrismaModel>
  }

  export type MarketplaceConfigCountOrderByAggregateInput = {
    accountAddress?: SortOrder
    authority?: SortOrder
    currentPeriodRevenue?: SortOrder
    totalLifetimeRevenue?: SortOrder
    listingCounter?: SortOrder
    passCounter?: SortOrder
    snapshotPeriod?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketplaceConfigMaxOrderByAggregateInput = {
    accountAddress?: SortOrder
    authority?: SortOrder
    currentPeriodRevenue?: SortOrder
    totalLifetimeRevenue?: SortOrder
    listingCounter?: SortOrder
    passCounter?: SortOrder
    snapshotPeriod?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketplaceConfigMinOrderByAggregateInput = {
    accountAddress?: SortOrder
    authority?: SortOrder
    currentPeriodRevenue?: SortOrder
    totalLifetimeRevenue?: SortOrder
    listingCounter?: SortOrder
    passCounter?: SortOrder
    snapshotPeriod?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataSellerCountOrderByAggregateInput = {
    sellerAddress?: SortOrder
    listingId?: SortOrder
    totalRevenue?: SortOrder
    unclaimedRevenue?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataSellerMaxOrderByAggregateInput = {
    sellerAddress?: SortOrder
    listingId?: SortOrder
    totalRevenue?: SortOrder
    unclaimedRevenue?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataSellerMinOrderByAggregateInput = {
    sellerAddress?: SortOrder
    listingId?: SortOrder
    totalRevenue?: SortOrder
    unclaimedRevenue?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataListingCountOrderByAggregateInput = {
    listingId?: SortOrder
    sellerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerDay?: SortOrder
    accountAddress?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataListingMaxOrderByAggregateInput = {
    listingId?: SortOrder
    sellerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerDay?: SortOrder
    accountAddress?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataListingMinOrderByAggregateInput = {
    listingId?: SortOrder
    sellerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerDay?: SortOrder
    accountAddress?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataPassCountOrderByAggregateInput = {
    passId?: SortOrder
    buyerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    maxPricePerDay?: SortOrder
    totalPaid?: SortOrder
    dataNftMint?: SortOrder
    purchasedAt?: SortOrder
    eligibleSellerCount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataPassAvgOrderByAggregateInput = {
    eligibleSellerCount?: SortOrder
  }

  export type DataPassMaxOrderByAggregateInput = {
    passId?: SortOrder
    buyerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    maxPricePerDay?: SortOrder
    totalPaid?: SortOrder
    dataNftMint?: SortOrder
    purchasedAt?: SortOrder
    eligibleSellerCount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataPassMinOrderByAggregateInput = {
    passId?: SortOrder
    buyerAddress?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    maxPricePerDay?: SortOrder
    totalPaid?: SortOrder
    dataNftMint?: SortOrder
    purchasedAt?: SortOrder
    eligibleSellerCount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataPassSumOrderByAggregateInput = {
    eligibleSellerCount?: SortOrder
  }

  export type MerkleDistributorCountOrderByAggregateInput = {
    periodId?: SortOrder
    merkleRoot?: SortOrder
    totalPoolBalance?: SortOrder
    snapshotTimestamp?: SortOrder
    totalClaims?: SortOrder
    claimedAmount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerkleDistributorAvgOrderByAggregateInput = {
    periodId?: SortOrder
  }

  export type MerkleDistributorMaxOrderByAggregateInput = {
    periodId?: SortOrder
    merkleRoot?: SortOrder
    totalPoolBalance?: SortOrder
    snapshotTimestamp?: SortOrder
    totalClaims?: SortOrder
    claimedAmount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerkleDistributorMinOrderByAggregateInput = {
    periodId?: SortOrder
    merkleRoot?: SortOrder
    totalPoolBalance?: SortOrder
    snapshotTimestamp?: SortOrder
    totalClaims?: SortOrder
    claimedAmount?: SortOrder
    accountAddress?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerkleDistributorSumOrderByAggregateInput = {
    periodId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SellerProofSellerAddressPeriodIdCompoundUniqueInput = {
    sellerAddress: string
    periodId: bigint | number
  }

  export type SellerProofCountOrderByAggregateInput = {
    sellerAddress?: SortOrder
    periodId?: SortOrder
    amount?: SortOrder
    proof?: SortOrder
    claimed?: SortOrder
    claimedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SellerProofAvgOrderByAggregateInput = {
    periodId?: SortOrder
    amount?: SortOrder
  }

  export type SellerProofMaxOrderByAggregateInput = {
    sellerAddress?: SortOrder
    periodId?: SortOrder
    amount?: SortOrder
    claimed?: SortOrder
    claimedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SellerProofMinOrderByAggregateInput = {
    sellerAddress?: SortOrder
    periodId?: SortOrder
    amount?: SortOrder
    claimed?: SortOrder
    claimedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SellerProofSumOrderByAggregateInput = {
    periodId?: SortOrder
    amount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FocusSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput> | FocusSessionCreateWithoutUserInput[] | FocusSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FocusSessionCreateOrConnectWithoutUserInput | FocusSessionCreateOrConnectWithoutUserInput[]
    createMany?: FocusSessionCreateManyUserInputEnvelope
    connect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
  }

  export type AppUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput> | AppUsageCreateWithoutUserInput[] | AppUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppUsageCreateOrConnectWithoutUserInput | AppUsageCreateOrConnectWithoutUserInput[]
    createMany?: AppUsageCreateManyUserInputEnvelope
    connect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
  }

  export type RoutineCreateNestedManyWithoutUserInput = {
    create?: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput> | RoutineCreateWithoutUserInput[] | RoutineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoutineCreateOrConnectWithoutUserInput | RoutineCreateOrConnectWithoutUserInput[]
    createMany?: RoutineCreateManyUserInputEnvelope
    connect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type CommitmentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput> | CommitmentCreateWithoutUserInput[] | CommitmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutUserInput | CommitmentCreateOrConnectWithoutUserInput[]
    createMany?: CommitmentCreateManyUserInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type FocusSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput> | FocusSessionCreateWithoutUserInput[] | FocusSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FocusSessionCreateOrConnectWithoutUserInput | FocusSessionCreateOrConnectWithoutUserInput[]
    createMany?: FocusSessionCreateManyUserInputEnvelope
    connect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
  }

  export type AppUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput> | AppUsageCreateWithoutUserInput[] | AppUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppUsageCreateOrConnectWithoutUserInput | AppUsageCreateOrConnectWithoutUserInput[]
    createMany?: AppUsageCreateManyUserInputEnvelope
    connect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
  }

  export type RoutineUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput> | RoutineCreateWithoutUserInput[] | RoutineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoutineCreateOrConnectWithoutUserInput | RoutineCreateOrConnectWithoutUserInput[]
    createMany?: RoutineCreateManyUserInputEnvelope
    connect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type CommitmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput> | CommitmentCreateWithoutUserInput[] | CommitmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutUserInput | CommitmentCreateOrConnectWithoutUserInput[]
    createMany?: CommitmentCreateManyUserInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FocusSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput> | FocusSessionCreateWithoutUserInput[] | FocusSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FocusSessionCreateOrConnectWithoutUserInput | FocusSessionCreateOrConnectWithoutUserInput[]
    upsert?: FocusSessionUpsertWithWhereUniqueWithoutUserInput | FocusSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FocusSessionCreateManyUserInputEnvelope
    set?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    disconnect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    delete?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    connect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    update?: FocusSessionUpdateWithWhereUniqueWithoutUserInput | FocusSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FocusSessionUpdateManyWithWhereWithoutUserInput | FocusSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FocusSessionScalarWhereInput | FocusSessionScalarWhereInput[]
  }

  export type AppUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput> | AppUsageCreateWithoutUserInput[] | AppUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppUsageCreateOrConnectWithoutUserInput | AppUsageCreateOrConnectWithoutUserInput[]
    upsert?: AppUsageUpsertWithWhereUniqueWithoutUserInput | AppUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppUsageCreateManyUserInputEnvelope
    set?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    disconnect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    delete?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    connect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    update?: AppUsageUpdateWithWhereUniqueWithoutUserInput | AppUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppUsageUpdateManyWithWhereWithoutUserInput | AppUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppUsageScalarWhereInput | AppUsageScalarWhereInput[]
  }

  export type RoutineUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput> | RoutineCreateWithoutUserInput[] | RoutineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoutineCreateOrConnectWithoutUserInput | RoutineCreateOrConnectWithoutUserInput[]
    upsert?: RoutineUpsertWithWhereUniqueWithoutUserInput | RoutineUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoutineCreateManyUserInputEnvelope
    set?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    disconnect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    delete?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    connect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    update?: RoutineUpdateWithWhereUniqueWithoutUserInput | RoutineUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoutineUpdateManyWithWhereWithoutUserInput | RoutineUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoutineScalarWhereInput | RoutineScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type CommitmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput> | CommitmentCreateWithoutUserInput[] | CommitmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutUserInput | CommitmentCreateOrConnectWithoutUserInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutUserInput | CommitmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommitmentCreateManyUserInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutUserInput | CommitmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutUserInput | CommitmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type FocusSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput> | FocusSessionCreateWithoutUserInput[] | FocusSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FocusSessionCreateOrConnectWithoutUserInput | FocusSessionCreateOrConnectWithoutUserInput[]
    upsert?: FocusSessionUpsertWithWhereUniqueWithoutUserInput | FocusSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FocusSessionCreateManyUserInputEnvelope
    set?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    disconnect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    delete?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    connect?: FocusSessionWhereUniqueInput | FocusSessionWhereUniqueInput[]
    update?: FocusSessionUpdateWithWhereUniqueWithoutUserInput | FocusSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FocusSessionUpdateManyWithWhereWithoutUserInput | FocusSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FocusSessionScalarWhereInput | FocusSessionScalarWhereInput[]
  }

  export type AppUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput> | AppUsageCreateWithoutUserInput[] | AppUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppUsageCreateOrConnectWithoutUserInput | AppUsageCreateOrConnectWithoutUserInput[]
    upsert?: AppUsageUpsertWithWhereUniqueWithoutUserInput | AppUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppUsageCreateManyUserInputEnvelope
    set?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    disconnect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    delete?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    connect?: AppUsageWhereUniqueInput | AppUsageWhereUniqueInput[]
    update?: AppUsageUpdateWithWhereUniqueWithoutUserInput | AppUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppUsageUpdateManyWithWhereWithoutUserInput | AppUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppUsageScalarWhereInput | AppUsageScalarWhereInput[]
  }

  export type RoutineUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput> | RoutineCreateWithoutUserInput[] | RoutineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoutineCreateOrConnectWithoutUserInput | RoutineCreateOrConnectWithoutUserInput[]
    upsert?: RoutineUpsertWithWhereUniqueWithoutUserInput | RoutineUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoutineCreateManyUserInputEnvelope
    set?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    disconnect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    delete?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    connect?: RoutineWhereUniqueInput | RoutineWhereUniqueInput[]
    update?: RoutineUpdateWithWhereUniqueWithoutUserInput | RoutineUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoutineUpdateManyWithWhereWithoutUserInput | RoutineUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoutineScalarWhereInput | RoutineScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type CommitmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput> | CommitmentCreateWithoutUserInput[] | CommitmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutUserInput | CommitmentCreateOrConnectWithoutUserInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutUserInput | CommitmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommitmentCreateManyUserInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutUserInput | CommitmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutUserInput | CommitmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFocusSessionsInput = {
    create?: XOR<UserCreateWithoutFocusSessionsInput, UserUncheckedCreateWithoutFocusSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFocusSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type CommitmentCreateNestedManyWithoutFocusSessionInput = {
    create?: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput> | CommitmentCreateWithoutFocusSessionInput[] | CommitmentUncheckedCreateWithoutFocusSessionInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutFocusSessionInput | CommitmentCreateOrConnectWithoutFocusSessionInput[]
    createMany?: CommitmentCreateManyFocusSessionInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type CommitmentUncheckedCreateNestedManyWithoutFocusSessionInput = {
    create?: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput> | CommitmentCreateWithoutFocusSessionInput[] | CommitmentUncheckedCreateWithoutFocusSessionInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutFocusSessionInput | CommitmentCreateOrConnectWithoutFocusSessionInput[]
    createMany?: CommitmentCreateManyFocusSessionInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFocusSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.FocusSessionStatus
  }

  export type UserUpdateOneRequiredWithoutFocusSessionsNestedInput = {
    create?: XOR<UserCreateWithoutFocusSessionsInput, UserUncheckedCreateWithoutFocusSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFocusSessionsInput
    upsert?: UserUpsertWithoutFocusSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFocusSessionsInput, UserUpdateWithoutFocusSessionsInput>, UserUncheckedUpdateWithoutFocusSessionsInput>
  }

  export type CommitmentUpdateManyWithoutFocusSessionNestedInput = {
    create?: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput> | CommitmentCreateWithoutFocusSessionInput[] | CommitmentUncheckedCreateWithoutFocusSessionInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutFocusSessionInput | CommitmentCreateOrConnectWithoutFocusSessionInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutFocusSessionInput | CommitmentUpsertWithWhereUniqueWithoutFocusSessionInput[]
    createMany?: CommitmentCreateManyFocusSessionInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutFocusSessionInput | CommitmentUpdateWithWhereUniqueWithoutFocusSessionInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutFocusSessionInput | CommitmentUpdateManyWithWhereWithoutFocusSessionInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type CommitmentUncheckedUpdateManyWithoutFocusSessionNestedInput = {
    create?: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput> | CommitmentCreateWithoutFocusSessionInput[] | CommitmentUncheckedCreateWithoutFocusSessionInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutFocusSessionInput | CommitmentCreateOrConnectWithoutFocusSessionInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutFocusSessionInput | CommitmentUpsertWithWhereUniqueWithoutFocusSessionInput[]
    createMany?: CommitmentCreateManyFocusSessionInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutFocusSessionInput | CommitmentUpdateWithWhereUniqueWithoutFocusSessionInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutFocusSessionInput | CommitmentUpdateManyWithWhereWithoutFocusSessionInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAppUsageInput = {
    create?: XOR<UserCreateWithoutAppUsageInput, UserUncheckedCreateWithoutAppUsageInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppUsageInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPlatformFieldUpdateOperationsInput = {
    set?: $Enums.Platform
  }

  export type UserUpdateOneRequiredWithoutAppUsageNestedInput = {
    create?: XOR<UserCreateWithoutAppUsageInput, UserUncheckedCreateWithoutAppUsageInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppUsageInput
    upsert?: UserUpsertWithoutAppUsageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppUsageInput, UserUpdateWithoutAppUsageInput>, UserUncheckedUpdateWithoutAppUsageInput>
  }

  export type RoutineCreateselectedDaysInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutRoutinesInput = {
    create?: XOR<UserCreateWithoutRoutinesInput, UserUncheckedCreateWithoutRoutinesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoutinesInput
    connect?: UserWhereUniqueInput
  }

  export type RoutineAppCreateNestedManyWithoutRoutineInput = {
    create?: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput> | RoutineAppCreateWithoutRoutineInput[] | RoutineAppUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutRoutineInput | RoutineAppCreateOrConnectWithoutRoutineInput[]
    createMany?: RoutineAppCreateManyRoutineInputEnvelope
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
  }

  export type CommitmentCreateNestedManyWithoutRoutineInput = {
    create?: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput> | CommitmentCreateWithoutRoutineInput[] | CommitmentUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutRoutineInput | CommitmentCreateOrConnectWithoutRoutineInput[]
    createMany?: CommitmentCreateManyRoutineInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type RoutineAppUncheckedCreateNestedManyWithoutRoutineInput = {
    create?: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput> | RoutineAppCreateWithoutRoutineInput[] | RoutineAppUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutRoutineInput | RoutineAppCreateOrConnectWithoutRoutineInput[]
    createMany?: RoutineAppCreateManyRoutineInputEnvelope
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
  }

  export type CommitmentUncheckedCreateNestedManyWithoutRoutineInput = {
    create?: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput> | CommitmentCreateWithoutRoutineInput[] | CommitmentUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutRoutineInput | CommitmentCreateOrConnectWithoutRoutineInput[]
    createMany?: CommitmentCreateManyRoutineInputEnvelope
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
  }

  export type EnumTimeModeFieldUpdateOperationsInput = {
    set?: $Enums.TimeMode
  }

  export type RoutineUpdateselectedDaysInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoutineStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoutineStatus
  }

  export type UserUpdateOneRequiredWithoutRoutinesNestedInput = {
    create?: XOR<UserCreateWithoutRoutinesInput, UserUncheckedCreateWithoutRoutinesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoutinesInput
    upsert?: UserUpsertWithoutRoutinesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoutinesInput, UserUpdateWithoutRoutinesInput>, UserUncheckedUpdateWithoutRoutinesInput>
  }

  export type RoutineAppUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput> | RoutineAppCreateWithoutRoutineInput[] | RoutineAppUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutRoutineInput | RoutineAppCreateOrConnectWithoutRoutineInput[]
    upsert?: RoutineAppUpsertWithWhereUniqueWithoutRoutineInput | RoutineAppUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: RoutineAppCreateManyRoutineInputEnvelope
    set?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    disconnect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    delete?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    update?: RoutineAppUpdateWithWhereUniqueWithoutRoutineInput | RoutineAppUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: RoutineAppUpdateManyWithWhereWithoutRoutineInput | RoutineAppUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
  }

  export type CommitmentUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput> | CommitmentCreateWithoutRoutineInput[] | CommitmentUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutRoutineInput | CommitmentCreateOrConnectWithoutRoutineInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutRoutineInput | CommitmentUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: CommitmentCreateManyRoutineInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutRoutineInput | CommitmentUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutRoutineInput | CommitmentUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type RoutineAppUncheckedUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput> | RoutineAppCreateWithoutRoutineInput[] | RoutineAppUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutRoutineInput | RoutineAppCreateOrConnectWithoutRoutineInput[]
    upsert?: RoutineAppUpsertWithWhereUniqueWithoutRoutineInput | RoutineAppUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: RoutineAppCreateManyRoutineInputEnvelope
    set?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    disconnect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    delete?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    update?: RoutineAppUpdateWithWhereUniqueWithoutRoutineInput | RoutineAppUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: RoutineAppUpdateManyWithWhereWithoutRoutineInput | RoutineAppUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
  }

  export type CommitmentUncheckedUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput> | CommitmentCreateWithoutRoutineInput[] | CommitmentUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: CommitmentCreateOrConnectWithoutRoutineInput | CommitmentCreateOrConnectWithoutRoutineInput[]
    upsert?: CommitmentUpsertWithWhereUniqueWithoutRoutineInput | CommitmentUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: CommitmentCreateManyRoutineInputEnvelope
    set?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    disconnect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    delete?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    connect?: CommitmentWhereUniqueInput | CommitmentWhereUniqueInput[]
    update?: CommitmentUpdateWithWhereUniqueWithoutRoutineInput | CommitmentUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: CommitmentUpdateManyWithWhereWithoutRoutineInput | CommitmentUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
  }

  export type AppCreatedomainsInput = {
    set: string[]
  }

  export type RoutineAppCreateNestedManyWithoutAppInput = {
    create?: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput> | RoutineAppCreateWithoutAppInput[] | RoutineAppUncheckedCreateWithoutAppInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutAppInput | RoutineAppCreateOrConnectWithoutAppInput[]
    createMany?: RoutineAppCreateManyAppInputEnvelope
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
  }

  export type RoutineAppUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput> | RoutineAppCreateWithoutAppInput[] | RoutineAppUncheckedCreateWithoutAppInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutAppInput | RoutineAppCreateOrConnectWithoutAppInput[]
    createMany?: RoutineAppCreateManyAppInputEnvelope
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
  }

  export type AppUpdatedomainsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoutineAppUpdateManyWithoutAppNestedInput = {
    create?: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput> | RoutineAppCreateWithoutAppInput[] | RoutineAppUncheckedCreateWithoutAppInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutAppInput | RoutineAppCreateOrConnectWithoutAppInput[]
    upsert?: RoutineAppUpsertWithWhereUniqueWithoutAppInput | RoutineAppUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: RoutineAppCreateManyAppInputEnvelope
    set?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    disconnect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    delete?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    update?: RoutineAppUpdateWithWhereUniqueWithoutAppInput | RoutineAppUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: RoutineAppUpdateManyWithWhereWithoutAppInput | RoutineAppUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
  }

  export type RoutineAppUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput> | RoutineAppCreateWithoutAppInput[] | RoutineAppUncheckedCreateWithoutAppInput[]
    connectOrCreate?: RoutineAppCreateOrConnectWithoutAppInput | RoutineAppCreateOrConnectWithoutAppInput[]
    upsert?: RoutineAppUpsertWithWhereUniqueWithoutAppInput | RoutineAppUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: RoutineAppCreateManyAppInputEnvelope
    set?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    disconnect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    delete?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    connect?: RoutineAppWhereUniqueInput | RoutineAppWhereUniqueInput[]
    update?: RoutineAppUpdateWithWhereUniqueWithoutAppInput | RoutineAppUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: RoutineAppUpdateManyWithWhereWithoutAppInput | RoutineAppUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
  }

  export type RoutineCreateNestedOneWithoutBlockedAppsInput = {
    create?: XOR<RoutineCreateWithoutBlockedAppsInput, RoutineUncheckedCreateWithoutBlockedAppsInput>
    connectOrCreate?: RoutineCreateOrConnectWithoutBlockedAppsInput
    connect?: RoutineWhereUniqueInput
  }

  export type AppCreateNestedOneWithoutRoutinesInput = {
    create?: XOR<AppCreateWithoutRoutinesInput, AppUncheckedCreateWithoutRoutinesInput>
    connectOrCreate?: AppCreateOrConnectWithoutRoutinesInput
    connect?: AppWhereUniqueInput
  }

  export type RoutineUpdateOneRequiredWithoutBlockedAppsNestedInput = {
    create?: XOR<RoutineCreateWithoutBlockedAppsInput, RoutineUncheckedCreateWithoutBlockedAppsInput>
    connectOrCreate?: RoutineCreateOrConnectWithoutBlockedAppsInput
    upsert?: RoutineUpsertWithoutBlockedAppsInput
    connect?: RoutineWhereUniqueInput
    update?: XOR<XOR<RoutineUpdateToOneWithWhereWithoutBlockedAppsInput, RoutineUpdateWithoutBlockedAppsInput>, RoutineUncheckedUpdateWithoutBlockedAppsInput>
  }

  export type AppUpdateOneRequiredWithoutRoutinesNestedInput = {
    create?: XOR<AppCreateWithoutRoutinesInput, AppUncheckedCreateWithoutRoutinesInput>
    connectOrCreate?: AppCreateOrConnectWithoutRoutinesInput
    upsert?: AppUpsertWithoutRoutinesInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutRoutinesInput, AppUpdateWithoutRoutinesInput>, AppUncheckedUpdateWithoutRoutinesInput>
  }

  export type TaskCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutTaskInput = {
    create?: XOR<UserCreateWithoutTaskInput, UserUncheckedCreateWithoutTaskInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTaskStateFieldUpdateOperationsInput = {
    set?: $Enums.TaskState
  }

  export type TaskUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutTaskNestedInput = {
    create?: XOR<UserCreateWithoutTaskInput, UserUncheckedCreateWithoutTaskInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskInput
    upsert?: UserUpsertWithoutTaskInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskInput, UserUpdateWithoutTaskInput>, UserUncheckedUpdateWithoutTaskInput>
  }

  export type UserCreateNestedOneWithoutCommitmentsInput = {
    create?: XOR<UserCreateWithoutCommitmentsInput, UserUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommitmentsInput
    connect?: UserWhereUniqueInput
  }

  export type RoutineCreateNestedOneWithoutCommitmentsInput = {
    create?: XOR<RoutineCreateWithoutCommitmentsInput, RoutineUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: RoutineCreateOrConnectWithoutCommitmentsInput
    connect?: RoutineWhereUniqueInput
  }

  export type FocusSessionCreateNestedOneWithoutCommitmentsInput = {
    create?: XOR<FocusSessionCreateWithoutCommitmentsInput, FocusSessionUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: FocusSessionCreateOrConnectWithoutCommitmentsInput
    connect?: FocusSessionWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumCommitmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.CommitmentStatus
  }

  export type UserUpdateOneRequiredWithoutCommitmentsNestedInput = {
    create?: XOR<UserCreateWithoutCommitmentsInput, UserUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommitmentsInput
    upsert?: UserUpsertWithoutCommitmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommitmentsInput, UserUpdateWithoutCommitmentsInput>, UserUncheckedUpdateWithoutCommitmentsInput>
  }

  export type RoutineUpdateOneWithoutCommitmentsNestedInput = {
    create?: XOR<RoutineCreateWithoutCommitmentsInput, RoutineUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: RoutineCreateOrConnectWithoutCommitmentsInput
    upsert?: RoutineUpsertWithoutCommitmentsInput
    disconnect?: RoutineWhereInput | boolean
    delete?: RoutineWhereInput | boolean
    connect?: RoutineWhereUniqueInput
    update?: XOR<XOR<RoutineUpdateToOneWithWhereWithoutCommitmentsInput, RoutineUpdateWithoutCommitmentsInput>, RoutineUncheckedUpdateWithoutCommitmentsInput>
  }

  export type FocusSessionUpdateOneWithoutCommitmentsNestedInput = {
    create?: XOR<FocusSessionCreateWithoutCommitmentsInput, FocusSessionUncheckedCreateWithoutCommitmentsInput>
    connectOrCreate?: FocusSessionCreateOrConnectWithoutCommitmentsInput
    upsert?: FocusSessionUpsertWithoutCommitmentsInput
    disconnect?: FocusSessionWhereInput | boolean
    delete?: FocusSessionWhereInput | boolean
    connect?: FocusSessionWhereUniqueInput
    update?: XOR<XOR<FocusSessionUpdateToOneWithWhereWithoutCommitmentsInput, FocusSessionUpdateWithoutCommitmentsInput>, FocusSessionUncheckedUpdateWithoutCommitmentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFocusSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FocusSessionStatus | EnumFocusSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFocusSessionStatusFilter<$PrismaModel> | $Enums.FocusSessionStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumFocusSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FocusSessionStatus | EnumFocusSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FocusSessionStatus[] | ListEnumFocusSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFocusSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.FocusSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFocusSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumFocusSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type NestedEnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type NestedEnumTimeModeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeMode | EnumTimeModeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeModeFilter<$PrismaModel> | $Enums.TimeMode
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoutineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoutineStatus | EnumRoutineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoutineStatusFilter<$PrismaModel> | $Enums.RoutineStatus
  }

  export type NestedEnumTimeModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeMode | EnumTimeModeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeMode[] | ListEnumTimeModeFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeModeWithAggregatesFilter<$PrismaModel> | $Enums.TimeMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeModeFilter<$PrismaModel>
    _max?: NestedEnumTimeModeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRoutineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoutineStatus | EnumRoutineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoutineStatus[] | ListEnumRoutineStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoutineStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoutineStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoutineStatusFilter<$PrismaModel>
    _max?: NestedEnumRoutineStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTaskStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateFilter<$PrismaModel> | $Enums.TaskState
  }

  export type NestedEnumTaskStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskState | EnumTaskStateFieldRefInput<$PrismaModel>
    in?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskState[] | ListEnumTaskStateFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStateWithAggregatesFilter<$PrismaModel> | $Enums.TaskState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStateFilter<$PrismaModel>
    _max?: NestedEnumTaskStateFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumCommitmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommitmentStatus | EnumCommitmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommitmentStatusFilter<$PrismaModel> | $Enums.CommitmentStatus
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumCommitmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommitmentStatus | EnumCommitmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommitmentStatus[] | ListEnumCommitmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommitmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommitmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommitmentStatusFilter<$PrismaModel>
    _max?: NestedEnumCommitmentStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FocusSessionCreateWithoutUserInput = {
    id?: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
    commitments?: CommitmentCreateNestedManyWithoutFocusSessionInput
  }

  export type FocusSessionUncheckedCreateWithoutUserInput = {
    id?: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
    commitments?: CommitmentUncheckedCreateNestedManyWithoutFocusSessionInput
  }

  export type FocusSessionCreateOrConnectWithoutUserInput = {
    where: FocusSessionWhereUniqueInput
    create: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput>
  }

  export type FocusSessionCreateManyUserInputEnvelope = {
    data: FocusSessionCreateManyUserInput | FocusSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AppUsageCreateWithoutUserInput = {
    id?: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type AppUsageUncheckedCreateWithoutUserInput = {
    id?: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type AppUsageCreateOrConnectWithoutUserInput = {
    where: AppUsageWhereUniqueInput
    create: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput>
  }

  export type AppUsageCreateManyUserInputEnvelope = {
    data: AppUsageCreateManyUserInput | AppUsageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoutineCreateWithoutUserInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    blockedApps?: RoutineAppCreateNestedManyWithoutRoutineInput
    commitments?: CommitmentCreateNestedManyWithoutRoutineInput
  }

  export type RoutineUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    blockedApps?: RoutineAppUncheckedCreateNestedManyWithoutRoutineInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutRoutineInput
  }

  export type RoutineCreateOrConnectWithoutUserInput = {
    where: RoutineWhereUniqueInput
    create: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput>
  }

  export type RoutineCreateManyUserInputEnvelope = {
    data: RoutineCreateManyUserInput | RoutineCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommitmentCreateWithoutUserInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routine?: RoutineCreateNestedOneWithoutCommitmentsInput
    focusSession?: FocusSessionCreateNestedOneWithoutCommitmentsInput
  }

  export type CommitmentUncheckedCreateWithoutUserInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
    focusSessionId?: string | null
  }

  export type CommitmentCreateOrConnectWithoutUserInput = {
    where: CommitmentWhereUniqueInput
    create: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput>
  }

  export type CommitmentCreateManyUserInputEnvelope = {
    data: CommitmentCreateManyUserInput | CommitmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FocusSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: FocusSessionWhereUniqueInput
    update: XOR<FocusSessionUpdateWithoutUserInput, FocusSessionUncheckedUpdateWithoutUserInput>
    create: XOR<FocusSessionCreateWithoutUserInput, FocusSessionUncheckedCreateWithoutUserInput>
  }

  export type FocusSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: FocusSessionWhereUniqueInput
    data: XOR<FocusSessionUpdateWithoutUserInput, FocusSessionUncheckedUpdateWithoutUserInput>
  }

  export type FocusSessionUpdateManyWithWhereWithoutUserInput = {
    where: FocusSessionScalarWhereInput
    data: XOR<FocusSessionUpdateManyMutationInput, FocusSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type FocusSessionScalarWhereInput = {
    AND?: FocusSessionScalarWhereInput | FocusSessionScalarWhereInput[]
    OR?: FocusSessionScalarWhereInput[]
    NOT?: FocusSessionScalarWhereInput | FocusSessionScalarWhereInput[]
    id?: StringFilter<"FocusSession"> | string
    userId?: StringFilter<"FocusSession"> | string
    startTime?: DateTimeFilter<"FocusSession"> | Date | string
    duration?: IntFilter<"FocusSession"> | number
    status?: EnumFocusSessionStatusFilter<"FocusSession"> | $Enums.FocusSessionStatus
  }

  export type AppUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: AppUsageWhereUniqueInput
    update: XOR<AppUsageUpdateWithoutUserInput, AppUsageUncheckedUpdateWithoutUserInput>
    create: XOR<AppUsageCreateWithoutUserInput, AppUsageUncheckedCreateWithoutUserInput>
  }

  export type AppUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: AppUsageWhereUniqueInput
    data: XOR<AppUsageUpdateWithoutUserInput, AppUsageUncheckedUpdateWithoutUserInput>
  }

  export type AppUsageUpdateManyWithWhereWithoutUserInput = {
    where: AppUsageScalarWhereInput
    data: XOR<AppUsageUpdateManyMutationInput, AppUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type AppUsageScalarWhereInput = {
    AND?: AppUsageScalarWhereInput | AppUsageScalarWhereInput[]
    OR?: AppUsageScalarWhereInput[]
    NOT?: AppUsageScalarWhereInput | AppUsageScalarWhereInput[]
    id?: StringFilter<"AppUsage"> | string
    userId?: StringFilter<"AppUsage"> | string
    appName?: StringFilter<"AppUsage"> | string
    timeSpent?: IntFilter<"AppUsage"> | number
    platform?: EnumPlatformFilter<"AppUsage"> | $Enums.Platform
    hourStart?: DateTimeFilter<"AppUsage"> | Date | string
  }

  export type RoutineUpsertWithWhereUniqueWithoutUserInput = {
    where: RoutineWhereUniqueInput
    update: XOR<RoutineUpdateWithoutUserInput, RoutineUncheckedUpdateWithoutUserInput>
    create: XOR<RoutineCreateWithoutUserInput, RoutineUncheckedCreateWithoutUserInput>
  }

  export type RoutineUpdateWithWhereUniqueWithoutUserInput = {
    where: RoutineWhereUniqueInput
    data: XOR<RoutineUpdateWithoutUserInput, RoutineUncheckedUpdateWithoutUserInput>
  }

  export type RoutineUpdateManyWithWhereWithoutUserInput = {
    where: RoutineScalarWhereInput
    data: XOR<RoutineUpdateManyMutationInput, RoutineUncheckedUpdateManyWithoutUserInput>
  }

  export type RoutineScalarWhereInput = {
    AND?: RoutineScalarWhereInput | RoutineScalarWhereInput[]
    OR?: RoutineScalarWhereInput[]
    NOT?: RoutineScalarWhereInput | RoutineScalarWhereInput[]
    id?: StringFilter<"Routine"> | string
    userId?: StringFilter<"Routine"> | string
    name?: StringFilter<"Routine"> | string
    emoji?: StringFilter<"Routine"> | string
    timeMode?: EnumTimeModeFilter<"Routine"> | $Enums.TimeMode
    selectedDays?: StringNullableListFilter<"Routine">
    startTime?: StringNullableFilter<"Routine"> | string | null
    endTime?: StringNullableFilter<"Routine"> | string | null
    dailyLimit?: IntNullableFilter<"Routine"> | number | null
    endDate?: DateTimeNullableFilter<"Routine"> | Date | string | null
    stakeAmount?: FloatFilter<"Routine"> | number
    status?: EnumRoutineStatusFilter<"Routine"> | $Enums.RoutineStatus
    createdAt?: DateTimeFilter<"Routine"> | Date | string
    updatedAt?: DateTimeFilter<"Routine"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    task?: StringFilter<"Task"> | string
    state?: EnumTaskStateFilter<"Task"> | $Enums.TaskState
    createdAt?: DateTimeFilter<"Task"> | Date | string
    index?: IntNullableFilter<"Task"> | number | null
    tags?: StringNullableListFilter<"Task">
    scheduledDate?: DateTimeFilter<"Task"> | Date | string
  }

  export type CommitmentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommitmentWhereUniqueInput
    update: XOR<CommitmentUpdateWithoutUserInput, CommitmentUncheckedUpdateWithoutUserInput>
    create: XOR<CommitmentCreateWithoutUserInput, CommitmentUncheckedCreateWithoutUserInput>
  }

  export type CommitmentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommitmentWhereUniqueInput
    data: XOR<CommitmentUpdateWithoutUserInput, CommitmentUncheckedUpdateWithoutUserInput>
  }

  export type CommitmentUpdateManyWithWhereWithoutUserInput = {
    where: CommitmentScalarWhereInput
    data: XOR<CommitmentUpdateManyMutationInput, CommitmentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommitmentScalarWhereInput = {
    AND?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
    OR?: CommitmentScalarWhereInput[]
    NOT?: CommitmentScalarWhereInput | CommitmentScalarWhereInput[]
    id?: StringFilter<"Commitment"> | string
    userId?: StringFilter<"Commitment"> | string
    userPubkey?: StringFilter<"Commitment"> | string
    amount?: BigIntFilter<"Commitment"> | bigint | number
    unlockTime?: DateTimeFilter<"Commitment"> | Date | string
    createdAt?: DateTimeFilter<"Commitment"> | Date | string
    authorityPubkey?: StringFilter<"Commitment"> | string
    status?: EnumCommitmentStatusFilter<"Commitment"> | $Enums.CommitmentStatus
    claimedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    forfeitedAt?: DateTimeNullableFilter<"Commitment"> | Date | string | null
    txSignature?: StringNullableFilter<"Commitment"> | string | null
    routineId?: StringNullableFilter<"Commitment"> | string | null
    focusSessionId?: StringNullableFilter<"Commitment"> | string | null
  }

  export type UserCreateWithoutFocusSessionsInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appUsage?: AppUsageCreateNestedManyWithoutUserInput
    routines?: RoutineCreateNestedManyWithoutUserInput
    task?: TaskCreateNestedManyWithoutUserInput
    commitments?: CommitmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFocusSessionsInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appUsage?: AppUsageUncheckedCreateNestedManyWithoutUserInput
    routines?: RoutineUncheckedCreateNestedManyWithoutUserInput
    task?: TaskUncheckedCreateNestedManyWithoutUserInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFocusSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFocusSessionsInput, UserUncheckedCreateWithoutFocusSessionsInput>
  }

  export type CommitmentCreateWithoutFocusSessionInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    user: UserCreateNestedOneWithoutCommitmentsInput
    routine?: RoutineCreateNestedOneWithoutCommitmentsInput
  }

  export type CommitmentUncheckedCreateWithoutFocusSessionInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
  }

  export type CommitmentCreateOrConnectWithoutFocusSessionInput = {
    where: CommitmentWhereUniqueInput
    create: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput>
  }

  export type CommitmentCreateManyFocusSessionInputEnvelope = {
    data: CommitmentCreateManyFocusSessionInput | CommitmentCreateManyFocusSessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFocusSessionsInput = {
    update: XOR<UserUpdateWithoutFocusSessionsInput, UserUncheckedUpdateWithoutFocusSessionsInput>
    create: XOR<UserCreateWithoutFocusSessionsInput, UserUncheckedCreateWithoutFocusSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFocusSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFocusSessionsInput, UserUncheckedUpdateWithoutFocusSessionsInput>
  }

  export type UserUpdateWithoutFocusSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appUsage?: AppUsageUpdateManyWithoutUserNestedInput
    routines?: RoutineUpdateManyWithoutUserNestedInput
    task?: TaskUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFocusSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appUsage?: AppUsageUncheckedUpdateManyWithoutUserNestedInput
    routines?: RoutineUncheckedUpdateManyWithoutUserNestedInput
    task?: TaskUncheckedUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommitmentUpsertWithWhereUniqueWithoutFocusSessionInput = {
    where: CommitmentWhereUniqueInput
    update: XOR<CommitmentUpdateWithoutFocusSessionInput, CommitmentUncheckedUpdateWithoutFocusSessionInput>
    create: XOR<CommitmentCreateWithoutFocusSessionInput, CommitmentUncheckedCreateWithoutFocusSessionInput>
  }

  export type CommitmentUpdateWithWhereUniqueWithoutFocusSessionInput = {
    where: CommitmentWhereUniqueInput
    data: XOR<CommitmentUpdateWithoutFocusSessionInput, CommitmentUncheckedUpdateWithoutFocusSessionInput>
  }

  export type CommitmentUpdateManyWithWhereWithoutFocusSessionInput = {
    where: CommitmentScalarWhereInput
    data: XOR<CommitmentUpdateManyMutationInput, CommitmentUncheckedUpdateManyWithoutFocusSessionInput>
  }

  export type UserCreateWithoutAppUsageInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionCreateNestedManyWithoutUserInput
    routines?: RoutineCreateNestedManyWithoutUserInput
    task?: TaskCreateNestedManyWithoutUserInput
    commitments?: CommitmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAppUsageInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionUncheckedCreateNestedManyWithoutUserInput
    routines?: RoutineUncheckedCreateNestedManyWithoutUserInput
    task?: TaskUncheckedCreateNestedManyWithoutUserInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAppUsageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppUsageInput, UserUncheckedCreateWithoutAppUsageInput>
  }

  export type UserUpsertWithoutAppUsageInput = {
    update: XOR<UserUpdateWithoutAppUsageInput, UserUncheckedUpdateWithoutAppUsageInput>
    create: XOR<UserCreateWithoutAppUsageInput, UserUncheckedCreateWithoutAppUsageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppUsageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppUsageInput, UserUncheckedUpdateWithoutAppUsageInput>
  }

  export type UserUpdateWithoutAppUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUpdateManyWithoutUserNestedInput
    routines?: RoutineUpdateManyWithoutUserNestedInput
    task?: TaskUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAppUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUncheckedUpdateManyWithoutUserNestedInput
    routines?: RoutineUncheckedUpdateManyWithoutUserNestedInput
    task?: TaskUncheckedUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRoutinesInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionCreateNestedManyWithoutUserInput
    appUsage?: AppUsageCreateNestedManyWithoutUserInput
    task?: TaskCreateNestedManyWithoutUserInput
    commitments?: CommitmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoutinesInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionUncheckedCreateNestedManyWithoutUserInput
    appUsage?: AppUsageUncheckedCreateNestedManyWithoutUserInput
    task?: TaskUncheckedCreateNestedManyWithoutUserInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoutinesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoutinesInput, UserUncheckedCreateWithoutRoutinesInput>
  }

  export type RoutineAppCreateWithoutRoutineInput = {
    app: AppCreateNestedOneWithoutRoutinesInput
  }

  export type RoutineAppUncheckedCreateWithoutRoutineInput = {
    appId: string
  }

  export type RoutineAppCreateOrConnectWithoutRoutineInput = {
    where: RoutineAppWhereUniqueInput
    create: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput>
  }

  export type RoutineAppCreateManyRoutineInputEnvelope = {
    data: RoutineAppCreateManyRoutineInput | RoutineAppCreateManyRoutineInput[]
    skipDuplicates?: boolean
  }

  export type CommitmentCreateWithoutRoutineInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    user: UserCreateNestedOneWithoutCommitmentsInput
    focusSession?: FocusSessionCreateNestedOneWithoutCommitmentsInput
  }

  export type CommitmentUncheckedCreateWithoutRoutineInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    focusSessionId?: string | null
  }

  export type CommitmentCreateOrConnectWithoutRoutineInput = {
    where: CommitmentWhereUniqueInput
    create: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput>
  }

  export type CommitmentCreateManyRoutineInputEnvelope = {
    data: CommitmentCreateManyRoutineInput | CommitmentCreateManyRoutineInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRoutinesInput = {
    update: XOR<UserUpdateWithoutRoutinesInput, UserUncheckedUpdateWithoutRoutinesInput>
    create: XOR<UserCreateWithoutRoutinesInput, UserUncheckedCreateWithoutRoutinesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoutinesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoutinesInput, UserUncheckedUpdateWithoutRoutinesInput>
  }

  export type UserUpdateWithoutRoutinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUpdateManyWithoutUserNestedInput
    task?: TaskUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoutinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUncheckedUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUncheckedUpdateManyWithoutUserNestedInput
    task?: TaskUncheckedUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoutineAppUpsertWithWhereUniqueWithoutRoutineInput = {
    where: RoutineAppWhereUniqueInput
    update: XOR<RoutineAppUpdateWithoutRoutineInput, RoutineAppUncheckedUpdateWithoutRoutineInput>
    create: XOR<RoutineAppCreateWithoutRoutineInput, RoutineAppUncheckedCreateWithoutRoutineInput>
  }

  export type RoutineAppUpdateWithWhereUniqueWithoutRoutineInput = {
    where: RoutineAppWhereUniqueInput
    data: XOR<RoutineAppUpdateWithoutRoutineInput, RoutineAppUncheckedUpdateWithoutRoutineInput>
  }

  export type RoutineAppUpdateManyWithWhereWithoutRoutineInput = {
    where: RoutineAppScalarWhereInput
    data: XOR<RoutineAppUpdateManyMutationInput, RoutineAppUncheckedUpdateManyWithoutRoutineInput>
  }

  export type RoutineAppScalarWhereInput = {
    AND?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
    OR?: RoutineAppScalarWhereInput[]
    NOT?: RoutineAppScalarWhereInput | RoutineAppScalarWhereInput[]
    routineId?: StringFilter<"RoutineApp"> | string
    appId?: StringFilter<"RoutineApp"> | string
  }

  export type CommitmentUpsertWithWhereUniqueWithoutRoutineInput = {
    where: CommitmentWhereUniqueInput
    update: XOR<CommitmentUpdateWithoutRoutineInput, CommitmentUncheckedUpdateWithoutRoutineInput>
    create: XOR<CommitmentCreateWithoutRoutineInput, CommitmentUncheckedCreateWithoutRoutineInput>
  }

  export type CommitmentUpdateWithWhereUniqueWithoutRoutineInput = {
    where: CommitmentWhereUniqueInput
    data: XOR<CommitmentUpdateWithoutRoutineInput, CommitmentUncheckedUpdateWithoutRoutineInput>
  }

  export type CommitmentUpdateManyWithWhereWithoutRoutineInput = {
    where: CommitmentScalarWhereInput
    data: XOR<CommitmentUpdateManyMutationInput, CommitmentUncheckedUpdateManyWithoutRoutineInput>
  }

  export type RoutineAppCreateWithoutAppInput = {
    routine: RoutineCreateNestedOneWithoutBlockedAppsInput
  }

  export type RoutineAppUncheckedCreateWithoutAppInput = {
    routineId: string
  }

  export type RoutineAppCreateOrConnectWithoutAppInput = {
    where: RoutineAppWhereUniqueInput
    create: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput>
  }

  export type RoutineAppCreateManyAppInputEnvelope = {
    data: RoutineAppCreateManyAppInput | RoutineAppCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type RoutineAppUpsertWithWhereUniqueWithoutAppInput = {
    where: RoutineAppWhereUniqueInput
    update: XOR<RoutineAppUpdateWithoutAppInput, RoutineAppUncheckedUpdateWithoutAppInput>
    create: XOR<RoutineAppCreateWithoutAppInput, RoutineAppUncheckedCreateWithoutAppInput>
  }

  export type RoutineAppUpdateWithWhereUniqueWithoutAppInput = {
    where: RoutineAppWhereUniqueInput
    data: XOR<RoutineAppUpdateWithoutAppInput, RoutineAppUncheckedUpdateWithoutAppInput>
  }

  export type RoutineAppUpdateManyWithWhereWithoutAppInput = {
    where: RoutineAppScalarWhereInput
    data: XOR<RoutineAppUpdateManyMutationInput, RoutineAppUncheckedUpdateManyWithoutAppInput>
  }

  export type RoutineCreateWithoutBlockedAppsInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRoutinesInput
    commitments?: CommitmentCreateNestedManyWithoutRoutineInput
  }

  export type RoutineUncheckedCreateWithoutBlockedAppsInput = {
    id?: string
    userId: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    commitments?: CommitmentUncheckedCreateNestedManyWithoutRoutineInput
  }

  export type RoutineCreateOrConnectWithoutBlockedAppsInput = {
    where: RoutineWhereUniqueInput
    create: XOR<RoutineCreateWithoutBlockedAppsInput, RoutineUncheckedCreateWithoutBlockedAppsInput>
  }

  export type AppCreateWithoutRoutinesInput = {
    id?: string
    name: string
    icon?: string | null
    domains?: AppCreatedomainsInput | string[]
    androidPackageName?: string | null
    iosBundleId?: string | null
    category?: string | null
    isUserSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppUncheckedCreateWithoutRoutinesInput = {
    id?: string
    name: string
    icon?: string | null
    domains?: AppCreatedomainsInput | string[]
    androidPackageName?: string | null
    iosBundleId?: string | null
    category?: string | null
    isUserSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppCreateOrConnectWithoutRoutinesInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutRoutinesInput, AppUncheckedCreateWithoutRoutinesInput>
  }

  export type RoutineUpsertWithoutBlockedAppsInput = {
    update: XOR<RoutineUpdateWithoutBlockedAppsInput, RoutineUncheckedUpdateWithoutBlockedAppsInput>
    create: XOR<RoutineCreateWithoutBlockedAppsInput, RoutineUncheckedCreateWithoutBlockedAppsInput>
    where?: RoutineWhereInput
  }

  export type RoutineUpdateToOneWithWhereWithoutBlockedAppsInput = {
    where?: RoutineWhereInput
    data: XOR<RoutineUpdateWithoutBlockedAppsInput, RoutineUncheckedUpdateWithoutBlockedAppsInput>
  }

  export type RoutineUpdateWithoutBlockedAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoutinesNestedInput
    commitments?: CommitmentUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineUncheckedUpdateWithoutBlockedAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitments?: CommitmentUncheckedUpdateManyWithoutRoutineNestedInput
  }

  export type AppUpsertWithoutRoutinesInput = {
    update: XOR<AppUpdateWithoutRoutinesInput, AppUncheckedUpdateWithoutRoutinesInput>
    create: XOR<AppCreateWithoutRoutinesInput, AppUncheckedCreateWithoutRoutinesInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutRoutinesInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutRoutinesInput, AppUncheckedUpdateWithoutRoutinesInput>
  }

  export type AppUpdateWithoutRoutinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUncheckedUpdateWithoutRoutinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    domains?: AppUpdatedomainsInput | string[]
    androidPackageName?: NullableStringFieldUpdateOperationsInput | string | null
    iosBundleId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTaskInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionCreateNestedManyWithoutUserInput
    appUsage?: AppUsageCreateNestedManyWithoutUserInput
    routines?: RoutineCreateNestedManyWithoutUserInput
    commitments?: CommitmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionUncheckedCreateNestedManyWithoutUserInput
    appUsage?: AppUsageUncheckedCreateNestedManyWithoutUserInput
    routines?: RoutineUncheckedCreateNestedManyWithoutUserInput
    commitments?: CommitmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskInput, UserUncheckedCreateWithoutTaskInput>
  }

  export type UserUpsertWithoutTaskInput = {
    update: XOR<UserUpdateWithoutTaskInput, UserUncheckedUpdateWithoutTaskInput>
    create: XOR<UserCreateWithoutTaskInput, UserUncheckedCreateWithoutTaskInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskInput, UserUncheckedUpdateWithoutTaskInput>
  }

  export type UserUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUpdateManyWithoutUserNestedInput
    routines?: RoutineUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUncheckedUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUncheckedUpdateManyWithoutUserNestedInput
    routines?: RoutineUncheckedUpdateManyWithoutUserNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCommitmentsInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionCreateNestedManyWithoutUserInput
    appUsage?: AppUsageCreateNestedManyWithoutUserInput
    routines?: RoutineCreateNestedManyWithoutUserInput
    task?: TaskCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommitmentsInput = {
    id: string
    walletAddress: string
    theme?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    focusSessions?: FocusSessionUncheckedCreateNestedManyWithoutUserInput
    appUsage?: AppUsageUncheckedCreateNestedManyWithoutUserInput
    routines?: RoutineUncheckedCreateNestedManyWithoutUserInput
    task?: TaskUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommitmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommitmentsInput, UserUncheckedCreateWithoutCommitmentsInput>
  }

  export type RoutineCreateWithoutCommitmentsInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRoutinesInput
    blockedApps?: RoutineAppCreateNestedManyWithoutRoutineInput
  }

  export type RoutineUncheckedCreateWithoutCommitmentsInput = {
    id?: string
    userId: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    blockedApps?: RoutineAppUncheckedCreateNestedManyWithoutRoutineInput
  }

  export type RoutineCreateOrConnectWithoutCommitmentsInput = {
    where: RoutineWhereUniqueInput
    create: XOR<RoutineCreateWithoutCommitmentsInput, RoutineUncheckedCreateWithoutCommitmentsInput>
  }

  export type FocusSessionCreateWithoutCommitmentsInput = {
    id?: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
    user: UserCreateNestedOneWithoutFocusSessionsInput
  }

  export type FocusSessionUncheckedCreateWithoutCommitmentsInput = {
    id?: string
    userId: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
  }

  export type FocusSessionCreateOrConnectWithoutCommitmentsInput = {
    where: FocusSessionWhereUniqueInput
    create: XOR<FocusSessionCreateWithoutCommitmentsInput, FocusSessionUncheckedCreateWithoutCommitmentsInput>
  }

  export type UserUpsertWithoutCommitmentsInput = {
    update: XOR<UserUpdateWithoutCommitmentsInput, UserUncheckedUpdateWithoutCommitmentsInput>
    create: XOR<UserCreateWithoutCommitmentsInput, UserUncheckedCreateWithoutCommitmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommitmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommitmentsInput, UserUncheckedUpdateWithoutCommitmentsInput>
  }

  export type UserUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUpdateManyWithoutUserNestedInput
    routines?: RoutineUpdateManyWithoutUserNestedInput
    task?: TaskUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    focusSessions?: FocusSessionUncheckedUpdateManyWithoutUserNestedInput
    appUsage?: AppUsageUncheckedUpdateManyWithoutUserNestedInput
    routines?: RoutineUncheckedUpdateManyWithoutUserNestedInput
    task?: TaskUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoutineUpsertWithoutCommitmentsInput = {
    update: XOR<RoutineUpdateWithoutCommitmentsInput, RoutineUncheckedUpdateWithoutCommitmentsInput>
    create: XOR<RoutineCreateWithoutCommitmentsInput, RoutineUncheckedCreateWithoutCommitmentsInput>
    where?: RoutineWhereInput
  }

  export type RoutineUpdateToOneWithWhereWithoutCommitmentsInput = {
    where?: RoutineWhereInput
    data: XOR<RoutineUpdateWithoutCommitmentsInput, RoutineUncheckedUpdateWithoutCommitmentsInput>
  }

  export type RoutineUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoutinesNestedInput
    blockedApps?: RoutineAppUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineUncheckedUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blockedApps?: RoutineAppUncheckedUpdateManyWithoutRoutineNestedInput
  }

  export type FocusSessionUpsertWithoutCommitmentsInput = {
    update: XOR<FocusSessionUpdateWithoutCommitmentsInput, FocusSessionUncheckedUpdateWithoutCommitmentsInput>
    create: XOR<FocusSessionCreateWithoutCommitmentsInput, FocusSessionUncheckedCreateWithoutCommitmentsInput>
    where?: FocusSessionWhereInput
  }

  export type FocusSessionUpdateToOneWithWhereWithoutCommitmentsInput = {
    where?: FocusSessionWhereInput
    data: XOR<FocusSessionUpdateWithoutCommitmentsInput, FocusSessionUncheckedUpdateWithoutCommitmentsInput>
  }

  export type FocusSessionUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
    user?: UserUpdateOneRequiredWithoutFocusSessionsNestedInput
  }

  export type FocusSessionUncheckedUpdateWithoutCommitmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
  }

  export type FocusSessionCreateManyUserInput = {
    id?: string
    startTime?: Date | string
    duration: number
    status: $Enums.FocusSessionStatus
  }

  export type AppUsageCreateManyUserInput = {
    id?: string
    appName: string
    timeSpent: number
    platform: $Enums.Platform
    hourStart: Date | string
  }

  export type RoutineCreateManyUserInput = {
    id?: string
    name: string
    emoji?: string
    timeMode: $Enums.TimeMode
    selectedDays?: RoutineCreateselectedDaysInput | string[]
    startTime?: string | null
    endTime?: string | null
    dailyLimit?: number | null
    endDate?: Date | string | null
    stakeAmount?: number
    status?: $Enums.RoutineStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    task: string
    state: $Enums.TaskState
    createdAt?: Date | string
    index?: number | null
    tags?: TaskCreatetagsInput | string[]
    scheduledDate: Date | string
  }

  export type CommitmentCreateManyUserInput = {
    id: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
    focusSessionId?: string | null
  }

  export type FocusSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
    commitments?: CommitmentUpdateManyWithoutFocusSessionNestedInput
  }

  export type FocusSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
    commitments?: CommitmentUncheckedUpdateManyWithoutFocusSessionNestedInput
  }

  export type FocusSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumFocusSessionStatusFieldUpdateOperationsInput | $Enums.FocusSessionStatus
  }

  export type AppUsageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUsageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUsageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    appName?: StringFieldUpdateOperationsInput | string
    timeSpent?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    hourStart?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutineUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blockedApps?: RoutineAppUpdateManyWithoutRoutineNestedInput
    commitments?: CommitmentUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blockedApps?: RoutineAppUncheckedUpdateManyWithoutRoutineNestedInput
    commitments?: CommitmentUncheckedUpdateManyWithoutRoutineNestedInput
  }

  export type RoutineUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    timeMode?: EnumTimeModeFieldUpdateOperationsInput | $Enums.TimeMode
    selectedDays?: RoutineUpdateselectedDaysInput | string[]
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakeAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRoutineStatusFieldUpdateOperationsInput | $Enums.RoutineStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    state?: EnumTaskStateFieldUpdateOperationsInput | $Enums.TaskState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    index?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TaskUpdatetagsInput | string[]
    scheduledDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routine?: RoutineUpdateOneWithoutCommitmentsNestedInput
    focusSession?: FocusSessionUpdateOneWithoutCommitmentsNestedInput
  }

  export type CommitmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentCreateManyFocusSessionInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    routineId?: string | null
  }

  export type CommitmentUpdateWithoutFocusSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCommitmentsNestedInput
    routine?: RoutineUpdateOneWithoutCommitmentsNestedInput
  }

  export type CommitmentUncheckedUpdateWithoutFocusSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentUncheckedUpdateManyWithoutFocusSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    routineId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoutineAppCreateManyRoutineInput = {
    appId: string
  }

  export type CommitmentCreateManyRoutineInput = {
    id: string
    userId: string
    userPubkey: string
    amount: bigint | number
    unlockTime: Date | string
    createdAt: Date | string
    authorityPubkey: string
    status?: $Enums.CommitmentStatus
    claimedAt?: Date | string | null
    forfeitedAt?: Date | string | null
    txSignature?: string | null
    focusSessionId?: string | null
  }

  export type RoutineAppUpdateWithoutRoutineInput = {
    app?: AppUpdateOneRequiredWithoutRoutinesNestedInput
  }

  export type RoutineAppUncheckedUpdateWithoutRoutineInput = {
    appId?: StringFieldUpdateOperationsInput | string
  }

  export type RoutineAppUncheckedUpdateManyWithoutRoutineInput = {
    appId?: StringFieldUpdateOperationsInput | string
  }

  export type CommitmentUpdateWithoutRoutineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCommitmentsNestedInput
    focusSession?: FocusSessionUpdateOneWithoutCommitmentsNestedInput
  }

  export type CommitmentUncheckedUpdateWithoutRoutineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommitmentUncheckedUpdateManyWithoutRoutineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userPubkey?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    unlockTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorityPubkey?: StringFieldUpdateOperationsInput | string
    status?: EnumCommitmentStatusFieldUpdateOperationsInput | $Enums.CommitmentStatus
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    forfeitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    focusSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoutineAppCreateManyAppInput = {
    routineId: string
  }

  export type RoutineAppUpdateWithoutAppInput = {
    routine?: RoutineUpdateOneRequiredWithoutBlockedAppsNestedInput
  }

  export type RoutineAppUncheckedUpdateWithoutAppInput = {
    routineId?: StringFieldUpdateOperationsInput | string
  }

  export type RoutineAppUncheckedUpdateManyWithoutAppInput = {
    routineId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}