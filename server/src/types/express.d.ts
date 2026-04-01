import { Request } from 'express';

export type ParamRequest<P> = ParamsDictionary & Request<P>;
export type BodyRequest<B> = Request<{}, {}, B>;
export type QueryRequest<Q> = Request<{}, {}, {}, Q>;
export type FullRequest<P, B> = Request<P & ParamsDictionary, any, B, ParsedQs>;