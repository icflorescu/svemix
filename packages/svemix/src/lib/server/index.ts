export { getHandler, postHandler } from './endpoint.js';

import type { Request } from '@sveltejs/kit';

interface ReadOnlyFormData<Data extends Record<string, any> = Record<string, any>> {
	get(key: keyof Data): string;
	getAll(key: keyof Data): string[];
	has(key: string): boolean;
	entries(): Generator<[string, string], void>;
	keys(): Generator<string, void>;
	values(): Generator<string, void>;
	[Symbol.iterator](): Generator<[string, string], void>;
}

type MaybePromise<T> = T | Promise<T>;

export type Loader<Pr extends Record<any, any> = Record<any, any>, Locals = Record<string, any>> = (
	request: Request<Locals, never>
) => MaybePromise<LoaderResult<Pr>>;

export type Action<
	Data extends Record<string, any> = Record<string, any>,
	Locals = Record<string, any>
> = (
	request: Request<Locals, ReadOnlyFormData>
) => MaybePromise<ActionResult<Data, Record<keyof Data, string>>>;

export interface LoaderResult<Pr extends Record<any, any> = Record<any, any>> {
	headers?: Record<string, string | string[]>;
	props?: Pr;
	error?: string | Error;
	status?: number;
	redirect?: string;
	maxage?: string;
}
export interface OpenGraph {
	title?: string;
	description?: string;
	url?: string;
	type?: string;
	article?: OpenGraphArticle;
	images?: OpenGraphImage[];
}

export interface OpenGraphArticle {
	publishedTime?: string;
	modifiedTime?: string;
	expirationTime?: string;
	section?: string;
	authors?: string[];
	tags?: string[];
}

export interface OpenGraphImage {
	url: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
}

export interface Twitter {
	site?: string;
	title?: string;
	description?: string;
	image?: string;
	imageAlt?: string;
}

export interface MetaResult {
	title?: string;
	description?: string;
	keywords?: string;
	canonical?: string;
	openGraph?: OpenGraph;
	twitter?: Twitter;
}

export type MetaFunction<Props extends Record<any, any>> = (props: Props) => MetaResult;

export interface ActionResult<
	Data extends Record<any, any> = Record<any, any>,
	Err extends Record<string, string> = Record<string, string>
> {
	headers?: Record<string, string | string[]>;
	data?: Data;
	errors?: Err;
	redirect?: string;
	formError?: string;
	status?: number;
}
